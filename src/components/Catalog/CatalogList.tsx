import { observer } from 'mobx-react-lite';
import { ICatalogItem } from '../../types';
import CatalogItem from './CatalogItem';

import styles from './Catalog.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { catalogStore } from '../../store/CatalogStore';
import { useState } from 'react';

type Props = {
  items: ICatalogItem[];
  searchConfig: {
    search?: string;
    count?: number;
    page?: number;
  }
}

// function CatalogList({ items }: Props) {
//   return (
//     <div className={styles.item_list}>
//       {items?.map(item => (
//         <CatalogItem key={item.id} item={item} />
//       ))}
//     </div>
//   )
// }

// export default observer(CatalogList);



// function CatalogList({ items, searchConfig }: Props) {

//   const [page, setPage] = useState(1);

//   const fetchMoreData = () => {
//     catalogStore.fetchMoreItemsBySearch({ ...searchConfig, page });
//     setPage(state => state +1)
//     // console.log("fetchMoreData")
//     // setTimeout(() => {
//     //   setState({
//     //     items: state.items.concat(Array.from({ length: 20 }))
//     //   });
//     // }, 1500);
//   }

//   return (
//     <>
//       <div className={styles.item_list}>

//         <InfiniteScroll
//           dataLength={catalogStore.nomenclatureList.length}
//           next={fetchMoreData}
//           hasMore={true}
//           loader={<h4>Loading...</h4>}

//           // dataLength={state.items.length}
//           // next={fetchMoreData}
//           // hasMore={true}
//           // loader={<h4>Loading...</h4>}

//           endMessage={
//             <p style={{ textAlign: 'center' }}>
//               <b>Конец списка</b>
//             </p>
//           }
//         >
//           {items?.map(item => (
//             <CatalogItem key={item.id} item={item} />
//           ))}

//           {/* {state.items.map((i: string, index: string) => (
//             <div style={style} key={index}>
//               div - #{index}
//             </div>
//           ))} */}
//         </InfiniteScroll>
//       </div>
//     </>
//   )
// }

// export default observer(CatalogList);


function CatalogList({ items, searchConfig }: Props) {

  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    catalogStore.fetchMoreItemsBySearch({ ...searchConfig, page });
    setPage(state => state +1)
    // console.log("fetchMoreData")
    // setTimeout(() => {
    //   setState({
    //     items: state.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);
  }

  return (
    <>
      <div className={styles.item_list}>

        <InfiniteScroll
          dataLength={catalogStore.nomenclatureList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}

          // dataLength={state.items.length}
          // next={fetchMoreData}
          // hasMore={true}
          // loader={<h4>Loading...</h4>}

          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Конец списка</b>
            </p>
          }
        >
          {items?.map(item => (
            <CatalogItem key={item.id} item={item} />
          ))}

          {/* {state.items.map((i: string, index: string) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))} */}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default observer(CatalogList);