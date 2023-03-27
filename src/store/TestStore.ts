import {ConnectionManager} from 'http/test';
import {makeAutoObservable} from 'mobx';

class TestStore {

    integrations: any

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setIntegration(integrations: any) {
        this.integrations = integrations
    }

    async getIntegrations() {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get(`integrations`);
            this.setIntegration(res.data);
            return res;
        } catch (error: any) {
            console.log(error)
        }
    }

    async postIntegration() {
        const data = {
            "type": 3,
            "name": "IIKO Server",
            "login": "admin",
            "Password":"admin",
            "HostPort":"http://ffood.54fz.club/resto"
        }

        try {
            // this.setIntegration(res.data);
            return await ConnectionManager.GetInstance().GetClient().post(`integrations`, data);
        } catch (error: any) {
            console.log(error)
        }
    }


}

export const testStore = new TestStore();