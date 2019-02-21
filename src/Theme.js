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
