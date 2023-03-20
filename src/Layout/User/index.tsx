import { observer } from "mobx-react-lite";
import { authStore } from "../../store/AuthStore";
import { userStore } from "../../store/UserStore";
import "./User.scss";

function User() {

  return (
    <div className="user-panel">
      <div className="user-info">
        <div className="user-info-name">
          {userStore.userInfo.name}
        </div>
        <div className="user-info-name">
          {userStore.currentSupplier.name}
        </div>
        <div className="user-button">
          <button
            onClick={ () => authStore.logout() }
          >Выйти</button>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}

export default observer(User);