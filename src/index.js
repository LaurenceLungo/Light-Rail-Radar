import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from "./theme";
import { ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
