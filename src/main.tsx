import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const rootElement = document.getElementById('root') as Element;

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <AuthProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AuthProvider>
  </Provider>
);
