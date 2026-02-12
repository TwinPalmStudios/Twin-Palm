# Content Replacement Guide

This guide will help you replace all placeholder content with your actual Twin Palm Studios content.

## 📋 Content Checklist

### 1. Navigation Menu (`components/navbar.tsx`)

**Current Placeholder:**
```tsx
<Link href="#">Placeholder Text</Link>
<Link href="#">Placeholder Text</Link>
<Link href="#">Placeholder Text</Link>
<Button variant="ghost">Placeholder Text</Button>
<Button>Placeholder Text</Button>
```

**Replace With:**
```tsx
<Link href="/films" className="link-hover transition-colors hover:text-primary">
  Films
</Link>
<Link href="/about" className="link-hover transition-colors hover:text-primary">
  About
</Link>
<Link href="/contact" className="link-hover transition-colors hover:text-primary">
  Contact
</Link>
<Button variant="ghost" size="sm" className="btn-hover" data-variant="ghost">
  News
</Button>
<Button size="sm" className="btn-hover">
  Shop
</Button>
```

### 2. Hero Section (`components/hero.tsx`)

**Current Placeholder:**
```tsx
<Button variant="outline" size="lg">
  Placeholder Text
</Button>
```

**Replace With:**
```tsx
<Button
  variant="outline"
  size="lg"
  onClick={() => scrollToSection(3)}
  className="btn-hover"
  data-variant="outline"
>
  Contact Us
</Button>
```

### 3. Film Gallery (`components/poster-gallery.tsx`)

**Current Placeholder:**
```tsx
const movies = [
  {
    title: "???",
    year: "2026",
    runtime: "???",
    rating: "???",
    description: "???",
    posterUrl: "https://m.media-amazon.com/images/...",
    url: "/films/coming-soon",
  },
  {
    title: "The Brief Case",
    year: "2025",
    runtime: "TBD",
    rating: "PG-13",
    description: "Coming Soon..",
    posterUrl: "https://m.media-amazon.com/images/...",
    url: "/films/the-brief-case",
  },
  {
    title: "?",
    year: "2026",
    runtime: "???",
    rating: "???",
    description: "???",
    posterUrl: "https://m.media-amazon.com/images/...",
    url: "/films/coming-soon",
  },
]
```

**Replace With Your Films:**
```tsx
const movies = [
  {
    title: "Your First Film Title",
    year: "2024",
    runtime: "105 min",
    rating: "R",
    description: "A gripping thriller about...",
    posterUrl: "/posters/film-1.jpg",
    url: "/films/your-first-film",
  },
  {
    title: "The Brief Case",
    year: "2025",
    runtime: "TBD",
    rating: "PG-13",
    description: "An intriguing mystery set in...",
    posterUrl: "/posters/the-brief-case.jpg",
    url: "/films/the-brief-case",
  },
  {
    title: "Your Third Film Title",
    year: "2026",
    runtime: "120 min",
    rating: "PG-13",
    description: "Coming Soon - A story of...",
    posterUrl: "/posters/film-3.jpg",
    url: "/films/your-third-film",
  },
]
```

### 4. Footer Content (`components/footer.tsx`)

**Current Content:**
```tsx
<p className="text-muted-foreground">© 2025 Twin Palm Studios. All rights reserved.</p>
```

**This is fine, but you may want to add:**
```tsx
<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
  <div>
    <h3 className="font-semibold mb-4">Company</h3>
    <ul className="space-y-2 text-sm">
      <li><Link href="/about">About Us</Link></li>
      <li><Link href="/contact">Contact</Link></li>
      <li><Link href="/careers">Careers</Link></li>
    </ul>
  </div>
  <div>
    <h3 className="font-semibold mb-4">Films</h3>
    <ul className="space-y-2 text-sm">
      <li><Link href="/films">All Films</Link></li>
      <li><Link href="/films/upcoming">Upcoming</Link></li>
      <li><Link href="/films/archive">Archive</Link></li>
    </ul>
  </div>
  <div>
    <h3 className="font-semibold mb-4">Legal</h3>
    <ul className="space-y-2 text-sm">
      <li><Link href="/privacy">Privacy Policy</Link></li>
      <li><Link href="/terms">Terms of Service</Link></li>
    </ul>
  </div>
  <div>
    <h3 className="font-semibold mb-4">Follow Us</h3>
    <ul className="space-y-2 text-sm">
      <li><a href="https://twitter.com/yourhandle" target="_blank">Twitter</a></li>
      <li><a href="https://instagram.com/yourhandle" target="_blank">Instagram</a></li>
      <li><a href="https://facebook.com/yourpage" target="_blank">Facebook</a></li>
    </ul>
  </div>
</div>
```

