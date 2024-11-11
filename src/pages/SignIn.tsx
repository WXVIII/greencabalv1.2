import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import SocialAuthButton from '../components/SocialAuthButton';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email });
    navigate('/community');
  };

  const handleSocialAuth = (platform: string) => {
    console.log(`Authenticating with ${platform}`);
    // In a real app, implement OAuth flow for each platform
    login({ email: `${platform}@example.com` });
    navigate('/community');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          
          <div className="space-y-3 mb-8">
            <SocialAuthButton
              platform="google"
              onClick={() => handleSocialAuth('google')}
            />
            <SocialAuthButton
              platform="facebook"
              onClick={() => handleSocialAuth('facebook')}
            />
            <SocialAuthButton
              platform="instagram"
              onClick={() => handleSocialAuth('instagram')}
            />
            <SocialAuthButton
              platform="x"
              onClick={() => handleSocialAuth('x')}
            />
            <SocialAuthButton
              platform="tiktok"
              onClick={() => handleSocialAuth('tiktok')}
            />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#03ffc3]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#022424] text-[#03ffc3]/60">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f]"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-12 focus:outline-none focus:border-[#00ff3f]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60 hover:text-[#03ffc3] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00ff3f] text-[#022424] py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;