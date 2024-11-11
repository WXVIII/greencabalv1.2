import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Platform, EngagementType } from '../types/community';
import { useAuth } from '../context/AuthContext';

interface EngagementWindow {
  postId: string;
  types: Set<EngagementType>;
  startTime: Date;
}

export const useEngagement = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [engagementWindows] = useState<Map<string, EngagementWindow>>(new Map());
  const { user, addEngagement } = useAuth();

  const trackEngagement = useCallback(async (
    platform: Platform,
    postId: string,
    type: EngagementType
  ): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to engage with posts');
      return false;
    }

    setIsProcessing(true);
    try {
      const windowKey = `${user.id}-${postId}`;
      const now = new Date();
      const window = engagementWindows.get(windowKey);

      if (window) {
        // Check if within 6-hour window
        const hoursDiff = (now.getTime() - window.startTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff <= 6) {
          window.types.add(type);
          
          // Calculate engagement value
          let value = 0;
          if (window.types.size === 3) {
            value = 1; // All three types within 6 hours
          } else {
            window.types.forEach(t => {
              value += t === 'like' ? 0.5 : 1;
            });
          }
          
          await addEngagement(postId, type, value);
          toast.success('Engagement recorded successfully');
          return true;
        }
      }

      // Create new engagement window
      engagementWindows.set(windowKey, {
        postId,
        types: new Set([type]),
        startTime: now
      });

      const value = type === 'like' ? 0.5 : 1;
      await addEngagement(postId, type, value);
      toast.success('Engagement recorded successfully');
      return true;
    } catch (error) {
      toast.error('Failed to record engagement');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [user, addEngagement, engagementWindows]);

  return {
    trackEngagement,
    isProcessing
  };
};