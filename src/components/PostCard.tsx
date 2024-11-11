import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { Platform } from '../types/community';
import { platforms } from './PlatformTabs';
import CommunityBadges from './CommunityBadges';

interface PostCardProps {
  post: {
    id: number;
    username: string;
    platform: Platform;
    thumbnail: string;
    timestamp: string;
    url: string;
    engagements: number;
    badges: {
      type: 'red' | 'rose-gold' | 'silver';
      engagementCount?: number;
    }[];
  };
  onEngage: () => void;
  isVerifying: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEngage, isVerifying }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [canVerify, setCanVerify] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hasClicked && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCanVerify(true);
    }
    return () => clearInterval(timer);
  }, [hasClicked, timeLeft]);

  const handleViewClick = () => {
    setHasClicked(true);
    window.open(post.url, '_blank');
  };

  const handleVerifyClick = () => {
    onEngage();
    setHasClicked(false);
    setCanVerify(false);
    setTimeLeft(10);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-40 h-40 flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[#03ffc3]/10 rounded-lg animate-pulse" />
          )}
          {!imageError ? (
            <img
              src={post.thumbnail}
              alt={`${post.username}'s post`}
              className={`w-full h-full object-cover rounded-lg bg-[#03ffc3]/10 transition-opacity duration-200 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-[#03ffc3]/10 rounded-lg flex items-center justify-center text-[#03ffc3]/60">
              No preview available
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg truncate">{post.username}</h3>
                <CommunityBadges badges={post.badges} />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleViewClick}
                  className={`text-sm ${
                    platforms.find(p => p.id === post.platform)?.color
                  } transition-colors flex items-center gap-1 hover:bg-[#03ffc3]/10 px-3 py-2 rounded-lg`}
                  aria-label={`View and engage with ${post.username}'s post on ${post.platform}`}
                >
                  <ExternalLink size={16} className="flex-shrink-0" />
                  <span className="truncate">View and engage</span>
                </button>
                
                {hasClicked && !canVerify && (
                  <div className="text-sm text-[#03ffc3]/60 flex items-center gap-1 px-3 py-2">
                    Verify available in {timeLeft}s
                  </div>
                )}

                {canVerify && (
                  <button
                    onClick={handleVerifyClick}
                    disabled={isVerifying}
                    className="text-sm bg-[#00ff3f] text-[#022424] transition-colors flex items-center gap-1 hover:opacity-90 px-3 py-2 rounded-lg disabled:opacity-50"
                  >
                    <CheckCircle2 size={16} className="flex-shrink-0" />
                    <span>Verify Engagement</span>
                  </button>
                )}
              </div>
            </div>
            <span className="text-sm text-[#03ffc3]/60 flex-shrink-0">{post.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;