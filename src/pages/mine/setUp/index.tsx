import { memo } from 'react';
import { Cell, CellGroup } from '@/components';
import { setList } from '@/constants';
import { useLanguage } from '@/hooks';

function SetUp() {
  const { formatMsg } = useLanguage();
  return (
    <>
      <CellGroup className='m-t-30'>
        {setList.map((item, i) => (
          <Cell key={`${i}` || item.id} title={formatMsg(item.title)} icon={item.icon} href={item.href} isShowRight isDivider={i !== setList.length - 1} />
        ))}
      </CellGroup>
    </>
  );
}

export default memo(SetUp);
