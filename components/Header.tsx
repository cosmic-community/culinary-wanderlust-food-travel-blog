import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary-dark">
            🍜 Culinary Wanderlust
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            <Link href="/categories/italian-cuisine" className="text-gray-700 hover:text-primary font-medium">
              Italian
            </Link>
            <Link href="/categories/asian-cuisine" className="text-gray-700 hover:text-primary font-medium">
              Asian
            </Link>
            <Link href="/categories/street-food" className="text-gray-700 hover:text-primary font-medium">
              Street Food
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}