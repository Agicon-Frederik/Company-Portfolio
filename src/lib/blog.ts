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
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Post, Category, PostFilters } from '@/types/blog';

export function subscribeToBlogs(callback: (posts: Post[]) => void) {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('created_at', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
    callback(posts);
  });
}

export async function getPosts({ category, search, page, perPage }: PostFilters) {
  try {
    const postsRef = collection(db, 'posts');
    let q = query(postsRef, 
      where('published', '==', true),
      orderBy('published_at', 'desc'),
      limit(perPage)
    );

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];

    return {
      posts,
      total: snapshot.size
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const postsRef = collection(db, 'posts');
    const docRef = await addDoc(postsRef, {
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
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
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}