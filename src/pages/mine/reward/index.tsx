import {
 useCallback, useEffect, useRef, useState 
} from 'react';
import {
 Button, Img, RecordDetailCustom, Tabs, toastText 
} from '@/components';
import {
 batchBonus, batchBonusList, getBonusList, getUserScoreInfo 
} from '@/services';
import { useGlobalStore, useUserScoreStore } from '@/mobx';
import { useLanguage } from '@/hooks';

type RewardDetailDto = {
  Id: number;
  Status: number;
  RewardScore: number;
  NeedBetScore: number;
  StartDate: string;
  ValidDate: string;
};

// const headerData = {
//   RewardScore: '奖金金额',
//   NeedBetScore: '需要码量',
//   StartDate: '有效期',
//   Status: '状态',
// };

/**
 * 红包和奖金-主界面
 * @returns
 */
const Reward = () => {
  const dataKeys = ['RewardScore', 'NeedBetScore', 'StartDate', 'Status'];
  const dataRowFlex = [2, 2, 5, 2];
  const { formatMsg } = useLanguage();

  const headerData = {
    RewardScore: `${formatMsg('bonusAmount')}`,
    NeedBetScore: `${formatMsg('yardsRequired')}`,
    StartDate: `${formatMsg('validity')}`,
    Status: `${formatMsg('status')}`,
  };

  const tabRes = [
    { id: 0, text: `${formatMsg('unclaimed')}`, Status: 0 },
    { id: 1, text: `${formatMsg('alreadyReceived')}`, Status: 1 },
    { id: 2, text: `${formatMsg('lostEffectiveness')}`, Status: 2 },
  ];

  const [tableRes, setTableRes] = useState<RewardDetailDto[]>([]);
  const { changeUserScore } = useUserScoreStore();
  const divTop = useRef(0);
  const recordDivRef = useRef<HTMLDivElement>(null);
  const [floatBtn, setFloatBtn] = useState(null); // 领取按钮的状态：'none','small','more'
  const [btnShow, setBtnShow] = useState(true); // 是否展示领取按钮： 目前是第一个tab 的时候才展示
  const initRef = useRef(false);
  const { changeState } = useGlobalStore();

  const tapTabItem = useCallback(
    ({ Status }) => {
      if (Status !== 0) {
        setBtnShow(false);
      } else {
        setBtnShow(true);
      }
      changeState('isLoading', true);
      getBonusList({ Status })
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

  const getUserScore = useCallback(() => {
    getUserScoreInfo()
      .then((res: any) => {
        if (res.Data) changeUserScore(res.Data);
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, changeUserScore]);

  const receiveItem = useCallback(
    (r: RewardDetailDto) => {
      if (r.Status !== 1) return;
      changeState('isLoading', true);
      batchBonus({ Id: r.Id })
        .then((res: any) => {
          if (res.Code === 210) {
            setTableRes([...tableRes.filter((it) => it.Id !== r.Id)]);
            toastText(res.Message);
            getUserScore();
          }
        })
        .catch(() => {
          changeState('isLoading', false);
        });
    },
    [changeState, getUserScore, tableRes]
  );

  const receiveAll = useCallback(() => {
    const ids = tableRes.filter((r) => r.Status === 1).map(({ Id }) => Id);
    if (ids.length <= 0) {
      toastText(`${formatMsg('notGet')}`);
      return;
    }
    changeState('isLoading', true);
    batchBonusList({ List: ids })
      .then((res: any) => {
        if (res.Code === 210) {
          setTableRes([...tableRes.filter((it) => ids.indexOf(it.Id) === -1)]);
          toastText(res.Message);
          getUserScore();
        }
      })
      .catch(() => {
        changeState('isLoading', false);
      });
  }, [changeState, getUserScore, tableRes, formatMsg]);

  const buildItemHeaderView = (_index: number, key: string) => headerData[key];

  const buildEmptyTable = () => (
    <div className='df-fdc jc-c ai-c bg-main'>
      <Img className='w-808 h-787' src='/common/empty.png' />
    </div>
  );

  const buildItemClass = useCallback((_index: number, key: string) => {
    if (key === 'RewardScore' || key === 'NeedBetScore') {
      return 'wds-sm-con';
    }
    return '';
  }, []);

  const buildItemView = useCallback(
    (_index: number, key: string, data: any) => {
      if (key === 'Status') {
        const StatusName = [`${formatMsg('nonactivated')}`, `${formatMsg('received')}`, `${formatMsg('alreadyReceived')}`, `${formatMsg('haveExpired')}`];
        const statusClassName = 'd-f fd-c jc-c ai-c wds-sm-con';
        let childClassName = '';
        if (data.Status === 1) childClassName += ' w-140 br-10 b-1 bc-primary color-primary p-6-0';
        if (data.Status === 2) childClassName += ' color-con-ass color-primary-text';
        return (
          <div className={`${statusClassName}`} onClick={() => receiveItem(data)}>
            <div className={childClassName}>{StatusName[data.Status]}</div>
          </div>
        );
      }
      if (key === 'StartDate') {
        return (
          <div className='d-f jc-c ai-c ta-c wds-explain-con color-primary-text'>
            <span>{data.StartDate}</span>
            <span>-</span>
            <span>{data.ValidDate}</span>
          </div>
        );
      }
      return null;
    },
    [receiveItem, formatMsg]
  );

  const buildBtn = () => (
    <>
      {floatBtn === 'more' && (
        <>
          <div className='p-f w-full h-158 bg-mask bottom-0'>
            <div className='d-f jc-sb ai-c'>
              <div className='p-0-52 m-t-10 ta-c color-white'>
                {formatMsg('saveThreeRecord')}
              </div>
              <Button
                className='m-t-10 w-940 h-138'
                type='primary'
                size='large'
                onClick={() => receiveAll()}
              >
                {formatMsg('allReceived')}
              </Button>
            </div>
          </div>
        </>
      )}
      {floatBtn === 'small' && (
        <>
          <div className='w-full h-138 p-0-52 m-t-50'>
            <Button
              className='w-940  h-138'
              type='primary'
              size='large'
              onClick={() => receiveAll()}
            >
              {formatMsg('allReceived')}
            </Button>
          </div>
          <div className='w-full p-0-52 m-t-18 ta-c'>
            {formatMsg('saveThreeRecord')}
          </div>
        </>
      )}
      {floatBtn === 'none' && ''}
    </>
  );

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      tapTabItem({ Status: 0 });
    }
    if (btnShow) {
      const resizeObserver = new ResizeObserver(() => {
        const { clientHeight } = recordDivRef?.current;
        // console.log(ele, clientHeight, recordDivRef.current.getBoundingClientRect().top);
        if (divTop.current === 0) {
          divTop.current = recordDivRef.current.getBoundingClientRect().top;
        }

        if (clientHeight > document.body.clientHeight - divTop.current) {
          setFloatBtn('more');
        } else if (tableRes?.length > 0) {
          setFloatBtn('small');
        } else {
          setFloatBtn('none');
        }
      });
      resizeObserver.observe(recordDivRef.current);
      return () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }
    return () => {};
  }, [btnShow, floatBtn, tableRes, tapTabItem]);

  return (
    <>
      <Tabs searchList={tabRes} onClick={(r) => tapTabItem(r)} />
      <RecordDetailCustom className='m-t-30' data={headerData} dataKeys={dataKeys} dataRowFlex={dataRowFlex} onBuildItem={buildItemHeaderView} />
      <div ref={recordDivRef}>
        {tableRes.length === 0
          ? buildEmptyTable()
          : tableRes.map((r) => <RecordDetailCustom key={r.Id} data={r} dataKeys={dataKeys} divider dataRowFlex={dataRowFlex} onItemClass={buildItemClass} onBuildItem={buildItemView} />)}
      </div>
      {btnShow ? buildBtn() : ''}
    </>
  );
};

export default Reward;
