import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import ConfigurationManager from './config';
import { Route, Routes } from 'react-router-dom';

import SupplierPage from './pages/SupplierPage';

import NomenclaturePage from './pages/NomenclaturePage';
import IncomingOrderPage from './pages/IncomingOrderPage';
import OutcomingOrderPage from './pages/OutcomingOrderPage';
import CartPage from './pages/CartPage';
import UserPage from './pages/UserPage';
import AddressPage from './pages/AddressPage';
import { observer } from 'mobx-react-lite';
import CatalogPage from './pages/CatalogPage';
import Test from './pages/test';
import { useOidcAccessToken } from '@axa-fr/react-oidc';
import Integrations from 'components/test/Integrations';

import { authStore } from 'store/AuthStore';

function App() {
  const [isInitialized, setIsInitialazed] = useState(false);
  const [error, setError] = useState('');

  const { accessToken } = useOidcAccessToken();

  useEffect(() => {
    if (!!accessToken) {
      authStore.setToken(accessToken);
    }
  }, [accessToken]);


  useEffect(() => {
    if (!isInitialized) {
      ConfigurationManager.GetInstance()
        .fetch()
        .then(() => setIsInitialazed(true))
        .catch(() => setError("Ошибка загрузки конфигурации"))
    }
  }, [isInitialized])

  // console.log(accessToken)

  return !isInitialized || error ? (
    <div>
      Спиннер загрузки
    </div>
  ) : (

    <Routes>
      <Route path="/" element={<UserPage />} />
      {/* <Route path="auth" element={<AuthPage />} /> */}
      <Route path="user" element={<UserPage />} />
      <Route path="supplier" element={<SupplierPage />} />
      <Route path="nomenclature" element={<NomenclaturePage />}         />
      <Route path="incomingOrder" element={<IncomingOrderPage />} />
      <Route path="outcomingOrder" element={<OutcomingOrderPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="address" element={<AddressPage />} />
      <Route path="catalog" element={<CatalogPage />} />

      <Route path="authentication/callback" element={<Test />} />
      <Route path="authentication/silent-callback" element={<Test />} />
      <Route path="test" element={<Test />} />
      <Route path="test/integrations" element={<Integrations />} />
    </Routes>

  );

}

export default observer(App);
