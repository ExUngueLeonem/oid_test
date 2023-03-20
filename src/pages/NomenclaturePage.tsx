import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import ProductFrom from '../components/forms/ProductFrom/ProductFrom';
import NomenclatureList from '../components/Nomenclature/NomenclatureList';
import Page from '../Layout/Page'
import { nomenclatureStore } from '../store/NomenclatureStore'
import { popupStore } from '../store/PopupStore';
import { userStore } from '../store/UserStore';

function NomenclaturePage() {
    
    useEffect(() => {
        nomenclatureStore.fetchNomenclatureBySupplier(userStore.currentSupplier.id);
    }, [])

    console.log("nomenclatureList", toJS(nomenclatureStore.nomenclatureList))

    const buttons = [
        {
            text: "Создать товар",
            onClick: () => { popupStore.setShowPopup({formType: 'newProduct'}) }
        }
    ]
    // icon?: string;
    // text?: string;
    // onClick?: () => void;
    // buttons?: ButtonInfo[];
    // visible?: boolean;

    return (
        <Page buttons={buttons}>
            <NomenclatureList items={nomenclatureStore.nomenclatureList}/>
        </Page>
    )
}

export default observer(NomenclaturePage)