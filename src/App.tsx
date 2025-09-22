import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import Routing from './Routing';
import i18n from './i18n';
import './App.css';

function App () {
    return (
        <I18nextProvider i18n={ i18n }>
            <div className="min-h-screen bg-base-100">
                <Suspense fallback={ <div>Loading...</div> }>
                    <Routing />
                </Suspense>
            </div>
        </I18nextProvider>
    );
}

export default App;
