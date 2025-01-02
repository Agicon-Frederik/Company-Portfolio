import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { Post, Category } from '@/types/blog';
import { createPost, updatePost } from '@/lib/blog';
import { Button } from '../ui/Button';

interface PostEditorProps {
  post?: Post;
  categories: Category[];
  onSave: () => void;
}

export function PostEditor({ post, categories, onSave }: PostEditorProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: post || {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      published: false,
    },
  });

  async function onSubmit(data: Partial<Post>) {
    try {
      setLoading(true);
      if (post) {
        await updatePost(post.id, data);
        toast.success('Post updated successfully');
      } else {
        await createPost(data as Omit<Post, 'id' | 'created_at' | 'updated_at'>);
        toast.success('Post created successfully');
      }
      onSave();
    } catch (error) {
      toast.error('Failed to save post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          {...register('slug', { required: 'Slug is required' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          {...register('content', { required: 'Content is required' })}
          rows={10}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Excerpt</label>
        <textarea
          {...register('excerpt')}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categories</label>
        <select
          multiple
          {...register('categories')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('published')}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label className="ml-2 block text-sm text-gray-700">Published</label>
      </div>

      <Button type="submit" isLoading={loading}>
        {post ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  );
}