import { observer } from 'mobx-react-lite';
import { ICatalogItem } from '../../types';
import NomenclatureItem from './NomenclatureItem';

import styles from './Nomenclature.module.scss';

type Props = {
  items: ICatalogItem[];
  readonly?: boolean;
}

function NomenclatureList({ items, readonly = false }: Props) {
  return (
    <div className={styles.item_list}>
      {items?.map(item => (
        <NomenclatureItem key={item.id} item={item} readonly={readonly}/>
      ))}
    </div>
  )
}

export default observer(NomenclatureList);