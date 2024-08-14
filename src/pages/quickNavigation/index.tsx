import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import styles from './index.module.scss';
import {
  useGameConfigStore,
  useGlobalStore,
  useUserInfoStore,
  useWSInstanceStore,
  useUserScoreStore,
} from '@/mobx';
import { mineLoginButtonInfo, rightMine } from '@/constants';
import {
  BgImg,
  Cell,
  CellGroup,
  OutLink,
  Switch,
  Popup,
  MoreSpot,
  Button,
  Eye,
  Avatar,
} from '@/components';
import { getUserWinLose, logout, registerVerify } from '@/services';
import ChangeTheme from './ChangeTheme';
import { useGetSystemInfo, useNavigation } from '@/hooks';
import { Score } from '@/components/score';
import { useUserEmailCountStore } from '@/mobx/userEmail';

const UserInfoModle = observer(() => {
  const { token, nickname } = useUserInfoStore();
  const [showMoney, setShowMoney] = useState(false);
  const { isLoading, changeState } = useGlobalStore();
  const [webkitId] = useGetSystemInfo();
  const navigate = useNavigation();
  const { t } = useTranslation();
  const changeEey = (isShow) => {
    setShowMoney(isShow);
  };

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
    <BgImg
      className={`${styles['right-top-item']} d-f m-t-30`}
      url={rightMine.userInfo.bkicon}
    >
      <div className='d-f fd-c'>
        <Avatar className='avatar-large d-f fd-c ai-c jc-c bg-body' />
      </div>
      <div className={`${styles['user-info']} d-f fd-c m-t-14`}>
        <div className='d-f fd-c m-l-20'>
          <span className={`${styles['u-text']} t-small-title m-l-20`}>
            {token ? nickname : `${t('welcomeYou')}`}
          </span>
          {token ? (
            <>
              <div className='d-f ai-c jc-start m-t-24'>
                <div className={`${styles['u-text']} t-small-title w-260`}>
                  <span>￥</span>
                  <span className='m-l-10'>
                    {showMoney ? <Score /> : '********'}
                  </span>
                </div>
                <Eye className='m-l-80' onChange={changeEey} />
              </div>
            </>
          ) : (
            <div className='d-f fd-r ai-c jc-c m-t-24'>
              <OutLink href={mineLoginButtonInfo.login.href}>
                <Button type='link' size='nano' className=''>
                  {t(mineLoginButtonInfo.login.text)}
                </Button>
              </OutLink>
              <div>
                <Button
                  type='link-dark'
                  size='nano'
                  className='m-l-20 color-home-restry-btn'
                  isPromise
                  onClick={toRegistry}
                >
                  {t(mineLoginButtonInfo.reg.text)}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BgImg>
  );
});

const FooterBtn = observer(() => {
  const { token, clearUserInfo } = useUserInfoStore();
  const navigate = useNavigation();
  const { logoutMsgHall } = useWSInstanceStore();
  const { clearUserScore } = useUserScoreStore();
  const { clearUserEmailCount } = useUserEmailCountStore();
  const { changeState } = useGlobalStore();
  const { t } = useTranslation();

  // 处理点击事件
  const handleClick = useCallback(async () => {
    if (token) {
      changeState('isLoading', true);
      logout()
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          clearUserInfo();
          clearUserScore();
          clearUserEmailCount();
          logoutMsgHall();
          navigate('/login');
          changeState('isLoading', false);
        });
    } else {
      navigate('/login');
    }
  }, [
    token,
    changeState,
    clearUserInfo,
    clearUserScore,
    clearUserEmailCount,
    logoutMsgHall,
    navigate,
  ]);

  return (
    <Button
      onClick={handleClick}
      className='br-20 bg-body color-red t-small-title'
    >
      {token ? `${t('loginOut')}` : `${t('backLogin')}`}
    </Button>
  );
});

