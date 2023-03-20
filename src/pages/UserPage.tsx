import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import SupplierItem from '../components/User/SupplierItem';
import UserItem from '../components/User/UserItem';
import Page from '../Layout/Page'
import { authStore } from '../store/AuthStore'
import { userStore } from '../store/UserStore';

function UserPage() {

    useEffect(() => {
        userStore.getUserInfo();
        userStore.getCurrentSupplier();
    }, [])


    return (
        <Page>
            <UserItem />
            {userStore.currentSupplier.id &&
                <SupplierItem />
            }
        </Page>
    )
}

export default observer(UserPage);