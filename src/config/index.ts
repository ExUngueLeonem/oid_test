export default class ConfigurationManager {
    static _instance: ConfigurationManager;

    _config = {
        AUTH_API: '',
        API_BASE: ''
    };

    async fetch(filename = '/config.json') {
        const r = await fetch(filename);
        const json = await r.json();
        this._config = json;

        console.log(this._config);
    }

    getItem(key: "AUTH_API" | "API_BASE" , defaultValue = '') {
        return this._config[key] ?? defaultValue;
    }

    static GetInstance() {
        if (!this._instance) {
            this._instance = new ConfigurationManager();
        }

        return this._instance;
    }

}