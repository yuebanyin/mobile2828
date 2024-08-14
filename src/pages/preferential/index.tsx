import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import { PreferentialCard, PreferentialCardDto } from './card';
import { OutLink, ScrollHeader } from '@/components';
import { getPreferentialListData } from '@/services';
import { useGlobalStore } from '@/mobx';
// import { themesMap } from '@/constants';
import { isArray } from '@/utils/tools';

// 优惠
function Preferential() {
  const [listData, setListData] = useState<PreferentialCardDto[]>(null);
  const { changeState, theme } = useGlobalStore();
  const { t } = useTranslation();
  useEffect(() => {
    if (!theme) return;
    changeState('isLoading', true);
    getPreferentialListData()
      .then((res: any) => {
        if (isArray(res?.Data) && res.Data.length) {
          // const newList = [];
          // res.Data.forEach((it) => {
          //   if (`${it.Version}` === themesMap[theme].name) {
          //     newList.push(it);
          //   }
          // });
          // 不用再区别版本号
          setListData(res.Data);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, theme]);

  console.log({ listData, theme });

  return (
    <>
      <ScrollHeader
        contentClassName={styles['preferential-wrap']}
        bgImgClassName={styles['preferential-wrap-header']}
        title={t('specialOffer')}
        bgImg='/preferential/head-bg.png'
        bgHeaderImg='/preferential/title-bg.png'
      >
        <div className={`${styles['preferential-group']} bg-main p-t-30`}>
          {isArray(listData) &&
            listData.map((item) => (
              <OutLink
                key={item.Id}
                href={`/preferential/detail?id=${item.Id}`}
              >
                <PreferentialCard data={item} />
              </OutLink>
            ))}
        </div>
      </ScrollHeader>
    </>
  );
}

export default observer(Preferential);

