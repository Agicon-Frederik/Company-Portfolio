import { useParams } from 'react-router-dom';
import { samplePosts } from '@/lib/sample-posts';
import { formatDate } from '@/lib/utils';

export function BlogPostPage() {
  const { slug } = useParams();
  const post = samplePosts.find(p => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-lg mx-auto">
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <time dateTime={post.published_at || post.created_at}>
              {formatDate(new Date(post.published_at || post.created_at))}
            </time>
            {post.categories?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span>•</span>
                <div className="flex space-x-2">
                  {post.categories.map((category) => (
                    <span
                      key={category.id}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="prose prose-lg prose-blue mx-auto">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}