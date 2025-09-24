'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { IdeaGenerator } from '@/components/IdeaGenerator';
import { ScriptGenerator } from '@/components/ScriptGenerator';
import { UserProfile } from '@/components/UserProfile';
import { ToastContainer, useToast } from '@/components/Toast';
import { VideoIdea } from '@/lib/types';
import { Sparkles, Zap, Users } from 'lucide-react';

export default function HomePage() {
  const [selectedIdea, setSelectedIdea] = useState<VideoIdea | null>(null);
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast();

  const handleIdeaSelect = (idea: VideoIdea) => {
    setSelectedIdea(idea);
    showSuccess('Idea Selected', `Ready to generate script for: ${idea.title}`);
  };

  return (
    <AppShell>
      <div className="container py-8 space-y-8">
        {/* Hero Section */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-primary to-accent">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold gradient-text">
              ContentSpark AI
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into viral content with AI-powered video scripts and social media clips
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Lightning Fast Generation</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/10">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Viral Content Strategies</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-muted/20 border border-secondary/20">
              <Sparkles className="w-5 h-5 text-secondary-foreground" />
              <span className="text-sm font-medium">Multi-Platform Ready</span>
            </div>
          </div>
        </header>

        {/* User Profile */}
        <div className="animate-slide-up">
          <UserProfile />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <IdeaGenerator 
              onIdeaSelect={handleIdeaSelect}
              onError={showError}
              onSuccess={showSuccess}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <ScriptGenerator 
              selectedIdea={selectedIdea}
              onError={showError}
              onSuccess={showSuccess}
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </AppShell>
  );
}
