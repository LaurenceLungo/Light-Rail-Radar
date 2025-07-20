import React, { Suspense, lazy } from 'react';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { LanguageProvider } from './context/LanguageContext';
import LanguageSelector from './components/languageSelector/languageSelector';

const HomePage = lazy(() => import('./components/homePage/homePage'));

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <div className="App">
          <LanguageSelector />
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        </div>
      </LanguageProvider>
    </ChakraProvider>
  );
};

export default App; 