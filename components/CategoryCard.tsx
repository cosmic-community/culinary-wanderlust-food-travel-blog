import { Category } from '@/types'
import Link from 'next/link'

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const categoryImage = category.metadata?.category_image;

  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
        {categoryImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${categoryImage.imgix_url}?w=800&h=384&fit=crop&auto=format,compress`}
              alt={category.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white">{category.title}</h3>
            </div>
          </div>
        )}
        <div className="p-6">
          {category.metadata?.description && (
            <p className="text-gray-600">
              {category.metadata.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}