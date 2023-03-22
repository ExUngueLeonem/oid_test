import { ConnectionManager } from 'http/test';
import { makeAutoObservable } from 'mobx';

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
            let res = await ConnectionManager.GetInstance().GetClient().get(`integration`);
            this.setIntegration(res.data);
            return res;
        } catch (error: any) {
            console.log(error)
        }
    }

}

export const testStore = new TestStore();