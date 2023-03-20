import { observer } from 'mobx-react-lite';
import React from 'react';
import { addressesStore } from '../../store/AddressesStore';
import { nomenclatureStore } from '../../store/NomenclatureStore';
import { orderStore } from '../../store/OrderStore';
import { popupStore } from '../../store/PopupStore';
import { userStore } from '../../store/UserStore';
import { ICatalogItem } from '../../types';
import AddressForm from './AddressForm/AddressForm';
import OrderForm from './OrderForm/OrderForm';
import ProductFrom from './ProductFrom/ProductFrom';
import SupplierForm from './SupplierForm/SupplierForm';

const ShowForm = () => {

    const { formType } = popupStore.showPopup

    switch (formType) {
        case "product": return <ProductFrom onSubmit={(values: ICatalogItem) : Promise<any> => nomenclatureStore.updateProduct(values)} />
        case "newProduct": return <ProductFrom onSubmit={(values: ICatalogItem) : Promise<any> => nomenclatureStore.createProduct(values)} />

        case "newOrder": return <OrderForm onSubmit={(values) : Promise<any> => orderStore.createOrder(values)} />

        case "address": return <AddressForm onSubmit={(values) : Promise<any> => addressesStore.updateAddress(values)} />
        case "newAddress": return <AddressForm onSubmit={(values) : Promise<any> => addressesStore.createAddress(values)} />

        case "supplier": return <SupplierForm onSubmit={(values) : Promise<any> => userStore.updateSupplier(values)} />
        case "newSupplier": return <SupplierForm onSubmit={(values) : Promise<any> => userStore.createSupplier(values)} />

        
        default: return <></>
    }

};

export default observer(ShowForm);