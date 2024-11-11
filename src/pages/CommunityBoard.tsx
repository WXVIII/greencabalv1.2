import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PostPromotionButton from '../components/PostPromotionButton';
import PostPromotionModal from '../components/PostPromotionModal';
import PlatformTabs from '../components/PlatformTabs';
import PostCard from '../components/PostCard';
import FeaturedPosts from '../components/FeaturedPosts';
import { Platform } from '../types/community';
import { useSocialTracking } from '../hooks/useSocialTracking';
import { useAuth } from '../context/AuthContext';
import { CommunityService } from '../services/communityService';

const CommunityBoard = () => {
  const [engagedToday, setEngagedToday] = useState(0);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState<Platform>('instagram');
  const navigate = useNavigate();
  const { trackEngagement, isVerifying } = useSocialTracking();
  const { user } = useAuth();

  // Mock featured posts - In a real app, fetch from backend
  const featuredPosts = [
    {
      id: 'featured-1',
      userId: 'user1',
      username: '@goldstar_creator',
      platform: 'instagram',
      url: 'https://instagram.com/p/xyz123',
      thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
      title: 'Summer Vibes Collection',
      isPaid: false,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  ];

  const posts = {
    instagram: [
      {
        id: 1,
        username: '@creativemind',
        platform: 'instagram' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        timestamp: '2h ago',
        url: 'https://instagram.com/p/xyz123',
        engagements: 85,
        badges: [{ type: 'red' as const }]
      },
      {
        id: 2,
        username: '@artistry',
        platform: 'instagram' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
        timestamp: '3h ago',
        url: 'https://instagram.com/p/abc456',
        engagements: 120,
        badges: []
      }
    ],
    youtube: [
      {
        id: 3,
        username: '@techreview',
        platform: 'youtube' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162618479-ee4d1e0e5d36',
        timestamp: '1h ago',
        url: 'https://youtube.com/watch?v=xyz123',
        engagements: 45,
        badges: [{ type: 'red' as const }]
      }
    ],
    facebook: [
      {
        id: 4,
        username: '@socialinfluencer',
        platform: 'facebook' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        timestamp: '1h ago',
        url: 'https://facebook.com/post/123',
        engagements: 95,
        badges: []
      }
    ],
    x: [
      {
        id: 5,
        username: '@techinfluencer',
        platform: 'x' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
        timestamp: '15m ago',
        url: 'https://x.com/status/123',
        engagements: 75,
        badges: [{ type: 'red' as const }]
      }
    ],
    tiktok: [
      {
        id: 6,
        username: '@dancepro',
        platform: 'tiktok' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162616677-f3f6aa2fda41',
        timestamp: '30m ago',
        url: 'https://tiktok.com/@dancepro/video/123',
        engagements: 150,
        badges: []
      }
    ]
  };

  const handlePromotionSubmit = (data: { platform: string; url: string }) => {
    if (engagedToday < 5) {
      toast.error('Please engage with 5 posts before sharing your content');
      return;
    }
    
    console.log('Promoting post:', data);
    toast.success('Post submitted for promotion!');
    setIsPromotionModalOpen(false);
  };

  const handleEngagement = async (post: typeof posts[Platform][0]) => {
    if (isVerifying) return;

    const status = await trackEngagement(post.platform, post.url, 'like');
    if (status.success) {
      setEngagedToday(prev => Math.min(prev + 1, 5));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Community Board</h1>
          <p className="text-[#03ffc3]/80">
            Engaged today: {engagedToday}/5
            {engagedToday < 5 && (
              <span className="text-[#03ffc3]/60 ml-2 hidden sm:inline">
                (Engage with {5 - engagedToday} more posts to share your content)
              </span>
            )}
          </p>
        </div>
        <PostPromotionButton
          engagedToday={engagedToday}
          onPromote={() => setIsPromotionModalOpen(true)}
        />
      </div>

      <FeaturedPosts posts={featuredPosts} />

      <PlatformTabs
        activePlatform={activePlatform}
        onPlatformChange={setActivePlatform}
      />

      <div className="grid gap-6">
        {posts[activePlatform].map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEngage={() => handleEngagement(post)}
            isVerifying={isVerifying}
          />
        ))}
      </div>

      <PostPromotionModal
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        onSubmit={handlePromotionSubmit}
      />
    </div>
  );
};

export default CommunityBoard;