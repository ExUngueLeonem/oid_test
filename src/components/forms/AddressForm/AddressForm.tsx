import { Form as FormikForm, Formik } from 'formik'
import CustomTextField from '../formComponents/CustomTextField';
import classNames from 'classnames';

import * as Yup from 'yup';

import styles from '../forms.module.scss';
import FormWrapper from '../formComponents/FormWrapper';
import { IAddressItem } from '../../../types';
import { popupStore } from '../../../store/PopupStore';
import { changeTo } from '../../../script/scripts';

// interface Values {
//     name: string;
//     type: "product";
//     description: string;
//     measure: "шт";
//     price: number;
// }


export default function AddressForm({ onSubmit }: { onSubmit: (arg?: any) => Promise<any> }) {

  return (
    <FormWrapper>
      <Formik
        initialValues={
          popupStore.showPopup.formType === 'address' ?
            changeTo(popupStore.showPopup.initialFormData, '')
            :
            {
              city: "",
              street: "",
              house: "",
              index: 0,
              building: "",
              flat: "",
              entrance: "",
              floor: "",
              doorPhone: ""
            }}
        // validationSchema={Yup.object().shape({
        //     login: Yup.string().trim().required("Обязательно к заполнению"),
        //     password: Yup.string().trim().required("Обязательно к заполнению"),
        // })}

        onSubmit={(values: IAddressItem) => {

          //  {
          //     "comment":"test6",
          //     "customerId":"{{customerId}}",
          //     "customerAddressId":"d920470a-9f31-4e6f-bacf-5548b969f082",
          //     "items":[
          //         { "id":"7a348c21-6f95-46a3-9453-0c6bf3150c9e", "supplierId":"d71b9861-9d05-40b0-93d9-03e7b9040ca1","amount":7 }
          //     ]
          //  }

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
                  <CustomTextField formikProps={{ ...props }} name={'city'} label={'Город'} />
                  <CustomTextField formikProps={{ ...props }} name={'street'} label={'Улица'} />
                  <CustomTextField formikProps={{ ...props }} name={'house'} label={'Номер дома'} />
                  <CustomTextField formikProps={{ ...props }} name={'index'} label={'Индекс'} />
                  <CustomTextField formikProps={{ ...props }} name={'building'} label={'Корпус'} />
                  <CustomTextField formikProps={{ ...props }} name={'flat'} label={'Квартира'} />
                  <CustomTextField formikProps={{ ...props }} name={'entrance'} label={'Подъезд'} />
                  <CustomTextField formikProps={{ ...props }} name={'floor'} label={'Этаж'} />
                  <CustomTextField formikProps={{ ...props }} name={'doorPhone'} label={'Номер домофона'} />

                  <button type="submit" className={classNames(styles.submit_btn, styles.form_btn)}>
                    Отправить
                  </button>
                </FormikForm>
              </>
            )
          }
        }
      </Formik>
    </FormWrapper >
  )
}
