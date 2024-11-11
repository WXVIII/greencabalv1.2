import React from 'react';
import { Star, Calendar, Users, Trophy, Clock } from 'lucide-react';
import { RankProgress, CommunityRank } from '../types/community';

interface RankProgressCardProps {
  progress: RankProgress;
}

const rankColors: Record<CommunityRank, string> = {
  gold: 'text-yellow-400',
  silver: 'text-gray-300',
  blue: 'text-blue-400',
  green: 'text-green-400',
  white: 'text-white'
};

const RankProgressCard: React.FC<RankProgressCardProps> = ({ progress }) => {
  const {
    currentRank,
    nextRank,
    requirements,
    daysUntilCheck,
    dailyLoginProgress,
    engagementProgress,
    subscriptionProgress,
    badgeProgress
  } = progress;

  const metrics = [
    {
      icon: Calendar,
      label: 'Daily Login Score',
      progress: dailyLoginProgress,
      current: requirements.dailyLoginScore,
      required: requirements.requiredLogins,
      color: 'text-[#00ff3f]'
    },
    {
      icon: Users,
      label: 'Community Engagements',
      progress: engagementProgress,
      current: requirements.communityEngagements,
      required: requirements.requiredEngagements,
      color: 'text-[#03ffc3]'
    },
    {
      icon: Trophy,
      label: 'Badges Collected',
      progress: badgeProgress,
      current: requirements.badgesCollected,
      required: requirements.requiredBadges,
      color: 'text-[#00ff3f]'
    }
  ];

  return (
    <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className={rankColors[currentRank]} size={24} fill="currentColor" />
            Community Rank Progress
          </h2>
          <p className="text-[#03ffc3]/80 mt-1">
            {nextRank ? `Progress towards ${nextRank} rank` : 'Maximum rank achieved'}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-[#03ffc3]/60">
            <Clock size={16} />
            <span>{daysUntilCheck} days until rank check</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map(({ icon: Icon, label, progress, current, required, color }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Icon size={20} className={color} />
                <span className="text-sm">{label}</span>
              </div>
              <span className="text-sm text-[#03ffc3]/80">
                {current} / {required}
              </span>
            </div>
            <div className="h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} opacity-30 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {requirements.subscriptionMonths < 2 && (
        <div className="mt-4 p-3 bg-[#03ffc3]/10 rounded-lg text-sm text-[#03ffc3]/80">
          {requirements.subscriptionMonths === 0
            ? '2 months subscription required for rank eligibility'
            : '1 more month of subscription needed for rank eligibility'}
        </div>
      )}
    </div>
  );
};

export default RankProgressCard;