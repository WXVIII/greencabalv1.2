import { useState, useCallback } from 'react';
import { SocialTracker } from '../services/socialTracker';
import { Platform, EngagementType, EngagementStatus } from '../types/social';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export const useSocialTracking = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastStatus, setLastStatus] = useState<EngagementStatus | null>(null);
  const { user, addDiscountPoint } = useAuth();

  const trackEngagement = useCallback(async (
    platform: Platform,
    postUrl: string,
    engagementType: EngagementType
  ): Promise<EngagementStatus> => {
    if (!user?.id) {
      const status = {
        success: false,
        error: 'Please sign in to engage with posts',
        platform,
        verified: false
      };
      toast.error(status.error);
      return status;
    }

    // Check if platform is connected
    const connectedPlatform = user.connectedPlatforms.find(p => p.platform === platform);
    if (!connectedPlatform) {
      const status = {
        success: false,
        error: `Please connect your ${platform} account first`,
        platform,
        verified: false
      };
      toast.error(status.error);
      return status;
    }

    setIsVerifying(true);
    try {
      const status = await SocialTracker.trackEngagement({
        platform,
        postUrl,
        engagementType,
        userId: user.id
      });

      if (status.success) {
        // Add discount point for each engagement after the daily minimum (5)
        if (user.discountPoints >= 5) {
          addDiscountPoint();
          toast.success('Engagement verified! Earned 1 discount point.');
        } else {
          toast.success('Engagement verified!');
        }
      } else {
        toast.error(status.error || 'Failed to verify engagement');
      }

      setLastStatus(status);
      return status;
    } catch (error) {
      const errorStatus = {
        success: false,
        error: 'Failed to track engagement. Please try again.',
        platform,
        verified: false
      };
      toast.error(errorStatus.error);
      setLastStatus(errorStatus);
      return errorStatus;
    } finally {
      setIsVerifying(false);
    }
  }, [user, addDiscountPoint]);

  return {
    trackEngagement,
    isVerifying,
    lastStatus
  };
};