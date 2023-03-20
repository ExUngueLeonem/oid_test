import { makeAutoObservable } from 'mobx';
import { ConnectionManager } from '../http/axios';
import { IUserInfo, ISupplier } from '../types';
import { errorCatch } from './Error';

class UserStore {

    userInfo: IUserInfo = {
        id: "",
        name: "",
        inn: "",
        email: "",
        phone: ""
    }

    currentSupplier: ISupplier = {
        name: "",
        address: "",
        phone: "",
        removed: false,
        inn: "",
        email: "",
        description: "",
        id: ""
    }

    supplierList: ISupplier[] = [
        {
            name: "",
            address: "",
            phone: "",
            removed: false,
            inn: "",
            email: "",
            description: "",
            id: ""
        }
    ]

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setUserInfo(userInfo: IUserInfo) {
        this.userInfo = userInfo
    }

    setCurrentSupplier(currentSupplier: ISupplier) {
        this.currentSupplier = currentSupplier
    }

    setSupplierList(supplierList: ISupplier[]) {
        this.supplierList = supplierList
    }

    async getUserInfo() {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get('/user');
            this.setUserInfo(res.data)
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async getSuppliersList() {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get('/suppliers');
            this.setSupplierList(res.data)
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async getCurrentSupplier() {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get('suppliers/current');
            this.setCurrentSupplier(res.data)
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async createSupplier(supplier: ISupplier) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().post('suppliers', supplier);
            this.setCurrentSupplier(res.data)
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async updateSupplier(supplier: ISupplier) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().post('suppliers', supplier);
            this.setCurrentSupplier(res.data)
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

}

export const userStore = new UserStore();