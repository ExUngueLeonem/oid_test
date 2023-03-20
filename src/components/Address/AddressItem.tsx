import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { addressesStore } from '../../store/AddressesStore';
import { popupStore } from '../../store/PopupStore';
import { IAddressItem } from '../../types';

import styles from './Address.module.scss';

function AddressItem({ item }: { item: IAddressItem }) {

    const {
        id,
        city,
        street,
        house,
        index,
        building,
        flat,
        entrance,
        floor,
        doorPhone,
    } = item

    return (
        <>
            <tr>
                <td>
                    <div>
                        {city}
                    </div>
                </td>
                <td>
                    <div>
                        {street}
                    </div>
                </td>
                <td>
                    <div>
                        {house}
                    </div>
                </td>
                <td>
                    <div>
                        {index}
                    </div>
                </td>
                <td>
                    <div>
                        {building}
                    </div>
                </td>
                <td>
                    <div>
                        {flat}
                    </div>
                </td>
                <td>
                    <div>
                        {entrance}
                    </div>
                </td>
                <td>
                    <div>
                        {floor}
                    </div>
                </td>
                <td>
                    <div>
                        {doorPhone}
                    </div>
                </td>
                <td>
                    <div>
                        <button 
                        className={classNames(styles.item_btn, styles.btn_change)}
                        onClick={() => popupStore.setShowPopup({formType: 'address', initialFormData: item})}
                        >
                            Изменить
                        </button>
                    </div>
                </td>
                <td>
                    <div>
                        <button
                            className={classNames(styles.item_btn, styles.btn_delete)}
                            onClick={() => addressesStore.deleteAddress(id)}
                        >
                            Удалить
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default observer(AddressItem);