import i18n from 'i18next';
import {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BgImg,
  Cell,
  CellGroup,
  Tabs,
  Img,
  Dialog,
  Icon,
  Infiniteloading,
} from '@/components';
import styles from './index.module.scss';
import { Balance } from '@/components/balance';
import { YebInfoDto } from '../../yueBao';
import { getUserYebDetailList, getYebInfo } from '@/services';
import { getTimeRange } from '@/utils/dayjs';
import { UserLevelRate } from '@/components/score';
import { formatDigit } from '@/utils/tools';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

type YebDetail = {
  InsertDate: string;
  YebTransferType: number;
  TransferAmount: number;
  Rate: string;
  SettleAmount: number;
  TotalAmount: number;
};

const tabList = [
  { id: -1, text: 'all', name: `${i18n.t('all')}` },
  { id: 303, text: 'income', name: `${i18n.t('YuebaoInterest')}` },
  { id: 301, text: 'shiftTo', name: `${i18n.t('transInYueBao')}` },
  { id: 302, text: 'rollOut', name: `${i18n.t('YuebaoOut')}` },
];

const RollOutItem = memo(
  ({ sourceNode, data }: { sourceNode: ReactNode; data: any }) => (
    <Dialog isTitle={false} sourceNode={sourceNode}>
      <div className='d-f jc-sb m-t-50 m-l-50 m-r-50 ai-c'>
        <div className='wds-sm-title'>{i18n.t('transInYueBao')}</div>
        <div className='wds-sm-title color-red'>{`+${data.TransferAmount}`}</div>
      </div>
      <div className='m-0-50 m-t-30 bg-main br-30 p-30'>
        <div className='d-f fd-c ai-start jc-start'>
          <div className='d-f ai-c jc-c'>
            <div className='p-r m-t-20'>
              <Img className='w-62 h-62 m-r-30' src='/mine/yeb/step.png' />
              <div className={`${styles.yeLine} color-primary`}>-----</div>
            </div>
            <div className='d-f jc-start fd-c'>
              <div className='wds-sm-con color-tips'>
                <span>{data.InsertDate}</span>
              </div>
              <div className='wds-sm-title color-primary-text m-t-20'>
                <span>{i18n.t('transFromMainAccount')}</span>
              </div>
            </div>
          </div>

          <div className='d-f ai-c jc-c m-t-56'>
            <div className='p-r m-t-20'>
              <Img className='w-62 h-62 m-r-30' src='/mine/yeb/step.png' />
              <div className={`${styles.yeLine} color-primary`}>-----</div>
            </div>
            <div className='d-f jc-start fd-c'>
              <div className='wds-sm-con color-tips'>
                <span>{data.InsertDate}</span>
              </div>
              <div className='wds-sm-title color-primary-text m-t-20'>
                <span>{i18n.t('startCalculatingProfits')}</span>
              </div>
            </div>
          </div>

          <div className='d-f ai-c jc-c m-t-56'>
            <div className='p-r m-r-40'>
              <Img className='w-62 h-62 m-r-30' src='/mine/yeb/step.png' />
            </div>
            <div className='d-f jc-start fd-c'>
              <div className='wds-sm-con color-tips'>
                <span>{data.InsertDate}</span>
              </div>
              <div className='wds-sm-title color-primary-text m-t-20'>
                <span>{i18n.t('ProceedsArrive')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
);

// 余额宝明细
const YueBaoDetail = () => {
  const [yebInfo, setYebInfo] = useState<Partial<YebInfoDto>>({});
  const tabIndexRef = useRef(-1);
  const initRef = useRef(false);
  const queryParam = useRef({
    StartTime: '',
    EndTime: '',
    Type: -1,
    PageIndex: 1,
    PageSize: 15,
  });
  const [recordList, setRecordList] = useState<Array<YebDetail>>([]);
  const [hasMore, setHasMore] = useState(true);
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  const findDetailList = useCallback(
    (done?: Function) => {
      if (done) {
        queryParam.current.PageIndex += 1;
      } else {
        setHasMore(true);
        recordList.splice(0, recordList.length);
        queryParam.current.PageIndex = 1;
      }
      changeState('isLoading', true);
      getUserYebDetailList(queryParam.current)
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
          if (recordList.length >= res.Count) {
            setHasMore(false);
          }
          done && done();
        })
        .catch(() => {
          done && done();
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [recordList, changeState]
  );

  const switchTabs = (item) => {
    tabIndexRef.current = item.id;
    queryParam.current.Type = item.id;
    findDetailList();
  };

  const customLoadMore = useCallback(
    (done: Function) => {
      findDetailList(done);
    },
    [findDetailList]
  );

  useEffect(() => {
    if (!initRef.current) {
      const time = getTimeRange('lastQuarter');
      queryParam.current.StartTime = time.startTime;
      queryParam.current.EndTime = time.endTime;
      initRef.current = true;
      getYebInfo()
        .then((res: any) => {
          if (res.Data) setYebInfo(res.Data);
        })
        .catch(() => {});
      findDetailList();
    }
  }, [findDetailList]);

  const tName = useCallback(
    (e: any) => tabList.find((r) => r.id === e).name,
    []
  );

  return (
    <>
      <div className='d-f fd-c'>
        <BgImg className={`${styles['yeb-bg']}`} url='/common/header.png'>
          <Balance
            title={formatMsg('yuerbaoAll')}
            money={yebInfo.Total}
            className={`${styles['yeb-bg-img']}`}
            url='/mine/yebBk.png'
            balanceTwoCls='m-t-50'
            balanceThreeCls='m-t-60'
          >
            <div className='d-f fd-c jc-c ai-c'>
              <div className='p-l-20'>{formatMsg('dailyRate')}</div>
              <div className='p-l-20'>
                <UserLevelRate />
              </div>
            </div>
            <div className='d-f fd-c jc-c ai-c'>
              <div className='p-l-20'>{formatMsg('YesterdayReturnYuan')}</div>
              <div className='p-l-20'>{yebInfo.LastProfit ?? 0}</div>
            </div>
            <div className='d-f fd-c jc-c ai-c'>
              <div className='p-l-20'>{formatMsg('accumulatedIncomeYuan')}</div>
              <div className='p-l-20'>{yebInfo.TotalProfit ?? 0}</div>
            </div>
          </Balance>
        </BgImg>
      </div>

      {/* 数据块 */}
      <CellGroup className='m-0-50 m-t-30 bg-body br-t-l-30 br-t-r-30'>
        <Tabs
          titleClassName='br-t-l-30 br-t-r-30'
          activeId={-1}
          searchList={tabList}
          onClick={switchTabs}
        />
      </CellGroup>
      <div id='scroll' className='o-y m-0-50 bg-body br-b-l-30 br-b-r-30'>
        {!recordList || recordList.length === 0 ? (
          <div className='df-fdc jc-c ai-c bg-main'>
            <Img className='w-808 h-787' src='/common/empty.png' />
          </div>
        ) : (
          <Infiniteloading
            containerId='scroll'
            hasMore={hasMore}
            loadMore={customLoadMore}
          >
            {recordList.map((item, i) => {
              // if (tabIndexRef.current === 301) {
              if (item.YebTransferType === 301) {
                return (
                  <RollOutItem
                    key={`${i}` || item.InsertDate}
                    data={item}
                    sourceNode={
                      <div className={`${styles['ye-cell']} br-30`}>
                        <div className={styles['ye-cell-c']}>
                          <div className={styles['ye-cell-content']}>
                            <div className='d-f fd-c jc-start flex-1 m-l-20'>
                              <div className='p-l-20 wds-con'>
                                {tName(item.YebTransferType)}
                              </div>
                              <div className='p-l-20 p-t-20 wds-sm-con color-con-ass'>
                                {item.InsertDate}
                              </div>
                            </div>
                            <div className='color-red'>
                              {`+${formatDigit(item.TransferAmount)}`}
                            </div>
                            <div className={styles['ye-arrow']}>
                              <Icon name='rect-right' />
                            </div>
                          </div>
                          {i !== recordList.length - 1 ? (
                            <div className={styles['ye-cell-dvd']} />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    }
                  />
                );
              }
              return (
                <Cell
                  className='br-30'
                  key={`${i}` || item.InsertDate}
                  title={
                    <div className='d-f fd-c jc-start flex-1 m-l-20'>
                      <div className='p-l-20 wds-con'>
                        {tName(item.YebTransferType)}
                      </div>
                      <div className='p-l-20 p-t-20 wds-sm-con color-con-ass'>
                        {item.InsertDate}
                      </div>
                    </div>
                  }
                  rightSolt={
                    item.TransferAmount >= 0 ? (
                      <div className='color-red m-r-50'>
                        {`+${formatDigit(item.TransferAmount)}`}
                      </div>
                    ) : (
                      <div className='color-green m-r-50'>
                        {formatDigit(item.TransferAmount)}
                      </div>
                    )
                  }
                  isDivider={i !== recordList.length - 1}
                />
              );
            })}
          </Infiniteloading>
        )}
      </div>
      <div className='color-con-ass m-t-30 m-b-30 df-fdc jc-c ai-c'>
        {formatMsg('showThreeRecord')}
      </div>
    </>
  );
};

export default memo(YueBaoDetail);
