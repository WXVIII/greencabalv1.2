export type Platform = 'facebook' | 'instagram' | 'x' | 'youtube' | 'tiktok';
export type EngagementType = 'like' | 'comment' | 'share';
export type CommunityRank = 'white' | 'green' | 'blue' | 'silver' | 'gold';
export type CommunityBadgeType = 'red' | 'rose-gold' | 'silver';

export interface Engagement {
  userId: string;
  postId: string;
  type: EngagementType;
  timestamp: Date;
  platform: Platform;
  verified: boolean;
}

export interface EngagementStatus {
  success: boolean;
  error?: string;
  platform: Platform;
  verified: boolean;
  engagementType?: EngagementType;
}

export interface ConnectedPlatform {
  platform: Platform;
  username: string;
  connected: boolean;
  lastVerified?: Date;
}

export interface CommunityBadge {
  type: CommunityBadgeType;
  engagementCount?: number;
  weight: number;
}

export interface RankRequirement {
  dailyLoginScore: number;
  engagementCount: number;
  subscriptionMonths: number;
  badgeCount: number;
}

export interface RankProgress {
  currentRank: CommunityRank;
  nextRank: CommunityRank | null;
  requirements: {
    dailyLoginScore: number;
    requiredLogins: number;
    communityEngagements: number;
    requiredEngagements: number;
    subscriptionMonths: number;
    requiredBadges: number;
    badgesCollected: number;
  };
  daysUntilCheck: number;
  dailyLoginProgress: number;
  engagementProgress: number;
  subscriptionProgress: number;
  badgeProgress: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  rank: CommunityRank;
  totalEngagements: number;
  badgesEarned: number;
  position: number;
}

export interface FeaturedPost {
  id: string;
  userId: string;
  username: string;
  platform: Platform;
  url: string;
  thumbnail: string;
  title: string;
  isPaid: boolean;
  creatorRank?: 'gold' | 'silver';
  startDate: Date;
  endDate: Date;
}

export interface EngagedPost {
  id: number;
  username: string;
  platform: Platform;
  url: string;
  thumbnail: string;
  engagements: {
    liked: boolean;
    commented: boolean;
    shared: boolean;
  };
  engagedAt: string;
  badges: {
    type: CommunityBadgeType;
    engagementCount?: number;
  }[];
}

export const BADGE_WEIGHTS = {
  'rose-gold': 4,
  'silver': 2,
  'red': 1
} as const;