'use client';

import { useState } from 'react';
import { FileText, Wand2, Copy, Download } from 'lucide-react';
import { VideoIdea, Script } from '@/lib/types';
import { generateScript } from '@/lib/openai';
import { cn } from '@/lib/utils';

interface ScriptGeneratorProps {
  selectedIdea?: VideoIdea | null;
  onError?: (title: string, message?: string) => void;
  onSuccess?: (title: string, message?: string) => void;
}

export function ScriptGenerator({ selectedIdea, onError, onSuccess }: ScriptGeneratorProps) {
  const [script, setScript] = useState<Script | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'hooks' | 'points'>('script');

  const handleGenerateScript = async () => {
    if (!selectedIdea) return;
    
    setIsGenerating(true);
    try {
      const generatedScript = await generateScript(selectedIdea);
      const scriptData: Script = {
        scriptId: `script-${Date.now()}`,
        userId: 'current-user',
        ideaId: selectedIdea.id,
        platformFormat: selectedIdea.platform,
        createdAt: new Date(),
        ...generatedScript,
      };
      setScript(scriptData);
      onSuccess?.('Script Generated!', 'Your professional script is ready to use.');
    } catch (error) {
      console.error('Error generating script:', error);
      onError?.('Script Generation Failed', 'Unable to generate script. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      onSuccess?.('Copied!', 'Content copied to clipboard');
    }).catch(() => {
      onError?.('Copy Failed', 'Unable to copy to clipboard');
    });
  };

  const downloadScript = () => {
    if (!script) return;
    
    try {
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
      onSuccess?.('Downloaded!', 'Script saved to your device');
    } catch (error) {
      onError?.('Download Failed', 'Unable to download script');
    }
  };

  return (
    <div className="card p-6 space-y-6 h-fit">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Script Generator</h2>
          <p className="text-sm text-muted-foreground">Create engaging scripts from your ideas</p>
        </div>
      </div>

      {!selectedIdea ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center mx-auto">
            <FileText className="w-10 h-10 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Ready to Create Scripts</h3>
            <p className="text-muted-foreground text-sm">
              Select an idea from the generator to create professional scripts
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span>Waiting for idea selection</span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected Idea Display */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Wand2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Selected Idea:</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedIdea.title}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {selectedIdea.platform}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                    {selectedIdea.estimatedDuration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateScript}
            disabled={isGenerating}
            className="btn btn-gradient-accent w-full"
            aria-label={isGenerating ? "Generating script" : "Generate script from selected idea"}
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Script...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Script
              </>
            )}
          </button>

          {/* Script Results */}
          {script && (
            <div className="space-y-6 animate-fade-in">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-1 p-1 bg-muted/50 rounded-xl">
                  {(['script', 'hooks', 'points'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                        activeTab === tab
                          ? 'bg-background text-primary shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                      )}
                    >
                      {tab === 'script' && 'Full Script'}
                      {tab === 'hooks' && 'Hook Variations'}
                      {tab === 'points' && 'Talking Points'}
                    </button>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(
                      activeTab === 'script' ? script.content :
                      activeTab === 'hooks' ? script.hooks.join('\n\n') :
                      script.talkingPoints.join('\n')
                    )}
                    className="btn btn-outline p-2"
                    title="Copy to clipboard"
                    aria-label="Copy content to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadScript}
                    className="btn btn-outline p-2"
                    title="Download script"
                    aria-label="Download complete script"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content Display */}
              <div className="bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm rounded-2xl p-6 min-h-[250px] border border-border/50">
                {activeTab === 'script' && (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {script.content}
                  </div>
                )}
                
                {activeTab === 'hooks' && (
                  <div className="space-y-4">
                    {script.hooks.map((hook, index) => (
                      <div key={index} className="p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/30 group hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                            Hook Option {index + 1}
                          </span>
                          <button
                            onClick={() => copyToClipboard(hook)}
                            className="text-xs text-primary hover:text-primary/80 font-medium opacity-0 group-hover:opacity-100 transition-all duration-200"
                            aria-label={`Copy hook ${index + 1}`}
                          >
                            Copy
                          </button>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{hook}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'points' && (
                  <div className="space-y-3">
                    {script.talkingPoints.map((point, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-muted/30 transition-colors duration-200">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Call to Action */}
              {script.callToAction && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-primary/10 border border-accent/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <Wand2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Call to Action:</h4>
                      <p className="text-sm text-foreground leading-relaxed">{script.callToAction}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
