import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import CartList from '../components/Cart/CartList'
import Page from '../Layout/Page'
import { cartStore } from '../store/CartStore'
import { popupStore } from '../store/PopupStore'

// import styles from 

function CartPage() {

    useEffect(() => {
        cartStore.getUserCart();
    }, [])

    return (
        <Page>
            <button
                // className={styles.getOrder_btn}
                onClick={() => {
                    popupStore.setShowPopup({ formType: 'newOrder' })
                }}
            >
                Оформить заказ
            </button>

            {cartStore.cart.suppliers.map(supplier => <CartList key={supplier.id} item={supplier.items} />)}
        </Page>
    )
}

export default observer(CartPage)
