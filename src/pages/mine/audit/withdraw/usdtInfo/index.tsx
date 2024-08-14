import { memo, useCallback, useEffect, useRef, useState } from 'react';

import {
  Button,
  CellGroup,
  FormDemo as Form,
  FormItem,
  GroupItem,
  Input,
  KindTips,
  Picker,
  toastText,
} from '@/components';
import { kefuKindTips } from '@/constants';
import {
  exChangeRevenue,
  getUsdtWalletList,
  usdtWithdraw,
} from '@/services/withdraw';
import { Score } from '@/components/score';
import styles from '../index.module.scss';
import { getUserScoreInfo } from '@/services';
import { useUserScoreStore } from '@/mobx';
import { useLanguage, useNavigation } from '@/hooks';

// const defaultValueData = [1];

const moneybtnGroup = [
  {
    text: '100',
    id: 1,
    expand: null,
  },
  {
    text: '500',
    id: 2,
    expand: null,
  },
  {
    text: '1000',
    id: 3,
    expand: null,
  },
  {
    text: '5000',
    id: 4,
    expand: null,
  },
  {
    text: '10000',
    id: 5,
    expand: null,
  },
];
const UsdtInfo = () => {
  const [defU, setDefU] = useState([1]);
  const [usdtListEx, setUsdtListEx] = useState<any[]>([]);
  const [rateConfig, setRateConfig] = useState<any[]>([]);
  const [currentWallet, setCurrentWallet] = useState<{}>();
  const currentRateRef = useRef(0.0);
  const [currentRateConfig, setCurrentRateConfig] = useState<{}>();
  const [availableAmount, setAvailableAmount] = useState<number>(0);
  const [rateAmount, setRateAmount] = useState<number>(0);
  const [withdrawPsd, setWithdrawPsd] = useState<string>('');
  const { score, changeUserScore } = useUserScoreStore();
  const navigate = useNavigation();
  const { formatMsg } = useLanguage();
  const [form] = Form.useForm();

  const handlePsw = (e: any) => {
    setWithdrawPsd(e);
  };

  // 获取输入的提现金额
  const getAmount = useCallback(
    (value) => {
      let tempVal = 0;
      if (value !== null && value !== '' && value !== 0) {
        const ratio = currentRateRef.current;
        if (ratio <= 0) {
          return 0;
        }
        const AmountAvailables = (parseFloat(value) - rateAmount) / ratio;
        if (AmountAvailables > 0) {
          tempVal = AmountAvailables;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
      const res = tempVal.toFixed(3);
      return parseFloat(res.substring(0, res.lastIndexOf('.') + 3));
    },
    [rateAmount]
  );

  const handleClick = (item) => {
    const num = item.text;
    form.setFieldsValue({ withdrawMoney: num });
    setAvailableAmount(getAmount(num));
  };

  const chooseUsdt = useCallback(
    (item) => {
      console.log('🚀 ~ file: index.tsx:58 ~ chooseUsdt ~ item:', item);

      if (item.length > 0) {
        form.setFieldsValue({ walletAddress: item[0]?.wallet });
        setCurrentWallet(item[0]);
        const it = rateConfig.find((it) => it.Expand === item[0].value);
        if (it) {
          currentRateRef.current = parseFloat(it.Value);
          setCurrentRateConfig(it);
          const e = form.getFieldValue('withdrawMoney');
          setAvailableAmount(getAmount(e || 0));
        }
      }
    },
    [form, getAmount, rateConfig]
  );
  useEffect(() => {
    if (usdtListEx.length === 0) {
      getUsdtWalletList()
        .then((res: any) => {
          if (res.Data && res.Data.PlayerConfig) {
            if (res.Data?.PlayerConfig.length <= 0) {
              toastText(`${formatMsg('notBind_USTD')}`);
            } else {
              setRateConfig(res.Data.RateConfig);
              if (res.Data.PlayerConfig[0]?.Expand) {
                setDefU([res.Data.PlayerConfig[0].Expand]);
              }

              setUsdtListEx([
                ...res.Data.PlayerConfig.map((item) => ({
                  value: item.Expand,
                  text: item.Key,
                  wallet: item.Value,
                })),
              ]);
              setCurrentWallet({
                value: res.Data.PlayerConfig[0].Expand,
                text: res.Data.PlayerConfig[0].Key,
                wallet: res.Data.PlayerConfig[0].Value,
              });
              currentRateRef.current = parseFloat(res.Data.RateConfig[0].Value);
              setCurrentRateConfig(res.Data.RateConfig[0]);
              exChangeRevenue()
                .then((res: any) => {
                  if (res.Data && res.Data.TotalDeductScore) {
                    setRateAmount(res.Data?.TotalDeductScore);
                  }
                })
                .catch(() => {});
            }
          } else {
            toastText(`${formatMsg('notBind_USTD')}`);
          }
        })
        .catch(() => {});
    }
  }, [usdtListEx, formatMsg]);

  // 触发提交的按钮点击事件
  const handleSubmit = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then(() => {
          if (withdrawPsd.length === 0) {
            toastText(`${formatMsg('entryWithdrawPsd')}`);
            resolve && resolve();
            return;
          }
          const e = form.getFieldValue('withdrawMoney');
          if (!e || e === '' || e === 0) {
            toastText(`${formatMsg('enterWithdrawalAmount')}`);
            resolve && resolve();
            return;
          }
          if (e > score) {
            toastText(`${formatMsg('overBalanceHand')}`);
            resolve && resolve();
            return;
          }
          usdtWithdraw({
            ProtocolType: currentWallet['value'],
            CnyAmount: parseFloat(e),
            WithdrawalPwd: withdrawPsd,
          })
            .then((res: any) => {
              if (res.Code === 210) {
                // toastText(res.Message);
                const msgObj = JSON.parse(res.Message);
                toastText(formatMsg(msgObj?.key, msgObj?.parm));

                getUserScoreInfo()
                  .then((res: any) => {
                    if (res.Data) changeUserScore(res.Data);
                    navigate('/mine', { replace: true });
                  })
                  .catch(() => {});
              }
              resolve && resolve();
            })
            .catch(() => {
              resolve && resolve();
            });
        })
        .catch((err) => {
          console.log({ err });
          toastText(err[0]?.message);
          resolve && resolve();
        });
    },
    [
      form,
      withdrawPsd,
      score,
      currentWallet,
      changeUserScore,
      navigate,
      formatMsg,
    ]
  );

  const handleChange = (e: any) => {
    console.log('🚀 ~ file: index.tsx:106 ~ handleChange ~ e:', e);

    setAvailableAmount(getAmount(e || 0));
  };

  return (
    <>
      <Form
        className={`bg-main m-t-30 p-0 ${styles['wd-form-box']}`}
        form={form}
      >
        <CellGroup className='p-0-50'>
          <FormItem
            name='mainBalance'
            label={formatMsg('MasterAccountBalance')}
            labelClassname={`${styles.wM258} color-con-ass wds-sm-title`}
          >
            <div className='wds-sm-title color-red m-l-50'>
              <Score />
            </div>
          </FormItem>
          <FormItem
            name='bankType'
            initialValue={defU}
            label={formatMsg('walletSelect')}
            labelClassname={styles.wM258}
          >
            {usdtListEx.length > 0 ? (
              <Picker
                listData={usdtListEx}
                placeholder={formatMsg('pleaseSelectWallet')}
                onConfirm={chooseUsdt}
              />
            ) : (
              <Input placeholder={formatMsg('pleaseSelectWallet')} value={formatMsg('notSelectWallet')} />
            )}
          </FormItem>
          <FormItem
            name='walletAddress'
            initialValue={usdtListEx.length > 0 ? usdtListEx[0].wallet : ''}
            label={formatMsg('goPayAddress')}
            labelClassname={styles.wM258}
          >
            <Input readOnly />
          </FormItem>
        </CellGroup>
        <CellGroup className='p-0-50 m-t-30'>
          <GroupItem
            classNameBox='jc-sb m-t-50'
            isActive={false}
            type='number'
            data={moneybtnGroup}
            onItemClick={handleClick}
          />
          <FormItem
            name='withdrawMoney'
            label={formatMsg('wcashWthdrawalAmount')}
            labelClassname={styles.wM258}
          >
            <Input
              placeholder={formatMsg('enterWithdrawalAmount')}
              type='number'
              onChange={handleChange}
            />
          </FormItem>
          <FormItem name='psd' label={formatMsg('withdrawPSW')} labelClassname={styles.wM258}>
            <Input
              placeholder={formatMsg('entryWithdrawPsd')}
              type='password'
              onChange={handlePsw}
            />
          </FormItem>
        </CellGroup>

        <CellGroup className='p-0-50 m-t-30'>
          <FormItem name='name5' label={formatMsg('serviceCharge')} labelClassname={styles.wM258}>
            <div className='d-f jc-end flex-1'>
              <div className='wds-sm-title color-red'>{rateAmount}</div>
            </div>
          </FormItem>
          <FormItem name='name6' label={formatMsg('amountReceived')} labelClassname={styles.wM258}>
            <div className='d-f jc-end flex-1'>
              <div className='wds-sm-title color-primary-text'>{`${availableAmount}U`}</div>
            </div>
          </FormItem>
          <FormItem name='name7' label={formatMsg('referenceRate')} labelClassname={styles.wM258}>
            <div className='d-f jc-end flex-1'>
              <div className='wds-sm-title color-primary-text'>
                {`1USDT≈${
                  currentRateConfig ? currentRateConfig['Value'] : 1
                }RMB`}
              </div>
            </div>
          </FormItem>
        </CellGroup>
      </Form>
      <div className='m-t-30 m-0-50 p-30'>
        <Button
          isPromise
          onClick={handleSubmit}
          className='w-full'
          type='primary'
          size='large'
        >
          {formatMsg('Submit')}
        </Button>
      </div>

      <KindTips className='m-t-2' data={kefuKindTips} />
    </>
  );
};

export default memo(UsdtInfo);
