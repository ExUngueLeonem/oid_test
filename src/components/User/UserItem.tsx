import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { popupStore } from '../../store/PopupStore';
import { userStore } from '../../store/UserStore'

import styles from './User.module.scss';

function UserItem() {
    const {
        id,
        name,
        inn,
        email,
        phone,
    } = userStore.userInfo

    return (
        <>
            <>
                User:
            </>

            <div>
                id {id}
            </div>
            <div>
                name  {name}
            </div>
            <div>
                inn  {inn}
            </div>
            <div>
                email   {email}
            </div>
            <div>
                phone  {phone}
            </div>

            <button
                className={classNames(styles.item_btn, styles.btn_change)}
                onClick={() => popupStore.setShowPopup({ formType: 'newSupplier' })}
            >
                Стать поставщиком
            </button>

        </>
    )
}

export default observer(UserItem);