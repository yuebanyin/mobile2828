import { memo, useEffect, useState } from 'react';
import { Img, LanguageChange, OutLink } from '@/components';
import QuickNavigation from '../quickNavigation';
import { getHomeOnlineConfigData } from '@/services';
import styles from './index.module.scss';
import { Obj } from '@/constants';
// import LogoMove from './logoMove';
import { useLanguage } from '@/hooks';

const Header = () => {
  const [onlineConfig, setOnlineConfig] = useState<Obj[]>([]);
  const { formatMsg } = useLanguage();
  useEffect(() => {
    getHomeOnlineConfigData()
      .then((res: any) => {
        setOnlineConfig(res.Data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className='w-full h-150 d-f jc-sb ai-c bs-primary bg-home-header'>
      <div className='ai-c d-f'>
        <OutLink className='m-0-44' href='/home'>
          <Img className={`${styles['w-254']} h-102`} src='/home/logo.gif' />
          {/* <LogoMove /> */}
        </OutLink>
        <div className='p-8-26 bg-home-online br-30 d-f ai-c t-explain color-home-primary opa-0'>
          <div className='spot-mini m-r-10' />
          {formatMsg('online')}
          {onlineConfig[0]?.DefaultCount}
          {formatMsg('people')}
        </div>
      </div>
      <div
        className={`flex-1 d-f jc-end ai-c color-home-primary ${styles['header-right']}`}
      >
        <OutLink href='/serbusiness' className='m-r-30'>
          <Img src='/cuService/business.png' alt='' className='w-94 h-100' />
        </OutLink>
        <OutLink className='d-f ai-c' href='/serCenter'>
          <Img src='/home/customer-service.png' className='w-94 h-100 m-r-30' />
        </OutLink>
        <LanguageChange boxCls='zi-large' />
        <QuickNavigation />
      </div>
    </div>
  );
};

export default memo(Header);
