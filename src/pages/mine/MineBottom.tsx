import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from '@/components/cell';
import { CellGroup } from '@/components/cellgroup';
import { mineList } from '@/constants';
import {
 useGlobalStore, useUserInfoStore, useUserScoreStore, useWSInstanceStore 
} from '@/mobx';
import styles from './index.module.scss';
import { logout } from '@/services';
import { useNavigation } from '@/hooks';

type DataType = {
  isVerfied: boolean;
};

function MineBottom(props: DataType) {
  const { token, clearUserInfo, isAgent } = useUserInfoStore();
  const { clearUserScore } = useUserScoreStore();
  const { logoutMsgHall } = useWSInstanceStore();
  const { changeState } = useGlobalStore();
  const navigate = useNavigation();
  const { t } = useTranslation();

  // 处理点击事件
  const handleClick = useCallback(async() => {
    if (token) {
      changeState('isLoading', true);
      logout()
        .then(() => {
          // clearUserInfo();
          // clearUserScore();
          // logoutMsgHall();
          // navigate('/login');
        })
        .catch(() => {
          // if (error && error?.data?.Code === -1001) {
          // 登录过期
          // clearUserInfo();
          // clearUserScore();
          // logoutMsgHall();
          // navigate('/login');
          // }
        })
        .finally(() => {
          clearUserInfo();
          clearUserScore();
          logoutMsgHall();
          navigate('/login');
          changeState('isLoading', false);
        });
    } else {
      navigate('/login');
    }
  }, [token, changeState, clearUserInfo, clearUserScore, logoutMsgHall, navigate]);

  const { isVerfied } = props;

  return (
    <>
      {mineList.map((group, index) => (
        <CellGroup className='m-t-30 bs-primary' key={`${index}` || ''} borderRadius='30'>
          {group.map((item, i) => {
            if (item.id === 6) {
              if (isAgent) return '';
              return <Cell key={`${i}` || item.id} title={t(item.title)} icon={item.icon} href={item.href} isDivider={i !== group.length - 1} borderRadius='30' />;
            }
            return (
              <Cell
                key={`${i}` || item.id}
                title={t(item.title)}
                icon={item.icon}
                href={item.id === 9 && !isVerfied ? '/mine/cWithdrawPsd' : item.href}
                isDivider={i !== group.length - 1}
                borderRadius='30'
              />
            );
          })}
        </CellGroup>
      ))}

      {/**底部按钮*/}
      <div className={`${styles['mine-back']} d-f fd-c jc-c ai-c bg-body m-t-30 h-150`}>
        <div className='ta-c color-red t-small-title' onClick={handleClick}>
          <span>{token ? t('loginOut') : t('backLogin')}</span>
        </div>
      </div>
    </>
  );
}

export default memo(MineBottom);
