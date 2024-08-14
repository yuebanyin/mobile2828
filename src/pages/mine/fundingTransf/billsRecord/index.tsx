import i18n from 'i18next';
import { memo, useMemo } from 'react';
import styles from './index.module.scss';
import { formatDigit } from '@/utils/tools';

// 充提交易记录
interface RWRecordItem {
  id?: string | number;
  title?: string;
  value?: string | number;
  date?: string;
  order?: string;
  state?: string;
}

// 额度转换和交易明细
interface TQRecordItem {
  id?: string | number;
  title?: string;
  changeValue?: string | number;
  date?: string;
  mainVale?: string | number;
}

interface BillsRecordProps {
  type?: 'rw' | 'qutoaConver' | 'trade';
  data?: any;
}

export const BillsRecord = memo((props: BillsRecordProps) => {
  const { type, data } = props;

  const mergeClassName = useMemo(() => {
    const cns = styles['bx-record-item'];
    return cns;
  }, []);

  // 充提
  const rwNode = useMemo(() => {
    const rwRecord = data as RWRecordItem;

    return (
      <>
        <div className={mergeClassName}>
          <div className={styles['bx-r-row-item']}>
            <div className={styles['bx-r-record-text']}>{rwRecord.title}</div>
            <div className={styles['bx-r-red-value']}>
              {formatDigit(rwRecord.value)}
            </div>
          </div>
          <div className={styles['bx-r-row-item']}>
            <div className={styles['bx-r-record-date']}>{rwRecord.date}</div>
          </div>
          <div className={styles['bx-r-row-item']}>
            <div className={styles['bx-r-record-text']}>{rwRecord.order}</div>
            <div className={styles['bx-r-record-text']}>{rwRecord.state}</div>
          </div>
        </div>
        <div className={styles['bx-r-divider']} />
      </>
    );
  }, [data, mergeClassName]);

  // 额度转换和交易记录
  const tqNode = useMemo(() => {
    const tqRecord = data as TQRecordItem;
    let changeClassName = styles['bx-r-red-value'];
    let value;
    try {
      value = parseFloat(tqRecord.changeValue.toString());
    } catch (error) {
      value = tqRecord.changeValue;
    }
    if (type === 'trade') {
      if (value < 0) {
        changeClassName = styles['bx-r-green-value'];
      } else {
        changeClassName = styles['bx-r-red-value'];
        value = `+${value}`;
      }
    }
    return (
      <>
        <div className={mergeClassName}>
          <div className={styles['bx-r-row-item']}>
            <div className={styles['bx-r-record-text']}>{tqRecord.title}</div>
            <div className={changeClassName}>{formatDigit(value)}</div>
          </div>
          <div className={styles['bx-r-row-item']}>
            <div className={styles['bx-r-record-date']}>{tqRecord.date}</div>
            <div className={styles['bx-r-record-text']}>
              {`${i18n.t('masterAccount')}:${formatDigit(tqRecord.mainVale)}`}
            </div>
          </div>
        </div>
        <div className={styles['bx-r-divider']} />
      </>
    );
  }, [data, type, mergeClassName]);
  const rootNode = useMemo(() => {
    if (type === 'rw') {
      return rwNode;
    }
    if (type === 'qutoaConver' || type === 'trade') {
      return tqNode;
    }
    return '';
  }, [type, rwNode, tqNode]);
  return <>{rootNode}</>;
});