## 🖼️ Adding Film Posters

### Step 1: Prepare Your Images
- Format: JPG or PNG
- Recommended size: 400x600px (2:3 aspect ratio)
- File size: < 500KB for web performance

### Step 2: Place in Public Directory
```
public/
├── posters/
│   ├── the-brief-case.jpg
│   ├── film-1.jpg
│   ├── film-2.jpg
│   └── film-3.jpg
└── ...
```

### Step 3: Update poster-gallery.tsx
```tsx
posterUrl: "/posters/the-brief-case.jpg"
```

## 📄 Creating Page Content

### Films Page (`app/films/page.tsx`)
```tsx
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PosterGallery from "@/components/poster-gallery"

export const metadata = {
  title: "Films - Twin Palm Studios",
  description: "Explore our collection of cinematic works",
}

export default function FilmsPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className="container py-24">
          <h1 className="text-4xl font-bold mb-8">Our Films</h1>
          <p className="text-muted-foreground text-lg mb-12">
            Discover the stories that define Twin Palm Studios
          </p>
          
          <PosterGallery />
        </div>

        <Footer />
      </div>
    </div>
  )
}
```

### About Page (`app/about/page.tsx`)
```tsx
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "About - Twin Palm Studios",
  description: "Learn about Twin Palm Studios and our mission",
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className="container max-w-4xl py-24">
          <h1 className="text-4xl font-bold mb-8">About Twin Palm Studios</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              [Add your studio's story here]
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p>
              [Describe your mission and vision]
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">The Team</h2>
            <p>
              [Introduce your team members]
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
```

### Contact Page (`app/contact/page.tsx`)
```tsx
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const metadata = {
  title: "Contact - Twin Palm Studios",
  description: "Get in touch with Twin Palm Studios",
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className="container max-w-2xl py-24">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input placeholder="Your name" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea 
                className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2"
                placeholder="Your message..."
              />
            </div>
            
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
          
          <div className="mt-12 space-y-4">
            <h2 className="text-2xl font-bold">Other Ways to Reach Us</h2>
            <p className="text-muted-foreground">
              Email: info@twinpalmstudios.com<br />
              Phone: [Your phone number]<br />
              Address: [Your address]
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
```

## 📱 Social Media Links

Add your social media links to the footer:

```tsx
// In components/footer.tsx
<div className="flex gap-4 mt-4">
  <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
    <Twitter className="h-5 w-5" />
  </a>
  <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">
    <Instagram className="h-5 w-5" />
  </a>
  <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
    <Facebook className="h-5 w-5" />
  </a>
</div>
```

## ✅ Content Update Checklist

- [ ] Replace navigation links in navbar.tsx
- [ ] Update hero button text in hero.tsx
- [ ] Add real film data to poster-gallery.tsx
- [ ] Add your film poster images to public/posters/
- [ ] Update footer with your contact info and social links
- [ ] Create Films page (app/films/page.tsx)
- [ ] Create About page (app/about/page.tsx)
- [ ] Create Contact page (app/contact/page.tsx)
- [ ] Update metadata in layout.tsx with your SEO info
- [ ] Add favicon to public/ directory

## 🎨 Styling Tips

The site uses a dark theme by default. If you want to customize colors, edit:
- `app/globals.css` - CSS custom properties
- `tailwind.config.js` - Tailwind theme settings

---

Take it step by step, and your site will look professional in no time! 🎬
