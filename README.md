# ContentSpark AI

A Base MiniApp for creators to generate AI-powered video ideas, scripts, and short clips for social media.

## Features

- **AI-Powered Idea Generation**: Generate 5-10 specific, trending video ideas tailored for social media platforms
- **Script & Talking Point Synthesis**: Create concise scripts and key talking points structured for short-form video formats
- **User Profile Management**: Track credits and subscription tiers
- **Mobile-First Design**: Optimized for Base App and mobile experiences

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

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Blockchain**: Base (via MiniKit and OnchainKit)
- **AI**: OpenAI GPT-4 via OpenRouter
- **TypeScript**: Full type safety

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
