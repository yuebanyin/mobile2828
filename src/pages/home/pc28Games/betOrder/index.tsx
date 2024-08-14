import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import i18n from 'i18next';
import {
  Dialog,
  FooterTableColumnProps,
  Icon,
  Select,
  Table,
  TableColumnProps,
} from '@/components';
import { Option } from '@/components/select/option';
import styles from './index.module.scss';
import { useGameConfigStore } from '@/mobx';
import { GameMgr } from '@/engine/mgr/mgr';
import { getCusBetList } from '@/services';
import { formatDigit } from '@/utils/digit';
import { useLanguage } from '@/hooks';

interface BetOrderModelProps {
  curGameId: number;
  onCancel?: Function;
  gameRecords: any[];
  sourceNode?: ReactNode;
}
const gameChooseList = [
  {
    id: '0',
    value: -1,
    text: i18n.t('allgame'), // 全部游戏
    KindName: i18n.t('allgame'),
    KindId: null,
  },
];

function GetGameDesc({ record }: any) {
  const { formatMsg } = useLanguage();

  const numlist = [
    ...record.BetNumber.map((it) => {
      if (it.length === 0) return 255;
      return parseInt(it);
    }),
  ];
  // FIXME 2023-09-06 11:04:36 特殊赔率显示变更
  const smList = record.SpecialMultiple || [];
  const speMT = smList.length > 0 ? `/ ${[...smList].join('/')}` : '';
  const codeName = GameMgr.GetBetRecordDesc(
    record.KindId,
    record.BetMainType,
    record.BetSubType,
    numlist
  );
  let name = '';
  if (codeName.indexOf('&') !== -1) {
    const [s, e] = codeName.split('&');
    name = `${formatMsg(s)}-${formatMsg(e)}`;
  } else {
    name = formatMsg(codeName);
  }
  const desc = `${name} ${record.NormalMultiple} ${speMT}`;

  return (
    <div className='df-fdc jc-c ai-c'>
      <div className='color-primary-text wds-sm-con'>
        {`${formatMsg('di')}${record.PeriodId}${formatMsg('qi')}`}
      </div>
      <div className='color-red wds-con'>{desc}</div>
      <div className='color-green wds-con'>{record.Date.substring(5)}</div>
      <div className='color-primary-text wds-sm-con'>{record.GameName}</div>
    </div>
  );
}

const columns: TableColumnProps[] = [
  {
    title: i18n.t('odd'), // 单号
    titleKey: 'odd',
    key: 'OrderId',
    align: 'c',
    tbClassName: `${styles.dHitem} wb-w wb-all ws-n va-m`,
    render: (record: any) => <>{record.OrderId || '--,--'}</>,
  },
  {
    title: i18n.t('content'), // 内容
    titleKey: 'content',
    key: 'Content',
    align: 'c',
    tbClassName: `${styles.cItem}`,
    render: (record: any) => {
      if (!record.PeriodId) {
        return i18n.t('noReturn');
      }
      return <GetGameDesc record={record} />;
    },
  },
  {
    title: i18n.t('betAmount'), // 下注金额
    titleKey: 'betAmount',
    key: 'BetScore',
    align: 'c',
    tbClassName: `${styles.bSitem} wb-w wb-all ws-n va-m`,
    render: (record: any) => <>{formatDigit(record.BetScore)}</>,
  },
  {
    title: i18n.t('winOrLose'), // 输赢
    titleKey: 'winOrLose',
    key: 'WinScore',
    align: 'c',
    tbClassName: `${styles.wLitem} wb-w wb-all ws-n va-m`,
    render: (record: any) => <>{formatDigit(record.WinScore)}</>,
  },
];

const footerColumns: FooterTableColumnProps[] = [
  {
    title: i18n.t('subtotal'), //  '小计'
    align: 'c',
    tbClassName: `${styles.dHitem} wb-w wb-all ws-n va-m`,
  },
  {
    title: i18n.t('content'), //  '内容'
    align: 'c',
    tbClassName: `${styles.cItem}`,
  },
  {
    title: i18n.t('betAmount'), //  '下注金额',
    align: 'c',
    tbClassName: `${styles.bSitem} wb-w wb-all ws-n va-m`,
  },
  {
    title: i18n.t('winOrLose'), // '输赢',
    align: 'c',
    tbClassName: `${styles.wLitem} wb-w wb-all ws-n va-m`,
  },
];

