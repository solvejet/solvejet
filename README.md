# SolveJet - Modern Software Development Company Website

A modern, responsive website built with Next.js 14, TypeScript, Tailwind CSS, and various other cutting-edge technologies. This project implements best practices for performance, accessibility, and developer experience.

![SolveJet Preview](/public/solvejet.png)

## 🚀 Features

- ⚡️ **Next.js 14** - Latest features from Next.js
- 📦 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌗 **Dark Mode** - Elegant theme switching with next-themes
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Animations** - Smooth animations with Framer Motion
- 🧩 **Components** - Reusable and modular components
- 🔍 **SEO Optimized** - Meta tags and Open Graph
- 📊 **Analytics Ready** - Google Analytics and GTM integration
- 🔒 **ISO 27001:2022** - Security certified

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/solvejet.git
cd solvejet
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a .env file:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
pnpm dev
```

## 🏗️ Project Structure

```
solvejet/
├── app/                   # Next.js 14 app directory
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── providers/        # Context providers
├── config/               # Configuration files
├── data/                 # Static data
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/              # Global styles
└── types/               # TypeScript types
```

## 🧩 Components

### Layout Components

- `Header` - Main navigation with mega menu
- `Footer` - Site footer with newsletter
- `MobileSidebar` - Mobile navigation menu

### UI Components

- `Button` - Customizable button component
- `Input` - Form input with label and error
- `Badge` - Badge/tag component
- `Logo` - SVG logo with theme support
- `ThemeToggle` - Dark/light mode toggle

## 🎨 Styling

The project uses Tailwind CSS with a custom configuration:

- Custom color schemes for light/dark modes
- Responsive breakpoints
- Animation classes
- Custom components

### Color Scheme

```typescript
colors: {
  primary: {...},
  secondary: {...},
  accent: {...},
  background: {...},
  foreground: {...}
}
```

## 📱 Responsive Design

- Mobile First: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Configuration

### Site Configuration

Edit `config/site.ts`:

```typescript
export const siteConfig = {
  name: 'SolveJet',
  description: '...',
  // ...
}
```

### Analytics Configuration

Edit `config/analytics.ts`:

```typescript
export const analyticsConfig = {
  gtm: { id: '...' },
  ga: { id: '...' },
}
```

## 🚀 Deployment

1. Build the project:

```bash
pnpm build
```

2. Start production server:

```bash
pnpm start
```

### Vercel Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/solvejet)

## 🧪 Testing

```bash
# Run Jest tests
pnpm test

# Run ESLint
pnpm lint

# Type checking
pnpm type-check
```

## 📦 Dependencies

Key dependencies include:

- `next`: 14.1.5
- `react`: 19.0.0
- `tailwindcss`: 3.4.1
- `framer-motion`: Latest
- `lucide-react`: 0.471.1
- `next-themes`: 0.4.4

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [shadcn/ui](https://ui.shadcn.com/)
