import React, { useState } from 'react';
import { Plus, X, Calendar, Link as LinkIcon } from 'lucide-react';
import { FeaturedPost } from '../../types/community';

interface FeaturedPostsManagerProps {
  posts: FeaturedPost[];
  onAdd: (post: Omit<FeaturedPost, 'id'>) => void;
  onRemove: (id: string) => void;
}

const FeaturedPostsManager: React.FC<FeaturedPostsManagerProps> = ({
  posts,
  onAdd,
  onRemove
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    userId: '',
    username: '',
    platform: '',
    url: '',
    thumbnail: '',
    title: '',
    isPaid: false,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...newPost,
      startDate: new Date(newPost.startDate),
      endDate: new Date(newPost.endDate)
    });
    setShowAddForm(false);
    setNewPost({
      userId: '',
      username: '',
      platform: '',
      url: '',
      thumbnail: '',
      title: '',
      isPaid: false,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Featured Posts</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add Featured Post
        </button>
      </div>

      <div className="max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 space-y-4">
        {posts.map(post => (
          <div
            key={post.id}
            className="flex items-center gap-4 p-4 bg-[#03ffc3]/10 rounded-xl"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-24 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-[#03ffc3]/60">
                by {post.username} • {post.platform}
              </p>
            </div>
            <div className="text-sm text-[#03ffc3]/60">
              {new Date(post.startDate).toLocaleDateString()} -{' '}
              {new Date(post.endDate).toLocaleDateString()}
            </div>
            <button
              onClick={() => onRemove(post.id)}
              className="p-2 hover:bg-[#03ffc3]/20 rounded-lg transition-colors"
              aria-label="Remove featured post"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add Featured Post</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-[#03ffc3]/60 hover:text-[#03ffc3] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={e => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={newPost.username}
                    onChange={e => setNewPost(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <input
                    type="text"
                    value={newPost.platform}
                    onChange={e => setNewPost(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Post URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                  <input
                    type="url"
                    value={newPost.url}
                    onChange={e => setNewPost(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f]"
                    placeholder="https://"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                <input
                  type="url"
                  value={newPost.thumbnail}
                  onChange={e => setNewPost(prev => ({ ...prev, thumbnail: e.target.value }))}
                  className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                    <input
                      type="date"
                      value={newPost.startDate}
                      onChange={e => setNewPost(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                    <input
                      type="date"
                      value={newPost.endDate}
                      onChange={e => setNewPost(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f]"
                      required
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newPost.isPaid}
                  onChange={e => setNewPost(prev => ({ ...prev, isPaid: e.target.checked }))}
                  className="form-checkbox text-[#00ff3f] rounded"
                />
                <span className="text-sm">Paid Promotion</span>
              </label>

              <button
                type="submit"
                className="w-full bg-[#00ff3f] text-[#022424] py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Add Featured Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedPostsManager;