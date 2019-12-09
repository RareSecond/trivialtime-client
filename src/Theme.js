import React from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';
import reset from 'styled-reset';

injectGlobal`
  ${reset}

  * {
      box-sizing: border-box;
      font-family: 'Viga';
  }

  html, body, #root { 
      height: 100%;
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer */
      -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
      -webkit-user-select: none; /* Chrome, Safari, and Opera */
      -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
`;

const Theme = ({ children }) => (
  <ThemeProvider
    theme={{
      midnightBlue: '#2c3e50',
      clouds: '#ecf0f1',
      silver: '#bdc3c7',
      turquoise: '#1abc9c',
      wetAsphalt: '#34495e',
      alizarin: '#e74c3c',
    }}
  >
    {children}
  </ThemeProvider>
);

export default Theme;
