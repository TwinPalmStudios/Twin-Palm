# Deployment Troubleshooting Guide

If your Vercel deployment still fails after applying the cleanup, use this guide to diagnose and fix issues.

## 🔍 Step 1: Check Vercel Build Logs

1. Go to https://vercel.com/hills/~/deployments
2. Click on the failed deployment
3. Look at the build logs under the "Building" section
4. Note any error messages

## 🐛 Common Issues & Solutions

### Issue 1: "Module not found" Errors

**Symptoms:**
```
Error: Cannot find module '@/components/navbar'
```

**Causes:**
- Case sensitivity issues (Navbar.tsx vs navbar.tsx)
- Incorrect import paths
- Missing files

**Solutions:**

1. **Check file names match imports exactly:**
```tsx
// ❌ Wrong
import Navbar from "@/components/Navbar"  // Looking for Navbar.tsx
// File is named: navbar.tsx

// ✅ Correct
import Navbar from "@/components/navbar"
```

2. **Verify tsconfig.json paths:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]  // Should map to root
    }
  }
}
```

3. **Check all files exist:**
```bash
ls components/navbar.tsx
ls components/hero.tsx
ls components/footer.tsx
```

---

### Issue 2: TypeScript Type Errors

**Symptoms:**
```
Type 'string' is not assignable to type 'number'
Property 'onClick' does not exist on type...
```

**Causes:**
- Missing type definitions
- Incorrect prop types
- Outdated dependencies

**Solutions:**

1. **Check package.json versions:**
```json
{
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
```

2. **Add missing type imports:**
```tsx
import type { FC } from 'react'
import type { ButtonProps } from '@/components/ui/button'
```

3. **Fix prop types:**
```tsx
// ❌ Wrong
interface Props {
  onClick: () => void  // Missing optional marker
}

// ✅ Correct
interface Props {
  onClick?: () => void
}
```

---

### Issue 3: ESLint Errors

**Symptoms:**
```
'React' is defined but never used
Missing return type on function
```

**Causes:**
- Unused imports
- Missing return types
- Code style issues

**Solutions:**

1. **Remove unused imports:**
```tsx
// ❌ Wrong
import React from 'react'  // Not used in Next.js 13+

// ✅ Correct
// Just remove it
```

2. **Add return types:**
```tsx
// ❌ Wrong
export default function Hero() {

// ✅ Correct
export default function Hero(): JSX.Element {
```

3. **Temporarily disable specific rules (last resort):**
```js
// next.config.mjs
const nextConfig = {
  eslint: {
    // Only ignore specific rules if absolutely necessary
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    }
  }
}
```

---

### Issue 4: Image Loading Errors

**Symptoms:**
```
Image optimization error
Invalid src prop
```

**Causes:**
- External images without proper configuration
- Missing images
- Incorrect paths

**Solutions:**

1. **Update next.config.mjs for external images:**
```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  },
}
```

2. **Use local images instead:**
```tsx
// ❌ External
posterUrl: "https://m.media-amazon.com/images/..."

// ✅ Local
posterUrl: "/posters/Movie-name.jpg"
```

3. **Verify images exist:**
```bash
ls public/posters/
```

---

### Issue 5: Environment Variable Issues

**Symptoms:**
```
process.env.NEXT_PUBLIC_API_KEY is undefined
```

**Solutions:**

1. **Add to Vercel dashboard:**
   - Go to Project Settings > Environment Variables
   - Add variables with NEXT_PUBLIC_ prefix for client-side

2. **Create .env.local for local dev:**
```bash
# .env.local
NEXT_PUBLIC_API_KEY=your-key-here
```

---

### Issue 6: Memory/Build Timeout

**Symptoms:**
```
Build exceeded maximum duration
Out of memory
```

**Solutions:**

1. **Optimize dependencies:**
```bash
# Remove unused packages
npm uninstall package-name

# Check for duplicate dependencies
npm dedupe
```

2. **Add build optimization:**
```js
// next.config.mjs
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*'],
  },
}
```

---

### Issue 7: Git Issues

**Symptoms:**
```
Failed to push
Repository not found
```

**Solutions:**

1. **Check git remote:**
```bash
git remote -v
# Should show your GitHub repo
```

2. **Fix if wrong:**
```bash
git remote set-url origin https://github.com/TwinPalmStudios/Twin-Palm.git
```

3. **Force push if needed (careful!):**
```bash
git push -f origin main
```

---

## 🧪 Testing Locally Before Deploy

Always test locally before pushing:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Type Check
```bash
npx tsc --noEmit
```

### 3. Run Linter
```bash
npm run lint
```

### 4. Build Production
```bash
npm run build
```

### 5. Test Production Build
```bash
npm start
```

If all these pass, your Vercel deployment should succeed!

---

## 📊 Vercel Build Phases

Understanding build phases helps debug:

1. **Installing** - Downloads dependencies
   - Look for: `npm install` or `pnpm install`
   - Issues: Package resolution, version conflicts

2. **Building** - Compiles code
   - Look for: `next build`
   - Issues: TypeScript errors, import issues

3. **Uploading** - Sends to CDN
   - Look for: Upload progress
   - Issues: Size limits, network issues

---

## 🆘 Still Not Working?

### Get Detailed Error Info

1. **Run build with verbose logging:**
```bash
npm run build -- --debug
```

2. **Check specific files causing issues:**
```bash
# Check a specific component
npx tsc --noEmit components/navbar.tsx
```

3. **Verify Node version matches Vercel:**
```bash
node -v  # Should be 18.x or 20.x
```

### Contact Vercel Support

If nothing works:
1. Save your build logs
2. Note the exact error message
3. Contact Vercel support with:
   - Repository URL
   - Build logs
   - Error message
   - What you've tried

---

## ✅ Final Checklist

Before each deployment attempt:

- [ ] `npm install` runs without errors
- [ ] `npm run build` succeeds locally
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] All imports use correct case
- [ ] All imported files exist
- [ ] Images are in correct locations
- [ ] Environment variables set in Vercel (if needed)
- [ ] Git committed and pushed successfully

---

## 📝 Deployment Workflow

**Recommended process:**

1. Make changes locally
2. Test with `npm run dev`
3. Run `npm run build`
4. Fix any errors
5. Commit: `git add . && git commit -m "Your message"`
6. Push: `git push origin main`
7. Watch Vercel dashboard
8. If fails, check logs and repeat

This methodical approach catches issues before they reach Vercel!
