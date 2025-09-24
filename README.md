# ContentSpark AI ✨

A modern, AI-powered content creation platform for generating viral video ideas, professional scripts, and social media clips. Built with cutting-edge UI/UX design principles and optimized for creators.

## ✨ Key Features

- **🤖 AI-Powered Idea Generation**: Generate 5+ viral content ideas tailored for your niche
- **📝 Professional Script Creation**: Transform ideas into engaging scripts with hooks, talking points, and CTAs  
- **👤 Enhanced User Management**: Beautiful profile cards with credit tracking and tier management
- **📱 Mobile-First Design**: Fully responsive with touch-optimized interactions
- **🎨 Modern UI/UX**: Glass morphism, gradients, and smooth animations
- **♿ Accessibility Focused**: ARIA labels, keyboard navigation, and reduced motion support
- **🔔 Smart Notifications**: Toast system for user feedback and error handling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your API keys to `.env.local`:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key  
   - `OPENAI_API_KEY`: Your OpenAI API key

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components with glass morphism effects
- **Icons**: Lucide React
- **AI Integration**: OpenAI GPT-4 (with mock data for demo)
- **TypeScript**: Full type safety
- **Animations**: CSS animations with reduced motion support

## 🎨 UI/UX Improvements Implemented

### Modern Design System
- ✅ Gradient color schemes with proper CSS variables
- ✅ Glass morphism effects with backdrop blur
- ✅ Enhanced spacing and typography hierarchy
- ✅ Custom shadow elevations and hover effects
- ✅ Rounded corners and smooth transitions

### Enhanced User Experience  
- ✅ Toast notification system for user feedback
- ✅ Loading states with shimmer effects
- ✅ Error handling with graceful fallbacks
- ✅ Connected workflow between idea and script generation
- ✅ Copy-to-clipboard functionality with feedback

### Mobile & Accessibility
- ✅ Responsive grid layouts (1 col mobile, 2 col desktop)
- ✅ Touch-friendly button sizes (44px minimum)
- ✅ ARIA labels and semantic HTML
- ✅ Keyboard navigation support
- ✅ Reduced motion preferences respected
- ✅ Custom scrollbar styling

### Interactive Elements
- ✅ Animated card hover effects
- ✅ Staggered animations for list items
- ✅ Progress bars and credit visualization
- ✅ Tab navigation with smooth transitions
- ✅ Micro-interactions on button clicks

## Project Structure

```
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                # Utilities and types
├── public/             # Static assets
└── README.md
```

## Business Model

- **Micro-transactions**: Pay-per-clip generation ($0.10 per clip)
- **Subscription**: $5/month for 50 clips, $15/month for unlimited clips
- **Free tier**: Limited features with watermarked output

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
