import { memo, useCallback, useEffect, useRef, useState } from 'react';
import i18n from 'i18next';
import { Tabs, Table, Infiniteloading, TableColumnProps } from '@/components';
import { earnTabs } from '@/constants';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { getPromoteRecord } from '@/services';
import { formatDigit } from '@/utils/tools';
import styles from './index.module.scss';
import { useLanguage } from '@/hooks';

export const tableBonusCols: TableColumnProps[] = [
  {
    title: i18n.t('promoDate'),
    // title: '推广日期',
    key: 'DateYmd',
    align: 'c',
    tbClassName: `${styles.itemH} wb-w wb-all ws-n va-m`,
  },
  {
    title: i18n.t('offlineUsers'),
    // title: '线下用户',
    key: 'NickName',
    align: 'c',
    tbClassName: `${styles.itemH} wb-w wb-all ws-n va-m`,
  },
  {
    title: i18n.t('offlineDeposit'),
    // title: '下线存款',
    key: 'PayScore',
    align: 'c',
    tbClassName: `${styles.itemH} wb-w wb-all ws-n va-m`,
    render: (record) => formatDigit(record.PayScore),
  },
  {
    title: i18n.t('dividendEarned'),
    // title: '赚的红利',
    key: 'RewardScore',
    align: 'c',
    tbClassName: `${styles.itemH} wb-w wb-all ws-n va-m`,
    render: (record) => formatDigit(record.RewardScore),
  },
];

export const tableBonusCols1: TableColumnProps[] = [
  {
    title: i18n.t('account'),
    // title: '账号',
    key: 'Account',
    align: 'c',
    tbClassName: `${styles.itemH} wb-w wb-all ws-n va-m`,
  },
  {
    title: i18n.t('nickname'),
    // title: '昵称',
    key: 'NickName',
    align: 'c',
    tbClassName: `${styles.itemH} wb-w wb-all ws-n va-m`,
  },
  {
    title: i18n.t('registDate'),
    // title: '注册日期',
    key: 'DateYmd',
    align: 'c',
    tbClassName: `${styles.itemH} wb-w wb-all ws-n va-m`,
  },
];

const ProBonus = () => {
  const { formatMsg } = useLanguage();
  const [title, setTitle] = useState({
    id: 1,
    text: formatMsg('promotionBonu'),
  });
  const [cols, setCols] = useState(tableBonusCols);
  const { gameId } = useUserInfoStore();
  const queryParam = useRef({
    PageIndex: 1,
    PageSize: 15,
  });
  const initRef = useRef(false);
  const tabIndex = useRef(1);
  const [recordList, setRecordList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { changeState } = useGlobalStore();

  const getDataList = useCallback(
    (done?: Function) => {
      if (done) {
        queryParam.current.PageIndex += 1;
      } else {
        setHasMore(true);
        recordList.splice(0, recordList.length);
        queryParam.current.PageIndex = 1;
      }
      changeState('isLoading', true);
      getPromoteRecord(tabIndex.current, queryParam.current)
        .then((res: any) => {
          if (res.Code === 210 && res.Data && res.Data.length > 0) {
            let curIndex = recordList.length;
            for (let index = 0; index < res.Data.length; index += 1) {
              const element = res.Data[index];
              recordList.push({
                id: curIndex,
                DateYmd: element.Date.substring(0, 10),
                ...element,
              });
              curIndex += 1;
            }
            setRecordList([...recordList]);
            if (recordList.length >= res.Count) {
              setHasMore(false);
            }
          } else if (recordList.length === 0) {
            setRecordList([]);
          }
          done && done();
        })
        .catch(() => {
          queryParam.current.PageIndex -= 1;
          if (queryParam.current.PageIndex < 1) {
            queryParam.current.PageIndex = 1;
          }
          done && done();
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState, recordList]
  );

  //tab切换
  const handleChangeTab = (item: any) => {
    setTitle({ ...title, id: item.id, text: item.text });
    tabIndex.current = item.id;
    setCols([...(tabIndex.current === 1 ? tableBonusCols : tableBonusCols1)]);
    getDataList();
  };

  const customLoadMore = useCallback(
    (done: Function) => {
      getDataList(done);
    },
    [getDataList]
  );

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      getDataList();
    }
  }, [getDataList]);

  return (
    <>
      <div className='m-b-30'>
        <Tabs
          searchList={earnTabs}
          activeId={1}
          onClick={(item) => handleChangeTab(item)}
        />
      </div>
      {title.id === 1 ? (
        ''
      ) : (
        <div className='wds-sm-title color-con-ass p-l-50 p-b-25'>
          {`${formatMsg('pass')}sp=${gameId}${formatMsg('registMember')}:`}
        </div>
      )}
      <div id='refreshScroll' className='o-y'>
        <Infiniteloading
          hasMore={hasMore}
          containerId='refreshScroll'
          loadMore={customLoadMore}
        >
          <Table columns={cols} data={recordList} isBodyTopBordered />
        </Infiniteloading>
      </div>
    </>
  );
};

export default memo(ProBonus);
