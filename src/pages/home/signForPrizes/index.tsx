import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { observer } from 'mobx-react-lite';
import signBg from '@/assets/image/games/turntable/sign_bg.png';
import signBoxBg from '@/assets/image/games/turntable/sign_box_bg.png';
import signNowBtn from '@/assets/image/games/turntable/sign_now_btn.png';
import signNowBtn2 from '@/assets/image/games/turntable/sign_now_btn2.png';
import { BgImg, Calendar, toastText, toastSuccess } from '@/components';
import './index.scss';
import { getSignInUserInfo, nowSignInToday } from '@/services';
import { useUserScoreStore } from '@/mobx';
import { useLanguage } from '@/hooks';

/**
 * 首页-签到有奖
 * @returns
 */
const SignForPrizes = observer(() => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  // 美东日期
  // const [atDayjs] = useState(dayjs('2023-07-13 10:00:00').tz('America/Toronto')); // 美东时间会晚13个小时
  const [atDayjs] = useState(dayjs().tz('Asia/Shanghai')); // 东八区时间时区
  console.log(
    '🚀 ~ file: index.tsx:31 ~ SignForPrizes ~:',
    atDayjs,
    dayjs(atDayjs).format('YYYYMMDD HH:mm:ss')
  );
  const atDay = useMemo(() => atDayjs.format('YYYYMMDD'), [atDayjs]);
  const atWeek = useMemo(() => atDayjs.day(), [atDayjs]);
  const { formatMsg } = useLanguage();

  const { bindScore, changeUserIntegral } = useUserScoreStore();
  const [historySign, setHistorySign] = useState([]);
  const [isSingeDone, seIsSingeDone] = useState<boolean>(false);
  const [time, setTime] = useState(0);

  const loadData = useCallback(() => {
    getSignInUserInfo()
      .then((res: any) => {
        if (res.Code === 210 && res.Data) {
          changeUserIntegral(res?.Data?.Balance);
          const temp: string[] = res.Data.Status.filter(
            (r: { Status: number; DateId: number }) => r.Status === 1
          ).map((r: { Status: number; DateId: number }) => `${r.DateId}`);
          setHistorySign(() => temp);
          seIsSingeDone(() => temp.includes(atDay));
          setTime(() => temp.length);
        }
      })
      .catch(() => {});
  }, [changeUserIntegral, atDay]);

  const signNow = useCallback(() => {
    nowSignInToday()
      .then((res: any) => {
        if (res.Code === 210) {
          toastSuccess(formatMsg('SignSuccess'));
          loadData();
        } else {
          // toastText(res.Message);
          const msgObj = JSON.parse(res.Message);
          toastText(formatMsg(msgObj?.key, msgObj?.parm));
        }
      })
      .catch(() => {});
  }, [loadData, formatMsg]);

  const buildDayClass = useCallback(
    (date: Date) => {
      const formatDate = dayjs(date).format('YYYYMMDD');
      if (historySign.includes(formatDate)) return 'bx-calendar-cell-select';
      if (atDay === formatDate) return 'bx-calendar-cell-click';
      return '';
    },
    [historySign, atDay]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <BgImg isNoTheme url={signBg} className='sign-bg-img' />
      <BgImg isNoTheme url={signBoxBg} className='sign-box-bg-img'>
        <div className='sign-point-box color-white'>{bindScore || 0}</div>
        <div className='sign-time-tip color-tips t-small'>
          {`(${formatMsg('EastEighthDistrictTime')})`}
        </div>
        <div className='sign-calendar-box'>
          <Calendar
            startDate={dayjs(atDay).startOf('month').toDate()}
            defaultDate={dayjs(atDay).startOf('month').toDate()}
            endDate={dayjs(atDay).endOf('month').toDate()}
            onDayClick={(e) => {
              console.log('onDayClick', e);
            }}
            renderDayClass={buildDayClass}
            renderWeekClass={(week) => (week === atWeek ? 'color-primary' : '')}
            onActYearMonthChange={(y, m) => {
              console.log('onActYearMonthChange', y, m);
            }}
          />
          {isSingeDone ? (
            <BgImg
              isNoTheme
              url={signNowBtn2}
              className='sign-now-btn m-t-30'
            />
          ) : (
            <BgImg
              isNoTheme
              url={signNowBtn}
              className='sign-now-btn m-t-30'
              onClick={signNow}
            />
          )}
          <div>
            <span>{formatMsg('signThisMonth')}</span>
            <span className='m-0-20 color-red t-small-title'>{time}</span>
            <span>{formatMsg('bout')}</span>
          </div>
        </div>
      </BgImg>
    </>
  );
});

export default SignForPrizes;

