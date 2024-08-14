import { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Img, Input, Button, toastText } from '@/components';
import style from './index.module.scss';
import { CalendarPicker } from '@/components/calendarPicker';
import { useGeneralStore, useUserInfoStore } from '@/mobx';
import { formatDigit, getSubDateDay } from '@/utils/tools';
import { useNavigation, useLanguage } from '@/hooks';

/**
 * 余额宝-收益计算器
 * @returns
 */
const RateCalculation = () => {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState<Date>(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  const { level } = useUserInfoStore();
  const { getLevelExpand } = useGeneralStore();
  const navigate = useNavigation();
  const { formatMsg } = useLanguage();

  const times = useMemo(() => getSubDateDay(new Date(), date), [date]);

  const changeValue = useMemo(() => {
    if (value <= 0) return 0;
    if (times <= 0) return 0;
    const rate = getLevelExpand(level);
    return value * (rate / 100.0) * times;
  }, [times, value, getLevelExpand, level]);

  const handleRoll = useCallback(
    (_, resolve) => {
      if (value <= 0) {
        toastText(`${formatMsg('pleaseEnterAmount')}`);
        resolve && resolve();
        return;
      }
      if (changeValue <= 0) {
        toastText(`${formatMsg('pleaseSelectDate')}`);
        resolve && resolve();
        return;
      }
      console.log(
        '🚀 ~ file: index.tsx:34 ~ RateCalculation ~ changeValue:',
        changeValue
      );
      navigate(`/mine/yuebao/rollInOut?mode=in&title=${formatMsg('shiftTo')}`, {
        state: {
          settleDate: `${date?.toLocaleDateString()} 00:00:00`,
          settleValue: value,
        },
      });
    },
    [changeValue, value, navigate, date, formatMsg]
  );

  return (
    <>
      <Img className='p-a' src='/mine/yeb/bg_001.png' />
      <div className={`zi-mini ${style['calculation-card']}`}>
        <div className='br-30 bg-body bs-primary d-f fd-c jc-c ai-s'>
          <div className='p-50 font-w-normal ta-c t-h1'>
            {formatMsg('transferInAmount')}
          </div>
          <Input
            className='w-full p-50 m-b-50 ta-c t-large'
            placeholder={formatMsg('pleaseEnterAmount')}
            type='number'
            value={value}
            onChange={(r: any) => setValue(r)}
          />
          <div className='p-30 b-t-b-1 bc-split w-full d-f fd-r ac-c'>
            <div className='flex-1'>{formatMsg('transferOutDate')}</div>
            <CalendarPicker
              className='d-f fd-r ac-c'
              defaultDate={date}
              onConfirm={setDate}
            >
              <div>
                {date?.toLocaleDateString() ||
                  `${formatMsg('pleaseSelectDate')}`}
              </div>
              <Img
                src='/mine/yeb/icon_riq.png'
                alt=''
                className='m-l-50 m-r-50 icon-50'
              />
            </CalendarPicker>
          </div>
          <div className='m-44 br-20 bg-main ta-c'>
            <div className='m-t-50 w-full'>{formatMsg('incomeAmount')}</div>
            <div className='m-t-50 m-b-50 color-red t-large'>
              {formatDigit(changeValue)}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-138 p-0-52 m-t-100'>
        <Button
          className='w-940 h-138'
          isPromise
          type='primary'
          size='large'
          onClick={handleRoll}
        >
          <span>{formatMsg('confirmRollOut')}</span>
        </Button>
      </div>
    </>
  );
};

export default observer(RateCalculation);

