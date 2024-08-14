import { memo, useState } from 'react';
import i18n from 'i18next';
import { observer } from 'mobx-react-lite';
import {
  Badge, TabPane, Tabs
} from '@/components';
import MailCon from './mailContent';
import NoticContent from './noticContent';
import { useUserEmailStatusStore, useUserEmailCountStore } from '@/mobx/userEmail';

const Announcement = observer(() => {
  const { isEmail, changeTabsEmailStatus } = useUserEmailStatusStore();

  const [currentKey, setCurrentKey] = useState(isEmail ? '2' : '1');
  const { userEmailCount } = useUserEmailCountStore();

  return (
    <Tabs
      activeId={currentKey}
      type='tabs'
      className='bg-main w-full h-full d-f fd-c'
      childreClassName='flex-1'
      onChange={() => { }}
      onClick={(info) => {
        setCurrentKey(info.paneKey);
        // console.log(333333, info, currentKey);
        if (info.paneKey === '1') {
          changeTabsEmailStatus(false);
        } else {
          changeTabsEmailStatus(true);
        }
      }}
    >
      <TabPane isActChildren className='m-t-30 o-y' title={i18n.t('announcement')} paneKey='1'>
        <NoticContent />
      </TabPane>
      <TabPane isActChildren className='m-t-30 o-y' title={<Badge value={userEmailCount}>{i18n.t('information')}</Badge>} paneKey='2'>
        <MailCon />
      </TabPane>


    </Tabs>
  );
});

export default memo(Announcement);
