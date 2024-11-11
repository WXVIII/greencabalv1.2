import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';
import './styles/scrollbar.css';

const root = document.getElementById('root');

if (!root) {
  console.error('Root element not found');
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <Toaster 
      position="top-right"
      toastOptions={{
        className: 'bg-[#022424] text-[#03ffc3] border border-[#03ffc3]/20',
        duration: 3000
      }}
    />
    <App />
  </StrictMode>
);