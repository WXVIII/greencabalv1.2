import React from 'react';
import FAQPage from '../components/FAQPage';
import { FAQItem } from '../types/faq';

const FAQ = () => {
  const faqs: FAQItem[] = [
    // General Category
    {
      id: 'general-1',
      question: 'What is GreenCabal?',
      answer: 'GreenCabal is a community platform where content creators support each other through meaningful engagement. Our unique system rewards active community members with discounts and recognition through badges and ranks.',
      category: 'general',
      order: 1
    },
    {
      id: 'general-2',
      question: 'How do I get started?',
      answer: 'Sign up for an account, connect your social media platforms, and start engaging with other creators\' content. You\'ll need to engage with 5 posts daily to unlock the ability to share your own content.',
      category: 'general',
      order: 2
    },
    {
      id: 'general-3',
      question: 'What social platforms are supported?',
      answer: 'We currently support Instagram, YouTube, Facebook, X (formerly Twitter), and TikTok. You can connect multiple platforms to your account.',
      category: 'general',
      order: 3
    },

    // Engagement Category
    {
      id: 'engagement-1',
      question: 'How does the engagement system work?',
      answer: 'Our engagement system values different types of interactions: Comments and shares count as 1 engagement point each, while likes count as 0.5. If you perform all three actions on a post within 6 hours, it counts as 1 engagement point total.',
      category: 'engagement',
      order: 1
    },
    {
      id: 'engagement-2',
      question: 'Why do I need to engage with 5 posts before sharing mine?',
      answer: 'This requirement ensures that our community maintains a healthy balance of giving and receiving engagement. It helps create a sustainable ecosystem where everyone contributes to each other\'s growth.',
      category: 'engagement',
      order: 2
    },
    {
      id: 'engagement-3',
      question: 'How do I earn subscription discounts?',
      answer: 'You earn discount points through consistent community engagement. Every 20 posts you engage with earns you 1% discount, up to a maximum of 50% off your subscription.',
      category: 'engagement',
      order: 3
    },

    // Badges Category
    {
      id: 'badges-1',
      question: 'What are Community Badges?',
      answer: 'Community Badges are visual indicators that show different types of engagement opportunities and creator status. We have three types: Red Badges (posts needing support), Rose-Gold Badges (Gold Star creator posts), and Silver Badges (Silver Star creator posts).',
      category: 'badges',
      order: 1
    },
    {
      id: 'badges-2',
      question: 'How do I earn the Red Badge?',
      answer: 'Posts automatically receive a Red Badge if they have less than 100 engagements after 24 hours. This badge helps identify content that needs community support and disappears once the post reaches 100 engagements.',
      category: 'badges',
      order: 2
    },
    {
      id: 'badges-3',
      question: 'What\'s the value of collecting badges?',
      answer: 'Badges contribute to your community rank progression. Rose-Gold Badges are worth 4 regular badge points, Silver Badges are worth 2 points, and Red Badges are worth 1 point.',
      category: 'badges',
      order: 3
    },

    // Ranks Category
    {
      id: 'ranks-1',
      question: 'How does the ranking system work?',
      answer: 'There are 5 ranks: White, Green, Blue, Silver, and Gold Stars. Your rank is determined by four factors: daily login streak, total engagements, subscription status, and badges collected. Ranks are evaluated every 60 days.',
      category: 'ranks',
      order: 1
    },
    {
      id: 'ranks-2',
      question: 'What are the requirements for Gold Star rank?',
      answer: 'To achieve Gold Star rank, you need: 57 out of 60 days logged in, 1,800 community engagements in 60 days, at least 2 consecutive months of subscription, and 600 Community Badges. Requirements decrease by 20% for each rank below Gold.',
      category: 'ranks',
      order: 2
    },
    {
      id: 'ranks-3',
      question: 'What benefits do higher ranks provide?',
      answer: 'Higher ranks give your posts more visibility through special badges (Rose-Gold for Gold rank, Silver for Silver rank). Your content also gets featured in the Featured Posts section, increasing exposure to the community.',
      category: 'ranks',
      order: 3
    },
    {
      id: 'ranks-4',
      question: 'Can I lose my rank?',
      answer: 'Yes, ranks are re-evaluated every 60 days. If you don\'t maintain the required metrics for your current rank, you\'ll be moved to the appropriate rank based on your activity levels.',
      category: 'ranks',
      order: 4
    }
  ];

  return <FAQPage faqs={faqs} />;
};

export default FAQ;