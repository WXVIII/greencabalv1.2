import React from 'react';
import { ExternalLink, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Platform, EngagedPost } from '../types/community';

interface PostListProps {
  posts: EngagedPost[];
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  type: 'engaged' | 'my-posts';
}

const PostList: React.FC<PostListProps> = ({
  posts,
  timeframe,
  onTimeframeChange,
  type
}) => {
  const timeframes = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const getEngagementSummary = (engagements: EngagedPost['engagements']) => {
    const types = [];
    if (engagements.liked) types.push('Liked');
    if (engagements.commented) types.push('Commented');
    if (engagements.shared) types.push('Shared');
    return types.join(', ');
  };

  const getEngagementIcons = (engagements: EngagedPost['engagements']) => {
    return (
      <div className="flex items-center gap-2">
        {engagements.liked && (
          <ThumbsUp size={16} className="text-[#00ff3f]" />
        )}
        {engagements.commented && (
          <MessageCircle size={16} className="text-[#00ff3f]" />
        )}
        {engagements.shared && (
          <Share2 size={16} className="text-[#00ff3f]" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select
          value={timeframe}
          onChange={(e) => onTimeframeChange(e.target.value)}
          className="bg-[#022424] border border-[#03ffc3]/20 rounded-lg px-4 py-2 text-[#03ffc3]"
        >
          {timeframes.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>

      {posts.length === 0 ? (
        <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-8 text-center">
          <p className="text-[#03ffc3]/80">
            {type === 'engaged' 
              ? 'No engaged posts for this timeframe' 
              : 'No posts created during this timeframe'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={post.thumbnail}
                  alt="Post thumbnail"
                  className="w-full md:w-40 h-40 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{post.username}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    {getEngagementIcons(post.engagements)}
                    <span className="text-sm text-[#03ffc3]/80">
                      {getEngagementSummary(post.engagements)}
                    </span>
                  </div>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00ff3f] hover:underline flex items-center gap-1"
                  >
                    <ExternalLink size={16} />
                    View on {post.platform}
                  </a>
                  <p className="text-[#03ffc3]/60 mt-2">
                    Engaged {post.engagedAt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;