// app/authors/[slug]/page.tsx
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

export const revalidate = 60;

export async function generateStaticParams() {
  const authors = await getAuthors() as Author[];
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthor(slug) as Author | null;

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${author.metadata?.name || author.title} | Culinary Wanderlust`,
    description: author.metadata?.bio || `Stories by ${author.metadata?.name || author.title}`,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthor(slug) as Author | null;

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id) as Post[];

  // Sort posts by published date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime();
    const dateB = new Date(b.metadata?.published_date || '').getTime();
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Author Header */}
        <div className="text-center mb-12">
          {author.metadata?.profile_photo && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={author.metadata.name}
              className="w-40 h-40 rounded-full object-cover mx-auto mb-6"
            />
          )}
          <h1 className="text-4xl font-bold mb-4">
            {author.metadata?.name || author.title}
          </h1>
          {author.metadata?.bio && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {author.metadata.bio}
            </p>
          )}
          {(author.metadata?.twitter || author.metadata?.instagram) && (
            <div className="flex gap-4 justify-center">
              {author.metadata?.twitter && (
                <a
                  href={`https://twitter.com/${author.metadata.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Twitter
                </a>
              )}
              {author.metadata?.instagram && (
                <a
                  href={`https://instagram.com/${author.metadata.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Stories by {author.metadata?.name || author.title}</h2>
          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No posts published yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}