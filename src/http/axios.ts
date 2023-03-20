import axios from "axios";
import ConfigurationManager from "../config";

export class ConnectionManager {
    static _instance: ConnectionManager;
    api;

    callback: any;

    constructor() {
        this.api = axios.create({
            withCredentials: false,
            baseURL: ConfigurationManager.GetInstance().getItem('API_BASE')
        })
        
        this.api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        // this.api.defaults.headers.common['withCredentials'] = true;

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
    }

    GetClient() {
        this.api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        return this.api;
    }

    static GetInstance() {
        return this._instance ?? (this._instance = new ConnectionManager());
    }
} 