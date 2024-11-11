import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem, FAQCategory } from '../types/faq';

const categories: FAQCategory[] = [
  {
    id: 'general',
    label: 'General',
    description: 'Basic information about our community'
  },
  {
    id: 'engagement',
    label: 'Engagement',
    description: 'How engagement works and its benefits'
  },
  {
    id: 'badges',
    label: 'Badges',
    description: 'Understanding community badges'
  },
  {
    id: 'ranks',
    label: 'Ranks',
    description: 'Community ranks and progression'
  }
];

interface FAQPageProps {
  faqs: FAQItem[];
}

const FAQPage: React.FC<FAQPageProps> = ({ faqs }) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory['id']>('general');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFaqs = faqs
    .filter(faq => faq.category === activeCategory)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[#022424] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-[#03ffc3]/80">
            Everything you need to know about our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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

        <div className="space-y-4">
          {filteredFaqs.map(faq => (
            <div
              key={faq.id}
              className="border border-[#03ffc3]/20 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-semibold">{faq.question}</span>
                {openItems.has(faq.id) ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openItems.has(faq.id) && (
                <div className="px-4 pb-4 text-[#03ffc3]/80">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#03ffc3]/10 rounded-xl text-center">
          <HelpCircle size={32} className="mx-auto mb-4 text-[#00ff3f]" />
          <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
          <p className="text-[#03ffc3]/80 mb-4">
            Can't find the answer you're looking for? Reach out to our support team.
          </p>
          <button className="px-6 py-2 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;