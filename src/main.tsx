import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root') as Element;

ReactDOM.createRoot(rootElement).render(
  <AuthProvider>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </AuthProvider>
);
