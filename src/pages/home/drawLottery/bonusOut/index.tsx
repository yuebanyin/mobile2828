import { memo, useState } from 'react';
import { Table, Tabs } from '@/components';
import { bonusTabs, bonusCols, bonusList } from '@/constants';
import { useLanguage } from '@/hooks';

const BonusOut = () => {
  const { formatMsg } = useLanguage();
  const [title, setTitle] = useState({
    id: 1,
    text: formatMsg('promotionBonu'),
  });
  const [data, setData] = useState({ cols: [], dataSource: [] });

  //tab切换
  const handleChangeTab = (item: any) => {
    setTitle({ ...title, id: item.id, text: item.text });
    if (item.id === 1) {
      const newData = { ...data, cols: bonusCols, dataSource: bonusList };
      setData(newData);
    } else {
      const newData = { ...data, cols: bonusCols, dataSource: bonusList };
      setData(newData);
    }
  };

  return (
    <>
      <div className='m-b-30'>
        <Tabs
          searchList={bonusTabs}
          activeId={1}
          onClick={(item) => handleChangeTab(item)}
        />
      </div>
      <Table columns={data.cols} data={data.dataSource} isBodyTopBordered />
    </>
  );
};

export default memo(BonusOut);
