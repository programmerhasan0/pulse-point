import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-responsive-modal/styles.css';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '@context/AppContext';

createRoot(document.getElementById('root')!).render(
    <AppContextProvider>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </AppContextProvider>
);
