import axios from "axios";
import { authStore } from "store/AuthStore";
import ConfigurationManager from "../config";

export class ConnectionManager {
    static _instance: ConnectionManager;
    api;

    callback: any;

    constructor() {
        this.api = axios.create({
            withCredentials: false,
            baseURL: ConfigurationManager.GetInstance().getItem('TEST_API_BASE')
        })

        this.api.interceptors.response.use(
            (config) => {
                return config;
            },
            async (error) => {
                //перехватчик на ответ, если ошибка сервера
                // на обновление токена.
                const originalRequest = error.config;
                if (error.response.status === 401 && error.config && !error.config._isRetry) {
                    originalRequest._isRetry = true;
                    console.log("Пользователь не авторизован");

                    if (this.callback) this.callback();
                }
                throw error;
            }
        );

        // this.api.interceptors.request.use((config: any) => {
        //     if (authStore.token) {
        //         config.headers = { ...config.headers, authorization: `bearer ${authStore.token}` };
        //     }

        //     return config;
        // });
    }

    GetClient() {
        this.api.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
        return this.api;
    }

    static GetInstance() {
        return this._instance ?? (this._instance = new ConnectionManager());
    }
} 