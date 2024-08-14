import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';
import {
  FormDemo as Form,
  Input,
  FormItem,
  KindTips,
  Button,
  Picker,
  toastText,
} from '@/components';
import {
  bindBankDetailKindTips,
  bindBankFormItems,
  // cnAddress,
} from '@/constants';
import styles from '../../index.module.scss';
import { getBankOptions } from '@/services/common';
import { bindBankCard, getBindBankCardList } from '@/services/personal';
import { useLanguage, useNavigation } from '@/hooks';
import { useGlobalStore } from '@/mobx';

function BindBankCardDetail() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [bankList, setBankList] = useState<[]>([]);
  const [count, setCount] = useState(3);
  const navigate = useNavigation();
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  useEffect(() => {
    changeState('isLoading', true);
    let finishCount = 0;
    getBindBankCardList()
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          setCount(res.Count);
        } else {
          toastText('Network Error');
        }
      })
      .catch(() => {})
      .finally(() => {
        if (finishCount === 1) {
          changeState('isLoading', false);
        } else {
          finishCount += 1;
        }
      });
    getBankOptions()
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          const tempVal = res.Data.map((item) => {
            const itemEx = { value: item.Value, text: formatMsg(item.Key) };
            return itemEx;
          });
          setBankList(tempVal);
        } else {
          toastText('Network Error');
        }
      })
      .catch(() => {})
      .finally(() => {
        if (finishCount === 1) {
          changeState('isLoading', false);
        } else {
          finishCount += 1;
        }
      });
  }, [changeState, formatMsg]);

  /////////////
  const handleBind = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((result) => {
          // let bankAddress = '';
          // for (let index = 0; index < result.bankAddress.length; index += 1) {
          //   const element = result.bankAddress[index];
          //   bankAddress += element.text;
          // }
          changeState('isLoading', true);
          bindBankCard({
            BankAddress: result.bankAddress,
            Name: result.bankName,
            BankId: result.bankOName[0].value,
            CardNumber: result.bankCardNumber,
            MobilePhone: result.mobliePhone,
          })
            .then((res: any) => {
              // toastText(res.Message);
              const msgObj = JSON.parse(res.Message);
              toastText(formatMsg(msgObj?.key, msgObj?.parm));
              navigate('/mine/setUp/bindBankCard', { replace: true });
              resolve && resolve();
            })
            .catch(() => {
              resolve && resolve();
            })
            .finally(() => {
              changeState('isLoading', false);
            });
        })
        .catch((err) => {
          toastText(err[0]?.message);
          resolve && resolve();
        });
    },
    [changeState, form, navigate, formatMsg]
  );

  return (
    <>
      <Form form={form} className={`bg-body ${styles['form-bind-bank']} `}>
        {bindBankFormItems.map((item, i) => {
          const rules = [
            {
              required: item.required,
              message: formatMsg(item.message),
              pattern: item.reg,
            },
          ];
          if (item.name === 'bankOName' && bankList.length) {
            return (
              <FormItem
                labelClassname={styles['banklabel']}
                key={`${i}` || item.name}
                rules={rules}
                name={item.name}
                label={t(item.text)}
              >
                <Picker
                  listData={bankList}
                  placeholder={formatMsg('entryBank')}
                  // placeholder='请选择开户银行'
                  labelClassName='pl-50'
                />
              </FormItem>
            );
          }
          if (item.name === 'bankAddress') {
            return (
              <FormItem
                labelClassname={styles['banklabel']}
                key={`${i}` || item.name}
                rules={rules}
                name={item.name}
                label={t(item.text)}
              >
                <Input
                  // listData={cnAddress}
                  // placeholder='请选择地址'
                  type='textarea'
                  placeholder={formatMsg('pleaseEnterAddress')}
                  // labelClassName='pl-50'
                />
              </FormItem>
            );
          }
          if (item.name === 'bankCardNumber') {
            return (
              <FormItem
                labelClassname={styles['banklabel']}
                key={item.name}
                rules={rules}
                name={item.name}
                label={t(item.text)}
              >
                <Input
                  type='number'
                  placeholder={t(item.placeholder)}
                  maxLength={item.maxlength || 999}
                />
              </FormItem>
            );
          }

          return (
            <FormItem
              labelClassname={styles['banklabel']}
              key={item.name}
              rules={rules}
              name={item.name}
              label={t(item.text)}
            >
              <Input
                placeholder={t(item.placeholder)}
                maxLength={item.maxlength || 999}
              />
            </FormItem>
          );
        })}
      </Form>
      {count < 3 ? (
        <div className='m-t-30 m-0-50 p-30'>
          <Button
            isPromise
            onClick={handleBind}
            className='w-full'
            size='large'
          >
            {formatMsg('Submit')}
          </Button>
        </div>
      ) : (
        ''
      )}
      <KindTips className='m-t-2' data={bindBankDetailKindTips} />
    </>
  );
}

export default BindBankCardDetail;
