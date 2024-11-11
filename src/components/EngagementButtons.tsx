import React from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { useEngagement } from '../hooks/useEngagement';
import { Platform, EngagementType } from '../types/community';

interface EngagementButtonsProps {
  postId: string;
  platform: Platform;
  engagements: {
    type: EngagementType;
    count: number;
  }[];
  userEngagements?: Set<EngagementType>;
  className?: string;
}

const EngagementButtons: React.FC<EngagementButtonsProps> = ({
  postId,
  platform,
  engagements,
  userEngagements = new Set(),
  className = ''
}) => {
  const { trackEngagement, isProcessing } = useEngagement();

  const handleEngagement = async (type: EngagementType) => {
    if (isProcessing) return;
    await trackEngagement(platform, postId, type);
  };

  const buttons = [
    {
      type: 'like' as EngagementType,
      icon: ThumbsUp,
      label: 'Like',
      value: 0.5
    },
    {
      type: 'comment' as EngagementType,
      icon: MessageCircle,
      label: 'Comment',
      value: 1
    },
    {
      type: 'share' as EngagementType,
      icon: Share2,
      label: 'Share',
      value: 1
    }
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {buttons.map(({ type, icon: Icon, label, value }) => {
        const engagement = engagements.find(e => e.type === type);
        const isEngaged = userEngagements.has(type);

        return (
          <button
            key={type}
            onClick={() => handleEngagement(type)}
            disabled={isProcessing || isEngaged}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              isEngaged
                ? 'bg-[#00ff3f]/20 text-[#00ff3f]'
                : 'hover:bg-[#03ffc3]/10'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
            {engagement && (
              <span className="text-sm text-[#03ffc3]/60">
                {engagement.count}
              </span>
            )}
            <span className="text-xs text-[#03ffc3]/40">
              (+{value})
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default EngagementButtons;