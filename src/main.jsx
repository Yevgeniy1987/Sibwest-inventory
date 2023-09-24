import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GlobalProvider } from './context/GlobalContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </AuthProvider>
);
