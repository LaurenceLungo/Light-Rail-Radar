import React from 'react';
import './App.css';

import HomePage from './components/homePage/homePage';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <HomePage />
      </div>
    </ChakraProvider>
  );
}

export default App;
