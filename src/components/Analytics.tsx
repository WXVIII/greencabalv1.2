import React from 'react';
import { TrendingUp, Users, Eye, ThumbsUp } from 'lucide-react';

interface AnalyticsProps {
  darkMode: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({ darkMode }) => {
  const stats = [
    { icon: Eye, label: 'Views', value: '124.5K', trend: '+12.3%' },
    { icon: Users, label: 'Subscribers', value: '45.2K', trend: '+5.7%' },
    { icon: ThumbsUp, label: 'Engagement', value: '89.1K', trend: '+8.4%' },
    { icon: TrendingUp, label: 'Growth', value: '23.4%', trend: '+2.1%' },
  ];

  return (
    <div className={`space-y-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={24} className="text-indigo-600" />
                <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
          <div className="h-64 flex items-center justify-center">
            {/* Chart component would go here */}
            <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              Chart placeholder
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Top Content</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`flex items-center gap-4 p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <img
                  src={`https://images.unsplash.com/photo-161162616305-c69b3fa7fbe${item}`}
                  alt={`Top content ${item}`}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">Video Title {item}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {Math.floor(Math.random() * 50 + 10)}K views
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-500">
                    +{Math.floor(Math.random() * 20 + 5)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;