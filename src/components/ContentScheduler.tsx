import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';

interface ContentSchedulerProps {
  darkMode: boolean;
}

const ContentScheduler: React.FC<ContentSchedulerProps> = ({ darkMode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const scheduledContent = [
    {
      id: 1,
      title: 'New Video Release',
      platform: 'YouTube',
      time: '14:00',
      thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
    },
    {
      id: 2,
      title: 'Instagram Story',
      platform: 'Instagram',
      time: '16:30',
      thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
    },
  ];

  return (
    <div className={`space-y-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Calendar</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
          Schedule Content
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`col-span-2 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col space-y-4">
            {scheduledContent.map((content) => (
              <div
                key={content.id}
                className={`flex items-center gap-4 p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{content.title}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {content.platform}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{content.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon size={20} />
            <h3 className="text-lg font-semibold">Calendar</h3>
          </div>
          {/* Calendar component would go here */}
          <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            Calendar UI placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentScheduler;