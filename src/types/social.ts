export type Platform = 'facebook' | 'instagram' | 'x' | 'youtube' | 'tiktok';

export type EngagementType = 'like' | 'comment' | 'share' | 'retweet';

export interface EngagementStatus {
  success: boolean;
  platform: Platform;
  verified: boolean;
  engagementType?: EngagementType;
  error?: string;
}

export interface ConnectedPlatform {
  platform: Platform;
  username: string;
  connected: boolean;
  lastVerified?: Date;
}

export interface SocialProfile {
  userId: string;
  connectedPlatforms: ConnectedPlatform[];
  engagementCount: number;
  lastEngagement?: Date;
  discountPoints: number;
}

export interface DiscountInfo {
  totalPosts: number;
  discountPercentage: number;
  postsUntilNextPercent: number;
}