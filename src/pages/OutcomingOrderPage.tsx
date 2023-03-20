import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import OrderItem from '../components/OrderItem'
import Page from '../Layout/Page'
import { orderStore } from '../store/OrderStore'

function OutcomingOrderPage() {

    useEffect(() => {
        orderStore.getOrders({ dateFrom: "2021-10-12", dateTo: "2023-12-31", type: "Outgoing" })
    }, [])

    return (
        <Page>
            {orderStore.orderList.length > 0 && orderStore.orderList[0].id ?
                <>
                    {orderStore.orderList.map(item => <OrderItem key={item.id} item={item} />)}
                </>
                :
                <>
                    нет заказов
                </>
            }
        </Page>
    )
}

export default observer(OutcomingOrderPage);