import { observer } from 'mobx-react-lite'
import React from 'react'
import { IOrder } from '../../types'

function OrderItem({ item }: { item: IOrder }) {

  const {
    id,
    number,
    correlationOrderId,
    created,
    delivered,
    status,
    customer,
    //  {
    //     id,
    //     name,
    //     inn,
    //     email,
    //     phone,
    //     address: {
    //         city,
    //         street,
    //         house,
    //         index,
    //         building,
    //         flat,
    //         entrance,
    //         floor,
    //         doorPhone
    //     }
    // },
    supplier,
    // {
    //     id,
    //     name,
    // }
  } = item

  return (
    <div key={item.id}>
      <div>
        {number}
      </div>
      <div>
        {correlationOrderId}
      </div>
      <div>
        {created}
      </div>
      <div>
        {delivered}
      </div>
      <div>
        {status}
      </div>

      <br />
    </div>
  )
}

export default observer(OrderItem)
