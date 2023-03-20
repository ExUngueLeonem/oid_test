import { makeAutoObservable } from 'mobx';
import { ConnectionManager } from '../http/axios';
import { ICart, ICartItem } from '../types';
import { errorCatch } from './Error';

class CartStore {

    cart: ICart = {
        id: "",
        suppliers: [
            {
                id: "",
                name: "",
                items: []
            }
        ]
    }

    get itemsForOrder() {
        let res = []

        for (let supplier of this.cart.suppliers) {
            for (let item of supplier.items) {
                res.push({ id: item.id, amount: item.amount, supplierId: supplier.id })
            }
        }

        return res
    }

    get cartItemIdArr() {
        let res = []

        for (let supplier of this.cart.suppliers) {
            for (let item of supplier.items) {
                res.push(item.id)
            }
        }

        return res
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setCart(cart: ICart) {
        this.cart = cart
    }

    async getUserCart() {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get('/basket');
            this.setCart(res.data)
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }


    async addToCart(id: string, amount: number,) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().post('/basket', { id, amount });
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async removeItemsFromCart(items: string[]) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().delete('/basket', { data: items });
            this.getUserCart();
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

}

export const cartStore = new CartStore();