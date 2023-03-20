import classNames from 'classnames';
import { Field, Form as FormikForm, Formik } from 'formik'
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { authStore } from '../../../store/AuthStore';
import CustomTextField from '../formComponents/CustomTextField';

import styles from '../forms.module.scss';


interface IAuth {
    login: string;
    password: string;
    isPersistent: boolean;
  }

function Auth() {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                // login: '',
                // password: '',
                // isPersistent: true,

                // login: '+79885515860',
                // password: 'Flagman_123',
                // isPersistent: true,

                login: '+79185625430',
                password: '1825asdASD=',
                isPersistent: true,
            }}

            validationSchema={Yup.object().shape({
                login: Yup.string().trim().required("Обязательно к заполнению"),
                password: Yup.string().trim().required("Обязательно к заполнению"),
            })}

            onSubmit={
                (values: IAuth) => {
                    authStore.login(values).then((res) => { if (res?.status === 200) navigate("/user") })
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
                                <CustomTextField formikProps={{ ...props }} name={'login'} label={'Логин'} />
                                <CustomTextField formikProps={{ ...props }} name={'password'} label={'Пароль'} type={"password"} />
                                <CustomTextField formikProps={{ ...props }} name={'isPersistent'} label={'Запомнить меня'} type={"checkbox"} />
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

export default observer(Auth);