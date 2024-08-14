import { useCallback, useEffect, useRef, useState } from 'react';
import i18n from 'i18next';
import { DatePicker } from '@nutui/nutui-react';
import { Avatar, Cell, CellGroup, Icon, Tabs } from '@/components';
import { formatDate, getTimeRange } from '@/utils/dayjs';
import { getRedPacketDetails } from '@/services';
import { formatDigit } from '@/utils/tools';
import { useNavigation, useLanguage } from '@/hooks';
import { time } from '@/utils/time';
import { useGlobalStore, useUserInfoStore } from '@/mobx';

interface PickerOption {
  text: string | number;
}

const tabList = [
  { id: 1, textb: '发红包', text: `${i18n.t('sendEnvelopes')}` },
  { id: 2, textb: '抢红包', text: `${i18n.t('GameInfoItem318')}` },
];

// 红包明细
const EnvelopeDetail = () => {
  const { formatMsg } = useLanguage();
  const initRef = useRef(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chooseDate, setChooseDate] = useState(null);
  const tabIndex = useRef(1);
  const [actionTxt, setActionTxt] = useState(`${formatMsg('giveOut')}`);
  const [actionWay, setActionWay] = useState(`${formatMsg('getNum')}`);
  const [sendEnvelopeCount, setSendEnvelopeCount] = useState(0); //发出去红包个数
  const [getEnvelopeCount, setGetEnvelopeCount] = useState(0); //抢到红包个数
  const [envelopePeopleCount, setEnvelopePeopleCount] = useState(0); //领取人数
  const [envelopeLuckyCount, setEnvelopeLuckyCount] = useState(0); //手气最佳
  const [type, setType] = useState<number>(1);
  const navigate = useNavigation();
  const { nickname } = useUserInfoStore();

  const initDateList = formatDate(new Date(), '_YMD').split('-');
  const initDate = `${initDateList[0]}${formatMsg('year')} ${
    initDateList[1]
  } ${formatMsg('yue')}`;

  //初始化当前年月时间
  useEffect(() => {
    if (initDate) {
      setChooseDate(initDate);
    }
  }, [initDate]);

  const queryParam = useRef({
    StartTime: getTimeRange('today').startTime,
    Type: 1,
  });

  const [totalScore, setTotalScore] = useState<number>(0);
  const [recordList, setRecordList] = useState([]);
  const { changeState } = useGlobalStore();

  const getDataList = useCallback(() => {
    recordList.splice(0, recordList.length);
    changeState('isLoading', true);
    getRedPacketDetails(queryParam.current)
      .then((res: any) => {
        if (queryParam.current.Type === 1) {
          setSendEnvelopeCount(res.Data.Total);
          setEnvelopePeopleCount(res.Data.PeopleCount);
          if (res.Data?.List) {
            setRecordList([
              ...res.Data.List.map((it) => ({
                id: it.Id,
                date: it.Date.substring(0, 10),
                value: formatDigit(it.Amount),
                tip: `${formatMsg('Claimed')}${it.Current}/${
                  it.TotalCount
                }${formatMsg('individual')}`,
                title: it.Title,
                current: it.Current,
                totalCount: it.TotalCount,
              })),
            ]);
          }
        } else if (queryParam.current.Type === 2) {
          setGetEnvelopeCount(res.Data.Total);
          setEnvelopeLuckyCount(res.Data.LuckyCount);
          if (res.Data?.List) {
            setRecordList([
              ...res.Data.List.map((it, i) => ({
                id: i,
                date: it.Date.substring(5, 10),
                value: formatDigit(it.Amount),
                name: it.Name,
                title: '',
              })),
            ]);
          }
        }
        setTotalScore(res.Data.TotalScore);
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [recordList, changeState, formatMsg]);

  const handleClick = (item: any) => {
    if (tabIndex.current === 1) {
      navigate('/mine/fundingTransf/envelopeDetail/list', {
        state: {
          id: item.id,
          title: item.title,
          totalCount: item.totalCount,
          current: item.current,
        },
      });
    }
  };

  const switchTabs = (item) => {
    if (tabIndex.current === item.id) return;
    tabIndex.current = item.id;
    queryParam.current.Type = item.id;
    setType(item.id);
    // setActionTxt(`${item.id === 1 ? '发出' : '抢到'}红包`);
    // setActionWay(item.id === 1 ? '领取人数' : '手气最佳');
    setActionTxt(
      item.id === 1 ? `${formatMsg('giveOut')}` : `${formatMsg('snag')}`
    );
    setActionWay(
      item.id === 1 ? `${formatMsg('getNum')}` : `${formatMsg('shouqihao')}`
    );
    getDataList();
  };

  const confirmDate = (
    values: (string | number)[],
    options: PickerOption[]
  ) => {
    setChooseDate(options.map((option) => option.text).join(' '));
    queryParam.current.StartTime = values.map((option) => option).join('-');
    getDataList();
  };

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      getDataList();
    }
  }, [getDataList]);

  return (
    <>
      <CellGroup>
        <Tabs activeId={1} searchList={tabList} onClick={switchTabs} />
      </CellGroup>
      {/* 用户信息块 */}
      <div className='bg-incon df-fdc jc-c'>
        <div className='df-fdc'>
          {/* 日期 */}
          <div
            className='d-f fd-c jc-end ai-end m-r-30'
            onClick={() => {
              setShowDatePicker(true);
            }}
          >
            <div className='d-f ai-c jc-end m-t-30 bg-body w-350 br-20'>
              <div className='m-0-20'>{chooseDate}</div>
              <Icon className='m-t-10' name='rect-down' />
            </div>
          </div>
          {/* 头像 */}
          <div className='df-fdc jc-c ai-c m-t-30'>
            <Avatar className='icon-160' />
          </div>

          {/* 用户昵称操作类型 */}
          <div className='df-fdc jc-c ai-c ta-c m-t-30'>
            <div className='wds-sm-title'>{`${nickname}${actionTxt}`}</div>
          </div>

          {/* 红包额度 */}
          <div className='df-fdc jc-c ai-c ta-c m-t-30'>
            <div className='wds-big-env'>{totalScore}</div>
          </div>

          {/* 领取或抢红包概况 */}
          <div className='d-f fd-r jc-sa ai-c m-30-0'>
            <div className='d-f fd-c jc-c ai-c'>
              <div className='p-l-20'>
                {type === 1 ? sendEnvelopeCount : getEnvelopeCount}
              </div>
              <div className='p-l-20'>{actionTxt}</div>
            </div>
            <div className='d-f fd-c jc-c ai-c'>
              <div className='p-l-20'>
                {type === 1 ? envelopePeopleCount : envelopeLuckyCount}
              </div>
              <div className='p-l-20'>{actionWay}</div>
            </div>
          </div>
        </div>
      </div>
      {/* 列表块 */}
      <CellGroup className='br-30 o-y'>
        {recordList.map((item, i) => (
          <Cell
            key={item.id || i}
            className='br-30'
            title={
              tabIndex.current === 1 ? (
                <div className='m-l-50 color-con-ass wds-con'>{item.date}</div>
              ) : (
                <div className='d-f fd-c ai-start jc-c m-l-50'>
                  <div className='wds-con color-primary-text'>{item.name}</div>
                  <div className='m-t-10 color-con-ass wds-sm-con'>
                    {time.formatMD(item.date)}
                  </div>
                </div>
              )
            }
            titleClassName='color-con-ass'
            rightSolt={
              tabIndex.current === 1 ? (
                <div className='d-f fd-c jc-c ai-c m-0-44'>
                  <div className='p-l-20 color-red wds-con'>
                    {`${item.value}${formatMsg('yuan')}`}
                  </div>
                  <div className='p-l-20 m-t-6 color-con-ass wds-sm-con'>
                    {item.tip}
                  </div>
                </div>
              ) : (
                <div className='d-f fd-c jc-c ai-c m-0-44'>
                  <div className='p-l-20 color-red wds-con'>
                    {`${item.value}${formatMsg('yuan')}`}
                  </div>
                </div>
              )
            }
            onClick={() => {
              handleClick(item);
            }}
            isDivider={i !== recordList.length - 1}
          />
        ))}
      </CellGroup>

      <DatePicker
        title={formatMsg('choseDay')}
        type='year-month'
        visible={showDatePicker}
        modelValue={new Date()}
        isShowChinese
        onCloseDatePicker={() => setShowDatePicker(false)}
        onConfirmDatePicker={(values, options) => confirmDate(values, options)}
      />
    </>
  );
};

export default EnvelopeDetail;
