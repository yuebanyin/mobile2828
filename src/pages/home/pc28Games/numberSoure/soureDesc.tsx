/* eslint-disable max-len */
import { memo } from 'react';
import { useLanguage } from '@/hooks';

const TitleItem = (text) => (
  <div className='m-l-50 m-t-100 t-small-title font-w-bolder d-f jc-start'>
    <div className='h-40 w-16 bg-primary m-r-30' />
    <div>{text}</div>
  </div>
);

const ItemContent = (content, last?) => (
  <div
    className={`${
      last ? 'm-b-110' : ''
    } m-0-50 m-t-100 t-40 color-primary-text`}
  >
    {content}
    {last ? <div className='m-b-110 h-100' /> : ''}
  </div>
);

const SoureDesc = () => {
  const { formatMsg } = useLanguage();

  return (
    <div className='h-full d-f fd-c o-y'>
      <div className='m-t-100 m-l-50 t-h2'>{formatMsg('btb_28_title')}</div>
      {TitleItem(formatMsg('btb_28_con_1'))}
      {ItemContent(formatMsg('btb_28_con_2'))}
      {TitleItem(formatMsg('btb_28_con_3'))}
      {ItemContent(formatMsg('btb_28_con_4'))}
      {TitleItem(formatMsg('btb_28_con_5'))}
      {ItemContent(formatMsg('btb_28_con_6'))}
      {TitleItem(formatMsg('btb_28_con_7'))}
      {ItemContent(formatMsg('btb_28_con_8'), true)}
    </div>
  );
};

export default memo(SoureDesc);
