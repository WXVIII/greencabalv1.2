import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAdmin } from '../context/AdminContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'admin@greencabal.com' && password === 'cabalgreen@2108') {
      adminLogin();
      navigate('/admin/panel');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#022424] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#03ffc3]">Admin Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#03ffc3]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f] text-[#03ffc3]"
                  placeholder="admin@greencabal.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#03ffc3]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f] text-[#03ffc3]"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00ff3f] text-[#022424] py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;