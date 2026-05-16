import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { CultureProvider } from './contexts/CultureContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CultureProvider>
      <App />
    </CultureProvider>
  </StrictMode>,
);
