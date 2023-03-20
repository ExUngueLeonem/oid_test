import classNames from 'classnames';
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { cartStore } from '../../store/CartStore';
import { nomenclatureStore } from '../../store/NomenclatureStore';
import { popupStore } from '../../store/PopupStore';
import { ICatalogItem } from '../../types'

import styles from './Catalog.module.scss';

type Props = {
  item: ICatalogItem;
}

function CatalogItem({ item }: Props) {

  const [amount, setAmount] = useState(0);

  const increment = () => {
    setAmount((state) => {
      return ++state
    })
  }

  const decrement = () => {
    if (amount <= 0) { setAmount(0); return; }

    setAmount((state) => {
      return state - 1
    })
  }

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

      <div className={styles.btn_wrapper}>
        <div className={styles.amount_wrapper}>
          <button onClick={() => decrement()}>
            -
          </button>
          <input min='0' type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
          <button onClick={() => increment()}>
            +
          </button>
        </div>

        <button
          className={classNames(styles.item_btn, styles.btn_change)}
          onClick={() => {
            if (amount > 0) {
              cartStore.addToCart(item.id, amount);
              setAmount(0);
            }
          }}
        >
          Добавить в корзину
        </button>
      </div>


    </div>)
}

export default observer(CatalogItem);
