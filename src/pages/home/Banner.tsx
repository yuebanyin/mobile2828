import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Swiper } from '@/components';
import { getHomeBannerData } from '@/services';
import { useGlobalStore } from '@/mobx';

function Banner() {
  const [data, setData] = useState([]);
  // const i18Language = i18n.language;
  const { language } = useGlobalStore();

  useEffect(() => {
    if (language) {
      getHomeBannerData()
        .then((res: any) => {
          setData(
            res.Data.map((item) => ({
              url: item.ImgUrl,
              linkType: item.LinkType,
              to: item.OuterLink,
              id: item.LinkType === 1 ? item.LinkConfig : item.PreferentialType,
              target: item.LinkType === 2 ? '_blank' : '_self',
            }))
          );
        })
        .catch(() => {});
    }
  }, [language]);

  return <Swiper className='bs-primary' list={data} />;
}

export default observer(Banner);

