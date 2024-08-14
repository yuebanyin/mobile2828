import {
 useCallback, useEffect, useRef, useState 
} from 'react';
import {
 Img, Infiniteloading, RecordDetail, Tabs 
} from '@/components';
import { getTimeRange } from '@/utils/dayjs';
import { getRecordList } from '@/services';
import { formatDigit } from '@/utils/digit';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

// const typeTextMap = {
//   201: '投注奖励',
//   202: '签到奖励',
//   203: '抽奖消耗',
//   204: '后台赠送',
// };

/**
 * 积分记录-主界面
 *
 * @returns
 */
function PointsRecord() {
  const { formatMsg } = useLanguage();
  const typeTextMap = {
    201: `${formatMsg('bettingReward')}`,
    202: `${formatMsg('registrationReward')}`,
    203: `${formatMsg('raffleExpenses')}`,
    204: `${formatMsg('backstageGiveaway')}`,
  };
  const dataKeys = ['Date', 'Type', 'Change', 'Balance'];
  const dataRowFlex = [5, 4, 4, 5];
  const headerData = {
    Date: `${formatMsg('date')}`,
    Type: `${formatMsg('transactionType')}`,
    Change: `${formatMsg('transactionLimit')}`,
    Balance: `${formatMsg('availableCredit')}`,
  };
  const tabRes = [
    { id: 0, text: `${formatMsg('yesterdays')}`, query: 'yesterday' },
    { id: 1, text: `${formatMsg('Last_7_Days')}`, query: 'lastWeek' },
    { id: 2, text: `${formatMsg('Last_15_Days')}`, query: 'last15days' },
    { id: 3, text: `${formatMsg('Last_30_Days')}`, query: 'last30days' },
  ];

  const [tableRes, setTableRes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const initRef = useRef(false);
  const { changeState } = useGlobalStore();

  const recordReq = useRef({
    StartTime: '',
    EndTime: '',
    PageSize: 15,
    PageIndex: 1,
  });

  const buildEmptyTable = () => (
    <div className='df-fdc jc-c ai-c bg-main'>
      <Img className='w-808 h-787' src='/common/empty.png' />
    </div>
  );

  const buildItemView = useCallback((_index: number, key: string, data: any) => {
    if (key === 'Change') {
      console.log(formatDigit(data.Change));
      return formatDigit(data.Change);
    }
    if (key === 'Balance') {
      return formatDigit(data.Balance);
    }
    return null;
  }, []);

  const tapTabItem = useCallback(
    ({ query }) => {
      setHasMore(true);
      const { startTime, endTime } = getTimeRange(query ?? 'yesterday');
      recordReq.current.StartTime = startTime;
      recordReq.current.EndTime = endTime;
      recordReq.current.PageIndex = 1;
      changeState('isLoading', true);
      getRecordList(recordReq.current)
        .then((res: any) => {
          if ((res.Data?.length ?? 0) >= 0) {
            setTableRes(res.Data ?? []);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState]
  );

  const loadMore = (done: () => void) => {
    console.log('🚀 ~ file: index.tsx:99 ~ loadMore ~ loadMore:');
    recordReq.current.PageIndex += 1;
    changeState('isLoading', true);
    getRecordList(recordReq.current)
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          tableRes.push(...res.Data);
          setTableRes([...tableRes]);
          if (tableRes.length >= res.Count) {
            setHasMore(false);
          }
          done();
        }
      })
      .catch(() => {
        done();
      })
      .finally(() => {
        changeState('isLoading', false);
      });
  };

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      tapTabItem({ query: 'yesterday' });
    }
  }, [tapTabItem]);

  return (
    <>
      <Tabs searchList={tabRes} onClick={(r) => tapTabItem(r)} />
      <RecordDetail className='m-t-30' isHeader divider data={headerData} dataKeys={dataKeys} dataRowFlex={dataRowFlex} />
      <div id='scroll' className='o-y h-full'>
        <Infiniteloading containerId='scroll' hasMore={hasMore} loadMore={loadMore}>
          {tableRes.length === 0
            ? buildEmptyTable()
            : tableRes.map((r, i) => <RecordDetail key={i || r.Date} divider data={{ ...r, Type: typeTextMap[r.Type] }} dataKeys={dataKeys} dataRowFlex={dataRowFlex} onBuildItem={buildItemView} />)}
        </Infiniteloading>
      </div>
    </>
  );
}

export default PointsRecord;
