import {
 useCallback, useEffect, useRef, useState 
} from 'react';
import {
 CellGroup, Tabs, Img, Infiniteloading 
} from '@/components';
import { BillsRecord } from '../billsRecord';
import { getTimeRange } from '@/utils/dayjs';
import { getTransferRecordList } from '@/services';
import { useGlobalStore } from '@/mobx';

const tabList = [
  { id: 1, text: '今天', query: 'today' },
  { id: 2, text: '近7天', query: 'lastWeek' },
  { id: 3, text: '近15天', query: 'last15days' },
];

// 额度转换明细
const QuotaConverDetail = () => {
  const queryParam = useRef({
    StartTime: '',
    EndTime: '',
    PageIndex: 1,
    PageSize: 15,
  });
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
      getTransferRecordList(queryParam.current)
        .then((res: any) => {
          if (res.Code === 210 && res.Data && res.Data.length > 0) {
            let curIndex = recordList.length;
            for (let index = 0; index < res.Data.length; index += 1) {
              const element = res.Data[index];
              recordList.push({
                id: curIndex,
                title: element.Type,
                changeValue: element.Amount,
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
    [changeState, recordList]
  );

  const handleDateOption = (item) => {
    const time = getTimeRange(item['query']);
    if (queryParam.current.StartTime !== time.startTime) {
      queryParam.current.StartTime = time.startTime;
      queryParam.current.EndTime = time.endTime;
      queryParam.current.PageIndex = 1;
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
      queryParam.current.StartTime = time.startTime;
      queryParam.current.EndTime = time.endTime;
      queryParam.current.PageIndex = 1;
      getDataList();
    }
  }, [getDataList]);

  return (
    <>
      <CellGroup>
        <Tabs activeId={1} searchList={tabList} onClick={handleDateOption} />
      </CellGroup>
      <ul id='scroll' className='o-y m-t-30 bg-body'>
        {/* 记录块 */}
        {!recordList || recordList.length === 0 ? (
          <div className='df-fdc jc-c ai-c bg-main'>
            <Img className='w-808 h-787' src='/common/empty.png' />
          </div>
        ) : (
          <Infiniteloading hasMore={hasMore} containerId='scroll' loadMore={customLoadMore}>
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

export default QuotaConverDetail;
