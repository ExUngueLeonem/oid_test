import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';
import { ConnectionManager } from '../http/axios';
import { IRegistrationValues, IUser } from '../types';

import { errorCatch } from './Error';



class AuthStore {
    user: IUser = {
        userId: '',
        isSupplier: false,
    };

    isAuth = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setUser(user: IUser) {
        this.user = user;
        console.log("AuthStore", this.user)
    }

    setIsAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    async login({ login, password, isPersistent }: { login: string, password: string, isPersistent: boolean }) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().post('/Account/Auth', { login, password, isPersistent })
            const { userId, isSupplier } = res.data
            localStorage.setItem("token", res.data.token);
            this.setUser({ userId, isSupplier })
            this.setIsAuth(true);
            console.log("login res", res)
            return res
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async logout() {
        localStorage.removeItem('token');
        this.setIsAuth(false);
        console.log("logout", this.isAuth, localStorage.getItem('token'));
        window.location.href = '/auth';
    }

    async registration(values : IRegistrationValues) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().post('/Account',  values )
            return res
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

}

export const authStore = new AuthStore();