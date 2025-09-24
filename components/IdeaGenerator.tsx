'use client';

import { useState } from 'react';
import { Lightbulb, Sparkles, Copy, ChevronRight } from 'lucide-react';
import { VideoIdea } from '@/lib/types';
import { generateVideoIdeas } from '@/lib/openai';
import { cn } from '@/lib/utils';

interface IdeaGeneratorProps {
  onIdeaSelect?: (idea: VideoIdea) => void;
  onError?: (title: string, message?: string) => void;
  onSuccess?: (title: string, message?: string) => void;
}

export function IdeaGenerator({ onIdeaSelect, onError, onSuccess }: IdeaGeneratorProps) {
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
      onSuccess?.('Ideas Generated!', `Created ${generatedIdeas.length} viral content ideas for you.`);
    } catch (error) {
      console.error('Error generating ideas:', error);
      onError?.('Generation Failed', 'Unable to generate ideas. Please check your connection and try again.');
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
    navigator.clipboard.writeText(text).then(() => {
      onSuccess?.('Copied!', 'Idea copied to clipboard');
    }).catch(() => {
      onError?.('Copy Failed', 'Unable to copy to clipboard');
    });
  };

  return (
    <div className="card p-6 space-y-6 h-fit">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Idea Generator</h2>
          <p className="text-sm text-muted-foreground">Transform your concepts into viral content ideas</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-semibold mb-3 text-foreground">
            What topic or niche would you like ideas for?
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., fitness tips for busy professionals, cooking hacks, productivity apps..."
            className="textarea w-full"
            rows={4}
            aria-describedby="prompt-help"
          />
          <p id="prompt-help" className="text-xs text-muted-foreground mt-2">
            Be specific about your audience and content type for better results
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="btn btn-primary w-full"
          aria-label={isGenerating ? "Generating ideas" : "Generate new ideas"}
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Generating Ideas...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Ideas
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {ideas.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Generated Ideas</h3>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              {ideas.length} ideas
            </span>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {ideas.map((idea, index) => (
              <div
                key={idea.id}
                className={cn(
                  'p-4 border rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group animate-slide-up',
                  selectedIdea?.id === idea.id
                    ? 'border-primary bg-gradient-to-br from-primary/5 to-accent/5 shadow-md'
                    : 'border-border/50 hover:border-primary/30 hover:bg-primary/[0.02]'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleIdeaSelect(idea)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {idea.title}
                    </h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {idea.description}
                    </p>
                    
                    {/* Enhanced Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-accent/10 to-accent/20 text-accent text-xs rounded-full font-medium border border-accent/20">
                        {idea.platform}
                      </span>
                      <span className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full font-medium">
                        {idea.estimatedDuration}
                      </span>
                      <span className={cn(
                        'px-3 py-1 text-xs rounded-full font-medium',
                        idea.engagementPotential === 'high' && 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-200',
                        idea.engagementPotential === 'medium' && 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-200',
                        idea.engagementPotential === 'low' && 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200'
                      )}>
                        {idea.engagementPotential} viral potential
                      </span>
                    </div>
                    
                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.slice(0, 5).map((tag, index) => (
                        <span key={index} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                          #{tag}
                        </span>
                      ))}
                      {idea.tags.length > 5 && (
                        <span className="text-xs text-muted-foreground">
                          +{idea.tags.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyIdea(idea);
                      }}
                      className="p-2.5 hover:bg-muted rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Copy idea to clipboard"
                      aria-label="Copy idea to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <ChevronRight className={cn(
                      "w-5 h-5 transition-all duration-200",
                      selectedIdea?.id === idea.id ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isGenerating && ideas.length === 0 && (
        <div className="text-center py-8 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto">
            <Lightbulb className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Enter a topic above to generate viral content ideas
          </p>
        </div>
      )}
    </div>
  );
}
