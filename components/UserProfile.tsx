'use client';

import { useState, useEffect } from 'react';
// import { useMiniKit } from '@coinbase/minikit';
import { User, CreditCard, Settings, Crown, Zap, TrendingUp } from 'lucide-react';
import { User as UserType } from '@/lib/types';

export function UserProfile() {
  // const { context } = useMiniKit();
  const context = { user: { displayName: 'Alex Creator', username: 'alexcreator', fid: '123' } };
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
          credits: 15, // Free tier starts with 15 credits
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

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'basic':
        return <Zap className="w-4 h-4 text-blue-500" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium':
        return 'from-yellow-400 to-orange-500';
      case 'basic':
        return 'from-blue-400 to-purple-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse flex items-center space-x-4">
          <div className="w-16 h-16 bg-muted rounded-2xl shimmer"></div>
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-muted rounded-lg w-1/3 shimmer"></div>
            <div className="h-4 bg-muted rounded-lg w-1/4 shimmer"></div>
          </div>
          <div className="space-y-2">
            <div className="h-8 w-20 bg-muted rounded-lg shimmer"></div>
            <div className="h-6 w-16 bg-muted rounded-lg shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card p-6 text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-destructive" />
        </div>
        <p className="text-muted-foreground">Unable to load user profile</p>
        <button className="btn btn-primary mt-4">Retry</button>
      </div>
    );
  }

  const displayName = context?.user?.displayName || 'Creator';
  const username = context?.user?.username || 'guest';

  return (
    <div className="card p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Enhanced Avatar */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getTierColor(user.subscriptionTier)} p-0.5`}>
              <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl text-foreground">{displayName}</h3>
              <p className="text-sm text-muted-foreground flex items-center space-x-1">
                <span>@{username}</span>
                {getTierIcon(user.subscriptionTier)}
              </p>
            </div>
          </div>
          
          {/* Credit Display */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-2xl text-foreground">{user.credits}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium capitalize flex items-center space-x-1">
                {getTierIcon(user.subscriptionTier)}
                <span>{user.subscriptionTier} tier</span>
              </p>
            </div>
            
            {/* Settings Button */}
            <button 
              className="btn btn-outline p-3 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
              aria-label="User settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar for Credits */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Credits used this month</span>
            <span>{Math.max(0, 50 - user.credits)}/50</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.max(0, (50 - user.credits) / 50 * 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Action Cards */}
        {user.credits < 10 && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-primary/10 border border-accent/20">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-foreground mb-1">
                  Credits running low!
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Upgrade your plan to keep creating amazing content without interruption.
                </p>
                <button className="btn btn-gradient-accent text-xs h-8 px-4">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}
        
        {user.subscriptionTier === 'free' && user.credits >= 10 && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Unlock Premium Features</h4>
                  <p className="text-xs text-muted-foreground">Unlimited credits, priority support & more</p>
                </div>
              </div>
              <button className="btn btn-primary text-xs h-8 px-4">
                Upgrade
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
