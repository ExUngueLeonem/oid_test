import { Field, Form as FormikForm, Formik } from 'formik'
import React, { useState } from 'react'
import CustomTextField from '../formComponents/CustomTextField';

import * as Yup from 'yup';

import styles from '../forms.module.scss';
import authStyles from './AuthForm.module.scss';

import { authStore } from '../../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../formComponents/FormWrapper';
import classNames from 'classnames';
import { IRegistrationValues } from '../../../types';
import Auth from './Auth';
import Registration from './Registration';

export default function AuthForm() {

  const navigate = useNavigate();

  const [formSwitch, setFormSwitch] = useState(true);

  return (
    <FormWrapper>
      <div className={authStyles.toggle_form_btn_wrapper}>
        <div className={classNames(authStyles.toggle_form_btn, formSwitch && authStyles.active)}
          onClick={() => setFormSwitch(true)}
        > Вход</div>
        <div className={classNames(authStyles.toggle_form_btn, !formSwitch && authStyles.active)}
          onClick={() => setFormSwitch(false)}
        > Регистрация</div>
      </div>

      {formSwitch ?
        <Auth />
        :
        <Registration />
      }
    </FormWrapper>


  )
}
