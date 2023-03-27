import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { OidcProvider, OidcSecure } from '@axa-fr/react-oidc';

const OIDC_CLIENT_ID = "service-spa";
const OIDC_AUTHORITY = "https://tun-dev03.foodof.ru";

const OIDC_REDIRECT_URL = "http://localhost:3001/authentication/callback"; //используется в запросе на получение токена
const OIDC_REDIRECT_URL_SILENT = "http://localhost:3001/authentication/silent-callback";

const OIDC_SCOPE = "openid profile phone offline_access service-api:access";
// const API_BASE = "http://192.168.210.244:5002"

const configuration = {
  client_id: OIDC_CLIENT_ID,
  redirect_uri: OIDC_REDIRECT_URL ?? `${window.location.origin}/authentication/callback`,
  silent_redirect_uri: OIDC_REDIRECT_URL_SILENT ?? `${window.location.origin}/authentication/silent-callback`,
  scope: OIDC_SCOPE,
  authority: OIDC_AUTHORITY,
  storage: localStorage,
  // service_worker_relative_url: "/OidcServiceWorker.js",
  service_worker_only: false,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <OidcProvider configuration={configuration}>
      <OidcSecure>
        <App />
      </OidcSecure>
    </OidcProvider>
  </BrowserRouter>
);

reportWebVitals();
