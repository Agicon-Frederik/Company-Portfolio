import { formatDate } from '@/lib/utils';
import type { Post } from '@/types/blog';

interface BlogPostProps {
  post: Post;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-1 bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-600">
            {post.categories?.map((cat) => cat.name).join(', ')}
          </p>
          <a href={`/blog/${post.slug}`} className="mt-2 block">
            <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
            <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
          </a>
        </div>
        <div className="mt-6">
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={post.published_at || post.created_at}>
              {formatDate(new Date(post.published_at || post.created_at))}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}