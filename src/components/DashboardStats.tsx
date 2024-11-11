import React from 'react';
import { Users, ThumbsUp, TrendingUp, Percent } from 'lucide-react';

interface Stat {
  icon: typeof Users;
  label: string;
  value: string;
  trend: string;
  color: string;
}

interface DashboardStatsProps {
  stats: Stat[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <Icon size={24} className={stat.color} />
              <span className="text-[#00ff3f] text-sm">{stat.trend}</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">{stat.label}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;