import React, { useState } from 'react';
import { Users, ThumbsUp, TrendingUp, Percent, Trophy, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import SubscriptionStatus from '../components/SubscriptionStatus';
import PostList from '../components/PostList';
import LeaderboardModal from '../components/LeaderboardModal';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('today');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock leaderboard data - In a real app, fetch from backend
  const [leaderboardData] = useState({
    leaderboard: [
      {
        userId: 'user1',
        username: '@topstar',
        rank: 'gold' as const,
        totalEngagements: 2500,
        badgesEarned: 750,
        position: 1
      },
      {
        userId: 'user2',
        username: '@rising_creator',
        rank: 'silver' as const,
        totalEngagements: 1800,
        badgesEarned: 500,
        position: 2
      }
    ],
    userPosition: 45
  });

  // Mock rank progress - In a real app, fetch from backend
  const [rankProgress] = useState({
    currentRank: 'white' as const,
    nextRank: 'green' as const,
    dailyLoginProgress: 75,
    engagementProgress: 60,
    subscriptionProgress: 100,
    badgeProgress: 45,
    daysUntilRankCheck: 15
  });

  const stats = [
    {
      icon: Users,
      label: 'Community Reach',
      value: '2.4K',
      trend: '+12%',
      color: 'text-[#00ff3f]'
    },
    {
      icon: ThumbsUp,
      label: 'Engagements Made',
      value: '156',
      trend: '+8%',
      color: 'text-[#03ffc3]'
    },
    {
      icon: TrendingUp,
      label: 'Engagement Rate',
      value: '24%',
      trend: '+5%',
      color: 'text-[#00ff3f]'
    },
    {
      icon: Percent,
      label: 'Discount Earned',
      value: '12%',
      trend: '8 to next %',
      color: 'text-[#03ffc3]'
    }
  ];

  const subscriptionData = {
    daysRemaining: 23,
    totalDays: 30,
    nextBillingDate: '2024-04-15',
    isExpiringSoon: false,
    isExpired: false
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-[#03ffc3]/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className={`${
            isMenuOpen 
              ? 'absolute top-20 right-4 bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-4 shadow-lg z-50' 
              : 'hidden'
          } md:block md:relative md:top-0 md:right-0 md:bg-transparent md:border-none md:p-0 md:shadow-none`}>
            <div className="flex flex-col md:flex-row gap-2">
              {['overview', 'engaged', 'posts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    activeTab === tab
                      ? 'bg-[#00ff3f] text-[#022424]'
                      : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
                  }`}
                >
                  {tab === 'posts' ? 'My Posts' : tab}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setIsLeaderboardOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Trophy size={20} />
            <span>Leaderboard</span>
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <DashboardStats stats={stats} />
          <SubscriptionStatus
            {...subscriptionData}
            onRenew={() => navigate('/payment')}
          />
        </>
      )}

      {activeTab === 'engaged' && (
        <PostList
          posts={[]}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          type="engaged"
        />
      )}

      {activeTab === 'posts' && (
        <PostList
          posts={[]}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          type="my-posts"
        />
      )}

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        leaderboard={leaderboardData.leaderboard}
        userPosition={leaderboardData.userPosition}
        rankProgress={rankProgress}
      />
    </div>
  );
};

export default Dashboard;