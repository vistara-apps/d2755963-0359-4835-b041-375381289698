'use client';

import { useState } from 'react';
import { Lightbulb, Sparkles, Copy, ChevronRight } from 'lucide-react';
import { VideoIdea } from '@/lib/types';
import { generateVideoIdeas } from '@/lib/openai';
import { cn } from '@/lib/utils';

interface IdeaGeneratorProps {
  onIdeaSelect?: (idea: VideoIdea) => void;
}

export function IdeaGenerator({ onIdeaSelect }: IdeaGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<VideoIdea | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const generatedIdeas = await generateVideoIdeas(prompt);
      setIdeas(generatedIdeas);
    } catch (error) {
      console.error('Error generating ideas:', error);
      // Show error toast in real app
    } finally {
      setIsGenerating(false);
    }
  };

  const handleIdeaSelect = (idea: VideoIdea) => {
    setSelectedIdea(idea);
    onIdeaSelect?.(idea);
  };

  const copyIdea = (idea: VideoIdea) => {
    const text = `${idea.title}\n\n${idea.description}\n\nPlatform: ${idea.platform}\nDuration: ${idea.estimatedDuration}\nTags: ${idea.tags.join(', ')}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Lightbulb className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">AI Idea Generator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium mb-2">
            What topic or niche would you like ideas for?
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., fitness tips for busy professionals, cooking hacks, productivity apps..."
            className="textarea w-full"
            rows={3}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="btn btn-primary w-full"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Generating Ideas...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Ideas
            </>
          )}
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generated Ideas</h3>
          <div className="space-y-3">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className={cn(
                  'p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md',
                  selectedIdea?.id === idea.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
                onClick={() => handleIdeaSelect(idea)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{idea.title}</h4>
                    <p className="text-muted-foreground mb-3">{idea.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                        {idea.platform}
                      </span>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        {idea.estimatedDuration}
                      </span>
                      <span className={cn(
                        'px-2 py-1 text-xs rounded-full',
                        idea.engagementPotential === 'high' && 'bg-green-100 text-green-800',
                        idea.engagementPotential === 'medium' && 'bg-yellow-100 text-yellow-800',
                        idea.engagementPotential === 'low' && 'bg-gray-100 text-gray-800'
                      )}>
                        {idea.engagementPotential} engagement
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.map((tag, index) => (
                        <span key={index} className="text-xs text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyIdea(idea);
                      }}
                      className="p-2 hover:bg-muted rounded-md transition-colors"
                      title="Copy idea"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
