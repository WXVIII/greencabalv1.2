import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FeaturedPost } from '../types/community';
import CommunityBadges from './CommunityBadges';

interface FeaturedPostsProps {
  posts: FeaturedPost[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [posts.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const getBadgeType = (post: FeaturedPost) => {
    if (post.creatorRank === 'gold') return 'rose-gold';
    if (post.creatorRank === 'silver') return 'silver';
    return null;
  };

  if (posts.length === 0) return null;

  return (
    <div className="relative mb-8 bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="w-full flex-shrink-0 flex gap-4"
              style={{ transform: `translateX(${index * 100}%)` }}
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  {post.isPaid ? (
                    <span className="px-2 py-1 bg-[#00ff3f]/20 text-[#00ff3f] text-sm rounded-full">
                      Promoted
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-[#03ffc3]/20 text-[#03ffc3] text-sm rounded-full">
                      Featured Creator
                    </span>
                  )}
                  {getBadgeType(post) && (
                    <CommunityBadges
                      badges={[{ type: getBadgeType(post)! }]}
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                <p className="text-[#03ffc3]/80 text-sm">
                  by {post.username} • {post.platform}
                </p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-[#03ffc3]/10 hover:bg-[#03ffc3]/20 rounded-lg transition-colors"
                >
                  View Post
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#022424] border border-[#03ffc3]/20 rounded-full"
        aria-label="Previous post"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#022424] border border-[#03ffc3]/20 rounded-full"
        aria-label="Next post"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#00ff3f]' : 'bg-[#03ffc3]/20'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;