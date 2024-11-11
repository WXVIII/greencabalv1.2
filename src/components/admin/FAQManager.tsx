import React, { useState } from 'react';
import { Plus, X, GripVertical, Edit2 } from 'lucide-react';
import { FAQItem, FAQCategory } from '../../types/faq';

interface FAQManagerProps {
  faqs: FAQItem[];
  onAdd: (faq: Omit<FAQItem, 'id'>) => void;
  onUpdate: (faq: FAQItem) => void;
  onRemove: (id: string) => void;
  onReorder: (newOrder: FAQItem[]) => void;
}

const categories: FAQCategory[] = [
  { id: 'general', label: 'General', description: 'Basic information' },
  { id: 'engagement', label: 'Engagement', description: 'Engagement rules' },
  { id: 'badges', label: 'Badges', description: 'Badge system' },
  { id: 'ranks', label: 'Ranks', description: 'Ranking system' }
];

const FAQManager: React.FC<FAQManagerProps> = ({
  faqs,
  onAdd,
  onUpdate,
  onRemove,
  onReorder
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<FAQCategory['id']>('general');

  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: '',
    category: 'general' as FAQCategory['id'],
    order: faqs.length
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      onUpdate({ ...editingFaq, ...newFaq });
      setEditingFaq(null);
    } else {
      onAdd(newFaq);
    }
    setShowAddForm(false);
    setNewFaq({
      question: '',
      answer: '',
      category: 'general',
      order: faqs.length
    });
  };

  const handleEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setNewFaq({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order
    });
    setShowAddForm(true);
  };

  const filteredFaqs = faqs
    .filter(faq => faq.category === activeCategory)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">FAQ Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add FAQ
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`p-4 rounded-xl border transition-colors ${
              activeCategory === category.id
                ? 'border-[#00ff3f] bg-[#00ff3f]/10'
                : 'border-[#03ffc3]/20 hover:border-[#03ffc3]/40'
            }`}
          >
            <h3 className="font-semibold mb-1">{category.label}</h3>
            <p className="text-sm text-[#03ffc3]/60">{category.description}</p>
          </button>
        ))}
      </div>

      <div className="max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="flex items-start gap-4 p-4 bg-[#03ffc3]/10 rounded-xl"
            >
              <button
                className="mt-1 p-2 hover:bg-[#03ffc3]/20 rounded-lg transition-colors cursor-grab"
                aria-label="Drag to reorder"
              >
                <GripVertical size={20} />
              </button>
              <div className="flex-1">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="text-[#03ffc3]/80 mt-2">{faq.answer}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(faq)}
                  className="p-2 hover:bg-[#03ffc3]/20 rounded-lg transition-colors"
                  aria-label="Edit FAQ"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => onRemove(faq.id)}
                  className="p-2 hover:bg-[#03ffc3]/20 rounded-lg transition-colors"
                  aria-label="Remove FAQ"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
              </h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingFaq(null);
                }}
                className="text-[#03ffc3]/60 hover:text-[#03ffc3] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newFaq.category}
                  onChange={e => setNewFaq(prev => ({ ...prev, category: e.target.value as FAQCategory['id'] }))}
                  className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f]"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Question</label>
                <input
                  type="text"
                  value={newFaq.question}
                  onChange={e => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Answer</label>
                <textarea
                  value={newFaq.answer}
                  onChange={e => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
                  className="w-full h-32 bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00ff3f] text-[#022424] py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {editingFaq ? 'Update FAQ' : 'Add FAQ'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManager;