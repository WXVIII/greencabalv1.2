import React, { createContext, useContext, useState } from 'react';
import { Platform, ConnectedPlatform, DiscountInfo, CommunityRank, RankProgress, CommunityBadge, EngagementType } from '../types/community';
import { CommunityService } from '../services/communityService';

interface User {
  id: string;
  email: string;
  username?: string;
  connectedPlatforms: ConnectedPlatform[];
  discountPoints: number;
  badges: CommunityBadge[];
  dailyLogins: Date[];
  totalEngagements: number;
  subscriptionMonths: number;
  lastLoginDate: Date;
  engagements: Map<string, Set<EngagementType>>;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  connectPlatform: (platform: Platform) => Promise<boolean>;
  disconnectPlatform: (platform: Platform) => void;
  addDiscountPoint: () => void;
  getDiscountInfo: () => DiscountInfo;
  getRankProgress: () => RankProgress;
  getLeaderboardPosition: () => number;
  addEngagement: (postId: string, type: EngagementType, value: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: Partial<User>) => {
    const now = new Date();
    setIsAuthenticated(true);
    setUser({
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      email: userData.email || '',
      username: userData.username,
      connectedPlatforms: [],
      discountPoints: userData.discountPoints || 0,
      badges: [],
      dailyLogins: [now],
      totalEngagements: 0,
      subscriptionMonths: 0,
      lastLoginDate: now,
      engagements: new Map()
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const connectPlatform = async (platform: Platform): Promise<boolean> => {
    if (!user) return false;

    const newPlatform: ConnectedPlatform = {
      platform,
      username: `${platform}_user`,
      connected: true,
      lastVerified: new Date()
    };

    setUser(prev => {
      if (!prev) return null;
      const updatedPlatforms = [...prev.connectedPlatforms.filter(p => p.platform !== platform), newPlatform];
      return { ...prev, connectedPlatforms: updatedPlatforms };
    });

    return true;
  };

  const disconnectPlatform = (platform: Platform) => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        connectedPlatforms: prev.connectedPlatforms.filter(p => p.platform !== platform)
      };
    });
  };

  const addDiscountPoint = () => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        discountPoints: prev.discountPoints + 1
      };
    });
  };

  const getDiscountInfo = (): DiscountInfo => {
    if (!user) return { totalPosts: 0, discountPercentage: 0, postsUntilNextPercent: 20 };

    const totalPosts = user.discountPoints;
    const discountPercentage = Math.min(Math.floor(totalPosts / 20), 50);
    const postsUntilNextPercent = discountPercentage >= 50 ? 
      0 : 
      20 - (totalPosts % 20);

    return {
      totalPosts,
      discountPercentage,
      postsUntilNextPercent
    };
  };

  const getRankProgress = (): RankProgress => {
    if (!user) {
      return CommunityService.getDefaultRankProgress();
    }

    return CommunityService.calculateRankProgress(
      user.dailyLogins.length,
      user.totalEngagements,
      user.subscriptionMonths,
      user.badges.length,
      user.lastLoginDate
    );
  };

  const getLeaderboardPosition = (): number => {
    return CommunityService.getUserLeaderboardPosition(user?.id || '');
  };

  const addEngagement = async (postId: string, type: EngagementType, value: number) => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return null;

      const engagements = new Map(prev.engagements);
      const postEngagements = engagements.get(postId) || new Set();
      
      if (CommunityService.isWithinEngagementWindow(engagements, postId, new Date())) {
        postEngagements.add(type);
        engagements.set(postId, postEngagements);

        return {
          ...prev,
          totalEngagements: prev.totalEngagements + value,
          engagements
        };
      }

      return prev;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      connectPlatform, 
      disconnectPlatform,
      addDiscountPoint,
      getDiscountInfo,
      getRankProgress,
      getLeaderboardPosition,
      addEngagement
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};