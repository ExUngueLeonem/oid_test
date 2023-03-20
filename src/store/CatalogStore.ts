import { makeAutoObservable } from "mobx";
import { ConnectionManager } from "../http/axios";
import { ICatalogItem } from "../types";
import { errorCatch } from "./Error";
import { userStore } from "./UserStore";

class CatalogStore {

    nomenclatureList: ICatalogItem[] = [
        // {
        //     parent: "",
        //     name: "",
        //     description: "",
        //     type: "",
        //     measure: "",
        //     images: "",
        //     article: 0,
        //     removed: false,
        //     price: 0,
        //     supplierId: "",
        //     id: ""
        // }
    ]

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setNomenclatureList(nomenclatureList: ICatalogItem[]) {
        this.nomenclatureList = nomenclatureList
    }

    getNomenclatureItem(id: string) {
        return this.nomenclatureList.find( item => item.id === id)
    }

    async fetchNomenclatureBySupplier(supplierId: string) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get(`/catalog/${supplierId}`);
            this.setNomenclatureList(res.data);
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async fetchNomenclatureBySearch({ page, count, search }: { page?: number; count?: number, search?: string }) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get(`/catalog`, { params: { page, count, search } });
            this.setNomenclatureList(res.data);
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }

    async fetchMoreItemsBySearch({ page, count, search }: { page?: number; count?: number, search?: string }) {
        try {
            let res = await ConnectionManager.GetInstance().GetClient().get(`/catalog`, { params: { page, count, search } });
            this.setNomenclatureList([...this.nomenclatureList, res.data]);
            return res;
        } catch (error: any) {
            if (error) errorCatch(error);
        }
    }
}

export const catalogStore = new CatalogStore();