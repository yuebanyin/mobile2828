import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import {
  FormDemo as Form,
  Input,
  FormItem,
  KindTips,
  Button,
  toastText,
} from '@/components';
import { bindBankDetailKindTips, bindGoPayFormItems } from '@/constants';
import styles from '../../index.module.scss';
import { bindGoPay, getBindGoPayList } from '@/services/personal';
import { useLanguage, useNavigation } from '@/hooks';
import { useGlobalStore } from '@/mobx';

function BindGoPayDetail() {
  const { t } = useTranslation();
  const { formatMsg } = useLanguage();
  const [form] = Form.useForm();
  const [count, setCount] = useState(3);
  const navigate = useNavigation();
  const { changeState } = useGlobalStore();

  useEffect(() => {
    changeState('isLoading', true);
    getBindGoPayList()
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          setCount(res.Count);
        } else {
          toastText('Network Error');
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  const handleBind = useCallback(
    (_, resolve) => {
      // MobilePhone: result.mobliePhone, RealName: result.relName,
      form
        .validate()
        .then((result: { goPayAddress: any; withdrawPSW: any }) => {
          changeState('isLoading', true);
          bindGoPay({
            WalletAddress: result.goPayAddress,
            WithdrawalPwd: result.withdrawPSW,
          })
            .then((res: any) => {
              // toastText(res.Message);
              const msgObj = JSON.parse(res.Message);
              toastText(formatMsg(msgObj?.key, msgObj?.parm));
              navigate('/mine/setUp/bindGoPay', { replace: true });
              resolve && resolve();
            })
            .catch(() => {
              resolve && resolve();
            })
            .finally(() => {
              changeState('isLoading', false);
            });
        })
        .catch(() => {
          resolve && resolve();
        });
    },
    [changeState, form, navigate, formatMsg]
  );

  return (
    <>
      <Form form={form} className={`bg-body ${styles['form-go-pay']}`}>
        {bindGoPayFormItems.map((item) => {
          let rules = [];
          rules = [
            { required: item.required, message: formatMsg(item.message) },
          ];
          return (
            <FormItem
              labelClassname={styles['gopaylabel']}
              key={item.name}
              rules={rules}
              name={item.name}
              label={t(item.text)}
            >
              <Input placeholder={t(item.placeholder)} maxLength={999} />
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
            {t('Submit')}
          </Button>
        </div>
      ) : (
        ''
      )}
      <KindTips className='m-t-2' data={bindBankDetailKindTips} />
    </>
  );
}

export default BindGoPayDetail;
