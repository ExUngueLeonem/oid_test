import { makeAutoObservable } from "mobx";
import { ConnectionManager } from "../http/axios";
import { IOrder, IOutcomingOrder } from "../types";
import { cartStore } from "./CartStore";
import { errorCatch } from "./Error";

class OrderStore {
    orderList: IOrder[] = [{
        id: "",
        number: 0,
        correlationOrderId: "",
        created: "",
        delivered: "",
        status: "",
        customer: {
            id: "",
            name: "",
            inn: "",
            email: "",
            phone: "",
            address: {
                city: "",
                street: "",
                house: "",
                index: 0,
                building: "",
                flat: "",
                entrance: "",
                floor: "",
                doorPhone: "",
            }
        },
        supplier: {
            id: "",
            name: "",
        }
    }]

    setOrderList(orderList: IOrder[]) {
        this.orderList = orderList
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    //       /orders?dateFrom=2022-10-12&dateTo=2023-12-31&type=Outgoing

    async getOrders({ dateFrom, dateTo, type }: { dateFrom?: string; dateTo?: string; type?: string; }) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get(`/orders`, { params: { dateFrom, dateTo, type } });
            this.setOrderList(res.data);
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async createOrder(orderData: IOutcomingOrder) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().post(`/orders`, orderData);
            await cartStore.removeItemsFromCart(cartStore.cartItemIdArr)
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }
}

export const orderStore = new OrderStore();