import { memo, useEffect, useState } from 'react';
import { Tabs } from '@/components/tabs';
import styles from './index.module.scss';
import { getDataAnalysis } from '@/services';
import { Table, TableColumnProps } from '@/components/table';
import { time } from '@/utils/time';
import { useLanguage } from '@/hooks';

interface RecordListProps {
  recordsData?: any[];
  gameId?: number;
  isShowMore?: boolean;
}

const tabList = [
  { id: 0, text: 'TE', count: 28 },
  { id: 1, text: 'DING_1', count: 10 },
  { id: 2, text: 'DING_2', count: 10 },
  { id: 3, text: 'DING_3', count: 10 },
];

const typeTitle = [
  { id: 1, title: 'TE' },
  { id: 2, title: 'GE_UP_QI' },
  { id: 3, title: 'TODAY_OPEN' },
];

const arrPeriodsTitle = [
  ['QI_SHU', 'VALUE', 'XIAO', 'DA', 'DAN', 'SHUANG', 'JIXIAO', 'JIDA'],
  ['QI_SHU', 'VALUE', 'XIAO', 'DA', 'DAN', 'SHUANG', 'LONG', 'HU', 'HE'],
  ['QI_SHU', 'VALUE', 'XIAO', 'DA', 'DAN', 'SHUANG', 'LONG', 'HU', 'HE'],
  ['QI_SHU', 'VALUE', 'XIAO', 'DA', 'DAN', 'SHUANG', 'LONG', 'HU', 'HE'],
];

const getTextColor = (text) => {
  if (['DA', 'DAN'].includes(text)) {
    return 'color-red';
  }
  if (['XIAO', 'SHUANG'].includes(text)) {
    return 'color-blue';
  }
  return 'color-primary-text';
};

