import { Field, Form as FormikForm, Formik } from 'formik'
import CustomTextField from '../formComponents/CustomTextField';

import * as Yup from 'yup';
import classNames from 'classnames';

import { authStore } from '../../../store/AuthStore';

import styles from '../forms.module.scss';

import { IRegistrationValues } from '../../../types';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const navigate = useNavigate();
    
    return (
        <Formik
            initialValues={{
                name: "",
                phone: "",
                email: "",
                password: ""
            }}

            validationSchema={Yup.object().shape({
                // login: Yup.string().trim().required("Обязательно к заполнению"),
                // password: Yup.string().trim().required("Обязательно к заполнению"),
            })}

            onSubmit={
                (values: IRegistrationValues) => {
                    authStore.registration(values)//.then((res) => { if (res?.status === 200) navigate("/user") })
                }
            }
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
                                <CustomTextField formikProps={{ ...props }} name={'name'} label={'Логин'} />
                                <CustomTextField formikProps={{ ...props }} name={'phone'} label={'Телефон'} />
                                <CustomTextField formikProps={{ ...props }} name={'email'} label={'Email'} />
                                <CustomTextField formikProps={{ ...props }} name={'password'} label={'Пароль'} type={"password"} />

                                <button type="submit" className={classNames(styles.submit_btn, styles.form_btn)}>
                                    Войти
                                </button>
                            </FormikForm>
                        </>
                    )
                }
            }
        </Formik>
    )
}

export default Registration