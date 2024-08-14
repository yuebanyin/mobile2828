import { memo, useCallback, useState } from 'react';
import styles from './index.module.scss';

export interface CustomTabsProps {
  tabNames: string[];
  tabAct?: number;
  onTabClick?: Function;
}

export const CustomTabs = memo((props: CustomTabsProps) => {
  const { tabNames = [], tabAct = 0, onTabClick } = props;
  const [act, setAct] = useState(tabAct);
  const handleClick = useCallback(
    (index: number) => {
      setAct(index);
      onTabClick && onTabClick(index);
    },
    [setAct, onTabClick]
  );
  return (
    <div className={`${styles['CustomTabs']} w-full d-f df-c ai-c wds-sm-title color-assist`}>
      {tabNames.map((it, i) => (
        <div key={it} className={`${styles['CustomTabDiv']} ${act === i ? 'color-primary' : ''} flex-1 ta-c`} onClick={() => handleClick(i)}>
          <span className={`${act === i ? styles['CustomTabSpan'] : ''} p-r zi-mini`}>{it}</span>
        </div>
      ))}
    </div>
  );
});

export interface CustomTableProps {
  dataSource?: Record<string, any>[];
  columns?: Record<string, any>[];
  onTableClick?: Function;
}

export const CustomTable = memo((props: CustomTableProps) => {
  const { dataSource = [], columns = [], onTableClick } = props;
  return (
    <div className={`${styles['CustomTable']}`}>
      <div className={`${styles['CustomTableRow']} ${styles['CustomTableRowHeader']}`} key='CustomTableDivHeader'>
        {columns.map((cRes, cInd) => (
          <div className={`${styles['CustomTableDiv']} ${styles['CustomTableDivHeader']} ${cRes?.className}`} key={cRes?.key || cRes?.title || cRes?.name || `CustomTableDivHeader${cInd}`}>
            {cRes?.title || cRes?.renderTitle(cRes, cInd) || ''}
          </div>
        ))}
      </div>
      {dataSource.map((dRes, dInx) => (
        <div className={`${styles['CustomTableRow']}`} key={dRes?.key || dRes?.title || dRes?.name || `CustomTableRow${dInx}`}>
          {columns.map((cRes, cInd) => (
            <div
              className={`${styles['CustomTableDiv']} ${cRes?.className}`}
              key={cRes?.key || cRes?.title || cRes?.name || `CustomTableRow${dInx}CustomTableDiv${cInd}`}
              onClick={onTableClick && onTableClick(dRes, cRes)}
            >
              {cRes?.render(dRes, dInx, cRes, cInd) || `${cInd}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

export interface CustomTableBallProps {
  dataSource?: Record<string, any>[];
  columns?: Record<string, any>[];
  onTableClick?: Function;
}

export const CustomTableBall = memo((props: CustomTableBallProps) => {
  const { dataSource = [], columns = [], onTableClick } = props;
  return (
    <div className={`${styles['CustomTable']}`}>
      <div className={`${styles['CustomTableRow']} ${styles['CustomTableRowHeader']}`} key='CustomTableDivHeader'>
        {columns.map((cRes, cInd) => (
          <div className={`${styles['CustomTableDiv']} ${styles['CustomTableDivHeader']} ${cRes?.className}`} key={cRes?.key || cRes?.title || cRes?.name || `CustomTableDivHeader${cInd}`}>
            {cRes?.title || cRes?.renderTitle(cRes, cInd) || ''}
          </div>
        ))}
      </div>
      {dataSource.map((dRes, dInx) => (
        <div className={`${styles['CustomTableRow']}`} key={dRes?.key || dRes?.title || dRes?.name || `CustomTableRow${dInx}`}>
          {columns.map((cRes, cInd) => (
            <div
              className={`${styles['CustomTableDiv']} ${cRes?.className}`}
              key={cRes?.key || cRes?.title || cRes?.name || `CustomTableRow${dInx}CustomTableDiv${cInd}`}
              onClick={onTableClick && onTableClick(dRes, cRes)}
            >
              {cRes?.render(dRes, dInx, cRes, cInd) || `${cInd}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});
