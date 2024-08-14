import { memo, useEffect, useState } from 'react';
import i18n from 'i18next';
import {
  BgImg,
  FormDemo as Form,
  FormItem,
  Img,
  Input,
  Picker,
} from '@/components';
import { copyText } from '@/utils/tools';
import { getBankOptions } from '@/services';
import { useUserInfoStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const payTypeList = [
  { value: 1, textb: '手机银行转账', text: `${i18n.t('mobilebankTransfer')}` },
  { value: 2, textb: '网银转账', text: `${i18n.t('onlineBanktransfer')}` },
  { value: 3, textb: 'ATM自动柜员机', text: `${i18n.t('ATMauto')}` },
  { value: 4, textb: '银行柜台', text: `${i18n.t('BankCounter')}` },
];

interface BankPageProps {
  aData?: any;
  form: any;
}

const BankPage = (props: BankPageProps) => {
  const { aData, form } = props;
  const { formatMsg } = useLanguage();
  const [bankList, setBankList] = useState(null); // 银行列表
  const [accountData, setAccountData] = useState(null);
  const { account } = useUserInfoStore();

  // 点击队列按钮复制
  const handleCopy = (params) => {
    copyText(params);
  };
  useEffect(() => {
    if (bankList === null) {
      getBankOptions()
        .then((res: any) => {
          if (res?.Data) {
            const newList = res.Data.map((item) => ({
              ...item,
              value: item.Value,
              text: formatMsg(item.Key),
            }));
            setBankList(newList);
          }
        })
        .catch(() => {});
    }

    if (aData !== null) {
      setAccountData({ ...aData });
    }
  }, [aData, bankList, formatMsg]);
  return (
    <BgImg url='/recharge/aliyellow.png' className='img-bg-s p-t-40 '>
      <BgImg url='/recharge/card.png' className='m-0-50'>
        <div className='t-40 p-0-50 p-t-20'>
          <div className='d-f jc-c ai-c '>
            <div className='color-primary p-r-10'>{i18n.t('rcharge')}:</div>
            <div className='p-2-20 br-66 bg-primary color-white'>{account}</div>
          </div>
          <div className='w-210 h-60 m-t-30 df-aic-jcc skew-neg-20 bg-re-red'>
            <div className='skew-pos-20 color-white'>
              {i18n.t('creditedAccounts')}
            </div>
          </div>
          <div className='d-f jc-sb m-t-80'>
            <div>
              {accountData?.accountList.map((item, i) => (
                <div
                  key={`${i}` || item.key}
                  className={`d-f jc-sb m-b-40 ${
                    i === 0 || i === 1 ? 'p-r-200' : ''
                  } w-880`}
                >
                  <div className='color-white'>{item.text}</div>
                  <div
                    className='p-2-20 br-66 bg-body color-re-red'
                    onClick={() => handleCopy(item.text)}
                  >
                    {i18n.t('copy')}
                  </div>
                </div>
              ))}
            </div>
            <div className='h-fc p-r bottom-120 right-170'>
              <Img
                className='w-180 h-180 df-aic-jcc b-2 bc-white br-20'
                isNoTheme
                src={accountData?.qrcode}
              />
              <a
                href={accountData?.qrcode || ''}
                className='w-160 df-aic-jcc m-0-auto font-40 p-2-20 m-t-20 br-66 bg-re-red color-white'
              >
                {i18n.t('saveBtn')}
              </a>
            </div>
          </div>
        </div>
      </BgImg>
      <div className='p-t-50 p-b-30  br-30 bg-body bs-primary'>
        <div className='d-f ai-c br-50 p-l-70 m-b-20'>
          <Img className='w-55 h-30 m-r-10' src='/recharge/two_ball.png' />
          <div>{i18n.t('remittanceAccount')}</div>
        </div>
        <Form className='bg-body' form={form}>
          <FormItem
            type='card'
            name='payStyle'
            label={i18n.t('methodRemittance')}
            rules={[
              {
                validator: (_, v) => {
                  if (v) {
                    return true;
                  }
                  return false;
                },
                message: `${i18n.t('selectMethodRemittance')}`,
              },
            ]}
          >
            <Picker
              listData={payTypeList}
              placeholder={i18n.t('mobilebankTransfer')}
              labelClassName='pl-50'
            />
          </FormItem>
          {bankList ? (
            <FormItem
              type='card'
              name='BankId'
              label={i18n.t('bankTransfer')}
              rules={[
                {
                  validator: (_, v) => {
                    if (v) {
                      return true;
                    }
                    return false;
                  },
                  message: `${i18n.t('selectBankTransfer')}`,
                },
              ]}
            >
              <Picker
                listData={bankList}
                placeholder={`${i18n.t('selectBankTransfer')}`}
                labelClassName='pl-50'
              />
            </FormItem>
          ) : (
            ''
          )}
          <FormItem
            type='card'
            colon={false}
            name='RemittanceName'
            label={i18n.t('remittanceName')}
            rules={[
              {
                validator: (_, v) => {
                  if (v) {
                    return true;
                  }
                  return false;
                },
                message: `${i18n.t('enterRemittanceName')}`,
              },
            ]}
          >
            <Input placeholder={`${i18n.t('enterRemittanceName')}`} />
          </FormItem>
          <FormItem
            labelClassname='ws-no'
            type='card'
            name='Amount'
            colon={false}
            label={i18n.t('remittanceMoney')}
            rules={[
              {
                validator: (_, v) => {
                  if (v) {
                    return true;
                  }
                  return false;
                },
                message: `${i18n.t('enterRemittanceMoney')}`,
              },
            ]}
          >
            <Input
              placeholder={`${i18n.t('pleaseEnterAmount')}${
                accountData?.minMoney
              }~${accountData?.maxMoney}`}
              type='number'
            />
          </FormItem>
        </Form>
      </div>
    </BgImg>
  );
};

export default memo(BankPage);
