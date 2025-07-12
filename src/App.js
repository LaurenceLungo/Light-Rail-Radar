import React, { useContext } from 'react';
import './App.css';
import HomePage from './components/homePage/homePage';
import { ChakraProvider, Button, HStack, Box } from "@chakra-ui/react";
import theme from "./theme";
import { LanguageProvider, LanguageContext } from './context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  return (
    <Box position="fixed" top="4" right="4" zIndex="999">
      <HStack spacing={1}>
        <Button 
          size="sm" 
          colorScheme="blue"
          variant={language === 'en' ? 'solid' : 'outline'}
          onClick={() => setLanguage('en')}
        >
          Eng
        </Button>
        <Button 
          size="sm"
          colorScheme="blue"
          variant={language === 'zh' ? 'solid' : 'outline'} 
          onClick={() => setLanguage('zh')}
        >
          中文
        </Button>
      </HStack>
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <div className="App">
          <LanguageSelector />
          <HomePage />
        </div>
      </LanguageProvider>
    </ChakraProvider>
  );
}

export default App;
