import React from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  return (
    <div>
        <h1>IP Finder</h1>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}