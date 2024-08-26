import React from 'react';
import { createRoot } from 'react-dom/client';
import Info from './components/Info';
import './sass/index.sass';


const App: React.FC = () => {
  return (
    <div id='app' style={{padding: '20px'}}>
        <h1 style={{textAlign: 'center',}}>IP Finder</h1>
        <Info />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}