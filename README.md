# 🍜 Culinary Wanderlust - Food Travel Blog

![App Preview](https://imgix.cosmicjs.com/98e76c60-d4c3-11f0-99f3-7f479634a5ba-photo-1569718212165-3a8278d5f624-1765259699610.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive food travel blog built with Next.js 16 and powered by Cosmic CMS. Share culinary adventures, authentic recipes, and food culture stories from around the world.

## ✨ Features

- **Dynamic Content Management** - All content managed through Cosmic CMS
- **Category-Based Navigation** - Browse posts by Italian Cuisine, Asian Cuisine, or Street Food
- **Author Profiles** - Dedicated pages for each food writer with social links
- **Markdown Content** - Rich text formatting for detailed recipe instructions and stories
- **Responsive Design** - Optimized for mobile, tablet, and desktop viewing
- **Image Optimization** - Automatic image optimization using imgix
- **SEO Friendly** - Proper meta tags and semantic HTML structure
- **TypeScript** - Full type safety throughout the application

## 📋 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6937b9574ee9e8d557550198&clone_repository=6937bb3963dedad2933b2dfb)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a food travel blog with posts, authors, and categories"

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a food travel blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering for blog content
- **Bun** - Fast JavaScript runtime and package manager

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- A Cosmic account with the food travel blog content model

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Posts with Related Content
```typescript
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1); // Includes author and category data
```

### Getting a Single Post by Slug
```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'tokyo-ramen-hidden-gems' })
  .depth(1);
```

### Filtering Posts by Category
```typescript
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## 🎨 Cosmic CMS Integration

This application uses the following Cosmic object types:

- **Posts** - Blog articles with markdown content, featured images, and publication dates
- **Authors** - Writer profiles with bios, photos, and social media links
- **Categories** - Cuisine classifications with descriptions and representative images

All content relationships are managed through object metafields, allowing posts to reference authors and categories. The depth parameter automatically includes nested data, eliminating the need for multiple API calls.

## 🌐 Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Push your code to GitHub
2. Import your repository in Netlify
3. Add your environment variables in the Netlify dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (optional for read-only deployments)

## 📖 Project Structure

```
culinary-wanderlust/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage with featured posts
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post pages
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx    # Category archive pages
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx    # Author profile pages
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Site header with navigation
│   ├── Footer.tsx          # Site footer
│   ├── PostCard.tsx        # Post preview card
│   ├── CategoryCard.tsx    # Category card component
│   └── CosmicBadge.tsx     # Built with Cosmic badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
├── types.ts                # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console logging for dashboard
```

## 📝 License

MIT License - feel free to use this project for your own food blog!

<!-- README_END -->