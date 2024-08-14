import { useEffect, useState } from 'react';
import { OutLink, QueueLine, ScrollHeader } from '@/components';
import { getBusinessServiceTypeList } from '@/services';
import { isArray } from '@/utils/tools';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const ServiceBusiness = () => {
  const { formatMsg } = useLanguage();
  const [serviceType, setServiceType] = useState([]);
  const { changeState } = useGlobalStore();

  useEffect(() => {
    changeState('isLoading', true);
    getBusinessServiceTypeList()
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
      <ScrollHeader
        title={formatMsg('businessCooperation')}
        isArrow
        bgImg='/cuService/head-bus-bg.png'
        bgHeaderImg='/common/header.png'
      >
        <div className='h-min-340 bg-main p-30-60-0 p-r bottom-90 br-t-l-60 br-t-r-60'>
          {serviceType.map((item) => (
            <OutLink
              key={item.id}
              href={`/serbusiness/curbusiness?id=${item.id}`}
            >
              <QueueLine {...item} />
            </OutLink>
          ))}
        </div>
      </ScrollHeader>
    </>
  );
};

export default ServiceBusiness;
