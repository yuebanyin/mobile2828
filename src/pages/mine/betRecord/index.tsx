import {
 useCallback, useEffect, useRef, useState 
} from 'react';
import {
 CellGroup, Tabs, Table, TableColumnProps, Select, toastText, Infiniteloading 
} from '@/components';
import { Option } from '@/components/select/option';
import { getBetRecordGameList, getBetRecordList } from '@/services';
import { getTimeRange } from '@/utils/dayjs';
import { useNavigation, useLanguage } from '@/hooks';
import { useGlobalStore } from '@/mobx';

// const columns: TableColumnProps[] = [
//   {
//     title: '下注日期',
//     key: 'Date',
//     align: 'c',
//     tbClassName: 'w-258',
//   },
//   {
//     title: '输赢',
//     key: 'BetScore',
//     align: 'c',
//     tbClassName: 'w-258',
//   },
//   {
//     title: '笔数',
//     key: 'BetCount',
//     align: 'c',
//     tbClassName: 'w-258',
//   },
//   {
//     title: '有效投注',
//     key: 'ValidBetScore',
//     align: 'c',
//     tbClassName: 'w-258',
//   },
// ];

// const searchList = [
//   { id: 1, text: '今天', query: 'today' },
//   { id: 2, text: '近7天', query: 'lastWeek' },
//   { id: 3, text: '近15天', query: 'last15days' },
// ];

// const gameChooseList = [{ id: '0', value: -1, text: '全部游戏' }];
// 详情跳转路由
const detailHref = '/mine/betRecord/detail';

function getHref(dateId, type, total) {
  return `${detailHref}?dateId=${dateId}&type=${type}&total=${total}`;
}

const BetRecord = () => {
  const { formatMsg } = useLanguage();

  const queryParam = useRef({
    StartTime: '',
    EndTime: '',
    Type: -1,
    PageIndex: 1,
    PageSize: 15,
  });
  const columns: TableColumnProps[] = [
    {
      title: `${formatMsg('betDates')}`,
      key: 'Date',
      align: 'c',
      tbClassName: 'w-258',
    },
    {
      title: `${formatMsg('winOrLose')}`,
      key: 'BetScore',
      align: 'c',
      tbClassName: 'w-258',
    },
    {
      title: `${formatMsg('counts')}`,
      key: 'BetCount',
      align: 'c',
      tbClassName: 'w-258',
    },
    {
      title: `${formatMsg('validBet')}`,
      key: 'ValidBetScore',
      align: 'c',
      tbClassName: 'w-258',
    },
  ];
  const searchList = [
    { id: 1, text: `${formatMsg('now')}`, query: 'today' },
    { id: 2, text: `${formatMsg('Last_7_Days')}`, query: 'lastWeek' },
    { id: 3, text: `${formatMsg('Last_30_Days')}`, query: 'last15days' },
  ];
  const gameChooseList = [{ id: '0', value: -1, text: `${formatMsg('allgame')}` }];

  const [recordList, setRecordList] = useState([]);
  const [betGameList, setBetGameList] = useState<any[]>(null);
  const navigate = useNavigation();
  const [hasMore, setHasMore] = useState(true);
  const { changeState } = useGlobalStore();
  /**
   * @description: 行记录点击操作
   * @param {*} useCallback
   * @return {*}
   */
  const trClick = useCallback(
    (item: any) => {
      navigate(getHref(item.Date, queryParam.current.Type, item.BetCount));
    },
    [navigate]
  );

  /**
   * @description: 获取统计记录
   * @param {*} useCallback
   * @return {*}
   */
  const getRecordList = useCallback(
    (done?: Function) => {
      if (done) {
        queryParam.current.PageIndex += 1;
      } else {
        setHasMore(true);
        recordList.splice(0, recordList.length);
        queryParam.current.PageIndex = 1;
      }
      changeState('isLoading', true);
      getBetRecordList(queryParam.current)
        .then((res: any) => {
          if (res.Data) {
            res.Data.forEach((element) => {
              recordList.push(element);
            });
            setRecordList([...recordList]);
            if (recordList.length >= res.Count) {
              setHasMore(false);
            }
          }
        })
        .catch(() => {
          queryParam.current.PageIndex -= 1;
          if (queryParam.current.PageIndex < 1) {
            queryParam.current.PageIndex = 1;
          }
          done && done();
          if (recordList.length === 0) {
            setRecordList([]);
          }
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState, recordList]
  );

  /**
   * @description: 加载更多
   * @param {*} useCallback
   * @return {*}
   */
  const customLoadMore = useCallback(
    (done: Function) => {
      getRecordList(done);
    },
    [getRecordList]
  );

  /**
   * @description: 获取游戏列表
   * @param {*} useCallback
   * @return {*}
   */
  const getGameList = useCallback(() => {
    if (betGameList) return;
    const time = getTimeRange('today');
    queryParam.current.StartTime = time.startTime;
    queryParam.current.EndTime = time.endTime;
    changeState('isLoading', true);
    getBetRecordGameList()
      .then((res: any) => {
        console.log('🚀 ~ file: index.tsx:44 ~ .then ~ getBetRecordGameList:', res);
        if (res.Code === 210 && res.Data) {
          setBetGameList([
            ...res.Data.map((it, i) => ({
              id: i + 1,
              type: it.Value,
              text: it.Key,
            })),
          ]);
          getRecordList();
        }
      })
      .catch(() => {
        toastText(`${formatMsg('failData')}`);
      })
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [betGameList, changeState, getRecordList, formatMsg]);

  const handleClickTabs = useCallback(
    (item) => {
      const time = getTimeRange(item['query']);
      if (queryParam.current.StartTime !== time.startTime) {
        queryParam.current.StartTime = time.startTime;
        queryParam.current.EndTime = time.endTime;
        queryParam.current.PageIndex = 1;
        getRecordList();
      }
    },
    [getRecordList]
  );

  const handleClick = useCallback(
    (item) => {
      if (queryParam.current.Type !== item.type) {
        queryParam.current.Type = item.type;
        getRecordList();
      }
    },
    [getRecordList]
  );

  //投注游戏列表
  useEffect(() => {
    getGameList();
  }, [getGameList]);

  return (
    <>
      <div className='d-f jc-start ai-c bg-body h-100'>
        <div className='color-con-ass wds-sm-title m-t-6 ws-no m-l-60'>{formatMsg('selectedGame')}</div>
        <Select titleList={gameChooseList} className='select h-100'>
          <Option options={betGameList || []} blockTitle={formatMsg('selectType')} showNum='0' type='btn' onClick={handleClick} />
        </Select>
      </div>
      <CellGroup className='m-t-6 h-190'>
        <CellGroup className='p-0-60 h-120'>
          <Tabs activeId={1} isCapsule searchList={searchList} onClick={handleClickTabs} />
        </CellGroup>
      </CellGroup>
      <ul id='bet-record' className='m-t-30 o-y bg-mian'>
        <Infiniteloading containerId='bet-record' loadMore={customLoadMore} hasMore={hasMore}>
          <Table columns={columns} data={recordList || []} isBodyTopBordered onTrClick={trClick} />
        </Infiniteloading>
      </ul>
    </>
  );
};

export default BetRecord;
