import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './i18n';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router
            future={ {
                v7_startTransition: true,
                v7_relativeSplatPath: true
            } }
        >
            <App />
        </Router>
    </React.StrictMode>
);
