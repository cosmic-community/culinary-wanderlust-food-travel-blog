// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts() as Post[];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug) as Post | null;

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Culinary Wanderlust`,
    description: post.metadata?.excerpt || post.title,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug) as Post | null;

  if (!post) {
    notFound();
  }

  const author = post.metadata?.author;
  const category = post.metadata?.category;
  const featuredImage = post.metadata?.featured_image;
  const publishedDate = post.metadata?.published_date;

  return (
    <article className="min-h-screen py-12">
      {/* Hero Image */}
      {featuredImage && (
        <div className="w-full h-[500px] mb-8">
          <img
            src={`${featuredImage.imgix_url}?w=1920&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4">
        {/* Category Badge */}
        {category && (
          <div className="mb-4">
            <a
              href={`/categories/${category.slug}`}
              className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              {category.title}
            </a>
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 text-gray-900">{post.title}</h1>

        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {author && (
            <div className="flex items-center gap-3">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <a
                  href={`/authors/${author.slug}`}
                  className="font-semibold text-gray-900 hover:text-primary"
                >
                  {author.metadata?.name || author.title}
                </a>
                {publishedDate && (
                  <p className="text-sm text-gray-600">
                    {new Date(publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose-custom">
          <ReactMarkdown>{post.metadata?.content || ''}</ReactMarkdown>
        </div>

        {/* Author Bio */}
        {author && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex gap-4">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">
                  <a href={`/authors/${author.slug}`} className="hover:text-primary">
                    {author.metadata?.name || author.title}
                  </a>
                </h3>
                {author.metadata?.bio && (
                  <p className="text-gray-700 mb-3">{author.metadata.bio}</p>
                )}
                {(author.metadata?.twitter || author.metadata?.instagram) && (
                  <div className="flex gap-4">
                    {author.metadata?.twitter && (
                      <a
                        href={`https://twitter.com/${author.metadata.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark"
                      >
                        Twitter
                      </a>
                    )}
                    {author.metadata?.instagram && (
                      <a
                        href={`https://instagram.com/${author.metadata.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}