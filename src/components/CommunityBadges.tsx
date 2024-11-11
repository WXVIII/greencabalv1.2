import React from 'react';
import { Shield } from 'lucide-react';
import { CommunityBadgeType } from '../types/community';

interface BadgeProps {
  type: CommunityBadgeType;
  engagementCount?: number;
}

interface CommunityBadgesProps {
  badges: BadgeProps[];
  className?: string;
}

const getBadgeStyles = (type: CommunityBadgeType) => {
  const baseStyles = 'relative transform-gpu transition-all duration-300 hover:scale-110';
  const glowStyles = 'after:absolute after:inset-0 after:blur-sm after:opacity-50';
  
  switch (type) {
    case 'red':
      return `${baseStyles} ${glowStyles} text-red-500 after:bg-red-500`;
    case 'rose-gold':
      return `${baseStyles} ${glowStyles} text-rose-400 after:bg-rose-400 animate-pulse`;
    case 'silver':
      return `${baseStyles} ${glowStyles} text-gray-300 after:bg-gray-300 animate-pulse`;
    default:
      return baseStyles;
  }
};

const getTooltipText = (type: CommunityBadgeType) => {
  switch (type) {
    case 'red':
      return 'Needs Support (1 Badge Point)';
    case 'rose-gold':
      return 'Gold Star Creator (4 Badge Points)';
    case 'silver':
      return 'Silver Star Creator (2 Badge Points)';
    default:
      return '';
  }
};

const Badge: React.FC<BadgeProps> = ({ type, engagementCount }) => {
  return (
    <div className="group relative">
      <div className={getBadgeStyles(type)}>
        <Shield size={24} className="relative z-10" />
      </div>
      {engagementCount !== undefined && (
        <div className="absolute -top-2 -right-2 z-20">
          <span className="px-1.5 py-0.5 text-xs bg-[#022424] border border-[#03ffc3]/20 rounded-full">
            {engagementCount}
          </span>
        </div>
      )}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#022424] border border-[#03ffc3]/20 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30">
        {getTooltipText(type)}
      </div>
    </div>
  );
};

const CommunityBadges: React.FC<CommunityBadgesProps> = ({ badges, className = '' }) => {
  if (!badges.length) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {badges.map((badge, index) => (
        <Badge key={`${badge.type}-${index}`} {...badge} />
      ))}
    </div>
  );
};

export default CommunityBadges;