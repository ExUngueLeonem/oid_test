import classNames from 'classnames';
import { observer } from 'mobx-react-lite'
import React from 'react'
import { nomenclatureStore } from '../../store/NomenclatureStore';
import { popupStore } from '../../store/PopupStore';
import { ICatalogItem } from '../../types'

import styles from './Nomenclature.module.scss';

type Props = {
  item: ICatalogItem;
  readonly: boolean;
}

function NomenclatureItem({ item, readonly }: Props) {
  return (
    <div key={item.id} className={styles.item} >
      {/* 
        parent?: string;
        name: string;
        measure: string;
        description?: string;
        type?: string;
        images?: string;
        article?: number | null;
        removed?: boolean;
        price?: number;
        supplierId?: string;
        id?: string; 
      */}
      {item.name}
      {item.type}
      {item.article}
      {item.price}
      {!readonly &&
      
        <div className={styles.btn_wrapper}>
          {item.removed ?? "Удален"}
          <button
            className={classNames(styles.item_btn, styles.btn_change)}
            onClick={() => popupStore.setShowPopup({ formType: 'product', initialFormData: item })}
          >
            Изменить
          </button>

          {/* 
        <button
        className={classNames(styles.item_btn, styles.btn_restore)}
        onClick={() => { nomenclatureStore.restoreProduct(item) }}
        >
        Восстановить
        </button> 
      */}

          <button
            className={classNames(styles.item_btn, styles.btn_delete)}
            onClick={() => { nomenclatureStore.deleteProduct(item) }}
          >
            Удалить
          </button>

        </div>

      }
    </div>)
}

export default observer(NomenclatureItem);
