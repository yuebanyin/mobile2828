import { memo, useEffect, useState } from 'react';
import i18n from 'i18next';
import { QueueLine, ScrollHeader, toastText } from '@/components';
import { getRechargeTypeList } from '@/services';
import { isArray } from '@/utils/tools';
import { useNavigation } from '@/hooks';
import { rechargeKeyList } from '@/constants';
import styles from './index.module.scss';
import { useGlobalStore } from '@/mobx';

/**
 *
 *  10010：银行卡
 *  10020：USDT
 *  10030：淘宝， 10040：支付宝，10050：微信，10060：QQ钱包 // 线下
 *  其他： 线上
 *
 */
const Recharge = () => {
  const navigate = useNavigation();
  const [rechargeType, setRechargeType] = useState([]);
  const { changeState } = useGlobalStore();

  const handleClick = (item) => {
    const url = rechargeKeyList.get(item.ruleType);
    if (url) {
      navigate(`${url}?type=${item.id}`, { state: { payName: item.key } });
    } else {
      toastText(`${i18n.t('payIsNoOpen')}`);
    }
  };

  useEffect(() => {
    changeState('isLoading', true);
    getRechargeTypeList()
      .then((res: any) => {
        if (isArray(res?.Data)) {
          const newServiceType = res.Data.map((item) => ({
            id: item.Value,
            type: item.Type,
            src: item.Expand,
            text: item.Key,
            key: item.EXName,
            ruleType: item.RuleType,
            iconType: 'rect-right',
          }));
          setRechargeType(newServiceType);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  return (
    <>
      <ScrollHeader contentClassName={styles['recharge-wrap']} bgImgClassName={styles['recharge-wrap-header']} title={i18n.t('voucherCenter')} bgImg='/recharge/head-bg.png' bgHeaderImg='/common/header.png'>
        <div className='h-min-340 bg-main d-f fd-c ai-c jc-c p-t-30 p-r bottom-90 br-t-l-60 br-t-r-60'>
          {rechargeType.map((item) => (
            <div key={item.id}>
              <QueueLine {...item} onItemClick={() => handleClick(item)} />
            </div>
          ))}
        </div>
      </ScrollHeader>
    </>
  );
};

export default memo(Recharge);

