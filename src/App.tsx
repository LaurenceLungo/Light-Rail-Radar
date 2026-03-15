import React, { Suspense, lazy } from 'react';
import './App.css';
import { Provider } from "./components/ui/provider";
import { LanguageProvider } from './context/LanguageContext';
import LanguageSelector from './components/languageSelector/languageSelector';

const HomePage = lazy(() => import('./components/homePage/homePage'));

const App: React.FC = () => {
  return (
    <Provider>
      <LanguageProvider>
        <div className="App">
          <LanguageSelector />
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        </div>
      </LanguageProvider>
    </Provider>
  );
};

export default App; 