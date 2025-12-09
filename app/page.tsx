import { getPosts, getCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const posts = await getPosts() as Post[];
  const categories = await getCategories() as Category[];

  // Sort posts by published date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime();
    const dateB = new Date(b.metadata?.published_date || '').getTime();
    return dateB - dateA;
  });

  const featuredPost = sortedPosts[0];
  const recentPosts = sortedPosts.slice(1, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredPost && (
        <section className="relative h-[600px] bg-gray-900">
          <img
            src={`${featuredPost.metadata?.featured_image?.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
            alt={featuredPost.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {featuredPost.title}
              </h1>
              {featuredPost.metadata?.excerpt && (
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                  {featuredPost.metadata.excerpt}
                </p>
              )}
              <a
                href={`/posts/${featuredPost.slug}`}
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Read Story
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Recent Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Culinary Journey</h2>
          <p className="text-xl mb-8">
            Discover authentic food stories, recipes, and travel adventures from around the world.
          </p>
        </div>
      </section>
    </div>
  )
}