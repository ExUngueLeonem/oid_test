import { makeAutoObservable } from "mobx";
import { ConnectionManager } from "../http/axios";
import { IAddresses, IAddressItem } from "../types";
import { errorCatch } from "./Error";

class AddressesStore {

    addressesData: IAddresses = {
        addresses: [
            // {
            //     id: "",
            //     city: "",
            //     street: "",
            //     house: "",
            //     index: 0,
            //     building: "",
            //     flat: "",
            //     entrance: "",
            //     floor: "",
            //     doorPhone: "",
            // }
        ],
        default: "",
        id: "",
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setAddresses(addressesData: IAddresses) {
        this.addressesData = addressesData
    }

    async fetchAddresses() {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get('/address')
            this.setAddresses(res.data)
            return res
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async updateAddress(address: IAddressItem) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().post('/address', address)
            this.setAddresses(res.data)
            return res
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async createAddress(address: IAddressItem) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().post('/address', address)
            this.setAddresses(res.data)
            return res
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async deleteAddress(id?: string) {
        if (!id) return
        try {
            let res = await ConnectionManager.GetInstance().GetClient().delete('/address', { data: { id } })
            this.setAddresses(
                {
                    addresses: this.addressesData.addresses.filter((item: IAddressItem) => item.id !== id),
                    default: this.addressesData.default,
                    id: this.addressesData.id,
                })

            return res
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }
}

export const addressesStore = new AddressesStore();