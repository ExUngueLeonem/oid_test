import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import ConfigurationManager from './config';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

import SupplierPage from './pages/SupplierPage';

import NomenclaturePage from './pages/NomenclaturePage';
import IncomingOrderPage from './pages/IncomingOrderPage';
import OutcomingOrderPage from './pages/OutcomingOrderPage';
import CartPage from './pages/CartPage';
import UserPage from './pages/UserPage';
import AddressPage from './pages/AddressPage';
import { observer } from 'mobx-react-lite';
import { authStore } from './store/AuthStore';
import CatalogPage from './pages/CatalogPage';
import Test from './pages/test';
import { OidcProvider, OidcSecure } from '@axa-fr/react-oidc';



const OIDC_CLIENT_ID = "service-spa";
const OIDC_AUTHORITY = "http://192.168.210.244:5072";
const OIDC_REDIRECT_URL = "http://192.168.210.245:3000/authentication/callback";
const OIDC_REDIRECT_URL_SILENT = "http://192.168.210.245:3000/authentication/silent-callback";
const OIDC_SCOPE = "openid profile phone offlineAccess service-api:access";
const API_BASE = "http://192.168.210.244:5002"

const configuration = {
  client_id: OIDC_CLIENT_ID,
  redirect_uri: OIDC_REDIRECT_URL ?? `${window.location.origin}/authentication/callback`,
  silent_redirect_uri: OIDC_REDIRECT_URL_SILENT ?? `${window.location.origin}/authentication/silent-callback`,
  scope: OIDC_SCOPE,
  authority: OIDC_AUTHORITY,
  storage: localStorage,
  service_worker_relative_url: "/OidcServiceWorker.js",
  service_worker_only: false,
};

function App() {
  const [isInitialized, setIsInitialazed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isInitialized) {
      ConfigurationManager.GetInstance()
        .fetch()
        .then(() => setIsInitialazed(true))
        .catch(() => setError("Ошибка загрузки конфигурации"))
    }
  }, [isInitialized])

  return !isInitialized || error ? (
    <div>
      Спиннер загрузки
    </div>
  ) : (
    <OidcProvider configuration={configuration}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="supplier" element={<SupplierPage />} />
        <Route path="nomenclature" element={<NomenclaturePage />} />
        <Route path="incomingOrder" element={<IncomingOrderPage />} />
        <Route path="outcomingOrder" element={<OutcomingOrderPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="catalog" element={<CatalogPage />} />

        {/* <Route path="authentication/callback" element={<Test />} />
        <Route path="authentication/silent-callback" element={<Test />} /> */}
        <Route path="test" element={<Test />} />
      </Routes>
    </OidcProvider >
  );
  // { title: "Кабинет поставщика", path: "/supplier", },
  // { title: "Номенклатура", path: "/nomenclature" },
  // { title: "Входящие заказы", path: "/incomingOrder" },
  // { title: "Отправленные заказы", path: "/outcomingOrder" },
  // { title: "Корзина", path: "/cart" },
  // { title: "Мои адреса", path: "/address" },


}

export default observer(App);
