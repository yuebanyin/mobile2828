import { useCallback, useRef, useState } from 'react';
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

import { findPSWFormItems } from '@/constants';
import {
  verifyAccount,
  sendVerifyCode,
  modifyLogonPassByCode,
} from '@/services';
import { useGlobalStore } from '@/mobx';
import { useNavigation, useLanguage } from '@/hooks';

const ForgetPsw = observer(() => {
  const { formatMsg } = useLanguage();
  const { changeState } = useGlobalStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [btnStatus, setBtnStatus] = useState<string | number>(`${t('send')}`);
  const pingRef = useRef(false);
  const [phone, setPhone] = useState(null);

  // 下一步
  const handleNext = useCallback(
    (_, resolve) => {
      changeState('isLoading', true);
      form
        .validate()
        .then((values) => {
          if (phone) {
            modifyLogonPassByCode({
              NewPassword: values.password,
              Account: values.account,
              ConfirmPassword: values.confirmPassword,
              Code: values.code,
            })
              .then(() => {
                navigation('/login');
              })
              .catch(() => {})
              .finally(() => {
                resolve && resolve();
                changeState('isLoading', false);
              });
          } else {
            verifyAccount({ Id: values.account })
              .then((res: any) => {
                if (res?.Data) {
                  setPhone(res?.Data);
                } else {
                  toastText(`${formatMsg('noBindPhone')}`);
                }
              })
              .catch(() => {})
              .finally(() => {
                resolve && resolve();
                changeState('isLoading', false);
              });
          }
        })
        .catch((err) => {
          toastText(err[0]?.message);
          resolve && resolve();
          changeState('isLoading', false);
        });
    },
    [changeState, form, navigation, phone, formatMsg]
  );

  const sendCode = useCallback(() => {
    const Account = form.getFieldValue('account');
    const { t } = useTranslation();
    if (!Account) {
      toastText(`${t('entryYourFindAccount')}`);
    } else if (!pingRef.current) {
      pingRef.current = true;
      sendVerifyCode({ Account })
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
  }, [form]);

  return (
    <div className='d-f flex-1 bg-body fd-c'>
      <div className={`${styles['login-wrap']} d-f fd-c `}>
        <Img
          className={`${styles['login-logo-img']} m-0-auto m-t-30 m-b-30`}
          src='/login/login-logo.gif'
        />
        <Form className={`${styles['login-form']}`} form={form}>
          {findPSWFormItems.map((item, i) => {
            if (!phone && i > 0) return <></>;
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
          {phone ? t('Submit') : t('next')}
        </Button>
      </div>
    </div>
  );
});

export default ForgetPsw;

