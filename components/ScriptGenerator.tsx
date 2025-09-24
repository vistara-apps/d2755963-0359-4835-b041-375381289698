'use client';

import { useState } from 'react';
import { FileText, Wand2, Copy, Download } from 'lucide-react';
import { VideoIdea, Script } from '@/lib/types';
import { generateScript } from '@/lib/openai';
import { cn } from '@/lib/utils';

interface ScriptGeneratorProps {
  selectedIdea?: VideoIdea | null;
}

export function ScriptGenerator({ selectedIdea }: ScriptGeneratorProps) {
  const [script, setScript] = useState<Script | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'hooks' | 'points'>('script');

  const handleGenerateScript = async () => {
    if (!selectedIdea) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/scripts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current-user', // In a real app, get from auth context
          ideaId: selectedIdea.id,
          idea: selectedIdea,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setScript(result.data);
      } else {
        console.error('Error generating script:', result.error);
      }
    } catch (error) {
      console.error('Error generating script:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadScript = () => {
    if (!script) return;
    
    const content = `${script.content}\n\nTalking Points:\n${script.talkingPoints.join('\n')}\n\nHooks:\n${script.hooks.join('\n')}\n\nCall to Action:\n${script.callToAction}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script-${script.scriptId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <FileText className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">Script Generator</h2>
      </div>

      {!selectedIdea ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Select an idea from the generator above to create a script
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Selected Idea:</h3>
            <p className="text-sm">{selectedIdea.title}</p>
          </div>

          <button
            onClick={handleGenerateScript}
            disabled={isGenerating}
            className="btn btn-primary w-full"
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Script...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Script
              </>
            )}
          </button>

          {script && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {(['script', 'hooks', 'points'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'px-3 py-2 text-sm rounded-md transition-colors',
                        activeTab === tab
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      {tab === 'script' && 'Full Script'}
                      {tab === 'hooks' && 'Hook Variations'}
                      {tab === 'points' && 'Talking Points'}
                    </button>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(
                      activeTab === 'script' ? script.content :
                      activeTab === 'hooks' ? script.hooks.join('\n\n') :
                      script.talkingPoints.join('\n')
                    )}
                    className="btn btn-outline p-2"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadScript}
                    className="btn btn-outline p-2"
                    title="Download script"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 min-h-[200px]">
                {activeTab === 'script' && (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {script.content}
                  </div>
                )}
                
                {activeTab === 'hooks' && (
                  <div className="space-y-4">
                    {script.hooks.map((hook, index) => (
                      <div key={index} className="p-3 bg-background rounded border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            Hook {index + 1}
                          </span>
                          <button
                            onClick={() => copyToClipboard(hook)}
                            className="text-xs text-primary hover:underline"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="text-sm">{hook}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'points' && (
                  <div className="space-y-2">
                    {script.talkingPoints.map((point, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-primary font-semibold text-sm mt-1">
                          {index + 1}.
                        </span>
                        <p className="text-sm">{point}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {script.callToAction && (
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Call to Action:</h4>
                  <p className="text-sm text-accent-foreground">{script.callToAction}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
