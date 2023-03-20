import * as React from 'react';
import { useEffect } from "react";
import { observer } from 'mobx-react-lite';

import Menu, { RouteInfo } from "./Menu";
import User from "./User";
import "./Page.scss";
import ShowForm from '../components/forms/ShowForm';
import { userStore } from '../store/UserStore';

const pages: RouteInfo[] = [
  {
    title: "Кабинет пользователя", path: "/user",
    // routes: [
    // { title: "Создать меню", path: "newMenu" },
    // ],
  },
  { title: "Кабинет поставщика", path: "/supplier", },
  { title: "Мои адреса", path: "/address" },
  { title: "Моя номенклатура", path: "/nomenclature" },
  { title: "Входящие заказы", path: "/incomingOrder" },
  { title: "Отправленные заказы", path: "/outcomingOrder" },
  { title: "Каталог", path: "/catalog" },
  { title: "Корзина", path: "/cart" },
];

export type ButtonInfo = {
  icon?: string;
  text?: string;
  onClick?: () => void;
  buttons?: ButtonInfo[];
  visible?: boolean;
};

function Button({ icon, text, buttons = [], onClick }: ButtonInfo) {
  return buttons.length > 0 ? (
    <div className="multibutton">
      <div className="content">
        <i className={icon} />
        <span>{text}</span>
      </div>
      <div className="buttons">
        {buttons.map((button, i) => (
          <Button key={`bt_${i}`} {...button} />
        ))}
      </div>
    </div>
  ) : (
    <button onClick={onClick}>
      <div className="content">
        <i className={icon} />
        <span>{text}</span>
      </div>
    </button>
  );
}

const Page = ({
  children,
  title,
  buttons,
  className,
  routes = pages,
}: {
  title?: string;
  children?: React.ReactNode;
  buttons?: ButtonInfo[];
  className?: string;
  routes?: RouteInfo[];
}) => {

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (authStore.isAuth === false) navigate("/");
  // })

  useEffect(() => {
      userStore.getUserInfo();
      userStore.getCurrentSupplier();
  }, [])

  return (
    <>
      {/* <ShowForm /> */}
      {/* <Message /> */}
      <ShowForm/>
      <div className={`page ${className ?? ""}`}>
        <div className="navigation">
          <Menu pages={routes} logo={"AgroSale"} title={title} />
        </div>
        <div className="header">
          <div className="buttons">
            {buttons && buttons.filter((x) => x.visible ?? true).map((button, i) => <Button key={`bt_${i}`} {...button} />)}
          </div>
          <User />
        </div>
        <div className="content">{children}</div>
      </div>
    </>
  );
}

export default observer(Page);
