import { observer } from 'mobx-react-lite';
import React from 'react';
import { ICartItem } from '../../types/';
import CartItem from './CartItem';

function CartList({ item }: { item: ICartItem[] }) {
    return (
        <div>
            {item.map( cartItem => {
                return (
                    <CartItem key={cartItem.id} item={cartItem}/>
                )
            })}
        </div>
    )
}

export default observer(CartList)