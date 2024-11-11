import React from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

interface PostPromotionButtonProps {
  engagedToday: number;
  onPromote: () => void;
}

const PostPromotionButton: React.FC<PostPromotionButtonProps> = ({ engagedToday, onPromote }) => {
  const { user } = useAuth();
  const isActive = engagedToday >= 5;

  const handleClick = () => {
    if (!user) {
      toast.error('Please sign in to promote your posts');
      return;
    }

    if (!isActive) {
      toast.error(`Engage with ${5 - engagedToday} more posts to unlock promotion`);
      return;
    }

    onPromote();
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isActive}
      className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
        isActive
          ? 'bg-[#00ff3f] text-[#022424] hover:opacity-90'
          : 'bg-[#03ffc3]/20 text-[#03ffc3]/60 cursor-not-allowed'
      }`}
    >
      <Plus size={20} />
      <span>Share Your Post</span>
      {!isActive && (
        <span className="text-sm">
          ({5 - engagedToday} more engagements needed)
        </span>
      )}
    </button>
  );
};

export default PostPromotionButton;