import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BgImg,
  Button,
  GroupItem,
  Img,
  Input,
  KindTips,
  OutLink,
  toastText,
} from '@/components';
// import { defaultAmount } from '@/constants';
import { getTipsDesc, isArray } from '@/utils/tools';
import { useUserInfoStore } from '@/mobx';
import { postRecharge } from '@/services';
import { useNavigation } from '@/hooks';
import styles from './index.module.scss';

interface OnlinePageProps {
  mList?: Array<any>;
  tips?: string;
  cInfo?: any;
}
const OnlinePage = (props: OnlinePageProps) => {
  const { mList = null, tips = null, cInfo = null } = props;
  const { gameId } = useUserInfoStore();
  const { t } = useTranslation();
  const [tip, setTips] = useState({ title: '', list: [] });
  const [moneyInfo, setMoneyInfo] = useState({ money: null, moneyId: null });
  const [moneyList, setMoneyList] = useState([]); // 选择通道选项
  const navigate = useNavigation();
  const [customMoney, setCustomMoney] = useState(0);

  // 充值金额数
  // const defaultValue = useMemo(() => {
  //   if (moneyInfo.money) {
  //     return moneyInfo.money;
  //   }
  //   if (customMoney) {
  //     return customMoney;
  //   }
  //   if (cInfo.isConst) {
  //     return Number(
  //       moneyList[0]?.text.substring(0, moneyList[0]?.text.length - 1)
  //     );
  //   }
  // }, [moneyInfo.money, customMoney, cInfo.isConst, moneyList]);

  // 提交 成功外跳
  const handleSubmit = (_, resolve) => {
    const amount = customMoney || moneyInfo.money;
    const params = {
      amount,
      gameId: `${gameId}`,
      payTypeId: cInfo.payTypeId,
    };
    if (params.amount < cInfo?.AmountMin) {
      toastText(`${t('minAmount')}${cInfo?.AmountMin}`);
      resolve && resolve();
      return;
    }
    if (params.amount > cInfo?.AmountMax) {
      toastText(`${t('maxAmount')}${cInfo?.AmountMax}`);
      resolve && resolve();
      return;
    }
    if (cInfo.payTypeId !== -1) {
      postRecharge(cInfo.subApi, params)
        .then((res: any) => {
          if (res.Code === 210) {
            if (res.Data?.Type === 1) {
              navigate(null, null, res?.Data?.Content);
            } else if (res.Data?.Type === 2) {
              const w = window.open('about:_blank');
              w.location.href = '/outpage';
              w.document.write(res.Data?.Content);
            }
          }
          resolve && resolve();
        })
        .catch(() => {
          resolve && resolve();
        });
    } else {
      toastText(`${t('pleaseSelectChannel')}`);
    }
    resolve && resolve();
  };

  const handleInput = (e) => {
    setCustomMoney(parseFloat(e));
    if (moneyInfo.money > 0) {
      setMoneyInfo({ money: 0, moneyId: -1 });
    }
  };

  const handleClick = (item) => {
    const num = item?.text?.substring(0, item.text.length - 1);
    handleInput(Number(num));
    setMoneyInfo({ money: Number(num), moneyId: item?.id });
  };

  useEffect(() => {
    if (isArray(mList)) {
      setMoneyList([...mList]);
    }
    if (typeof tips === 'string') {
      setTips({ ...getTipsDesc(tips) });
    }
  }, [customMoney, mList, tips]);

  console.log(cInfo);

  return (
    <>
      <BgImg url='/recharge/aliyellow.png' className='img-bg-s'>
        <div className='p-t-50 p-0-50 m-b-20'>
          {/* {cInfo.isConst ? (
            <div className='p-20-0 wds-big-env ta-c color-white'>
              {defaultValue}
            </div>
          ) : ( */}
          <div className='wds-big-env ta-c'>
            <Input
              type='number'
              className={`${styles.input} wds-big-env color-white ta-c h-120 w-880`}
              onChange={handleInput}
              value={`${customMoney}`}
              autoFocus
            />
          </div>
          {/* )} */}
          <div className='w-980 h-2 bg-body' />
          <div className='p-20-0 wds-sm-title color-white'>
            {`${t('rechargeAmountIs')}${cInfo?.AmountMin || 0}-${cInfo?.AmountMax || 0}`}
          </div>
          <div className='p-30 br-30 bs-primary bg-body'>
            <div className='wds-con m-b-30 color-primary-text'>{t('rechargeAmount')}</div>
            <GroupItem
              getItemCS={(i) => ((i + 1) % 3 === 0 ? '' : 'm-r-30')}
              type='img-text'
              data={moneyList}
              valueId={moneyInfo.moneyId}
              defaultActiveId={cInfo.isConst ? 1 : -1}
              onItemClick={handleClick}
            />
            <Button
              className='w-940 h-138'
              isPromise
              onClick={handleSubmit}
              size='large'
            >
              {t('Submit')}
            </Button>
            <div className='d-f jc-c p-t-40 p-b-20'>
              <div className='m-r-80'>
                <OutLink
                  className='d-f wds-sm-title color-primary-text'
                  href='/mine/fundingTransf/rechargeDetail'
                >
                  <Img
                    className='icon-50 m-r-10'
                    src='/recharge/money_icon.png'
                  />
                  <div>{t('rechargeRecord')}</div>
                </OutLink>
              </div>
              <OutLink
                className='d-f wds-sm-title color-primary-text'
                href='/mine/quotaConvert'
              >
                <Img
                  className='icon-50 m-r-10'
                  src='/recharge/transf_icon.png'
                />
                <div>{t('quotaConversion')}</div>
              </OutLink>
            </div>
          </div>
        </div>
      </BgImg>
      <KindTips className='m-t-2 bg-body' title={tip?.title} data={tip?.list} />
    </>
  );
};

export default memo(OnlinePage);
