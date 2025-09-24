import { AppShell } from '@/components/AppShell';
import { IdeaGenerator } from '@/components/IdeaGenerator';
import { ScriptGenerator } from '@/components/ScriptGenerator';
import { UserProfile } from '@/components/UserProfile';

export default function HomePage() {
  return (
    <AppShell>
      <div className="container py-6 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            ContentSpark AI
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate viral video content and social clips effortlessly
          </p>
        </header>

        <UserProfile />
        
        <div className="space-y-6">
          <IdeaGenerator />
          <ScriptGenerator />
        </div>
      </div>
    </AppShell>
  );
}
