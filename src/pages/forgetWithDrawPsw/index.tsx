import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import {
  Img,
  FormDemo as Form,
  Button,
  FormItem,
  Input,
  toastText,
  CountDown,
} from '@/components';
import styles from './index.module.scss';

import { findPSWFormItems, withdrawPsw } from '@/constants';
import {
  getPhoneNumber,
  sendWithdrawVerifyCode,
  modifyWithdrawPassByCode,
} from '@/services';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { useLanguage, useNavigation } from '@/hooks';

const ForgetWithDrawPsw = observer(() => {
  const { formatMsg } = useLanguage();
  const { changeState } = useGlobalStore();
  const { account } = useUserInfoStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [btnStatus, setBtnStatus] = useState<string | number>(`${t('send')}`);
  const pingRef = useRef(false);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    const { t } = useTranslation();
    if (account) {
      changeState('isLoading', true);
      getPhoneNumber()
        .then((res: any) => {
          if (res?.Data) {
            setPhone(res?.Data);
          } else {
            toastText(`${t('noBindPhone')}`);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [account, changeState]);

  // 提交
  const handleNext = useCallback(
    (_, resolve) => {
      changeState('isLoading', true);
      form
        .validate()
        .then((values) => {
          modifyWithdrawPassByCode({
            NewPassword: values.password,
            ConfirmPassword: values.confirmPassword,
            Code: values.code,
          })
            .then(() => {
              const { t } = useTranslation();
              toastText(`${t('chengePasswardSuccess')}`);
              navigation(-1);
            })
            .catch(() => {})
            .finally(() => {
              resolve && resolve();
              changeState('isLoading', false);
            });
        })
        .catch((err) => {
          toastText(err[0]?.message);
          resolve && resolve();
          changeState('isLoading', false);
        });
    },
    [changeState, form, navigation]
  );

  const sendCode = useCallback(() => {
    const { t } = useTranslation();
    if (!pingRef.current) {
      pingRef.current = true;
      sendWithdrawVerifyCode()
        .then(() => {
          // 发送成功
          setBtnStatus(60);
        })
        .catch((err) => {
          console.log({ err });
          // 发送失败
          setBtnStatus(`${t('resend')}`);
          pingRef.current = false;
        });
    }
  }, []);

  console.log({ phone });

  return (
    <div className='d-f flex-1 bg-body fd-c'>
      <div className={`${styles['login-wrap']} d-f fd-c `}>
        <Img
          className={`${styles['login-logo-img']} m-0-auto m-t-30 m-b-30`}
          src='/login/login-logo.gif'
        />
        <Form className={`${styles['login-form']}`} form={form}>
          {findPSWFormItems.map((it, i) => {
            if (i === 0) return <></>;
            let item = { ...it };
            if ([1, 2].includes(i)) {
              item = withdrawPsw[i - 1];
            }
            let rules = [];
            let cn = '';
            let afterfix = null;
            let readOnly = false;

            if (item.name === 'account' && phone) {
              readOnly = true;
            }

            // 是否必填再做校验
            if (item.name === 'confirmPassword') {
              // 确认密码的单独处理校验
              rules = [
                {
                  validator: (_, v) => !!v,
                  message: formatMsg(item.message),
                },
                {
                  validator: (_, v) => item.reg.test(v),
                  message: formatMsg(item.message),
                },
                {
                  validator: (_, v) => form.getFieldValue('password') === v,
                  message: formatMsg(item.message1),
                },
              ];
            } else {
              rules = [
                {
                  validator: (_, v) => item.reg.test(v),
                  message: formatMsg(item.message),
                },
              ];
            }
            if (item.Id === 4) {
              cn = 'p-r';
              afterfix = (
                <Button
                  size='small'
                  className='b-1 bc-primary w-220 p-a right-30'
                  type='link'
                  onClick={sendCode}
                >
                  {typeof btnStatus === 'number' ? (
                    <CountDown
                      endTime={btnStatus}
                      onEnd={() => {
                        setBtnStatus(`${t('resend')}`);
                        pingRef.current = false;
                      }}
                    />
                  ) : (
                    btnStatus
                  )}
                </Button>
              );
            }
            return (
              <div key={item.name || i} className={`${cn} b-b-1 bc-split`}>
                {item.Id === 4 && (
                  <div className='mt-50 ml-30'>
                    {t('verifyPhoneNumber')}:
                    <span className='color-blue ml-30'>{phone}</span>
                  </div>
                )}
                <FormItem
                  rules={rules}
                  name={item.name}
                  label={t(item.text)}
                  classname='b-none'
                  labelClassname='w-min-220 w-220'
                >
                  <Input
                    placeholder={t(item.placeholder)}
                    maxLength={item.maxlength || 999}
                    afterfix={afterfix}
                    type={item.type}
                    readOnly={readOnly}
                  />
                </FormItem>
              </div>
            );
          })}
        </Form>

        <Button
          isPromise
          onClick={handleNext}
          className={`${styles['registry-btn']} m-0-50 m-b-40 m-t-132`}
          size='large'
        >
          {t('Submit')}
        </Button>
      </div>
    </div>
  );
});

export default ForgetWithDrawPsw;

