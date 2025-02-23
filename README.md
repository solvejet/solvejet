# SolveJet

A modern, secure, and performant Next.js application with TypeScript and comprehensive features.

## 🚀 Features

- **Framework**: Built with Next.js 15 and React 19
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom configuration
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js integration
- **State Management**: React Query & Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Security**:
  - CSRF protection
  - Secure headers configuration
  - Content Security Policy
  - XSS prevention
  - Strict input validation
- **Performance**:
  - Progressive Web App (PWA) support
  - Image optimization
  - Font optimization
  - Bundle optimization
- **Developer Experience**:
  - ESLint configuration
  - Strict TypeScript checks
  - Comprehensive error handling
  - Hot reloading

## 📦 Prerequisites

- Node.js 18.17 or later
- pnpm 8.x or later
- MongoDB instance

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/solvejet/solvejet.git
cd solvejet
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_URL=http://localhost:3000/api
ALLOWED_ORIGINS=http://localhost:3000
```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

```
src/
├── app/                 # App router pages and layouts
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   └── ErrorBoundary/ # Error handling
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
│   ├── security/     # Security-related utilities
│   └── mongodb.ts    # Database configuration
├── models/           # Mongoose models
└── types/            # TypeScript type definitions
```

## 🔒 Security Features

- CSRF token validation
- Secure HTTP headers
- Content Security Policy (CSP)
- XSS prevention
- Input sanitization
- Strict password requirements
- Session management
- Rate limiting

## 📱 PWA Support

The application includes PWA support with:
- Offline functionality
- Cache management
- App manifest
- Service worker
- Install prompts

## 🚥 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm clean` - Clean build outputs

## 🎨 UI Components

The project includes a comprehensive UI component library with:
- Button variants
- Form controls
- Layout components
- Loading states
- Error boundaries
- Responsive design

## 🔍 SEO

- Dynamic metadata
- OpenGraph tags
- Twitter cards
- Robots.txt
- Sitemap
- Structured data

## 📦 Dependencies

### Production
- next: ^15.1.7
- react: ^19.0.0
- mongoose: ^8.10.1
- @tanstack/react-query: ^5.66.9
- tailwindcss: ^3.4.17
- zod: ^3.24.2

### Development
- typescript: ^5.7.3
- eslint: ^9.21.0
- postcss: 8.5.3
- next-pwa: ^5.6.0

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)