import { Field } from 'formik'
import React, { FC } from 'react'

import styles from './CustomTextField.module.scss';

export default function CustomTextField({
    label = '',
    name,
    withError = false,
    formikProps,
    type = "text",
    checked = "false",
    min,
    max,
}: {
    label: string;
    name: string;
    withError?: boolean;
    formikProps?: any;
    type?: "text" | "number" | "password" | "checkbox";
    checked?: "true" | "false";
    min?: string;
    max?: string;
}) {

    const {
        values,
        errors,
        touched
    } = formikProps

    return (
        <>
            {/* {type !== "checkbox" ? */}
                <div className={styles.field_wrapper}>
                    <div className={styles.label_wrapper}>
                        <label htmlFor={name}> {label} </label>
                    </div>
                    <div>
                        <Field name={name} placeholder={label} type={type} className={styles.text_field} min={min} max={max}/>
                    </div>
                    {withError &&
                        <>
                            {errors[name] && touched[name] && (
                                <div className={styles.input_feedback}>{errors[name]}</div>
                            )}
                        </>
                    }
                </div>
                {/* :
                <div className={styles.field_wrapper}>
                    <div className={styles.label_wrapper}>
                        <label htmlFor={name}> {label} </label>
                    </div>
                    <div>
                        <Field name={name} placeholder={label} type={type} className={styles.text_field} checked={checked} value={}/>
                    </div>
                    {withError &&
                        <>
                            {errors[name] && touched[name] && (
                                <div className={styles.input_feedback}>{errors[name]}</div>
                            )}
                        </>
                    }
                </div> */}
            {/* } */}

        </>

    )
}
