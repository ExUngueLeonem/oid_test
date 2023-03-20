import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import Page from '../Layout/Page'
import { authStore } from '../store/AuthStore';
import { userStore } from '../store/UserStore';

function SupplierPage() {

    useEffect(() => {
        userStore.getSuppliersList();
    }, [])


    return (
        <Page>
            {userStore.supplierList?.map(item => {
                const {
                    name,
                    address,
                    phone,
                    removed,
                    inn,
                    email,
                    description,
                    id,
                } = item

                return (
                    <div key={item.id}>
                        <div>
                            {name}
                        </div>
                        <div>
                            {address}
                        </div>
                        <div>
                            {phone}
                        </div>
                        <div>
                            {removed}
                        </div>
                        <div>
                            {inn}
                        </div>
                        <div>
                            {email}
                        </div>
                        <div>
                            {description}
                        </div>
                        <div>
                            {id}
                        </div>
                        <br />
                    </div>
                )
            })}
        </Page>
    )
}

export default observer(SupplierPage);

/* 
    name: string;
    address: string;
    phone: string;
    removed: boolean;
    inn: string;
    email: string;
    description: string;
    id: string;
*/
