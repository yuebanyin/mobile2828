import i18n from 'i18next';
import { useCallback, useEffect, useState, memo } from 'react';
import styles from './index.module.scss';
import { GameMgr } from '@/engine/mgr/mgr';
import {
  FooterTableColumnProps,
  Select,
  Table,
  TableColumnProps,
  Infiniteloading,
} from '@/components';
import { Option } from '@/components/select/option';
import { getCusBetList } from '@/services';
import { useGameConfigStore, useGlobalStore } from '@/mobx';
import { formatDigit } from '@/utils/digit';
import { useLanguage, useTableReducer } from '@/hooks';

const gameChooseList = [
  {
    id: '0',
    value: -1,
    text: 'allgame',
    KindName: i18n.t('allgame'),
    KindId: -1,
  },
];

function GetGameDesc({ record }: any) {
  const { formatMsg } = useLanguage();
  const numlist = [
    ...record.BetNumber.map((it) => {
      if (it.length === 0) return 255;
      return parseInt(it);
    }),
  ];
  // FIXME 2023-09-06 11:04:36 特殊赔率显示变更
  // const smList = record.SpecialMultiple || [];
  // const speMT = smList.length > 0 ? `/ ${[...smList].join('/')}` : '';
  const codeName = GameMgr.GetBetRecordDesc(
    record.KindId,
    record.BetMainType,
    record.BetSubType,
    numlist
  );
  let name = '';
  if (codeName.indexOf('&') !== -1) {
    const [s, e] = codeName.split('&');
    name = `${formatMsg(s)}-${formatMsg(e)}`;
  } else {
    name = formatMsg(codeName);
  }
  const desc = `${name} ${record.NormalMultiple}`;
  return (
    <div className='df-fdc jc-c ai-c'>
      <div className='color-primary-text wds-sm-con'>
        {`${formatMsg('di')}${record.PeriodId}${formatMsg('qi')}`}
      </div>
      <div className='color-red wds-con'>{desc}</div>
      <div className='color-green wds-con'>{record.Date.substring(5)}</div>
      <div className='color-primary-text wds-sm-con'>{record.GameName}</div>
    </div>
  );
}

const columns: TableColumnProps[] = [
  {
    title: i18n.t('odd'),
    key: 'OrderId',
    align: 'c',
    tbClassName: `${styles.dHitem} wb-w wb-all ws-n va-m`,
    render: (record: any) => <>{record.OrderId || '--,--'}</>,
  },
  {
    title: i18n.t('content'),
    key: 'Content',
    align: 'c',
    tbClassName: `${styles.cItem}`,
    render: (record: any) => {
      if (!record.PeriodId) {
        return i18n.t('noReturn');
      }
      return <GetGameDesc record={record} />;
    },
  },
  {
    title: i18n.t('betAmount'),
    key: 'BetScore',
    align: 'c',
    tbClassName: `${styles.bSitem} wb-w wb-all ws-n va-m`,
    render: (record: any) => <>{formatDigit(record.BetScore)}</>,
  },
  {
    title: i18n.t('winOrLose'),
    key: 'WinScore',
    align: 'c',
    tbClassName: `${styles.wLitem} wb-w wb-all ws-n va-m`,
    render: (record: any) => <>{formatDigit(record.WinScore)}</>,
  },
];

const footerColumns: FooterTableColumnProps[] = [
  {
    title: i18n.t('subtotal'),
    align: 'c',
    tbClassName: `${styles.dHitem} wb-w wb-all ws-n va-m`,
  },
  {
    title: i18n.t('content'),
    align: 'c',
    tbClassName: `${styles.cItem}`,
  },
  {
    title: i18n.t('betAmount'),
    align: 'c',
    tbClassName: `${styles.bSitem} wb-w wb-all ws-n va-m`,
  },
  {
    title: i18n.t('winOrLose'),
    align: 'c',
    tbClassName: `${styles.wLitem} wb-w wb-all ws-n va-m`,
  },
];

const emptyData = [{ id: 0 }];

const initParams = {
  KindId: -1,
  pageSize: 10,
  pageIndex: 1,
};

const CurrentBet = () => {
  const [footerList, setFooterList] = useState([
    i18n.t('subtotal'),
    `0${i18n.t('bi')}`,
    '0.00',
    '0.00',
  ]);
  const [{ data, params, total }, dispatch] = useTableReducer({
    params: initParams,
  });
  const { gameList } = useGameConfigStore();
  const { changeState } = useGlobalStore();

  const getRecordList = useCallback(
    (p?: any, cb?: () => void) => {
      changeState('isLoading', true);
      getCusBetList({ ...p })
        .then((res: any) => {
          if (res?.Data) {
            if (res?.Data?.length > 0) {
              let allScore = 0.0;
              const tmpList = [];
              for (let index = 0; index < res.Data.length; index += 1) {
                const element = res.Data[index];
                allScore += parseFloat(element.BetScore);
                tmpList.push(element);
              }
              setFooterList((prea) => [
                i18n.t('subtotal'),
                `${res.Count}${i18n.t('bi')}`,
                `${Number(prea[2]) + Number(allScore)}`,
                '0.00',
              ]);
              dispatch({
                type: 'success',
                payload: {
                  data: (pred) => [...pred, ...tmpList],
                  total: res.Count,
                  params: { ...p },
                },
              });
            }
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
          if (typeof cb === 'function') {
            cb();
          }
        });
    },
    [changeState, dispatch]
  );

  const handleClick = useCallback(
    (item) => {
      if (params.KindId !== item.KindId) {
        setFooterList([i18n.t('subtotal'), `0${i18n.t('bi')}`, '0.00', '0.00']);
        dispatch({
          type: 'success',
          payload: {
            data: [],
            total: 0,
          },
        });
        getRecordList({ ...params, KindId: item.KindId, pageIndex: 1 });
      }
    },
    [dispatch, getRecordList, params]
  );

  useEffect(() => {
    getRecordList(initParams);
  }, [getRecordList]);

  return (
    <ul id='current-bet' className='o-y h-full'>
      <Infiniteloading
        containerId='current-bet'
        hasMore={(total || 0) > data.length}
        loadMore={(cb) =>
          getRecordList({ ...params, pageIndex: params.pageIndex + 1 }, cb)
        }
      >
        <div className='d-f jc-c ai-c bg-body'>
          <Select titleList={gameChooseList} className='select'>
            <Option
              defaultId={1}
              options={
                gameList
                  ? [...gameChooseList, ...gameList].map((it, i) => ({
                      id: i + 1,
                      KindId: it.KindId,
                      text: it.KindName,
                    }))
                  : []
              }
              blockTitle={i18n.t('selectType')}
              showNum='0'
              type='btn'
              onClick={handleClick}
            />
          </Select>
        </div>
        <div className='t-small-title'>
          <Table
            headerClassName='bg-tip'
            columns={columns}
            data={(data || []).length === 0 ? emptyData : data}
            isBodyBordered
            showFooter
            showEmpty={false}
            footerClassName={styles.fbg}
            footerColumns={footerColumns}
            footerData={footerList as []}
          />
        </div>
        {/* {total && total === (data || []).length && <div className='wds-sm ta-c color-assist p-10'>没有更多了~</div>} */}
      </Infiniteloading>
    </ul>
  );
};

export default memo(CurrentBet);
