import {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';
import { Popup } from '@nutui/nutui-react';
import { Calendar, CalendarProps, CalendarRef } from '../calendar';
import './index.scss';
import { Button } from '../button';
import { Icon } from '../icon';
import { useLanguage } from '@/hooks';

function getTodayString(): string {
  const today = new Date().toISOString().split('T').shift();
  return today;
}

export type CalendarPickerRef = {
  // eslint-disable-next-line no-unused-vars
  scrollToMonth: (date: Date) => void;
  // eslint-disable-next-line no-unused-vars
  getSelectedDate: () => Date | null;
};

export type CalendarPickerProps = {
  className?: string;
  children?: ReactNode;
  visible?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose?: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (date: Date) => void;
};

const defaultProps = {
  visible: false,
  startDate: dayjs(getTodayString()).toDate(),
  defaultDate: dayjs(getTodayString()).toDate(),
  endDate: dayjs(getTodayString()).add(6, 'month').toDate(),
  showToday: true,
  firstDayOfWeek: 0, // 0-6 设置周起始日
} as Partial<CalendarPickerProps>;

export const CalendarPicker = forwardRef<
  CalendarPickerRef,
  CalendarPickerProps & CalendarProps
>((props, ref) => {
  const {
    className,
    children,
    defaultDate,
    visible,
    onClose,
    onConfirm,
    onDayClick,
    ...rest
  } = { ...defaultProps, ...props };
  const { formatMsg } = useLanguage();

  const calendarRef = useRef<CalendarRef>();
  const [value, setValue] = useState(defaultDate || new Date());
  const [showBasic, setShowBasic] = useState(visible);

  const atWeek = useMemo(() => dayjs(getTodayString()).day(), []);

  const reset = (date?: Date) => {
    setValue(() => date);
  };

  const getSelectedDate = () => value;

  useImperativeHandle(ref, () => ({
    scrollToMonth: calendarRef.current.scrollToMonth,
    reset,
    getSelectedDate,
  }));

  const buildSourceNode = useCallback(() => {
    if (children) return children;
    const str =
      value?.toISOString().split('T').shift() || formatMsg('pleaseSelectDate');
    return str;
  }, [children, value, formatMsg]);

  const buildCalendarTitleNode = useCallback(() => {
    console.log('buildCalendarTitleNode');
    return <></>;
  }, []);

  const buildCalendarCloseNode = useCallback(() => {
    console.log('buildCalendarCloseNode');
    return (
      <Icon
        onClick={() => {
          setShowBasic(false);
          if (onClose) onClose();
        }}
        className='bx-calendar-close-box color-assist'
        name='close'
      />
    );
  }, [onClose]);

  const buildSignViewClass = useCallback(
    (date: Date) => {
      const formatDate = dayjs(date).format('YYYYMMDD');
      const valueStr = dayjs(value).format('YYYYMMDD');
      const todayStr = dayjs(getTodayString()).format('YYYYMMDD');
      if (formatDate === valueStr) return 'bx-calendar-cell-click';
      if (formatDate === todayStr) return 'bx-calendar-cell-hover';
      return '';
    },
    [value]
  );

  return (
    <>
      <div className={className} onClick={() => setShowBasic((r) => !r)}>
        {buildSourceNode()}
      </div>
      <Popup
        visible={showBasic}
        position='bottom'
        popClass='bx-calendar-popup-box'
        onClose={() => {
          setShowBasic(false);
          if (onClose) onClose();
        }}
      >
        {buildCalendarTitleNode()}
        {buildCalendarCloseNode()}
        <Calendar
          ref={calendarRef}
          {...rest}
          renderDayClass={buildSignViewClass}
          renderWeekClass={(week) => (week === atWeek ? 'color-primary' : '')}
          defaultDate={defaultDate}
          onDayClick={setValue}
        />
        <div className='w-full h-138 p-0-52 m-t-50'>
          <Button
            className='w-940 h-138'
            type='primary'
            size='large'
            onClick={() => {
              setShowBasic(false);
              if (onConfirm) onConfirm(value);
            }}
          >
            <span>{formatMsg('confirm')}</span>
          </Button>
        </div>
      </Popup>
    </>
  );
});

