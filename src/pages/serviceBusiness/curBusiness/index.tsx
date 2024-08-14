import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueueLine } from '@/components';
import { copyText, isArray } from '@/utils/tools';
import { getBusinessServiceList } from '@/services';
import { useGlobalStore } from '@/mobx';
import { useNavigation, useLanguage } from '@/hooks';

const CurBusiness = () => {
  const [params] = useSearchParams();
  const { changeState } = useGlobalStore();
  const [serviceList, setServiceList] = useState([]);
  const navigate = useNavigation();
  const { formatMsg } = useLanguage();

  const handleClick = (item) => {
    console.log('item:', item);
    if (item.valType === 1) {
      copyText(item.btnUrl);
    } else {
      navigate(`/outchatroom?url=${item.btnUrl}`);
      console.log(item.btnUrl);
    }
  };

  useEffect(() => {
    if (params.get('id')) {
      changeState('isLoading', true);
      getBusinessServiceList({ Id: params.get('id') })
        .then((res: any) => {
          if (isArray(res?.Data)) {
            const newServicelist = res.Data?.map((item) => {
              if (item.ValType === 2) {
                // 24小时在线客服
                return {
                  text: item.NickName,
                  src: item.ImgUrl,
                  valType: item.ValType,
                  isBtnText: `${formatMsg('DiscussImmediately')}`,
                  btnUrl: item.Value,
                  isBtn: true,
                  siez: 'large',
                  className: 'h-238 p-0-52',
                };
              }
              return {
                text: item.NickName,
                src: item.ImgUrl,
                valType: item.ValType,
                isBtnText: `${formatMsg('copyNumber')}`,
                btnUrl: item.Value,
                number: item.Value,
                isBtn: true,
                siez: 'large',
                className: 'h-238 p-0-52',
              };
            });
            setServiceList(newServicelist);
          }
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [params, changeState, formatMsg]);

  return (
    <>
      <div className='p-30-50-0'>
        {serviceList.map((item) => (
          <QueueLine
            key={item.text}
            {...item}
            onBtnClick={() => handleClick(item)}
          />
        ))}
      </div>
    </>
  );
};

export default CurBusiness;
