import React from 'react';

interface PriceDisplayProps {
  basePrice: number;
  discountPercentage: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ basePrice, discountPercentage }) => {
  const discountedPrice = basePrice * (1 - discountPercentage / 100);

  return (
    <div className="flex items-baseline gap-2">
      {discountPercentage > 0 && (
        <span className="text-xl line-through text-[#03ffc3]/60">${basePrice.toFixed(2)}</span>
      )}
      <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
      <span className="text-[#03ffc3]/80">/month</span>
    </div>
  );
};

export default PriceDisplay;