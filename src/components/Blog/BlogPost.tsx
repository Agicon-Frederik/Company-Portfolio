import { formatDate } from '@/lib/utils';
import type { Post } from '@/types/blog';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  post: Post;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
      <div className="flex-1 bg-white dark:bg-gray-800 p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {post.categories?.map((cat) => cat.name).join(', ')}
          </p>
          <Link to={`/blog/${post.slug}`} className="mt-2 block">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h3>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{post.excerpt}</p>
          </Link>
        </div>
        <div className="mt-6">
          <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.published_at || post.created_at}>
              {formatDate(new Date(post.published_at || post.created_at))}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}