import { memo, } from 'react';
import { handleClData } from '../../games/trendDialog/const';
import CL from '../../games/trendDialog/CL';

interface RecordListProps {
  recordsData?: any[];
  gameId?: number;
  isShowMore?: boolean;
}


const DoubleChanglong = (props: RecordListProps) => {
  const { recordsData, gameId } = props;

  const arr = handleClData(recordsData);
  return (
    <div className='m-t-20'>
      <CL renData={arr} gameType={gameId} />
    </div>

  );
};

export default memo(DoubleChanglong);