// 线路转换，app下载
const DownCell = observer(({ item, i }: any) => {
  const { getGameSwitchConfig } = useGameConfigStore();
  const { clearUserInfo } = useUserInfoStore();
  const { clearUserScore } = useUserScoreStore();
  const { clearUserEmailCount } = useUserEmailCountStore();
  const { t } = useTranslation();
  const onClick = useCallback(() => {
    if (item.id === 11) {
      clearUserInfo();
      clearUserScore();
      clearUserEmailCount();
    }
  }, [clearUserEmailCount, clearUserInfo, clearUserScore, item.id]);

  return (
    <Cell
      key={item.id}
      linkType={item.linkType}
      target={item.target}
      href={getGameSwitchConfig(item.pathKey) || ''}
      className='br-30'
      title={t(item.title)}
      icon={item.icon}
      isDivider={i !== rightMine.recordList.length - 1}
      onClick={onClick}
    />
  );
});

const MetedSwitch = observer(({ item, i }: any) => {
  const { ismuted, changeState } = useGlobalStore();
  const { t } = useTranslation();
  return (
    <Cell
      key={item.id}
      className='br-30'
      title={t(item.title)}
      icon={item.icon}
      isDivider={i !== rightMine.recordList.length - 1}
      rightSolt={
        <div className='m-0-50'>
          <Switch
            isCheck={ismuted}
            onClick={(v) => {
              changeState('ismuted', v);
            }}
          />
        </div>
      }
    />
  );
});

const QuickNavigation = (props: any) => {
  const { spotColor } = props;
  const popupRef = useRef(null);
  const [userScore, setUserScore] = useState({ Win: 0.0, Bet: 0.0 });
  const initRef = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!initRef.current) {
      getUserWinLose()
        .then((res: any) => {
          if (res.Data) {
            setUserScore(res.Data);
          }
        })
        .catch(() => {});
    }
  }, []);
  return (
    <Popup
      ref={popupRef}
      isTitle={false}
      sourceNode={<MoreSpot spotClass={spotColor} />}
    >
      <div className='p-30 p-t-10 p-l-50 bg-pop-grey'>
        <UserInfoModle />
        <CellGroup className='m-t-30 br-30 bs-normal'>
          <Cell
            className='br-30'
            title={t(rightMine.winOrLose[0].title)}
            icon={rightMine.winOrLose[0].icon}
            rightDesc={`RMB:${userScore?.Win.toFixed(2)}`}
            rightDescClassName='color-red font-w-bold'
          />
          <Cell
            className='br-30'
            title={t(rightMine.winOrLose[1].title)}
            icon={rightMine.winOrLose[1].icon}
            rightDesc={`RMB:${userScore?.Bet.toFixed(2)}`}
            rightDescClassName='color-red font-w-bold'
            isDivider={false}
          />
        </CellGroup>
        <CellGroup className='m-t-30 br-30 bs-normal'>
          {rightMine.recordList.map((item, i) => {
            if (item.type === 'dialog') {
              return (
                <ChangeTheme
                  popupRef={popupRef}
                  key={item.id}
                  sourceNode={
                    <Cell
                      href={null}
                      className='br-30'
                      title={t(item.title)}
                      icon={item.icon}
                      isDivider={i !== rightMine.recordList.length - 1}
                    />
                  }
                />
              );
            }
            if (item.mobx) {
              return <DownCell key={item.id} item={item} i={i} />;
            }
            if (!item.switch) {
              return (
                <Cell
                  key={item.id}
                  linkType={item.linkType}
                  target={item.target}
                  href={item.path}
                  className='br-30'
                  title={t(item.title)}
                  icon={item.icon}
                  isDivider={i !== rightMine.recordList.length - 1}
                />
              );
            }
            return <MetedSwitch key={item.id} item={item} i={i} />;
          })}
        </CellGroup>

        <CellGroup className='m-t-30 h-150 br-30 bs-normal'>
          <FooterBtn />
        </CellGroup>
      </div>
    </Popup>
  );
};

export default memo(QuickNavigation);
