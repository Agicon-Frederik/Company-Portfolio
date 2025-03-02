import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { samplePosts } from '@/lib/sample-posts';
import { formatDate } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { subscribeToBlogs } from '@/lib/blog';
import type { Post } from '@/types/blog';

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | undefined>(
    samplePosts.find(p => p.slug === slug)
  );
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    if (!slug) return;
    
    // If we already have the post from sample data, no need to load
    if (post && post.slug === slug) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    const unsubscribe = subscribeToBlogs((posts) => {
      const foundPost = posts.find(p => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 pt-24">
      <Link to="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>
      
      <article className="prose prose-lg dark:prose-invert prose-blue mx-auto">
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
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
                      className="rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="prose prose-lg prose-blue dark:prose-invert mx-auto">
          {post.content.split('\n\n').map((paragraph, index) => {
            // Handle markdown headings
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.substring(3)}</h2>;
            } else if (paragraph.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
            }
            return <p key={index} className="mb-4">{paragraph}</p>;
          })}
        </div>
      </article>
    </div>
  );
}