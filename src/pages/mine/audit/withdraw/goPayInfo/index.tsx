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
  getGoPayWalletList,
  goPayWithdraw,
} from '@/services/withdraw';
import { Score } from '@/components/score';
import styles from '../index.module.scss';
import { useUserInfoStore, useUserScoreStore } from '@/mobx';
import { getUserScoreInfo } from '@/services';
import { useNavigation, useLanguage } from '@/hooks';

const defaultValueData = [1];

const moneybtnGroup = [
  {
    text: '100',
    id: 1,
    expand: null,
  },
  {
    text: '200',
    id: 2,
    expand: null,
  },
  {
    text: '300',
    id: 3,
    expand: null,
  },
  {
    text: '400',
    id: 4,
    expand: null,
  },
  {
    text: '500',
    id: 5,
    expand: null,
  },
  {
    text: '1000',
    id: 6,
    expand: null,
  },
  {
    text: '2000',
    id: 7,
    expand: null,
  },
  {
    text: '3000',
    id: 8,
    expand: null,
  },
  {
    text: '4000',
    id: 9,
    expand: null,
  },
  {
    text: '5000',
    id: 10,
    expand: null,
  },
];

const GoPayInfo = () => {
  const initRef = useRef(false);
  const [usdtListEx, setUsdtListEx] = useState<any[]>([]);
  const [currentWallet, setCurrentWallet] = useState<{}>();
  const [availableAmount, setAvailableAmount] = useState<number>(0);
  const [rateAmount, setRateAmount] = useState<number>(0);
  const [withdrawPsd, setWithdrawPsd] = useState<string>('');
  const { score, changeUserScore } = useUserScoreStore();
  const { gameId } = useUserInfoStore();
  const navigate = useNavigation();
  const { formatMsg } = useLanguage();

  const [form] = Form.useForm();

  // 获取输入的提现金额
  const getAmount = (value) => {
    let tempVal = 0;
    if (value !== null && value !== '') {
      const AmountAvailables = value - rateAmount;
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
  };

  const chooseUsdt = useCallback((item) => {
    if (item.length > 0) {
      setCurrentWallet(item[0]);
    }
  }, []);

  const handleClick = (item) => {
    const num = item.text;
    form.setFieldsValue({ withdrawMoney: num });
    setAvailableAmount(getAmount(num));
  };

  const handlePsw = (e: any) => {
    setWithdrawPsd(e);
  };

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      getGoPayWalletList()
        .then((res: any) => {
          if (res.Data && res.Data.length) {
            setCurrentWallet(res.Data[0]);
            setUsdtListEx([
              ...res.Data.map((item, i) => ({
                value: i + 1,
                text: item.WalletAddress,
                wallet: item.WalletAddress,
              })),
            ]);
            exChangeRevenue()
              .then((res: any) => {
                if (res.Data && res.Data.TotalDeductScore) {
                  setRateAmount(res.Data?.TotalDeductScore);
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    }
  }, [usdtListEx]);

  const handleChange = (e: any) => {
    setAvailableAmount(getAmount(e));
  };

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
          goPayWithdraw({
            GoBindId: currentWallet['value'],
            Amount: parseFloat(e),
            GameId: gameId,
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
          // toastText(err?.message);
          const msgObj = JSON.parse(err?.Message);
          toastText(formatMsg(msgObj?.key, msgObj?.parm));
          resolve && resolve();
        });
    },
    [
      form,
      withdrawPsd,
      score,
      currentWallet,
      gameId,
      changeUserScore,
      navigate,
      formatMsg,
    ]
  );

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
            initialValue={defaultValueData}
            label={formatMsg('goPayAddress')}
            labelClassname={styles.wM258}
          >
            {usdtListEx.length > 0 ? (
              <Picker
                listData={usdtListEx}
                placeholder={formatMsg('enterWalletAddress')}
                onConfirm={chooseUsdt}
                labelClassName='pl-50'
              />
            ) : (
              // <Input placeholder='请选择钱包地址' value='未选择钱包地址' />
              <div />
            )}
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
          <FormItem
            name='psd'
            label={formatMsg('withdrawPSW')}
            labelClassname={styles.wM258}
          >
            <Input
              placeholder={formatMsg('entryWithdrawPsd')}
              type='password'
              onChange={handlePsw}
            />
          </FormItem>
        </CellGroup>

        <CellGroup className='p-0-50 m-t-30'>
          <FormItem
            name='titlefee'
            label={formatMsg('sureAmount')}
            labelClassname={`${styles.wM258} color-primary-text`}
          >
            <div className='d-f jc-end flex-1'>
              <div className='wds-sm-title color-primary-text'>
                {availableAmount}
              </div>
            </div>
          </FormItem>
          <FormItem
            name='name5'
            label={formatMsg('serviceCharge')}
            labelClassname={styles.wM258}
          >
            <div className='d-f jc-end flex-1'>
              <div className='wds-sm-title color-red'>{rateAmount}</div>
            </div>
          </FormItem>
          <FormItem
            name='name6'
            label={formatMsg('receivableAmount')}
            labelClassname={styles.wM258}
          >
            <div className='d-f jc-end flex-1'>
              <div className='wds-sm-title color-primary-text'>
                {availableAmount}
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

export default memo(GoPayInfo);
