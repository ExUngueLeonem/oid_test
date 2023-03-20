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

      <Route path="authentication/callback" element={<Test />} />
      <Route path="authentication/silent-callback" element={<Test />} />
    </Routes>
  );
  // { title: "Кабинет поставщика", path: "/supplier", },
  // { title: "Номенклатура", path: "/nomenclature" },
  // { title: "Входящие заказы", path: "/incomingOrder" },
  // { title: "Отправленные заказы", path: "/outcomingOrder" },
  // { title: "Корзина", path: "/cart" },
  // { title: "Мои адреса", path: "/address" },


}

export default observer(App);
