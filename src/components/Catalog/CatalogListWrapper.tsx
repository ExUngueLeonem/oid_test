import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { catalogStore } from '../../store/CatalogStore';
import CatalogList from './CatalogList';

import styles from './Catalog.module.scss';
import classNames from 'classnames';

function CatalogListWrapper() {
    const [search, setSearch] = useState('');
    const [count, setCount] = useState(30);
    const [page, setPage] = useState(1);

    //count=30&search=Конфеты&page=1

    const searchConfig = {
        search,
        count,
        page
    }

    return (
        <div>
            <div>
                <div className={styles.search_panel}>
                    <div className={styles.search_panel_title}>
                        Поиск:
                    </div>

                    <div>
                        <div className={styles.search_title}>
                            Название товара
                        </div>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>

                    <div>
                        <div className={styles.search_title}>
                            Число товаров
                        </div>
                        <input type="number" value={count} onChange={e => setCount(+e.target.value)} />
                    </div>

                    <div>
                        <div className={styles.search_title}>
                            Страница
                        </div>
                        <input type="number" value={page} onChange={e => setPage(+e.target.value)} />
                    </div>

                    <button
                        className={classNames(styles.item_btn, styles.btn_change)}
                        onClick={() => catalogStore.fetchNomenclatureBySearch({ page, count, search })}
                    >
                        Найти
                    </button>
                </div>

            </div>
            <CatalogList items={catalogStore.nomenclatureList} searchConfig={searchConfig} />
        </div>
    )
}

export default observer(CatalogListWrapper);