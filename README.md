# ContentSpark AI

A Base MiniApp for creators to generate AI-powered video ideas, scripts, and short clips for social media.

## Features

- **AI-Powered Idea Generation**: Generate 5-10 specific, trending video ideas tailored for social media platforms
- **Script & Talking Point Synthesis**: Create concise scripts and key talking points structured for short-form video formats
- **User Profile Management**: Track credits and subscription tiers
- **Mobile-First Design**: Optimized for Base App and mobile experiences
- **Farcaster Integration**: Native Farcaster frame support

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
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base (via OnchainKit)
- **Social**: Farcaster Frame SDK
- **AI**: OpenAI GPT-4
- **TypeScript**: Full type safety

## Project Structure

```
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   │   ├── users/      # User management
│   │   ├── idea-sessions/  # Idea generation
│   │   ├── scripts/    # Script generation
│   │   └── clips/      # Clip management
├── components/         # Reusable UI components
├── lib/               # Utilities, types, and database
├── public/            # Static assets and manifest
└── README.md
```

## API Documentation

### Users API

#### POST `/api/users`
Create or retrieve a user profile.

**Request Body:**
```json
{
  "userId": "string",
  "farcasterId": "string (optional)",
  "credits": 10,
  "subscriptionTier": "free"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "farcasterId": "string",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "credits": 10,
    "subscriptionTier": "free"
  }
}
```

#### GET `/api/users?userId={userId}`
Retrieve user profile by userId.

### Idea Sessions API

#### POST `/api/idea-sessions`
Generate video ideas using AI.

**Request Body:**
```json
{
  "userId": "string",
  "prompt": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "string",
    "userId": "string",
    "prompt": "string",
    "generatedIdeas": [...],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Scripts API

#### POST `/api/scripts`
Generate a video script from a selected idea.

**Request Body:**
```json
{
  "userId": "string",
  "ideaId": "string",
  "idea": {
    "id": "string",
    "title": "string",
    "description": "string",
    "platform": "tiktok|instagram|youtube|twitter",
    "estimatedDuration": "string",
    "tags": ["string"],
    "engagementPotential": "low|medium|high"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "scriptId": "string",
    "userId": "string",
    "ideaId": "string",
    "content": "string",
    "platformFormat": "string",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "talkingPoints": ["string"],
    "hooks": ["string"],
    "callToAction": "string"
  }
}
```

### Clips API

#### POST `/api/clips`
Create a new clip record (for future clip generation feature).

**Request Body:**
```json
{
  "userId": "string",
  "originalVideoUrl": "string",
  "clipUrl": "string",
  "platform": "string"
}
```

## Business Model

- **Micro-transactions**: Pay-per-clip generation ($0.10 per clip)
- **Subscription**: $5/month for 50 clips, $15/month for unlimited clips
- **Free tier**: Limited features with watermarked output

## Design System

The app uses a comprehensive design system with:

- **Colors**: Primary (purple), Secondary (gray), Accent (blue)
- **Typography**: Responsive text scales with proper hierarchy
- **Spacing**: Consistent spacing tokens (4px base grid)
- **Components**: Reusable UI components with variants
- **Motion**: Smooth animations with cubic-bezier easing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
