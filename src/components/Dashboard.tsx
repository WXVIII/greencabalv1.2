import React from 'react';
import { Trash2, Download, Share2 } from 'lucide-react';

interface DashboardProps {
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ darkMode }) => {
  const recentFiles = [
    { id: 1, name: 'Video Project.mp4', size: '234 MB', date: '2024-03-15' },
    { id: 2, name: 'Thumbnail.psd', size: '45 MB', date: '2024-03-14' },
    { id: 3, name: 'Script Draft.docx', size: '1.2 MB', date: '2024-03-13' },
  ];

  return (
    <div className={`space-y-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-2">Storage Used</h3>
          <p className="text-3xl font-bold text-indigo-600">45.8 GB</p>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>of 100 GB</p>
        </div>
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-2">Scheduled Posts</h3>
          <p className="text-3xl font-bold text-indigo-600">12</p>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Next in 2 hours</p>
        </div>
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-2">Total Downloads</h3>
          <p className="text-3xl font-bold text-indigo-600">1,234</p>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last 30 days</p>
        </div>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Recent Files</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3">Name</th>
                <th className="text-left py-3">Size</th>
                <th className="text-left py-3">Date</th>
                <th className="text-right py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentFiles.map((file) => (
                <tr
                  key={file.id}
                  className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <td className="py-3">{file.name}</td>
                  <td className="py-3">{file.size}</td>
                  <td className="py-3">{file.date}</td>
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700">
                        <Download size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700">
                        <Share2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;