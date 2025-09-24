export interface User {
  userId: string;
  farcasterId?: string;
  createdAt: Date;
  credits: number;
  subscriptionTier: 'free' | 'basic' | 'premium';
}

export interface IdeaSession {
  sessionId: string;
  userId: string;
  prompt: string;
  generatedIdeas: VideoIdea[];
  createdAt: Date;
}

export interface VideoIdea {
  id: string;
  title: string;
  description: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'twitter';
  estimatedDuration: string;
  tags: string[];
  engagementPotential: 'low' | 'medium' | 'high';
}

export interface Script {
  scriptId: string;
  userId: string;
  ideaId: string;
  content: string;
  platformFormat: 'tiktok' | 'instagram' | 'youtube' | 'twitter';
  createdAt: Date;
  talkingPoints: string[];
  hooks: string[];
  callToAction: string;
}

export interface Clip {
  clipId: string;
  userId: string;
  originalVideoUrl: string;
  clipUrl: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'twitter';
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
