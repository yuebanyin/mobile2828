import {
 ReactNode, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState 
} from 'react';
import dayjs from 'dayjs';
import iconRectLeft from '@/assets/image/games/turntable/icon-rect-left.png';
import iconRectRight from '@/assets/image/games/turntable/icon-rect-right.png';
import './index.scss';
import { Img } from '../img';

function getTodayString(): string {
  const today = new Date().toISOString().split('T').shift();
  return today;
}

export type CalendarRef = {
  // eslint-disable-next-line no-unused-vars
  scrollToMonth: (date: Date) => void;
};

export type CalendarProps = {
  startDate?: Date;
  defaultDate?: Date;
  endDate?: Date;
  firstDayOfWeek?: number;
  // eslint-disable-next-line no-unused-vars
  renderWeekClass?: (week: number) => string;
  // eslint-disable-next-line no-unused-vars
  renderDayClass?: (date: Date) => string;
  // eslint-disable-next-line no-unused-vars
  renderDayCoverView?: (date: Date) => ReactNode;
  // eslint-disable-next-line no-unused-vars
  onDayClick?: (date: Date) => void;
  // eslint-disable-next-line no-unused-vars
  onActYearMonthChange?: (actYear: number, actMonth: number) => void;
};

const defaultProps = {
  startDate: dayjs(getTodayString()).subtract(6, 'month').toDate(),
  defaultDate: dayjs(getTodayString()).toDate(),
  endDate: dayjs(getTodayString()).add(6, 'month').toDate(),
  firstDayOfWeek: 0, // 0-6 设置周起始日
} as Partial<CalendarProps>;

export const Calendar = forwardRef<CalendarRef, CalendarProps>((props, ref) => {
  // console.log('🚀 ~ file: index.tsx:48 ~ Calendar ~ props:', props);
  const {
 startDate, defaultDate, endDate, firstDayOfWeek, renderWeekClass, renderDayClass, renderDayCoverView, onDayClick, onActYearMonthChange 
} = {
    ...defaultProps,
    ...props,
  };

  const [actYear, setActYear] = useState(dayjs(defaultDate).year());
  const [actMonth, setActMonth] = useState(dayjs(defaultDate).month() + 1);

  const weekList = useMemo(() => {
    const a = ['日', '一', '二', '三', '四', '五', '六'];
    return [...a.splice(firstDayOfWeek, 7), ...a.splice(0, firstDayOfWeek)];
  }, [firstDayOfWeek]);

  const buildWeekItemView = useCallback(
    (weekName: string) => {
      const a = ['日', '一', '二', '三', '四', '五', '六'];
      let csn = 'bx-calendar-width-box p-20-40 bc-split b-b-1 ta-c';
      if (renderWeekClass) csn += ` ${renderWeekClass(a.findIndex((r) => r === weekName))}`;
      return (
        <div key={weekName} className={`${csn}`}>
          {weekName}
        </div>
      );
    },
    [renderWeekClass]
  );

  const dateFirst = useMemo(() => {
    const monthFirstDate = dayjs(`${actYear}-${actMonth}-1`);
    const week = monthFirstDate.day();
    const gap = (7 + week - firstDayOfWeek) % 7;
    return monthFirstDate.subtract(gap, 'day');
  }, [firstDayOfWeek, actYear, actMonth]);

  const buildDateItemView = useCallback(
    (index: number) => {
      const buildDate = dateFirst.add(index, 'day');
      let csn = 'bx-calendar-cell m-t-10 m-b-10';
      const disabled = buildDate.isBefore(startDate) || buildDate.isAfter(endDate);
      if (disabled) csn += ' bx-calendar-cell-disable';
      if (renderDayClass) csn += ` ${renderDayClass(buildDate.toDate())}`;
      return (
        <div key={index} className='bx-calendar-width-box d-f fd-c jc-c ai-c ta-c' onClick={() => !disabled && onDayClick && onDayClick(buildDate.toDate())}>
          <div className={`${csn}`}>{buildDate.date()}</div>
          {renderDayCoverView && renderDayCoverView(buildDate.toDate())}
        </div>
      );
    },
    [dateFirst, startDate, endDate, renderDayClass, renderDayCoverView, onDayClick]
  );

  const scrollToMonth = (date: Date) => {
    const y = dayjs(date).year();
    const m = dayjs(date).month() + 1;
    setActYear(() => y);
    setActMonth(() => m);
    if (onActYearMonthChange) {
      onActYearMonthChange(y, m);
    }
  };

  const beforeMonth = () => {
    const monthFirstDate = dayjs(`${actYear}-${actMonth}-1`);
    scrollToMonth(monthFirstDate.subtract(1, 'month').toDate());
  };

  const nextMonth = () => {
    const monthFirstDate = dayjs(`${actYear}-${actMonth}-1`);
    scrollToMonth(monthFirstDate.add(1, 'month').toDate());
  };

  useImperativeHandle(ref, () => ({
    scrollToMonth,
  }));

  useEffect(() => {
    if (onActYearMonthChange) {
      const y = dayjs(defaultDate).year();
      const m = dayjs(defaultDate).month() + 1;
      onActYearMonthChange(y, m);
    }
  }, [defaultDate, onActYearMonthChange]);

  return (
    <>
      <div className='d-f fd-r jc-c ai-c w-full p-10 m-t-40'>
        <Img isNoTheme src={iconRectLeft} className='w-16 h-30 d-if' onClick={() => beforeMonth()} />
        <div className='h-41 t-small-title w-258 ta-c m-0-50 color-tips'>
          <span>{actYear}</span>
          <span>年</span>
          <span>{actMonth}</span>
          <span>月</span>
        </div>
        <Img isNoTheme src={iconRectRight} className='w-16 h-30 d-if' onClick={() => nextMonth()} />
      </div>
      <div className='d-f df-c jc-c w-full p-20-40 m-t-10'>{weekList.map((r) => buildWeekItemView(r))}</div>
      <div className='d-f df-c jc-c flex-w w-full p-0-20'>{[...new Array(42).keys()].map((index) => buildDateItemView(index))}</div>
    </>
  );
});

Calendar.defaultProps = defaultProps;
Calendar.displayName = 'BxCalendar';
