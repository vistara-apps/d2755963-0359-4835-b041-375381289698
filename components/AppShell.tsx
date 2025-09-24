'use client';

import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
  className?: string;
}

export function AppShell({ 
  children, 
  variant = 'default',
  className 
}: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen bg-background',
      variant === 'glass' && 'backdrop-blur-sm bg-background/80',
      className
    )}>
      <main className="relative">
        {children}
      </main>
    </div>
  );
}
