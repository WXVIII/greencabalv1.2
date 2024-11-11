import React, { useState } from 'react';
import { Users, Zap, DollarSign, Search, UserCheck, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '2,457',
      trend: '+12%',
      color: 'text-[#00ff3f]'
    },
    {
      icon: Zap,
      label: 'Trial Users',
      value: '342',
      trend: '+8%',
      color: 'text-[#03ffc3]'
    },
    {
      icon: DollarSign,
      label: 'Active Subscribers',
      value: '1,893',
      trend: '+15%',
      color: 'text-[#00ff3f]'
    },
    {
      icon: Clock,
      label: 'Avg. Subscription Length',
      value: '4.2 mo',
      trend: '+0.3',
      color: 'text-[#03ffc3]'
    }
  ];

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

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#022424] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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

        <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">User Directory</h2>
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;