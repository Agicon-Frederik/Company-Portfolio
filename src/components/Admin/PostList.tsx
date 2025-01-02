import { formatDate } from '@/lib/utils';
import type { Post } from '@/types/blog';
import { Button } from '../ui/Button';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export function PostList({ posts, onEdit, onDelete }: PostListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                {post.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatDate(new Date(post.updated_at))}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-right text-sm">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onEdit(post)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(post)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}