const DataAnalysis = (props: RecordListProps) => {
  const { recordsData, gameId } = props;

  const [cbDataAnalysis, setCbDataAnalysis] = useState<any[]>();
  const [cbTmTypes, setCbTmTypes] = useState<any[]>([]);
  const [cbTdTypes, setCbTdTypes] = useState<any[]>([]);
  const { formatMsg } = useLanguage();

  const [curSelectType, setCurSelectType] = useState<number>(0);

  useEffect(() => {
    if (recordsData.length >= 0) {
      getDataAnalysis({ ID: `${gameId}` })
        .then((res: any) => {
          if (res.Data) {
            setCbDataAnalysis(res.Data);

            const tempArr = [];
            for (let i = 0; i < res.Data['Miss'].length; i += 1) {
              if (res.Data['Miss'][i].Type === 0) {
                tempArr.push({
                  id: res.Data['Miss'][i].Number,
                  value: res.Data['Miss'][i].Count,
                });
              }
            }
            setCbTmTypes(tempArr);

            const tempArrEx = [];
            for (let i = 0; i < res.Data['Today'].length; i += 1) {
              if (res.Data['Today'][i].Type === 0) {
                tempArrEx.push({
                  id: res.Data['Today'][i].Number,
                  value: res.Data['Today'][i].Count,
                });
              }
            }
            setCbTdTypes(tempArrEx);
          }
        })
        .catch(() => {});
    }
  }, [gameId, recordsData?.length]);

  const switchTabs = (item) => {
    setCurSelectType(item['id']);
    const tempArr = [];
    for (let i = 0; i < cbDataAnalysis['Miss'].length; i += 1) {
      if (cbDataAnalysis['Miss'][i].Type === item['id']) {
        tempArr.push({
          id: cbDataAnalysis['Miss'][i].Number,
          value: cbDataAnalysis['Miss'][i].Count,
        });
      }
    }
    setCbTmTypes(tempArr);

    const tempArrEx = [];
    for (let i = 0; i < cbDataAnalysis['Today'].length; i += 1) {
      if (cbDataAnalysis['Today'][i].Type === item['id']) {
        tempArrEx.push({
          id: cbDataAnalysis['Today'][i].Number,
          value: cbDataAnalysis['Today'][i].Count,
        });
      }
    }
    setCbTdTypes(tempArrEx);
  };

  const columns: TableColumnProps[] = [];

  for (
    let index = 0;
    index < arrPeriodsTitle[curSelectType].length;
    index += 1
  ) {
    const element = arrPeriodsTitle[curSelectType][index];
    const obj = {
      title: formatMsg(element),
      key: element,
      tbClassName: `color-records-col b-b-1 ws-no p-15-0 bg-body ${styles['analysis-scroll-item']}`,
      render: (record: any) => {
        let tempVal = '';
        const arrTableCard = record.cbTableCard;
        const cbTableCard = arrTableCard[curSelectType];

        switch (element) {
          case 'QI_SHU':
            tempVal = record.szPeriodNumber.value;
            break;
          case 'VALUE':
            if (cbTableCard < 10) {
              tempVal = '0';
            }
            tempVal += cbTableCard.toString();
            break;
          case 'XIAO':
            if (curSelectType === 0) {
              tempVal = cbTableCard < 14 ? 'XIAO' : '';
            } else {
              tempVal = cbTableCard < 5 ? 'XIAO' : '';
            }
            break;
          case 'DA':
            if (curSelectType === 0) {
              tempVal = cbTableCard > 14 ? 'DA' : '';
            } else {
              tempVal = cbTableCard > 5 ? 'DA' : '';
            }
            break;
          case 'DAN':
            tempVal = cbTableCard % 2 === 0 ? 'SHUANG' : 'DAN';
            break;
          case 'SHUANG':
            tempVal = cbTableCard % 2 === 0 ? 'SHUANG' : 'DAN';
            break;
          case 'JIXIAO':
            tempVal = cbTableCard <= 5 ? 'JIXIAO' : '';
            break;
          case 'JIDA':
            tempVal = cbTableCard >= 22 ? 'JIXIAO' : '';
            break;
          case 'LONG':
            if (arrTableCard[1] === arrTableCard[3]) {
              tempVal = '';
            } else if (arrTableCard[1] >= arrTableCard[3]) {
              tempVal = 'LONG';
            } else {
              tempVal = '';
            }
            break;
          case 'HU':
            if (arrTableCard[1] === arrTableCard[3]) {
              tempVal = '';
            } else if (arrTableCard[1] >= arrTableCard[3]) {
              tempVal = '';
            } else {
              tempVal = 'HU';
            }
            break;
          case 'HE':
            if (arrTableCard[1] === arrTableCard[3]) {
              tempVal = 'HE';
            } else if (arrTableCard[1] >= arrTableCard[3]) {
              tempVal = '';
            } else {
              tempVal = '';
            }
            break;
          default:
        }

        return (
          <span className={getTextColor(tempVal)}>{formatMsg(tempVal)}</span>
        );
      },
    };
    columns.push(obj);
  }

  return (
    <div className={styles['data-analy-wrap']}>
      <Tabs
        activeId={0}
        searchList={tabList.map((it) => ({ ...it, text: formatMsg(it.text) }))}
        onClick={switchTabs}
      />
      <div className=' fd-r ai-c jc-sa d-f  wds-sm-title m-b-10 m-t-20 p-0-30'>
        <span className={`flex-1 ${styles['bx-title']}`}>
          {formatMsg('TM_TONGJI')}
        </span>
        <span className={`${styles['bx-period']}`}>
          {formatMsg('SHOW_QI')}:50
        </span>
        <span className={`m-l-30 ${styles['bx-time']}`}>
          {time.formatDateTime(new Date().getTime(), false, true)}
        </span>
      </div>
      <div className='d-f  t-small trans-h h-256 p-30 m-b-20 '>
        <div className='w-150 h-256 bg-alternate'>
          {typeTitle.map((it) => (
            <div key={it.id} className='ta-c color-primary p-16-10 w-150 h-80 '>
              {formatMsg(it.title)}
            </div>
          ))}
        </div>

        <div className='o-x flex-1 h-256'>
          <div className='ta-c'>
            <div className='d-f'>
              {cbTmTypes.map((item) => (
                <div
                  key={item.id}
                  className={`color-records-col b-b-1 ws-no p-15-0 bg-records-title ${styles['analysis-scroll-item']}`}
                >
                  {item.id}
                </div>
              ))}
            </div>

            <div className='d-f '>
              {cbTmTypes.map((item) => (
                <div
                  key={item.id}
                  className={`ws-no p-15-0 b-r-1 b-b-1 bc-split ${styles['analysis-scroll-item']} `}
                >
                  {item.value}
                </div>
              ))}
            </div>
            <div className='d-f '>
              {cbTdTypes.map((item) => (
                <div
                  key={item.id}
                  className={`ws-no p-15-0 b-r-1 b-t-1 b-b-1 bc-split ${styles['analysis-scroll-item']}`}
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='d-f t-small o-none trans-h m-t-60 m-b-40 m-0-30'>
        <Table
          className={styles['tab-wrap']}
          tbodyClassName='b-1 bc-split'
          isBodyTopBordered
          isBodyBordered
          columns={columns.slice(0, 1)}
          data={recordsData}
          headerClassName={`${styles['table-header-bg']}`}
        />
        <div className='o-x'>
          <Table
            tbodyClassName='b-r-1 bc-split'
            isBodyTopBordered
            isBodyBordered
            columns={columns.slice(1)}
            data={recordsData}
            headerClassName='bg-records-title'
          />
        </div>
      </div>
    </div>
  );
};

export default memo(DataAnalysis);
