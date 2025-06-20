# HyperApp -

A cutting-edge web application built with the latest technologies: **Next.js 15**, **React 19**, and **Tailwind CSS v4**. This project showcases modern web development practices and serves as a comprehensive starter template.

## 🚀 Features

- ⚡ **Next.js 15** - Latest Next.js with App Router and Turbopack
- ⚛️ **React 19** - Enhanced React with new hooks and Server Components
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS with CSS-based configuration
- 🔥 **TypeScript** - Full type safety and enhanced developer experience
- 📱 **Responsive Design** - Mobile-first approach with modern layouts
- 🌙 **Dark Mode Ready** - System preference detection with smooth transitions
- ⚡ **Performance Optimized** - Built-in optimizations for images, fonts, and more
- 🛠️ **Developer Experience** - ESLint, hot reload, and modern tooling

## 🛠️ Tech Stack

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 15.3.4  | React framework with App Router |
| React        | 19.0.0  | UI library with latest features |
| Tailwind CSS | v4      | Utility-first CSS framework     |
| TypeScript   | ^5      | Type safety and enhanced DX     |
| ESLint       | ^9      | Code linting and quality        |

## 🚦 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd hyperapp-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
hyperapp-web/
├── src/
│   └── app/
│       ├── globals.css          # Global styles with Tailwind v4
│       ├── layout.tsx           # Root layout with metadata
│       └── page.tsx             # Homepage component
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind configuration (if needed)
└── tsconfig.json               # TypeScript configuration
```

## 🎨 Tailwind CSS v4 Configuration

This project uses the latest Tailwind CSS v4 with CSS-based configuration:

### Key Features:

- **CSS-based config** - Configuration moved to CSS files
- **Enhanced performance** - Faster builds and smaller bundles
- **Design tokens** - Comprehensive color and spacing system
- **Dark mode** - Built-in dark mode support
- **Modern utilities** - Latest utility classes and patterns

### Color System:

```css
:root {
  --primary: #0969da;
  --secondary: #f6f8fa;
  --muted: #f6f8fa;
  --accent: #f6f8fa;
  --destructive: #d1242f;
  /* ... more colors */
}
```

## ⚡ Next.js 15 Features

### App Router

- File-based routing with app directory
- Server and Client Components
- Nested layouts and loading states
- Enhanced metadata API

### Performance

- Turbopack for faster development builds
- Automatic image optimization
- Font optimization with next/font
- Built-in performance monitoring

### Developer Experience

- Hot reload with Turbopack
- Enhanced error messages
- TypeScript support out of the box
- ESLint integration

## 🔧 Available Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm run start` | Start production server                 |
| `npm run lint`  | Run ESLint                              |

## 🌐 Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Other Platforms

- **Netlify**: Connect your Git repository
- **Railway**: `railway login && railway deploy`
- **Docker**: Dockerfile included for containerization

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

All components are fully responsive with Tailwind's responsive utilities.

## 🌙 Dark Mode

Dark mode is implemented using CSS custom properties and media queries:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0d1117;
    --foreground: #f0f6fc;
    /* ... more dark mode colors */
  }
}
```

## 🚀 Performance Features

- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Font Optimization**: Google Fonts with zero layout shift
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Intelligent caching strategies

## 🧪 Best Practices

### Code Organization

- Components organized by feature
- Consistent naming conventions
- TypeScript for type safety
- ESLint for code quality

### Styling

- Utility-first approach with Tailwind
- Design system with CSS custom properties
- Responsive design patterns
- Accessible color contrasts

### Performance

- Server-side rendering when beneficial
- Static generation for static content
- Optimized images and fonts
- Minimal JavaScript bundles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Guide](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Resources

- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Tailwind UI Components](https://tailwindui.com)
- [Vercel Templates](https://vercel.com/templates)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for Next.js
- [Tailwind Labs](https://tailwindlabs.com) for Tailwind CSS
- [Meta](https://meta.com) for React
- The open-source community for amazing tools and inspiration

---

**Built with ❤️ using Next.js 15, React 19, and Tailwind CSS v4**
