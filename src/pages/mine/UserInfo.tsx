import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import { BgImg, Img, OutLink, Button, Avatar } from '@/components';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { gradeList, mineLoginButtonInfo } from '@/constants';
import { Balance } from '@/components/balance';
import { RewardScore, BindScore } from '@/components/score';
import { copyText } from '@/utils/tools';
import { useGetSystemInfo, useNavigation } from '@/hooks';
import { registerVerify } from '@/services';

const UserInfo = () => {
  const { nickname, gameId, level, isVisitor } = useUserInfoStore();
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

  return (
    <div
      className={`${styles['user-info']} p-a d-f fd-c w-full color-white zi-mini`}
    >
      <div className='m-0-50 d-f'>
        <OutLink
          href='/mine/modifyData'
          className='avatar-large d-f fd-c ai-c jc-c bg-body'
        >
          <Avatar className={`${styles['us-img']}`} />
        </OutLink>
        <div className='d-f fd-c m-t-10 flex-1 m-l-50'>
          <div className='d-f ai-c'>
            {nickname ? (
              <span className='t-small-title'>{nickname}</span>
            ) : (
              <>
                <OutLink href={mineLoginButtonInfo.login.href}>
                  <Button type='link' size='nano'>
                    {t(mineLoginButtonInfo.login.text)}
                  </Button>
                </OutLink>
                <div>
                  <Button
                    isPromise
                    onClick={toRegistry}
                    type='link-dark'
                    size='nano'
                    className='m-l-20'
                  >
                    {t(mineLoginButtonInfo.reg.text)}
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className='d-f ai-c m-t-24 flex-1'>
            <BgImg
              className={`${styles['levan-box']} d-f ai-c`}
              url='/mine/level_bg.png'
            >
              {gameId ? (
                <>
                  <Img
                    isNoTheme
                    className={`${styles['leveLogo']}`}
                    src={gradeList[level]?.bIcon || gradeList[0].bIcon}
                  />
                  <span>{t(gradeList[level]?.titleKey) || '--'}</span>
                </>
              ) : (
                <>
                  <div className={`${styles['leveLogo']} d-f ai-c jc-c`}>
                    <div>{t('wu')}</div>
                  </div>
                  <span>--</span>
                </>
              )}
            </BgImg>
            {!isVisitor && gameId && (
              <div
                onClick={() => copyText(`${gameId}`)}
                className='bg-gold d-f ai-c m-l-30 br-10 p-t-10 p-b-10 p-l-20 p-r-20'
              >
                ID:
                {gameId}
              </div>
            )}
          </div>
        </div>
      </div>
      <Balance className='m-t-50'>
        <div className='d-f jc-sb ai-c'>
          <span className='wds-sm-title ta-c h-70'>.</span>
          <span className='p-l-20'>{t('bonus')}</span>
          <span className='p-l-20'>
            <RewardScore />
          </span>
        </div>
        <div className='d-f jc-sb ai-c'>
          <span className='wds-sm-title ta-c h-70'>.</span>
          <span className='p-l-20'>{t('integral')}</span>
          <span className='p-l-20'>
            <BindScore />
          </span>
        </div>
      </Balance>
    </div>
  );
};

export default memo(UserInfo);
