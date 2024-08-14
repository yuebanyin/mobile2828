import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { tableBar, showFooter } from '@/constants';
import { Img, OutLink } from '@/components';
import styles from '../index.module.scss';

const Footer = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  if (!showFooter.test(pathname)) {
    return <></>;
  }

  return (
    <div className={`d-f w-full h-140 bg-tabbar m-t-auto zi-small p-r ${styles['tab-bar-box']}`}>
      {tableBar.map((it) => {
        let cs = 'color-tabbar';
        let imgUrl = it.icon;
        if (pathname === '/') {
          if (it.to === '/home') {
            cs = 'color-tabbar-act';
            imgUrl = it.actIcon;
          }
        } else if (pathname === it.to) {
          cs = 'color-tabbar-act';
          imgUrl = it.actIcon;
        }
        if (it.id === 3) {
          cs = `${cs} ${styles['chat-box']}`;
        }

        return (
          <OutLink className={`flex-1 d-f fd-c ai-c ta-c p-r wds-sm-con ${cs}`} key={it.id} href={it.to}>
            <Img className={it.id === 3 ? `p-r zi-small ${styles['tab-bar-chat-icon']}` : styles['tab-bar-icon']} src={imgUrl} />
            {/* {it.text} */}
            {t(it.text)}
          </OutLink>
        );
      })}
    </div>
  );
};

export default memo(Footer);
