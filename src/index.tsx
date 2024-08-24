import React from 'react';
import { createRoot } from 'react-dom/client';
import Info from './components/Info';

const App: React.FC = () => {
  return (
    <div id='app'>
        <h1>IP Finder</h1>
        <Info />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}