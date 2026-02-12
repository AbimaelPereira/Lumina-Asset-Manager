import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Polyfill process.env if it doesn't exist to avoid reference errors
// Fix: Cast window to any to avoid "Property 'process' does not exist on type 'Window'" error
if (typeof window !== 'undefined' && !(window as any).process) {
  // Fix: Cast window to any to assign a value to the 'process' property
  (window as any).process = { env: {} };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);