import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getPosts, deletePost } from '@/lib/blog';
import { PostEditor } from './PostEditor';
import { PostList } from './PostList';
import { Button } from '../ui/Button';
import type { Post } from '@/types/blog';

export function AdminBlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      const { posts } = await getPosts({ page: 1, perPage: 100 });
      setPosts(posts);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(post: Post) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        toast.success('Post deleted successfully');
        loadPosts();
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <Button onClick={() => setIsEditing(true)}>New Post</Button>
      </div>

      {isEditing ? (
        <PostEditor
          post={selectedPost}
          onSave={() => {
            setIsEditing(false);
            setSelectedPost(undefined);
            loadPosts();
          }}
          onCancel={() => {
            setIsEditing(false);
            setSelectedPost(undefined);
          }}
        />
      ) : (
        <PostList
          posts={posts}
          onEdit={(post) => {
            setSelectedPost(post);
            setIsEditing(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}