import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import AddressList from '../components/Address/AddressList';
import Page from '../Layout/Page'
import { addressesStore } from '../store/AddressesStore'
import { popupStore } from '../store/PopupStore';

function AddressPage() {

    useEffect(() => {
        addressesStore.fetchAddresses();
    }, [])

    const buttons = [
        {
            text: "Добавить адрес",
            onClick: () => popupStore.setShowPopup({formType: 'newAddress'})
        }
    ]

    return (
        <Page buttons={buttons}>
            <AddressList/>
        </Page>
    )
}

export default observer(AddressPage);