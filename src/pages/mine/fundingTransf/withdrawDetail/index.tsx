import { useCallback, useEffect, useRef, useState } from 'react';
import { Infiniteloading, Select } from '@/components';
import { BillsRecord } from '../billsRecord';
import { Option } from '@/components/select/option';
import { dateOptions, rechargeData, typeOptions } from '@/constants/personal';
import { getWithdrawTypeList, getWithdrawalList } from '@/services';
import { getTimeRange } from '@/utils/dayjs';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

// 提现明细
const WithdrawDetail = () => {
  // 操作方式
  const { formatMsg } = useLanguage();
  const [payMethod, setPayMethod] = useState([]);
  const queryParam = useRef({
    StartTime: '2000-01-01 00:00:00',
    EndTime: '2999-12-31 23:59:59',
    Status: -1,
    Type: -1,
    PageIndex: 1,
    PageSize: 15,
  });
  const [recordList, setRecordList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { changeState } = useGlobalStore();

  // 获取数据列表
  const getDataList = useCallback(
    (payList?: any[], done?: Function) => {
      if (done) {
        queryParam.current.PageIndex += 1;
      } else {
        setHasMore(true);
        recordList.splice(0, recordList.length);
        queryParam.current.PageIndex = 1;
      }
      changeState('isLoading', true);
      getWithdrawalList(queryParam.current)
        .then((res: any) => {
          // console.log('🚀 ~ file: index.tsx:44 ~ .then ~ res:', res);
          if (res.Code === 210 && res.Data && res.Data.length > 0) {
            let curIndex = recordList.length;
            for (let index = 0; index < res.Data.length; index += 1) {
              const element = res.Data[index];
              let titleItem;
              if (payList || payMethod) {
                const newArrPayMethod = payList || payMethod;
                titleItem = newArrPayMethod.find(
                  (it) => Number(it.type) === Number(element.Type)
                );
              }
              const stateItem = typeOptions.find(
                (it) => Number(it.id) === Number(element.Status)
              );

              recordList.push({
                id: curIndex,
                title: titleItem?.text || element.Type,
                value: element.Amount,
                date: element.Date,
                order: element.OrderId,
                state: formatMsg(stateItem?.text) || element.Status,
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
    [recordList, changeState, payMethod, formatMsg]
  );

  // 切换查询交易方式
  const handleClick = (item) => {
    if (queryParam.current.Type !== item.type) {
      queryParam.current.Type = item.type;
      getDataList();
    }
  };

  // 切换查询交易状态
  const handleTypeOption = (item) => {
    if (queryParam.current.Status !== parseInt(item.id)) {
      queryParam.current.PageIndex = 1;
      queryParam.current.Status = parseInt(item.id);
      getDataList();
    }
  };

  // 切换查询交易时间
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
      getDataList(payMethod, done);
    },
    [getDataList, payMethod]
  );

  /**
   * @description: 获取类型
   * @param {*} useCallback
   * @return {*}
   */
  const getTypeList = useCallback(() => {
    // 先获取支付类型--进行第一次获取数据列表
    if (payMethod && payMethod.length === 0) {
      changeState('isLoading', true);
      getWithdrawTypeList()
        .then((res: any) => {
          if (res.Code === 210 && res.Data && res.Data.length > 0) {
            const tmp = [{ id: 0, text: formatMsg('allStyle'), type: -1 }];
            for (let index = 0; index < res.Data.length; index += 1) {
              const element = res.Data[index];
              tmp.push({
                id: element.Value.toString(),
                text: element.Key,
                type: element.Value,
              });
            }
            setPayMethod([...tmp]);
            getDataList(tmp);
          }
        })
        .catch(() => {})
        .finally(() => {
          // getDataList();
          changeState('isLoading', false);
        });
    }
  }, [payMethod, getDataList, changeState, formatMsg]);

  useEffect(() => {
    getTypeList();
  }, [getTypeList]);

  return (
    <>
      <Select titleList={rechargeData} className='select'>
        <Option
          options={payMethod}
          blockTitle={formatMsg('selectType')}
          showNum='0'
          type='btn'
          onClick={handleClick}
        />
        <Option options={typeOptions} showNum='1' onClick={handleTypeOption} />
        <Option options={dateOptions} showNum='2' onClick={handleDateOption} />
      </Select>

      {/* 记录块 */}
      <ul id='scroll' className='o-y m-t-30 bg-body'>
        <Infiniteloading
          hasMore={hasMore}
          containerId='scroll'
          loadMore={customLoadMore}
        >
          {recordList.map((item, i) => (
            <li key={i || item}>
              <BillsRecord type='rw' data={item} />
            </li>
          ))}
        </Infiniteloading>
      </ul>
      {/* <div className='color-con-ass m-t-30 m-b-30 df-fdc jc-c ai-c'>仅展示3个月记录</div> */}
    </>
  );
};

export default WithdrawDetail;
