import React from 'react';
import { Star } from 'lucide-react';
import { CommunityRank } from '../types/community';

interface CommunityRankBadgeProps {
  rank: CommunityRank;
  className?: string;
}

const rankConfig: Record<CommunityRank, { color: string; label: string }> = {
  gold: { color: 'text-yellow-400', label: 'Legendary Star' },
  silver: { color: 'text-gray-300', label: 'Brilliant Star' },
  blue: { color: 'text-blue-400', label: 'Shining Star' },
  green: { color: 'text-green-400', label: 'Growing Star' },
  white: { color: 'text-white', label: 'Rising Star' }
};

const CommunityRankBadge: React.FC<CommunityRankBadgeProps> = ({ rank, className = '' }) => {
  const { color, label } = rankConfig[rank];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <Star className={`${color} animate-pulse`} size={20} fill="currentColor" />
      <span className={`text-sm font-medium ${color}`}>{label}</span>
    </div>
  );
};

export default CommunityRankBadge;