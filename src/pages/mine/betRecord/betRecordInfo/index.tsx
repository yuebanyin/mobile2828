import { memo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Infiniteloading,
  Table,
  TableColumnProps,
  toastText,
} from '@/components';

import styles from '../index.module.scss';
import { getBetRecordDetail } from '@/services';
import { GameMgr } from '@/engine/mgr/mgr';
import { formatDigit } from '@/utils/digit';
import { useGlobalStore } from '@/mobx';
import { useLanguage, useTableReducer } from '@/hooks';

function GetGameDesc({ record }: any) {
  const { formatMsg } = useLanguage();
  const { allGameList } = useGlobalStore();

  const getGameItemObj = useCallback(
    (typeId?, gameId?) => {
      let gameItemObj;
      if (allGameList?.length > 0) {
        gameItemObj = allGameList.find(
          (item: any) =>
            Number(item?.TypeId) === Number(typeId) &&
            Number(item?.StrGameId) === Number(gameId)
        );
      }
      return formatMsg(gameItemObj?.Key);
    },
    [allGameList, formatMsg]
  );

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
      <div className='color-primary-text wds-sm-con'>
        {getGameItemObj(record.TypeId, record.GameId) || record.GameName}
      </div>
    </div>
  );
}

// const columns: TableColumnProps[] = [
//   {
//     title: `${formatMsg('odd')}`,
//     key: 'OrderId',
//     align: 'c',
//     tbClassName: `${styles.dHitem} wb-w wb-all ws-n va-m`,
//     render: (record: any) => <>{record.OrderId}</>,
//   },
//   {
//     title: '内容',
//     key: 'Content',
//     align: 'c',
//     tbClassName: `${styles.cItem}`,
//     render: (record: any) => <GetGameDesc record={record} />,
//   },
//   {
//     title: '下注金额',
//     key: 'BetScore',
//     align: 'c',
//     tbClassName: `${styles.bSitem} wb-w wb-all ws-n va-m`,
//     render: (record: any) => <>{formatDigit(record.BetScore)}</>,
//   },
//   {
//     title: '输赢',
//     key: 'WinScore',
//     align: 'c',
//     tbClassName: `${styles.wLitem} wb-w wb-all ws-n va-m`,
//     render: (record: any) => (
//       <>{record?.Status === 2 ? '已撤销' : formatDigit(record.WinScore)}</>
//     ),
//   },
// ];

const initParams = {
  pageIndex: 1,
  pageSize: 10,
};

const BetRecordInfo = () => {
  const [searchParams] = useSearchParams();
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();
  // const total = Number(searchParams.get('total')) || 0;
  const DateId = searchParams.get('dateId');
  const Type = searchParams.get('type');
  const [{ data, params, total }, dispatch] = useTableReducer({
    params: {
      DateId,
      Type,
      pageIndex: 1,
      pageSize: 10,
    },
  });

  const columns: TableColumnProps[] = [
    {
      title: `${formatMsg('odd')}`,
      key: 'OrderId',
      align: 'c',
      tbClassName: `${styles.dHitem} wb-w wb-all ws-n va-m`,
      render: (record: any) => <>{record.OrderId}</>,
    },
    {
      title: `${formatMsg('content')}`,
      key: 'Content',
      align: 'c',
      tbClassName: `${styles.cItem}`,
      render: (record: any) => <GetGameDesc record={record} />,
    },
    {
      title: `${formatMsg('betAmount')}`,
      key: 'BetScore',
      align: 'c',
      tbClassName: `${styles.bSitem} wb-w wb-all ws-n va-m`,
      render: (record: any) => <>{formatDigit(record.BetScore)}</>,
    },
    {
      title: `${formatMsg('winOrLose')}`,
      key: 'WinScore',
      align: 'c',
      tbClassName: `${styles.wLitem} wb-w wb-all ws-n va-m`,
      render: (record: any) => (
        <>
          {record?.Status === 2
            ? `${formatMsg('revoked')}`
            : formatDigit(record.WinScore)}
        </>
      ),
    },
  ];

  // 接口请求
  const getDetailRecord = useCallback(
    (p?: any, cb?: () => void) => {
      if (!DateId || !Type) {
        toastText(`${formatMsg('parameterError')}`);
      } else {
        changeState('isLoading', true);
        getBetRecordDetail({ ...p })
          .then((res: any) => {
            if (res.Code === 210 && res.Data) {
              dispatch({
                type: 'success',
                payload: {
                  data: (pred) => [...pred, ...res.Data],
                  total: res.Count,
                  params: { ...p },
                },
              });
            }
          })
          .catch(() => {})
          .finally(() => {
            changeState('isLoading', false);
            if (typeof cb === 'function') {
              cb();
            }
          });
      }
    },
    [DateId, Type, changeState, dispatch, formatMsg]
  );

  useEffect(() => {
    if (!DateId || !Type) {
      toastText(`${formatMsg('parameterError')}`);
    } else {
      getDetailRecord({ ...initParams, DateId, Type });
    }
  }, [DateId, Type, getDetailRecord, formatMsg]);

  return (
    <div id='bet-record-detail' className='p-t-30 o-y bg-mian'>
      <Infiniteloading
        containerId='bet-record-detail'
        hasMore={total > (data || []).length}
        loadMore={(cb) => {
          getDetailRecord({ ...params, pageIndex: params.pageIndex + 1 }, cb);
        }}
      >
        <Table columns={columns} data={data || []} isBodyBordered />
        {total && total === (data || []).length && (
          <div className='wds-sm ta-c color-assist p-10'>
            {formatMsg('noMore')}
          </div>
        )}
      </Infiniteloading>
    </div>
  );
};

export default memo(BetRecordInfo);
