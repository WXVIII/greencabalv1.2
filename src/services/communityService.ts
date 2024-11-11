import { CommunityRank, RankProgress, RankRequirement } from '../types/community';

const RANK_REQUIREMENTS: Record<CommunityRank, RankRequirement> = {
  gold: {
    dailyLoginScore: 57, // Out of 60 days
    engagementCount: 1800,
    subscriptionMonths: 2,
    badgeCount: 600
  },
  silver: {
    dailyLoginScore: 46, // Out of 60 days
    engagementCount: 1440,
    subscriptionMonths: 2,
    badgeCount: 480
  },
  blue: {
    dailyLoginScore: 37, // Out of 60 days
    engagementCount: 1152,
    subscriptionMonths: 2,
    badgeCount: 384
  },
  green: {
    dailyLoginScore: 30, // Out of 60 days
    engagementCount: 922,
    subscriptionMonths: 2,
    badgeCount: 307
  },
  white: {
    dailyLoginScore: 24, // Out of 60 days
    engagementCount: 738,
    subscriptionMonths: 2,
    badgeCount: 246
  }
};

const RANKS: CommunityRank[] = ['gold', 'silver', 'blue', 'green', 'white'];

export class CommunityService {
  static getDefaultRankProgress(): RankProgress {
    return {
      currentRank: 'white',
      nextRank: 'green',
      requirements: {
        dailyLoginScore: 0,
        requiredLogins: RANK_REQUIREMENTS.white.dailyLoginScore,
        communityEngagements: 0,
        requiredEngagements: RANK_REQUIREMENTS.white.engagementCount,
        subscriptionMonths: 0,
        requiredBadges: RANK_REQUIREMENTS.white.badgeCount,
        badgesCollected: 0
      },
      daysUntilCheck: 60,
      dailyLoginProgress: 0,
      engagementProgress: 0,
      subscriptionProgress: 0,
      badgeProgress: 0
    };
  }

  static calculateRankProgress(
    dailyLogins: number,
    totalEngagements: number,
    subscriptionMonths: number,
    badgesCollected: number,
    lastLoginDate: Date
  ): RankProgress {
    // Calculate daily login score for last 60 days
    const now = new Date();
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const recentLogins = dailyLogins > 60 ? 60 : dailyLogins;

    // Find current rank based on metrics
    const currentRank = RANKS.find(rank => {
      const req = RANK_REQUIREMENTS[rank];
      return (
        recentLogins >= req.dailyLoginScore &&
        totalEngagements >= req.engagementCount &&
        subscriptionMonths >= req.subscriptionMonths &&
        badgesCollected >= req.badgeCount
      );
    }) || 'white';

    // Find next rank
    const currentRankIndex = RANKS.indexOf(currentRank);
    const nextRank = currentRankIndex > 0 ? RANKS[currentRankIndex - 1] : null;

    // Calculate days until next rank check
    const daysSinceLastLogin = Math.floor(
      (now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysUntilCheck = Math.max(0, 60 - daysSinceLastLogin);

    // Get requirements for next rank or current rank if at top
    const targetRank = nextRank || currentRank;
    const requirements = RANK_REQUIREMENTS[targetRank];

    // Calculate progress percentages
    const dailyLoginProgress = (recentLogins / requirements.dailyLoginScore) * 100;
    const engagementProgress = (totalEngagements / requirements.engagementCount) * 100;
    const subscriptionProgress = (subscriptionMonths / requirements.subscriptionMonths) * 100;
    const badgeProgress = (badgesCollected / requirements.badgeCount) * 100;

    return {
      currentRank,
      nextRank,
      requirements: {
        dailyLoginScore: recentLogins,
        requiredLogins: requirements.dailyLoginScore,
        communityEngagements: totalEngagements,
        requiredEngagements: requirements.engagementCount,
        subscriptionMonths,
        requiredBadges: requirements.badgeCount,
        badgesCollected
      },
      daysUntilCheck,
      dailyLoginProgress: Math.min(dailyLoginProgress, 100),
      engagementProgress: Math.min(engagementProgress, 100),
      subscriptionProgress: Math.min(subscriptionProgress, 100),
      badgeProgress: Math.min(badgeProgress, 100)
    };
  }

  static getUserLeaderboardPosition(userId: string): number {
    // Mock implementation - in a real app, this would query the backend
    return Math.floor(Math.random() * 1000) + 1;
  }

  static calculateEngagementValue(type: 'like' | 'comment' | 'share'): number {
    switch (type) {
      case 'like':
        return 0.5;
      case 'comment':
      case 'share':
        return 1;
      default:
        return 0;
    }
  }

  static isWithinEngagementWindow(
    existingEngagements: Map<string, Set<string>>,
    postId: string,
    timestamp: Date
  ): boolean {
    const sixHoursAgo = new Date(timestamp.getTime() - 6 * 60 * 60 * 1000);
    const engagements = existingEngagements.get(postId);
    
    if (!engagements) return true;

    // In a real implementation, we would check timestamps of previous engagements
    // For now, just check if we have any engagements
    return engagements.size === 0;
  }
}