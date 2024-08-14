import { memo, useEffect, useState } from 'react';
import { Button, Img, KindTips } from '@/components';
import { ThousandsNumberSpan } from './thousandsNumberSpan';
import RateHelpModal, { YebRateDto } from './rateHelpModel';
import { useNavigation, useLanguage } from '@/hooks';
import {
  getYebDescription,
  getYebInfo,
  getYebSettleRateList,
} from '@/services';
import { Score, UserLevelRate } from '@/components/score';
import { formatDigit, getContentDesc } from '@/utils/tools';
import { useGeneralStore, useGlobalStore, useUserInfoStore } from '@/mobx';
import { yuebaoKindTips } from '@/constants';

export type YebInfoDto = {
  Total: number;
  TotalProfit: number;
  LastProfit: number;
  SettleDate: string;
};

/**
 * 余额宝-主界面
 * @returns
 */
const YueBao = () => {
  const [yebInfo, setYebInfo] = useState<Partial<YebInfoDto>>({});
  const [yebRateList, setYebRateList] = useState<YebRateDto[]>([]);
  const [tips, setTips] = useState({ Title: '', Content: '' });
  // const [dailyRate, setDailyRate] = useState('0.0%');
  const { changeState } = useGlobalStore();
  const navigate = useNavigation();
  const { changeGeneralState } = useGeneralStore();
  const { level } = useUserInfoStore();
  const { formatMsg } = useLanguage();

  const navRollInOut = (mode: 'in' | 'out') => {
    const title =
      mode === 'in'
        ? `&title=${formatMsg('shiftTo')}`
        : `&title=${formatMsg('rollOut')}`;
    navigate(`/mine/yuebao/rollInOut?mode=${mode}${title}`, {
      state: { settleDate: yebInfo.SettleDate },
    });
  };

  const navDetail = () => {
    navigate('/mine/yuebao/detail');
  };

  const navRateCalculation = () => {
    navigate('/mine/yuebao/rateCalculation');
  };

  useEffect(() => {
    changeState('isLoading', true);
    let finishCount = 0;
    getYebInfo()
      .then((res: any) => {
        if (res.Data) setYebInfo(res.Data);
      })
      .catch(() => {})
      .finally(() => {
        if (finishCount === 1) {
          changeState('isLoading', false);
        } else {
          finishCount += 1;
        }
      });
    getYebDescription()
      .then((res: any) => {
        if (res.Data) setTips(res.Data);
      })
      .catch(() => {})
      .finally(() => {
        if (finishCount === 1) {
          changeState('isLoading', false);
        } else {
          finishCount += 1;
        }
      });
  }, [changeState]);

  useEffect(() => {
    getYebSettleRateList()
      .then((res: any) => {
        console.log(res);
        if ((res.Data?.length ?? 0) >= 0) {
          setYebRateList(res.Data);
          // changeGeneralState('levelList', res.Data);
          // const temp = res.Data.find((it) => it.Expand === level);
          // setDailyRate(temp?.Value || '0.0%');
        }
      })
      .catch(() => {});
  }, [changeGeneralState, level]);

  return (
    <>
      <div className='w-full h-220 bg-gdt-top p-a' />
      <div className='p-30-50-0 zi-mini'>
        <div className='d-f fd-c jc-c bg-body br-30 p-50 bs-primary'>
          <div className='font-w-normal m-b-50'>
            <span>{formatMsg('DT_Account')}</span>
            <span className='color-red'>
              <Score />
            </span>
          </div>

          <div className='font-w-normal df-aic-jcc m-b-50'>
            {formatMsg('aggregateBalance')}
          </div>

          <div className='df-aic-jcc m-30 wds-big-game font-w-bold m-b-30'>
            <ThousandsNumberSpan num={formatDigit(yebInfo.Total ?? 0)} />
          </div>

          <div className='m-0-auto bg-main br-72 p-20-40'>
            <span>{formatMsg('YesterdayEarnings')}:</span>
            <span className='color-red m-l-10'>
              <span>{yebInfo.LastProfit < 0 ? '-' : '+'}</span>
              <ThousandsNumberSpan num={yebInfo.LastProfit ?? 0} />
            </span>
          </div>

          <div className='d-f fd-r jc-sa m-t-100'>
            <div className='f-1 d-f fd-c ai-c'>
              <div className='wds-con color-tips'>
                {formatMsg('accumulatedEarnings')}
              </div>
              <div className='m-t-20 color-red'>
                <span>{yebInfo.TotalProfit < 0 ? '-' : '+'}</span>
                <ThousandsNumberSpan
                  num={formatDigit(yebInfo.TotalProfit ?? 0)}
                />
              </div>
              <Button
                className='m-t-30 w-400 br-20 bg-alternate color-primary'
                onClick={() => navRollInOut('out')}
              >
                {formatMsg('rollOut')}
              </Button>
            </div>

            <div className='f-1 d-f fd-c ai-c'>
              <div className='d-f fd-r ai-c'>
                <div className='wds-con color-tips'>
                  {formatMsg('dailyRate')}
                </div>
                <RateHelpModal data={yebRateList} />
              </div>
              <div className='m-t-20'>
                <UserLevelRate />
              </div>
              <Button
                className='m-t-30 w-400 br-20'
                onClick={() => navRollInOut('in')}
              >
                {formatMsg('shiftTo')}
              </Button>
            </div>
          </div>
        </div>

        <div className='m-t-30 bg-body br-30 bs-primary p-50 d-f fd-r jc-sa'>
          <div className='f-1 d-f fd-c ai-c' onClick={() => navDetail()}>
            <Img src='/mine/yeb/icon_mx.png' alt='' className='icon-100' />
            <span className='m-t-20 color-primary-text'>
              {formatMsg('personal.fundDetail')}
            </span>
          </div>
          <div
            className='f-1 d-f fd-c ai-c'
            onClick={() => navRateCalculation()}
          >
            <Img src='/mine/yeb/icon_shouy.png' alt='' className='icon-100' />
            <span className='m-t-20 color-primary-text'>
              {formatMsg('earningsCalc')}
            </span>
          </div>
        </div>

        <div className='m-t-50 m-b-50'>
          <KindTips
            className='m-t-2'
            title={formatMsg('reminder') || tips.Title}
            data={yuebaoKindTips || getContentDesc(tips.Content)}
          />
        </div>
      </div>
    </>
  );
};

export default memo(YueBao);
