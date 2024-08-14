import { memo, useEffect, useState } from 'react';
import { OutLink, QueueLine, ScrollHeader } from '@/components';
import { getCustomerServiceTypeList } from '@/services';
import { isArray } from '@/utils/tools';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const ServiceCenter = () => {
  const [serviceType, setServiceType] = useState([]);
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  useEffect(() => {
    changeState('isLoading', true);
    getCustomerServiceTypeList()
      .then((res: any) => {
        if (isArray(res?.Data)) {
          const newServiceType = res.Data.map((item) => ({
            id: item.Value,
            src: item.Expand,
            text: item.Key,
            iconType: 'rect-right',
          }));
          setServiceType(newServiceType);
        }
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  return (
    <>
      <ScrollHeader title={formatMsg('customerCenter')} isArrow bgImg='/cuService/head-bg.png' bgHeaderImg='/common/header.png'>
        <div className='h-min-340 bg-main p-30-60-0 p-r bottom-90 br-t-l-60 br-t-r-60'>
          {serviceType.map((item) => (
            <OutLink key={item.id} href={`/serCenter/cuService?id=${item.id}`}>
              <QueueLine {...item} />
            </OutLink>
          ))}
        </div>
      </ScrollHeader>
    </>
  );
};

export default memo(ServiceCenter);
