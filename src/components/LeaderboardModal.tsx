import React from 'react';
import { X, Trophy, Star, TrendingUp } from 'lucide-react';
import { LeaderboardEntry, RankProgress } from '../types/community';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaderboard: LeaderboardEntry[];
  userPosition: number;
  rankProgress: RankProgress;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  leaderboard,
  userPosition,
  rankProgress
}) => {
  const [showProgress, setShowProgress] = React.useState(false);

  if (!isOpen) return null;

  const rankColors = {
    gold: 'text-yellow-400',
    silver: 'text-gray-300',
    blue: 'text-blue-400',
    green: 'text-green-400',
    white: 'text-white'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl w-full max-w-2xl">
        <div className="p-6 border-b border-[#03ffc3]/20">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Trophy className="text-[#00ff3f]" />
              Community Leaderboard
            </h2>
            <button
              onClick={onClose}
              className="text-[#03ffc3]/60 hover:text-[#03ffc3] transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {showProgress ? (
            <div className="space-y-6">
              <button
                onClick={() => setShowProgress(false)}
                className="text-[#03ffc3]/60 hover:text-[#03ffc3] transition-colors"
              >
                ← Back to Leaderboard
              </button>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Your Journey to {rankProgress.nextRank || 'Top Rank'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Daily Login Score</span>
                      <span>{Math.round(rankProgress.dailyLoginProgress)}%</span>
                    </div>
                    <div className="h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00ff3f] rounded-full transition-all duration-500"
                        style={{ width: `${rankProgress.dailyLoginProgress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Community Engagement</span>
                      <span>{Math.round(rankProgress.engagementProgress)}%</span>
                    </div>
                    <div className="h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00ff3f] rounded-full transition-all duration-500"
                        style={{ width: `${rankProgress.engagementProgress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Subscription Status</span>
                      <span>{Math.round(rankProgress.subscriptionProgress)}%</span>
                    </div>
                    <div className="h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00ff3f] rounded-full transition-all duration-500"
                        style={{ width: `${rankProgress.subscriptionProgress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Community Badges</span>
                      <span>{Math.round(rankProgress.badgeProgress)}%</span>
                    </div>
                    <div className="h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00ff3f] rounded-full transition-all duration-500"
                        style={{ width: `${rankProgress.badgeProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-[#03ffc3]/10 rounded-lg">
                  <p className="text-sm">
                    Next rank check in {rankProgress.daysUntilRankCheck} days
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={`p-4 rounded-lg ${
                    entry.position === userPosition
                      ? 'bg-[#00ff3f]/10 border border-[#00ff3f]'
                      : 'bg-[#03ffc3]/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-[#00ff3f]">
                      #{entry.position}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{entry.username}</span>
                        <Star
                          size={16}
                          className={rankColors[entry.rank]}
                          fill="currentColor"
                        />
                      </div>
                      <div className="text-sm text-[#03ffc3]/60">
                        {entry.totalEngagements} engagements • {entry.badgesEarned} badges
                      </div>
                    </div>
                    {entry.position === userPosition && (
                      <button
                        onClick={() => setShowProgress(true)}
                        className="px-4 py-2 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                      >
                        <TrendingUp size={16} />
                        View Progress
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;