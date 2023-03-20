import { observer } from 'mobx-react-lite'
import React from 'react'

import { addressesStore } from '../../store/AddressesStore'
import AddressItem from './AddressItem'

import styles from './Address.module.scss';

function AddressList() {
    return (
        <>
            <table className={styles.address_table}>
                <thead>
                    <tr>
                        <th>
                            <div>
                                Город
                            </div>
                        </th>
                        <th>
                            <div>
                                Улица
                            </div>
                        </th>
                        <th>
                            <div>
                                Номер дома
                            </div>
                        </th>
                        <th>
                            <div>
                                Индекс
                            </div>
                        </th>
                        <th>
                            <div>
                                Корпус
                            </div>
                        </th>
                        <th>
                            <div>
                                Квартира
                            </div>
                        </th>
                        <th>
                            <div>
                                Подъезд
                            </div>
                        </th>
                        <th>
                            <div>
                                Этаж
                            </div>
                        </th>
                        <th>
                            <div>
                                Номер домофона
                            </div>
                        </th>
                        <th>
                            <div>
                            </div>
                        </th>
                        <th>
                            <div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {addressesStore.addressesData.addresses.map(item => <AddressItem key={item.id} item={item} />)}
                </tbody>
            </table>
        </>
    )
}

export default observer(AddressList)