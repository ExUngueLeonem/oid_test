import classNames from 'classnames';
import React from 'react'
import { popupStore } from '../../store/PopupStore';
import { userStore } from '../../store/UserStore'

import styles from './User.module.scss';

function SupplierItem() {
    const {
        id,
        name,
        inn,
        email,
        phone,
    } = userStore.userInfo

    return (
        <div>
            <>
                Поставщик
            </>

            <>
                <div>
                   Имя {userStore.currentSupplier.name}
                </div>
                <div>
                   id {userStore.currentSupplier.id}
                </div>
                <div>
                   Описание {userStore.currentSupplier.description}
                </div>
                <div>
                   Адрес {userStore.currentSupplier.address}
                </div>
                <div>
                   Телефон {userStore.currentSupplier.phone}
                </div>
                <div>
                   ИНН {userStore.currentSupplier.inn}
                </div>
                <div>
                   Email {userStore.currentSupplier.email}
                </div>
            </>

            <button
                className={classNames(styles.item_btn, styles.btn_change)}
                onClick={() => popupStore.setShowPopup({ formType: 'supplier', initialFormData: userStore.currentSupplier })}
            >
                Изменить данные
            </button>
        </div>
    )
}

export default SupplierItem