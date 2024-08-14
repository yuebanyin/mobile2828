import { useCallback, useEffect, useRef, useState } from 'react';
import { Tabs, Img, Infiniteloading } from '@/components';
import { BillsRecord } from '../billsRecord';
import { getTimeRange } from '@/utils/dayjs';
import { getFundDetails } from '@/services';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const tabList = [
  { id: 1, text: 'now', query: 'today' },
  { id: 2, text: 'Last_7_Days', query: 'lastWeek' },
  { id: 3, text: 'Last_15_Days', query: 'last15days' },
];

// 充值明细
const TradeDetail = () => {
  const queryParam = useRef({
    StartTime: '',
    EndTime: '',
    PageIndex: 1,
    PageSize: 15,
  });
  const { formatMsg } = useLanguage();

  const initRef = useRef(false);
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
      getFundDetails(queryParam.current)
        .then((res: any) => {
          if (res.Code === 210 && res.Data && res.Data.length > 0) {
            let curIndex = recordList.length;
            for (let index = 0; index < res.Data.length; index += 1) {
              const element = res.Data[index];
              recordList.push({
                id: curIndex,
                // title: element.Type,
                title: formatMsg(`trade${element.ChangeType}`),
                changeValue: element.Change,
                mainVale: element.Balance,
                date: element.Date,
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
    [changeState, formatMsg, recordList]
  );

  const handleDateOption = (item) => {
    const time = getTimeRange(item['query']);
    if (queryParam.current.StartTime !== time.startTime) {
      queryParam.current.StartTime = time.startTime;
      queryParam.current.EndTime = time.endTime;
      getDataList();
    }
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
      const time = getTimeRange('today');
      if (queryParam.current.StartTime !== time.startTime) {
        queryParam.current.StartTime = time.startTime;
        queryParam.current.EndTime = time.endTime;
        getDataList();
      }
    }
  }, [getDataList, recordList]);

  return (
    <>
      <Tabs activeId={1} searchList={tabList} onClick={handleDateOption} />
      <ul id='refreshScroll' className='o-y m-t-30 bg-body'>
        {/* 记录块 */}
        {!recordList || recordList.length === 0 ? (
          <div className='df-fdc jc-c ai-c bg-main'>
            <Img className='w-808 h-787' src='/common/empty.png' />
          </div>
        ) : (
          <Infiniteloading
            hasMore={hasMore}
            containerId='refreshScroll'
            loadMore={customLoadMore}
          >
            {recordList.map((item, i) => (
              <li key={i || item.id}>
                <BillsRecord type='trade' data={item} />
              </li>
            ))}
          </Infiniteloading>
        )}
      </ul>
      {/* <div className='color-con-ass m-t-30 m-b-30 df-fdc jc-c ai-c'>仅展示3个月记录</div> */}
    </>
  );
};

export default TradeDetail;
