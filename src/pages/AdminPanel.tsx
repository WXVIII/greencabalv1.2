import React, { useState } from 'react';
import { Users, Clock, CreditCard, BarChart3, FileText, Image, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturedPostsManager from '../components/admin/FeaturedPostsManager';
import FAQManager from '../components/admin/FAQManager';
import { FeaturedPost } from '../types/community';
import { FAQItem } from '../types/faq';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from your backend
  const stats = {
    totalUsers: 2547,
    trialUsers: 856,
    activeSubscribers: 1691,
    monthlyRevenue: 3382
  };

  const users = [
    {
      id: 1,
      email: 'creator1@example.com',
      subscribed: '2023-12-15',
      monthsSubscribed: 3,
      trial: false,
      socialAccounts: ['instagram', 'youtube', 'tiktok'],
      lastActive: '2024-03-14'
    },
    {
      id: 2,
      email: 'creator2@example.com',
      subscribed: '2024-01-20',
      monthsSubscribed: 2,
      trial: false,
      socialAccounts: ['instagram', 'facebook'],
      lastActive: '2024-03-15'
    },
    {
      id: 3,
      email: 'newuser@example.com',
      subscribed: '2024-03-10',
      monthsSubscribed: 0,
      trial: true,
      socialAccounts: ['instagram'],
      lastActive: '2024-03-15'
    }
  ];

  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  const handleAddFeaturedPost = (post: Omit<FeaturedPost, 'id'>) => {
    setFeaturedPosts(prev => [...prev, { ...post, id: `post-${Date.now()}` }]);
  };

  const handleRemoveFeaturedPost = (id: string) => {
    setFeaturedPosts(prev => prev.filter(post => post.id !== id));
  };

  const handleAddFAQ = (faq: Omit<FAQItem, 'id'>) => {
    setFaqs(prev => [...prev, { ...faq, id: `faq-${Date.now()}` }]);
  };

  const handleUpdateFAQ = (faq: FAQItem) => {
    setFaqs(prev => prev.map(item => item.id === faq.id ? faq : item));
  };

  const handleRemoveFAQ = (id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
  };

  const handleReorderFAQs = (newOrder: FAQItem[]) => {
    setFaqs(newOrder);
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#022424] text-[#03ffc3] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#03ffc3]/20 rounded-lg hover:bg-[#03ffc3]/30 transition-colors"
          >
            Exit Admin Mode
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#03ffc3]/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <Users size={24} className="text-[#00ff3f]" />
              <span className="text-[#00ff3f] text-sm">+12%</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">Total Users</h3>
            <p className="text-2xl font-bold mt-1">{stats.totalUsers}</p>
          </div>

          <div className="bg-[#03ffc3]/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <Clock size={24} className="text-[#00ff3f]" />
              <span className="text-[#00ff3f] text-sm">+8%</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">Trial Users</h3>
            <p className="text-2xl font-bold mt-1">{stats.trialUsers}</p>
          </div>

          <div className="bg-[#03ffc3]/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <CreditCard size={24} className="text-[#00ff3f]" />
              <span className="text-[#00ff3f] text-sm">+15%</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">Active Subscribers</h3>
            <p className="text-2xl font-bold mt-1">{stats.activeSubscribers}</p>
          </div>

          <div className="bg-[#03ffc3]/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <BarChart3 size={24} className="text-[#00ff3f]" />
              <span className="text-[#00ff3f] text-sm">+10%</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">Monthly Revenue</h3>
            <p className="text-2xl font-bold mt-1">${stats.monthlyRevenue}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#00ff3f] text-[#022424]'
                : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
            }`}
          >
            <Users size={20} />
            User Directory
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'featured'
                ? 'bg-[#00ff3f] text-[#022424]'
                : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
            }`}
          >
            <Image size={20} />
            Featured Posts
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'faq'
                ? 'bg-[#00ff3f] text-[#022424]'
                : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
            }`}
          >
            <FileText size={20} />
            FAQ Management
          </button>
        </div>

        <div className="bg-[#03ffc3]/10 rounded-xl p-6">
          {activeTab === 'overview' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">User Directory</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 bg-transparent border border-[#03ffc3]/20 rounded-lg focus:outline-none focus:border-[#00ff3f]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#03ffc3]/20">
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Subscribed Since</th>
                      <th className="text-left py-3 px-4">Months Active</th>
                      <th className="text-left py-3 px-4">Social Accounts</th>
                      <th className="text-left py-3 px-4">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-[#03ffc3]/20">
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            user.trial 
                              ? 'bg-[#03ffc3]/20 text-[#03ffc3]' 
                              : 'bg-[#00ff3f]/20 text-[#00ff3f]'
                          }`}>
                            {user.trial ? 'Trial' : 'Subscribed'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user.subscribed}</td>
                        <td className="py-3 px-4">{user.monthsSubscribed}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {user.socialAccounts.map((account) => (
                              <span
                                key={account}
                                className="px-2 py-1 bg-[#03ffc3]/10 rounded-lg text-sm"
                              >
                                {account}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">{user.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === 'featured' && (
            <FeaturedPostsManager
              posts={featuredPosts}
              onAdd={handleAddFeaturedPost}
              onRemove={handleRemoveFeaturedPost}
            />
          )}
          {activeTab === 'faq' && (
            <FAQManager
              faqs={faqs}
              onAdd={handleAddFAQ}
              onUpdate={handleUpdateFAQ}
              onRemove={handleRemoveFAQ}
              onReorder={handleReorderFAQs}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;