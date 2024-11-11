import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, Trophy, HelpCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#022424] text-[#03ffc3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Grow Together, Engage Together
          </h1>
          <p className="text-xl mb-12 opacity-90">
            Join the community where creators support creators
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="px-8 py-3 border-2 border-[#03ffc3] rounded-lg font-semibold hover:bg-[#03ffc3] hover:text-[#022424] transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-xl border border-[#03ffc3] bg-[#022424]/50">
            <Users className="w-12 h-12 mb-4 text-[#00ff3f]" />
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="opacity-90">
              Connect with creators who understand the grind and support each other's growth
            </p>
          </div>
          <div className="p-6 rounded-xl border border-[#03ffc3] bg-[#022424]/50">
            <Zap className="w-12 h-12 mb-4 text-[#00ff3f]" />
            <h3 className="text-xl font-semibold mb-2">Instant Engagement</h3>
            <p className="opacity-90">
              Get immediate engagement on your new content from active community members
            </p>
          </div>
          <div className="p-6 rounded-xl border border-[#03ffc3] bg-[#022424]/50">
            <Trophy className="w-12 h-12 mb-4 text-[#00ff3f]" />
            <h3 className="text-xl font-semibold mb-2">Gamified Growth</h3>
            <p className="opacity-90">
              Earn visibility by supporting others - the more you give, the more you get
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-8 opacity-90">
              Connect your social accounts, engage with 5 creators daily, and watch your content get boosted by the community. Try it free for your first 5 posts!
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Fixed buttons */}
      <div className="fixed bottom-4 left-4 flex gap-4">
        <button
          onClick={() => navigate('/faq')}
          className="flex items-center gap-2 px-4 py-2 bg-[#03ffc3]/10 hover:bg-[#03ffc3]/20 text-[#03ffc3] rounded-lg transition-colors"
        >
          <HelpCircle size={20} />
          <span>FAQ</span>
        </button>
      </div>

      <div className="fixed bottom-4 right-4 opacity-30 hover:opacity-100 transition-opacity">
        <button
          onClick={() => navigate('/admin')}
          className="px-3 py-1 text-xs bg-[#03ffc3]/10 text-[#03ffc3]/60 rounded hover:bg-[#03ffc3]/20 transition-colors"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default LandingPage;