import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import {
  FormDemo as Form,
  Input,
  FormItem,
  Button,
  toastText,
} from '@/components';
import styles from './index.module.scss';
import { createWithdrawPsFormItems } from '../setUp/modifyWithdrawPassword';
import { createWithdrawalPwd } from '@/services/withdraw';
import { useNavigation } from '@/hooks/useAutoNavigation';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

function CreateWithdrawPsd() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigation();
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  const handleEnsure = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((result: { withdrawPSW: any; confirmPassword: any }) => {
          changeState('isLoading', true);
          createWithdrawalPwd({
            Pwd: result.withdrawPSW,
            ConfirmPwd: result.confirmPassword,
          })
            .then(() => {
              debugger;
              toastText(`${formatMsg('createSuccess')}`);

              navigate('/mine/setUp', { replace: true });
            })
            .catch(() => {})
            .finally(() => {
              resolve && resolve();
              changeState('isLoading', false);
            });
        })
        .catch((err) => {
          toastText(err[0]?.message || '');
          resolve && resolve();
        });
    },
    [changeState, form, navigate, formatMsg]
  );

  return (
    <>
      <Form
        form={form}
        className={`bg-body ${styles['form-create-withdraw-psw']}`}
      >
        {createWithdrawPsFormItems.map((item) => {
          let rules = [];
          rules = [
            {
              required: item.required,
              message: item.message,
              pattern: item.reg,
            },
          ];
          return (
            <FormItem
              labelClassname={styles['createwithdrawlabel']}
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
      <div className='m-t-30 m-0-50 p-30'>
        <Button
          isPromise
          onClick={handleEnsure}
          className='w-full'
          size='large'
        >
          {formatMsg('determine')}
        </Button>
      </div>
    </>
  );
}

export default CreateWithdrawPsd;
