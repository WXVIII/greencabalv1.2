import React from 'react';
import { Percent } from 'lucide-react';

interface DiscountBadgeProps {
  discountPercentage: number;
  className?: string;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discountPercentage, className = '' }) => {
  if (discountPercentage <= 0) return null;

  return (
    <div className={`flex items-center gap-2 text-[#00ff3f] ${className}`}>
      <Percent size={20} />
      <span>{discountPercentage}% community discount</span>
    </div>
  );
};

export default DiscountBadge;