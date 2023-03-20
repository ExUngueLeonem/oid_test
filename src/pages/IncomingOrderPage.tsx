import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import OrderItem from '../components/OrderItem'
import Page from '../Layout/Page'
import { orderStore } from '../store/OrderStore'

function IncomingOrderPage() {
    useEffect(() => {
        orderStore.getOrders({ dateFrom: "2022-10-12", dateTo: "2023-12-31", type: "Incoming" })
    }, [])

    return (
        <Page>
            {orderStore.orderList.length > 0 && orderStore.orderList[0].id ?
                <>
                    {orderStore.orderList.map(item => <OrderItem item={item} key={item.id}/>)}
                </>
                :
                <>
                    нет заказов
                </>
            }
        </Page>
    )
}

export default observer(IncomingOrderPage);