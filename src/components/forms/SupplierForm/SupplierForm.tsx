import { Form as FormikForm, Formik } from 'formik'
import CustomTextField from '../formComponents/CustomTextField';
import classNames from 'classnames';

import * as Yup from 'yup';

import styles from '../forms.module.scss';
import FormWrapper from '../formComponents/FormWrapper';
import { popupStore } from '../../../store/PopupStore';
import { changeTo } from '../../../script/scripts';
import { ISupplier } from '../../../types';
import { observer } from 'mobx-react-lite';

// interface Values {
//     name: string;
//     type: "product";
//     description: string;
//     measure: "шт";
//     price: number;
// }

function SupplierForm({ onSubmit }: { onSubmit: (arg?: any) => Promise<any> }) {

    return (
        <FormWrapper>
            <Formik
                initialValues={
                    popupStore.showPopup.initialFormData
                        ?
                        changeTo(popupStore.showPopup.initialFormData, '')
                        :
                        {
                            id: '',
                            name: "",
                            address: "",
                            inn: "",
                            email: "",
                            phone: "",
                            removed: false,
                            description:""
                        }
                }

                // validationSchema={Yup.object().shape({
                //     login: Yup.string().trim().required("Обязательно к заполнению"),
                //     password: Yup.string().trim().required("Обязательно к заполнению"),
                // })}

                onSubmit={(values: ISupplier) => {
                    onSubmit(changeTo(values, null))
                        .then(res => { if (res?.status === 200) popupStore.setShowPopup({ formType: '' }) })
                }}
            >
                {
                    (props) => {
                        const {
                            values
                        } = props

                        console.log("form data values", values)
                        return (
                            <>
                                <FormikForm>
                                    {/* 
                                        name: "",
                                        address: "",
                                        inn: "",
                                        email: "",
                                        phone: "",
                                        removed: false,
                                        description:""
                                    */}
                                    <CustomTextField formikProps={{ ...props }} name={'name'} label={'Имя'} />
                                    <CustomTextField formikProps={{ ...props }} name={'address'} label={'Юридический адрес'} />
                                    <CustomTextField formikProps={{ ...props }} name={'inn'} label={'ИНН'} />
                                    <CustomTextField formikProps={{ ...props }} name={'email'} label={'email'} />
                                    <CustomTextField formikProps={{ ...props }} name={'phone'} label={'Номер телефона'} />
                                    <CustomTextField formikProps={{ ...props }} name={'description'} label={'Описание'} />

                                    <button type="submit" className={classNames(styles.submit_btn, styles.form_btn)}>
                                        Сохранить
                                    </button>
                                </FormikForm>
                            </>
                        )
                    }
                }
            </Formik>
        </FormWrapper>
    )
}

export default observer(SupplierForm);