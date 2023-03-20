import classNames from 'classnames';
import { observer } from 'mobx-react-lite'
import React from 'react'
import { cartStore } from '../../store/CartStore';
import { ICartItem } from '../../types'

import styles from './Cart.module.scss';

function CartItem({ item }: { item: ICartItem }) {

    const {
        id,
        name,
        price,
        cost,
        image,
        amount,
    } = item

    return (
        <div key={item.id} className={styles.item} >
            name {name}
            price {price}
            cost {cost}
            <div>
                image {image}
            </div>
            <div>
                amount {amount}
            </div>

            <div className={styles.btn_wrapper}>

                <button
                    className={classNames(styles.item_btn, styles.btn_delete)}
                    onClick={() => {
                        cartStore.removeItemsFromCart([id])
                    }}
                >
                    Удалить
                </button>

            </div>
        </div>
    )
}

export default observer(CartItem)