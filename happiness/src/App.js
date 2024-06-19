// import { useState, useEffect } from 'react';
// import { useGetDocs } from './lib/firebase/db';
import Layout from './components/Layout';
// import { I18n } from 'react-polyglot';
import { BrowserRouter } from 'react-router-dom';
import theme from '../src/lib/theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
