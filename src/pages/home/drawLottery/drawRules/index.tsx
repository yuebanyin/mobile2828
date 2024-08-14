import { memo } from 'react';
import { KindTips } from '@/components';
import { gameRules } from '@/constants';

const DrawRules = () => {
  console.log('111');
  return (
    <>
      <div className='bg-body'>
        <KindTips title='' className='m-t-2 color-con-ass bg-body' data={gameRules} />
      </div>
    </>
  );
};

export default memo(DrawRules);
