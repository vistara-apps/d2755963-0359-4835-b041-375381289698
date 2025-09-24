'use client';

import { useState, useEffect } from 'react';
import { useFrame } from '@farcaster/frame-sdk';
import { User, CreditCard, Settings } from 'lucide-react';
import { User as UserType } from '@/lib/types';

export function UserProfile() {
  const { context } = useFrame();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate user data loading
    const loadUser = async () => {
      try {
        // In a real app, this would fetch from your API
        const userData: UserType = {
          userId: context?.user?.fid?.toString() || 'guest',
          farcasterId: context?.user?.fid?.toString(),
          createdAt: new Date(),
          credits: 10, // Free tier starts with 10 credits
          subscriptionTier: 'free',
        };
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [context]);

  if (isLoading) {
    return (
      <div className="card p-4">
        <div className="animate-pulse flex items-center space-x-4">
          <div className="w-12 h-12 bg-muted rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card p-4 text-center">
        <p className="text-muted-foreground">Unable to load user profile</p>
      </div>
    );
  }

  const displayName = context?.user?.displayName || 'Creator';
  const username = context?.user?.username || 'guest';

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{displayName}</h3>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <CreditCard className="w-4 h-4 text-accent" />
              <span className="font-semibold">{user.credits}</span>
            </div>
            <p className="text-xs text-muted-foreground capitalize">
              {user.subscriptionTier} tier
            </p>
          </div>
          
          <button className="btn btn-outline p-2">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {user.credits < 5 && (
        <div className="mt-4 p-3 bg-accent/10 rounded-md">
          <p className="text-sm text-accent-foreground">
            Running low on credits! Upgrade to continue creating amazing content.
          </p>
          <button className="btn btn-primary mt-2 text-xs">
            Upgrade Plan
          </button>
        </div>
      )}
    </div>
  );
}
