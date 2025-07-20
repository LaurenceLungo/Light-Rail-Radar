import React from 'react';
import './App.css';
import HomePage from './components/homePage/homePage';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { LanguageProvider } from './context/LanguageContext';
import LanguageSelector from './components/languageSelector/languageSelector';
import PWAInstallBanner from './components/pwaInstallBanner/pwaInstallBanner';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <div className="App">
          <LanguageSelector />
          <HomePage />
          <PWAInstallBanner />
        </div>
      </LanguageProvider>
    </ChakraProvider>
  );
};

export default App; 