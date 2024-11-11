import React from 'react';
import { Clock, RefreshCw } from 'lucide-react';

interface SubscriptionStatusProps {
  daysRemaining: number;
  totalDays: number;
  nextBillingDate: string;
  isExpiringSoon: boolean;
  isExpired: boolean;
  onRenew: () => void;
}

const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({
  daysRemaining,
  totalDays,
  nextBillingDate,
  isExpiringSoon,
  isExpired,
  onRenew
}) => {
  return (
    <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6 mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock size={24} className="text-[#00ff3f]" />
            Subscription Status
          </h2>
          <p className={`mt-1 ${
            isExpiringSoon ? 'text-yellow-400' : 
            isExpired ? 'text-red-400' : 
            'text-[#03ffc3]/80'
          }`}>
            {isExpired ? 'Subscription expired' :
             daysRemaining === 0 ? 'Last day of subscription' :
             `${daysRemaining} days remaining`}
          </p>
        </div>
        <p className="text-sm text-[#03ffc3]/60">
          Next billing: {nextBillingDate}
        </p>
      </div>
      <div className="relative h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden mb-4">
        <div 
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
            isExpiringSoon ? 'bg-yellow-400' :
            isExpired ? 'bg-red-400' :
            'bg-[#00ff3f]'
          }`}
          style={{ width: `${(daysRemaining / totalDays) * 100}%` }}
        />
      </div>
      <button
        onClick={onRenew}
        disabled={!isExpiringSoon && !isExpired}
        className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg font-semibold transition-all ${
          isExpiringSoon || isExpired
            ? 'bg-[#00ff3f] text-[#022424] hover:opacity-90'
            : 'bg-[#03ffc3]/20 text-[#03ffc3]/60 cursor-not-allowed'
        }`}
      >
        <RefreshCw size={20} />
        <span>
          {isExpired ? 'Renew Subscription' :
           isExpiringSoon ? 'Renew Early' :
           'Renewal Available Soon'}
        </span>
      </button>
    </div>
  );
};

export default SubscriptionStatus;