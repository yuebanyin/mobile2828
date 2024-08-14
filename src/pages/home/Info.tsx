import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Img, Button, OutLink, BgImg, Avatar } from '@/components';
import { gradeList, mineLoginButtonInfo } from '@/constants';
import styles from './index.module.scss';
import { useGameConfigStore, useGlobalStore, useUserInfoStore } from '@/mobx';
import { Score } from '@/components/score';
import { registerVerify } from '@/services';
import { useGetSystemInfo, useLanguage, useNavigation } from '@/hooks';

// 根据用户是否登录展示不同的节点
const UserInfo = observer(() => {
  const { token, nickname, level } = useUserInfoStore();
  const { isLoading, changeState } = useGlobalStore();
  const [webkitId] = useGetSystemInfo();
  const navigate = useNavigation();
  const { t } = useTranslation();

  // 处理同一设备只能注册一个账号
  const toRegistry = useCallback(
    (_, resolve) => {
      if (isLoading) return;
      changeState('isLoading', true);
      registerVerify({ Id: webkitId })
        .then(() => {
          navigate(mineLoginButtonInfo.reg.href);
        })
        .catch(() => {})
        .finally(() => {
          resolve && resolve();
          changeState('isLoading', false);
        });
    },
    [changeState, isLoading, navigate, webkitId]
  );

  if (!token) {
    return (
      <div className={`${styles['mine-info']} d-f fd-c jc-c`}>
        <BgImg
          url='/home/userinfo-bg.png'
          className={`wds-sm-con br-30 ${styles['no-login']}`}
        >
          <div className='br-30 color-home-primary'>{t('welcome')}！</div>
          <div className='d-f flex-1 ai-c jc-sb m-t-18'>
            <OutLink href={mineLoginButtonInfo.login.href}>
              <Button
                className={styles['login-btn']}
                size='mini'
                text={t(mineLoginButtonInfo.login.text)}
              />
            </OutLink>
            <Button
              type='link-dark'
              size='mini'
              className={`${styles['restry-btn']} m-l-10`}
              text={t(mineLoginButtonInfo.reg.text)}
              isPromise
              onClick={toRegistry}
            />
          </div>
        </BgImg>
      </div>
    );
  }
  return (
    <div className={styles['mine-info']}>
      <div className='d-f ai-c jc-sb'>
        <Avatar className='avatar-mid m-r-20' />
        <div>
          <div className='name color-home-primary w-220 oe'>{nickname}</div>
          <BgImg url='/home/grade_bg.png' className={`${styles['game-id']}`}>
            <div className='d-f ai-c jc-sb h-full m-0-10'>
              <Img
                className={styles['l-img']}
                isNoTheme
                src={gradeList[level]?.icon || gradeList[0].icon}
              />
              <div className='wds-sm-con ws-no'>
                {t(gradeList[level]?.titleKey) || t(gradeList[0].titleKey)}
              </div>
            </div>
          </BgImg>
        </div>
      </div>
      <div
        className={`${styles['owner-score']} bg-home-money font-w-bolder br-30 p-6-20 wds-sm-title m-t-10 bg-main oe`}
      >
        ￥
        <Score />
      </div>
      <div />
    </div>
  );
});

const list = [
  {
    text: '开奖走势',
    textKey: 'drawingTrend',
    url: '/home/trend.png',
    id: 1,
    src: '/home/lotteryTrend',
    type: -2,
  },
  {
    text: '签到有奖',
    textKey: 'signAward',
    url: '/home/click-in.png',
    id: 2,
    src: '/home/sign',
    type: -2,
  },
  {
    text: '积分摇奖',
    textKey: 'pointsLotteryed',
    url: '/home/draw-lottery.png',
    id: 3,
    src: '/home/drawLottery',
    type: -2,
  },
  {
    text: 'App下载',
    textKey: 'downApp',
    url: '/home/download.png',
    id: 4,
    srcKey: 's11',
    type: 2,
    target: '_self',
  },
];

// 线路转换，app下载
const DownImgDom = observer(({ it }: any) => {
  const { gameSwitchConfig } = useGameConfigStore();
  const { formatMsg } = useLanguage();

  return (
    <OutLink
      href={(gameSwitchConfig && gameSwitchConfig.get(it.srcKey)) || ''}
      type={it.type}
      key={it.text}
      target={(it.target || '_blank') as any}
      className='d-f fd-c ai-c jc-sb ta-c wds-sm-con color-home-primary m-r-10'
    >
      <Img className={`${styles['w-150']} ${styles['h-115']}`} src={it.url} />
      <div className='m-t-10'>{formatMsg(it.textKey)}</div>
    </OutLink>
  );
});

const Info = () => {
  const { formatMsg } = useLanguage();
  return (
    <div className='d-f ai-c jc-sb bg-home p-10-40'>
      <UserInfo />
      <div className='flex-1 d-f ai-c jc-sbm'>
        {list.map((it) => {
          if (it.srcKey) {
            return <DownImgDom key={it.text} it={it} />;
          }
          return (
            <OutLink
              href={it.src}
              type={it.type}
              key={it.text}
              target={(it.target || '_blank') as any}
              className='d-f fd-c ai-c jc-sb ta-c wds-sm-con color-home-primary m-r-10'
            >
              <Img
                className={`${styles['w-150']} ${styles['h-115']}`}
                src={it.url}
              />
              <div className='m-t-10'>{formatMsg(it.textKey)}</div>
            </OutLink>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Info);

