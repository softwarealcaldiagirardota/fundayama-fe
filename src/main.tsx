import { StrictMode } from 'react'
import { audience, clientId, domain } from "./utils/utils.tsx";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

import { ThemeProvider } from '@emotion/react';
import { theme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/login`,
        audience: audience,
      }}
    >
      
        <App />
      
    </Auth0Provider>
  </ThemeProvider>
)
