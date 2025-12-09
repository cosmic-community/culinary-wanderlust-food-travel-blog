// app/categories/[slug]/page.tsx
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories() as Category[];
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug) as Category | null;

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} | Culinary Wanderlust`,
    description: category.metadata?.description || `Explore ${category.title} stories`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug) as Category | null;

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id) as Post[];

  // Sort posts by published date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime();
    const dateB = new Date(b.metadata?.published_date || '').getTime();
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Header */}
        <div className="text-center mb-12">
          {category.metadata?.category_image && (
            <div className="w-full h-64 mb-6 rounded-lg overflow-hidden">
              <img
                src={`${category.metadata.category_image.imgix_url}?w=1400&h=512&fit=crop&auto=format,compress`}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
          {category.metadata?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No posts found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}