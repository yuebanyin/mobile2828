import { useCallback, useMemo, useState } from 'react';
import { CustomTable, CustomTabs } from '../CustomTabsTable';
import { numberTable3501 } from './const';

export interface CustomNumberViewProps {
  gameType: number;
  data: any[];
}

export const CustomNumberView = (props: CustomNumberViewProps) => {
  const { gameType, data = [] } = props;
  const [actIndex, setActIndex] = useState(0);
  const numberTable = useMemo(() => {
    switch (gameType) {
      case 3501:
        // FIXME 2023-10-11 18:13:35 每个游戏自己写自己的构建结构数
        return numberTable3501;
      default:
        return [];
    }
  }, [gameType]);
  const tabNames = useCallback(() => numberTable.map((r) => r.tabTitle), [numberTable]);
  const tableRes = useMemo(() => numberTable.at(actIndex), [numberTable, actIndex]);
  return (
    <div className='px-50 py-30'>
      <CustomTabs tabNames={tabNames()} tabAct={actIndex} onTabClick={setActIndex} />
      <div className='mt-20'>
        <CustomTable dataSource={data} columns={tableRes.columns} />
      </div>
    </div>
  );
};

