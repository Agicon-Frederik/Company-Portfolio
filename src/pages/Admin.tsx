import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth';
import { getPosts, getCategories, deletePost } from '@/lib/blog';
import type { Post, Category } from '@/types/blog';
import { LoginForm } from '@/components/Admin/LoginForm';
import { PostEditor } from '@/components/Admin/PostEditor';
import { PostList } from '@/components/Admin/PostList';
import { Button } from '@/components/ui/Button';

export function AdminPage() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  async function loadData() {
    try {
      setLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        getPosts({ page: 1, perPage: 100 }),
        getCategories(),
      ]);
      setPosts(postsData.posts);
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(post: Post) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        toast.success('Post deleted successfully');
        loadData();
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <LoginForm />
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <Button onClick={() => setIsEditing(true)}>New Post</Button>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-8">
          <PostEditor
            post={selectedPost}
            categories={categories}
            onSave={() => {
              setIsEditing(false);
              setSelectedPost(undefined);
              loadData();
            }}
          />
        </div>
      ) : (
        <div className="mt-8">
          <PostList
            posts={posts}
            onEdit={(post) => {
              setSelectedPost(post);
              setIsEditing(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}