import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
 Dialog, Img, Collapse, CollapseItem, Iframe 
} from '@/components';
import { openAutoPop } from '@/constants';
import { getHomeSystemNotice } from '@/services';
import styles from '../index.module.scss';
import { useGlobalStore } from '@/mobx';
import AutoAnnoImg from './AutoAnnoImg';
import { isArray } from '@/utils/tools';

// 公告跳转
const AutoAnnoPopup = observer(() => {
  const { pathname } = useLocation();
  const { theme, step, changeState } = useGlobalStore();
  const [annoData, setAnnoData] = useState([]);
  const [imgMsg, setImgMsg] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (openAutoPop.test(pathname) && theme && step !== -1) {
      getHomeSystemNotice()
        .then((res: any) => {
          if (isArray(res?.Data?.ImgMsg) && res?.Data?.ImgMsg.length > 0) {
            setImgMsg(
              res?.Data?.ImgMsg.map((it) => ({
                to: JSON.parse(it?.Content)?.Url,
                url: JSON.parse(it?.Content)?.Message,
              }))
            );
          } else {
            changeState('step', 2);
          }
          if (isArray(res?.Data?.TxtMsg) && res?.Data?.TxtMsg.length > 0) {
            const curData = [];
            res.Data.TxtMsg.forEach((it) => {
              curData.push({ Content: JSON.parse(it?.Content), Title: it?.Title });
            });
            setAnnoData(curData);
          }
        })
        .catch(() => {});
    }
  }, [pathname, theme, changeState, step]);

  // 不符合要求直接返回空
  if (!openAutoPop.test(pathname)) {
    return <></>;
  }

  const title = (
    <>
      <div className={`${styles['auto-anno-popup-img-box']} d-f ai-c jc-c br-half`}>
        <Img className={styles['auto-anno-popup-img']} src='/home/sm-suona.png' />
      </div>
      <div className='wds-h1'>{t('announcement')}</div>
    </>
  );

  // 第一步
  if (step === 1 && imgMsg.length > 0) {
    return <AutoAnnoImg setStep={changeState} data={imgMsg} />;
  }

  if (step === 2 && annoData.length > 0) {
    return (
      <Dialog onClose={() => changeState('step', -1)} isShowOkBtn={false} title={title} defaultVisible>
        <div className={`o-none ${styles['auto-anno-popup']}`}>
          <Collapse bodyClassName={`o-y ${styles['auto-anno-popup-content']}`} activeName={annoData[0]?.Title}>
            {annoData.map((it, i) => (
              <CollapseItem key={it?.Title || i} name={it?.Title} title={it?.Title}>
                <Iframe height={it?.Content?.Height} src={it?.Content?.Message} />
              </CollapseItem>
            ))}
          </Collapse>
        </div>
      </Dialog>
    );
  }
  return <></>;
});

export default AutoAnnoPopup;