const GameSelects = observer(({ handleClick }: any) => {
  const { gameList } = useGameConfigStore();
  const { formatMsg } = useLanguage();

  const games: any[] = useMemo(
    () =>
      [...gameChooseList, ...gameList].map((it, i) => ({
        id: i + 1,
        KindId: it.KindId,
        // text: it.KindName,
        text: formatMsg(it.KindId) || it.KindName,
      })),
    [gameList, formatMsg]
  );

  return (
    <div className='d-f jc-c ai-c'>
      <Select titleList={gameChooseList} className='select'>
        <Option
          defaultId={1}
          options={games || []}
          blockTitle={formatMsg('selectType')}
          showNum='0'
          type='btn'
          onClick={handleClick}
        />
      </Select>
    </div>
  );
});

const TableContent = () => {
  const { formatMsg } = useLanguage();
  const [tableData, setTableData] = useState(null);
  const [footerList, setFooterList] = useState([
    `${formatMsg('subtotal')}`,
    `0${formatMsg('bi')}`,
    '0.00',
    '0.00',
  ]);

  const queryParam = useRef({ KindId: -1 });

  const getRecordList = useCallback(() => {
    getCusBetList(queryParam.current)
      .then((res: any) => {
        if (res?.Data) {
          if (res.Data.length === 0) {
            setTableData([{}]);
            setFooterList([
              `${formatMsg('subtotal')}`,
              `0${formatMsg('bi')}`,
              '0.00',
              '0.00',
            ]);
          } else {
            let allScore = 0.0;
            const tmpList = [];
            for (let index = 0; index < res.Data.length; index += 1) {
              const element = res.Data[index];
              allScore += parseFloat(element.BetScore);
              tmpList.push(element);
            }
            setTableData([...tmpList]);
            setFooterList([
              `${formatMsg('subtotal')}`,
              `${res.Count}${formatMsg('bi')}`,
              `${allScore}`,
              '0.00',
            ]);
          }
        }
      })
      .catch(() => {});
  }, [formatMsg]);

  useEffect(() => {
    getRecordList();
  }, [getRecordList]);

  const handleClick = useCallback(
    (item) => {
      if (queryParam.current.KindId !== item.KindId) {
        queryParam.current.KindId = item.KindId;
        getRecordList();
      }
    },
    [getRecordList]
  );

  return (
    <>
      <GameSelects handleClick={handleClick} />
      <div className='t-small-title o-y'>
        <Table
          headerClassName='bg-incon'
          columns={columns}
          data={tableData || []}
          isBodyBordered
          showFooter
          showEmpty={false}
          footerClassName='bg-records-title'
          footerColumns={footerColumns}
          footerData={footerList as []}
        />
      </div>
    </>
  );
};

export const BetOrderModel = ({ sourceNode }: BetOrderModelProps) => {
  const dialogRef = useRef(null);
  const { formatMsg } = useLanguage();

  const onCancel = useCallback(() => {
    if (typeof dialogRef?.current?.onClose === 'function') {
      dialogRef?.current?.onClose();
    }
  }, []);

  return (
    <Dialog
      btnName={formatMsg('beted')} // 注单
      ref={dialogRef}
      sourceNode={sourceNode}
      isFooter={false}
      isTitle={false}
      bodyClassname={`${styles['border-body']} w-full h-full`}
      contentCls='w-full h-full'
    >
      <div className='w-full h-full d-f fd-c o-none bg-body'>
        <div className='bg-gdt-top color-white h-150 d-f ai-c jc-sb p-0-50'>
          <Icon
            onClick={onCancel}
            className={styles['goback']}
            name='rect-left'
          />
          <div className='t-h1 ta-c'>{formatMsg('currentBet')}</div>
          <div className='w-70 h-150' />
        </div>
        <TableContent />
      </div>
    </Dialog>
  );
};
