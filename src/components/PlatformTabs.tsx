import React, { useRef, useEffect, useState } from 'react';
import { Instagram, Youtube, Facebook, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import XIcon from './icons/XIcon';
import { Platform } from '../types/social';

interface PlatformTabsProps {
  activePlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

export const platforms = [
  { id: 'instagram' as Platform, icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
  { id: 'youtube' as Platform, icon: Youtube, label: 'YouTube', color: 'hover:text-red-500' },
  { id: 'facebook' as Platform, icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
  { id: 'x' as Platform, icon: XIcon, label: 'X', color: 'hover:text-gray-200' },
  { id: 'tiktok' as Platform, icon: FaTiktok, label: 'TikTok', color: 'hover:text-[#00f2ea]' }
];

const PlatformTabs: React.FC<PlatformTabsProps> = ({ activePlatform, onPlatformChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = Math.min(200, container.clientWidth * 0.6);
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative mb-6 touch-pan-x">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-[#022424] border border-[#03ffc3]/20 rounded-full shadow-lg hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide -mx-4 px-4 cursor-grab active:cursor-grabbing"
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-2 min-w-max pb-1">
          {platforms.map(({ id, icon: Icon, label, color }) => (
            <button
              key={id}
              onClick={() => !isDragging && onPlatformChange(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activePlatform === id
                  ? 'bg-[#00ff3f] text-[#022424]'
                  : `text-[#03ffc3] hover:bg-[#03ffc3]/10 ${color}`
              }`}
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-[#022424] border border-[#03ffc3]/20 rounded-full shadow-lg hidden md:block"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default PlatformTabs;