import React, { useState } from 'react';
import { Camera, Instagram, Youtube, Facebook, Percent, Mail, Bell, Shield, ExternalLink, Check, X as XMark, Trophy, Star } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Platform } from '../types/community';
import { toast } from 'react-hot-toast';
import XIcon from '../components/icons/XIcon';
import RankProgressCard from '../components/RankProgressCard';
import CommunityRankBadge from '../components/CommunityRankBadge';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState({
    engagement: true,
    community: false,
    marketing: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const { user, connectPlatform, disconnectPlatform, getDiscountInfo, getRankProgress, getLeaderboardPosition } = useAuth();
  const discountInfo = getDiscountInfo();
  const rankProgress = getRankProgress();
  const leaderboardPosition = getLeaderboardPosition();

  const platforms = [
    { id: 'facebook' as Platform, name: 'Facebook', icon: Facebook },
    { id: 'instagram' as Platform, name: 'Instagram', icon: Instagram },
    { id: 'x' as Platform, name: 'X', icon: XIcon },
    { id: 'youtube' as Platform, name: 'YouTube', icon: Youtube },
    { id: 'tiktok' as Platform, name: 'TikTok', icon: FaTiktok },
  ];

  const handleConnect = async (platform: Platform) => {
    if (isConnecting) return;

    const isConnected = user?.connectedPlatforms.some(p => p.platform === platform);
    if (isConnected) {
      disconnectPlatform(platform);
      toast.success(`Disconnected ${platform} account`);
      return;
    }

    setIsConnecting(true);
    try {
      const success = await connectPlatform(platform);
      if (success) {
        toast.success(`Connected ${platform} account successfully`);
      } else {
        toast.error(`Failed to connect ${platform} account`);
      }
    } catch (error) {
      toast.error(`Error connecting ${platform} account`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#00ff3f]"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-[#022424] rounded-full border border-[#03ffc3]/20">
            <Camera size={20} />
          </button>
        </div>
        <div className="mt-4 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">@{user?.username || 'username'}</h1>
          <div className="flex items-center gap-3">
            <CommunityRankBadge rank={rankProgress.currentRank} />
            <span className="text-[#03ffc3]/60">•</span>
            <div className="flex items-center gap-1 text-[#03ffc3]/80">
              <Trophy size={16} className="text-[#00ff3f]" />
              <span>#{leaderboardPosition} on leaderboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'profile'
              ? 'bg-[#00ff3f] text-[#022424]'
              : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#00ff3f] text-[#022424]'
              : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
          }`}
        >
          Settings
        </button>
      </div>

      <div className="grid gap-6">
        {/* Rank Progress Card - Always visible */}
        <RankProgressCard progress={rankProgress} />

        {/* Discount Progress - Always visible */}
        {discountInfo.totalPosts >= 5 && (
          <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Percent size={24} className="text-[#00ff3f]" />
                  Subscription Discount Progress
                </h2>
                <p className="text-[#03ffc3]/80 mt-1">
                  {discountInfo.discountPercentage}% discount earned
                </p>
              </div>
              {discountInfo.discountPercentage < 50 && (
                <div className="text-right">
                  <p className="text-sm text-[#03ffc3]/60">
                    {discountInfo.postsUntilNextPercent} posts until next 1%
                  </p>
                </div>
              )}
            </div>
            <div className="relative h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-[#00ff3f] rounded-full transition-all duration-500"
                style={{ width: `${(discountInfo.discountPercentage / 50) * 100}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between text-sm text-[#03ffc3]/60">
              <span>0%</span>
              <span>50%</span>
            </div>
            <p className="mt-4 text-sm text-[#03ffc3]/80">
              {discountInfo.totalPosts} total posts made
              {discountInfo.discountPercentage < 50 && ` • ${20 - (discountInfo.totalPosts % 20)} posts until next discount increase`}
            </p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Connected Accounts</h2>
            </div>
            <div className="grid gap-4">
              {platforms.map(({ id, name, icon: Icon }) => {
                const isConnected = user?.connectedPlatforms.some(p => p.platform === id);
                return (
                  <div
                    key={id}
                    className={`p-4 rounded-lg border transition-colors ${
                      isConnected 
                        ? 'border-[#00ff3f] bg-[#00ff3f]/10'
                        : 'border-[#03ffc3]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon size={24} />
                        <div>
                          <h3 className="font-semibold">{name}</h3>
                          <p className="text-sm text-[#03ffc3]/60">
                            {isConnected ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleConnect(id)}
                        disabled={isConnecting}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          isConnected
                            ? 'bg-[#03ffc3]/10 hover:bg-[#03ffc3]/20 text-[#03ffc3]'
                            : 'bg-[#00ff3f] text-[#022424] hover:opacity-90'
                        }`}
                      >
                        {isConnected ? (
                          <>
                            <XMark size={20} />
                            <span>Disconnect</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink size={20} />
                            <span>Connect</span>
                          </>
                        )}
                      </button>
                    </div>
                    {isConnected && (
                      <div className="mt-4 flex items-center gap-2 text-[#00ff3f]">
                        <Check size={16} />
                        <span className="text-sm">Ready to engage with other creators</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <>
            <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail size={24} className="text-[#00ff3f]" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bell size={24} className="text-[#00ff3f]" />
                Notifications
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.engagement}
                    onChange={(e) => setNotifications(prev => ({ ...prev, engagement: e.target.checked }))}
                    className="form-checkbox text-[#00ff3f] rounded"
                  />
                  <span>Engagement notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.community}
                    onChange={(e) => setNotifications(prev => ({ ...prev, community: e.target.checked }))}
                    className="form-checkbox text-[#00ff3f] rounded"
                  />
                  <span>Community updates</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={(e) => setNotifications(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="form-checkbox text-[#00ff3f] rounded"
                  />
                  <span>Marketing emails</span>
                </label>
              </div>
            </div>

            <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield size={24} className="text-[#00ff3f]" />
                Security
              </h2>
              <button className="px-4 py-2 bg-[#03ffc3]/10 rounded-lg hover:bg-[#03ffc3]/20 transition-colors">
                Change Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;