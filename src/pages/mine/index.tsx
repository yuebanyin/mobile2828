import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
// import styles from './index.module.scss';
import MineTop from './MineTop';
import MineBottom from './MineBottom';
import { ScrollHeader } from '@/components';
import { verifyWithdrawalPwd } from '@/services/withdraw';
import { getUserScoreInfo } from '@/services';
import { useGeneralStore, useUserInfoStore, useUserScoreStore } from '@/mobx';
// import { cnAddress } from '@/constants';
import styles from './index.module.scss';

function Mine() {
  const { changeUserLevel, changeUserScore } = useUserScoreStore();
  const { changeGeneralState } = useGeneralStore();
  const { token, clearUserInfo, setTxpsd, isCreatetxpsd } = useUserInfoStore();
  // const { changeState } = useGlobalStore();
  const { t } = useTranslation();

  //验证是否创建提现密码
  useEffect(() => {
    // 带权限判断请求
    if (token && !isCreatetxpsd) {
      // changeState('isLoading', true);
      verifyWithdrawalPwd()
        .then((res: any) => {
          setTxpsd(res.Data);
        })
        .catch(() => {});
      getUserScoreInfo()
        .then((res: any) => {
          if (res.Data) changeUserScore(res.Data);
        })
        .catch(() => {})
        .finally(() => {
          // changeState('isLoading', false);
        });
    }
  }, [
    changeUserLevel,
    changeUserScore,
    changeGeneralState,
    clearUserInfo,
    token,
    setTxpsd,
    isCreatetxpsd,
  ]);

  return (
    <ScrollHeader
      contentClassName={styles['mine-wrap']}
      bgImgClassName={`${styles['mine-header-bg-img']} o-none`}
      title={t('my')}
      bgImg='/mine/topBk.png'
      isPlubicIcon
      bgHeaderImg='/mine/appBarBk.png'
    >
      <MineTop isVerfied={isCreatetxpsd} />
      <MineBottom isVerfied={isCreatetxpsd} />
    </ScrollHeader>
  );
}

export default observer(Mine);

