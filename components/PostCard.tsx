import { Post } from '@/types'
import Link from 'next/link'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image;
  const author = post.metadata?.author;
  const category = post.metadata?.category;
  const publishedDate = post.metadata?.published_date;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      )}
      <div className="p-6">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 hover:bg-primary-dark transition-colors"
          >
            {category.title}
          </Link>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="font-medium hover:text-primary"
            >
              {author.metadata?.name || author.title}
            </Link>
          )}
          {publishedDate && (
            <span>
              {new Date(publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}