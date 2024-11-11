import React, { useState, useEffect } from 'react';
import { X, Link as LinkIcon, Facebook, Instagram, Youtube } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Platform } from '../types/social';
import { toast } from 'react-hot-toast';
import XIcon from './icons/XIcon';

interface PostPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { platform: string; url: string }) => void;
}

const PostPromotionModal: React.FC<PostPromotionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [url, setUrl] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setPlatform('instagram');
      setUrl('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const platforms = [
    { id: 'facebook' as Platform, name: 'Facebook', icon: Facebook },
    { id: 'instagram' as Platform, name: 'Instagram', icon: Instagram },
    { id: 'x' as Platform, name: 'X', icon: XIcon },
    { id: 'youtube' as Platform, name: 'YouTube', icon: Youtube },
    { id: 'tiktok' as Platform, name: 'TikTok', icon: FaTiktok },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify platform is connected
    const isConnected = user?.connectedPlatforms.some(p => p.platform === platform);
    if (!isConnected) {
      toast.error(`Please connect your ${platform} account first`);
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    onSubmit({ platform, url });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Share Your Post</h2>
          <button
            onClick={onClose}
            className="text-[#03ffc3]/60 hover:text-[#03ffc3] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Platform</label>
            <div className="grid grid-cols-3 gap-2">
              {platforms.map((p) => {
                const isConnected = user?.connectedPlatforms.some(
                  cp => cp.platform === p.id
                );
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    disabled={!isConnected}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                      platform === p.id
                        ? 'border-[#00ff3f] bg-[#00ff3f]/10'
                        : isConnected
                        ? 'border-[#03ffc3]/20 hover:border-[#03ffc3]/40'
                        : 'border-[#03ffc3]/10 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <p.icon size={24} />
                    <span className="text-sm">{p.name}</span>
                    {!isConnected && (
                      <span className="text-xs text-[#03ffc3]/60">Not connected</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Post URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f]"
                placeholder="https://"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00ff3f] text-[#022424] py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Share Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPromotionModal;