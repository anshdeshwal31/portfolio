# 🚀 Luxurious Interactive Portfolio

A stunning, interactive portfolio website built with Next.js, Three.js, and Framer Motion, showcasing modern web development skills with immersive 3D experiences.

## ✨ Features

### 🎨 Visual Excellence

- **Interactive 3D Background**: Dynamic Three.js particle systems and geometric shapes
- **Custom Cursor**: Magnetic cursor with hover effects
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Optimized for all devices and screen sizes

### 🛠️ Technical Highlights

- **Modern Stack**: Next.js 15 with App Router, TypeScript, TailwindCSS
- **3D Graphics**: Three.js with React Three Fiber for immersive experiences
- **Motion UI**: Framer Motion for fluid animations and transitions
- **Performance**: Optimized Three.js scenes and efficient rendering
- **Accessibility**: WCAG compliant with proper semantic markup

### 📱 Sections

1. **Hero**: Animated introduction with floating 3D elements
2. **Skills**: Interactive skill cards with hover effects and categorization
3. **Projects**: Showcase with 3D project previews and smooth transitions
4. **About**: Personal narrative with animated avatar and highlights
5. **Contact**: Functional contact form with social links

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and custom CSS
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── navigation.tsx     # Navigation with mobile menu
│   ├── theme-provider.tsx # Theme context provider
│   ├── sections/          # Page sections
│   │   ├── hero-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── about-section.tsx
│   │   └── contact-section.tsx
│   ├── three/             # Three.js components
│   │   └── three-background.tsx
│   └── ui/                # UI components
│       ├── custom-cursor.tsx
│       ├── scroll-progress.tsx
│       └── theme-toggle.tsx
└── lib/
    └── utils.ts           # Utility functions
```

## 🎯 Key Technologies

### Frontend Framework

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework

### 3D Graphics & Animation

- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber
- **Framer Motion**: Motion library for React

### UI & Styling

- **Lucide React**: Beautiful icon library
- **CSS Custom Properties**: Dynamic theming
- **Responsive Design**: Mobile-first approach

## 🎨 Customization

### Personalizing Content

1. **Update personal information** in `src/components/sections/hero-section.tsx`
2. **Modify skills** in `src/components/sections/skills-section.tsx`
3. **Add your projects** in `src/components/sections/projects-section.tsx`
4. **Customize about section** in `src/components/sections/about-section.tsx`
5. **Update contact details** in `src/components/sections/contact-section.tsx`

### Theming

The project uses a custom theme system. Modify colors and styling in:

- `src/app/globals.css` - Global styles and CSS variables
- Component-level Tailwind classes for specific customizations

### 3D Elements

Customize Three.js elements in `src/components/three/three-background.tsx`:

- Particle count and behavior
- Geometric shapes and materials
- Camera settings and lighting
- Mouse/scroll interactions

## 📊 Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Optimized Three.js**: Efficient particle systems and materials
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Tree Shaking**: Unused code elimination

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The project works with any static hosting service:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Digital Ocean

Build for production:

```bash
npm run build
npm run start
```

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Next.js](https://nextjs.org/) for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Contact

Alex Vinci - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

⭐ **Star this repository if you found it helpful!**
