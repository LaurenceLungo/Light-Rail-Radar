import React, { Suspense, lazy } from 'react';
import './App.css';
import { Provider } from "./components/ui/provider";
import { LanguageProvider } from './context/LanguageContext';
import { ExpandedProvider } from './context/ExpandedContext';
import LanguageSelector from './components/languageSelector/languageSelector';

const HomePage = lazy(() => import('./components/homePage/homePage'));

const App: React.FC = () => {
  return (
    <Provider>
      <LanguageProvider>
        <ExpandedProvider>
          <div className="App">
            <LanguageSelector />
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          </div>
        </ExpandedProvider>
      </LanguageProvider>
    </Provider>
  );
};

export default App; 