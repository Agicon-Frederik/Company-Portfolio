import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  getFirestore,
  Unsubscribe
} from 'firebase/firestore';
import { db } from './firebase';
import type { Post, Category, PostFilters } from '@/types/blog';
import { cache } from './cache';
import { samplePosts } from './sample-posts';

const CACHE_KEY_POSTS = 'blog_posts';
const CACHE_KEY_CATEGORIES = 'blog_categories';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Keep track of active subscriptions to avoid duplicates
let activePostsSubscription: Unsubscribe | null = null;

export function subscribeToBlogs(callback: (posts: Post[]) => void) {
  // First, check if we have cached data
  const cachedPosts = cache.get<Post[]>(CACHE_KEY_POSTS);
  
  if (cachedPosts) {
    // Immediately return cached data
    callback(cachedPosts);
  } else {
    // If no cache, immediately return sample data
    callback(samplePosts);
  }
  
  // Clean up any existing subscription
  if (activePostsSubscription) {
    activePostsSubscription();
  }
  
  // Set up real-time subscription
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('created_at', 'desc'));
  
  activePostsSubscription = onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
    
    // Update cache
    cache.set(CACHE_KEY_POSTS, posts, CACHE_TTL);
    
    // Update UI
    callback(posts);
  }, (error) => {
    console.error('Error in posts subscription:', error);
    // If there's an error with the subscription, at least we showed sample data
  });
  
  return () => {
    if (activePostsSubscription) {
      activePostsSubscription();
      activePostsSubscription = null;
    }
  };
}

export async function getPosts({ category, search, page, perPage }: PostFilters) {
  try {
    // First check cache
    const cachedPosts = cache.get<Post[]>(CACHE_KEY_POSTS);
    
    if (cachedPosts) {
      // Filter cached posts
      const filtered = filterPosts(cachedPosts, { category, search });
      const paginatedPosts = paginate(filtered, page, perPage);
      
      return {
        posts: paginatedPosts,
        total: filtered.length
      };
    }
    
    // If not in cache, fetch from Firestore
    const postsRef = collection(db, 'posts');
    let q = query(postsRef, 
      where('published', '==', true),
      orderBy('published_at', 'desc')
    );

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
    
    // Cache the results
    cache.set(CACHE_KEY_POSTS, posts, CACHE_TTL);
    
    // Filter and paginate
    const filtered = filterPosts(posts, { category, search });
    const paginatedPosts = paginate(filtered, page, perPage);
    
    return {
      posts: paginatedPosts,
      total: filtered.length
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    
    // Fallback to sample data
    const filtered = filterPosts(samplePosts, { category, search });
    const paginatedPosts = paginate(filtered, page, perPage);
    
    return {
      posts: paginatedPosts,
      total: filtered.length
    };
  }
}

// Helper function to filter posts
function filterPosts(posts: Post[], { category, search }: Partial<PostFilters>) {
  return posts.filter(post => {
    const matchesSearch = !search || 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = !category ||
      post.categories?.some(cat => cat.slug === category);

    return matchesSearch && matchesCategory;
  });
}

// Helper function to paginate posts
function paginate(posts: Post[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return posts.slice(start, end);
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const postsRef = collection(db, 'posts');
    const docRef = await addDoc(postsRef, {
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
    // Invalidate cache
    cache.delete(CACHE_KEY_POSTS);
    
    return { id: docRef.id, ...post };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(id: string, post: Partial<Post>) {
  try {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      ...post,
      updated_at: new Date().toISOString()
    });
    
    // Invalidate cache
    cache.delete(CACHE_KEY_POSTS);
    
    return { id, ...post };
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function deletePost(id: string) {
  try {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);
    
    // Invalidate cache
    cache.delete(CACHE_KEY_POSTS);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// Categories with caching
export async function getCategories(): Promise<Category[]> {
  // Check cache first
  const cachedCategories = cache.get<Category[]>(CACHE_KEY_CATEGORIES);
  if (cachedCategories) {
    return cachedCategories;
  }
  
  try {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];
    
    // Cache the results
    cache.set(CACHE_KEY_CATEGORIES, categories, CACHE_TTL);
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    // Return default categories if there's an error
    return [
      { id: '1', name: 'Web Development', slug: 'web-development' },
      { id: '2', name: 'Digital Marketing', slug: 'digital-marketing' },
      { id: '3', name: 'Design', slug: 'design' }
    ];
  }
}