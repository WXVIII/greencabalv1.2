export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'engagement' | 'badges' | 'ranks';
  order: number;
}

export interface FAQCategory {
  id: 'general' | 'engagement' | 'badges' | 'ranks';
  label: string;
  description: string;
}