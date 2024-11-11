import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { FaTiktok, FaGoogle } from 'react-icons/fa';
import XIcon from './icons/XIcon';

interface SocialAuthButtonProps {
  platform: 'google' | 'facebook' | 'instagram' | 'tiktok' | 'x';
  onClick: () => void;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({ platform, onClick }) => {
  const platformConfig = {
    google: {
      icon: FaGoogle,
      label: 'Continue with Google',
      className: 'hover:bg-red-50 border-red-200 hover:border-red-300'
    },
    facebook: {
      icon: Facebook,
      label: 'Continue with Facebook',
      className: 'hover:bg-blue-50 border-blue-200 hover:border-blue-300'
    },
    instagram: {
      icon: Instagram,
      label: 'Continue with Instagram',
      className: 'hover:bg-pink-50 border-pink-200 hover:border-pink-300'
    },
    tiktok: {
      icon: FaTiktok,
      label: 'Continue with TikTok',
      className: 'hover:bg-gray-50 border-gray-200 hover:border-gray-300'
    },
    x: {
      icon: XIcon,
      label: 'Continue with X',
      className: 'hover:bg-gray-50 border-gray-200 hover:border-gray-300'
    }
  };

  const { icon: Icon, label, className } = platformConfig[platform];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border bg-white text-gray-700 transition-colors ${className}`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default SocialAuthButton;