import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import {
  Img,
  FormDemo as Form,
  FormItem,
  Input,
  Button,
  OutLink,
  toastText,
  Checkbox,
} from '@/components';
import { useGetSystemInfo } from '@/hooks';
import {
  getUserScoreInfo,
  login,
  redirectPass,
  virLogin,
  registerVerify,
} from '@/services';
import { REGEXOBJ } from '@/constants';
import styles from './index.module.scss';
import { useGlobalStore, useUserInfoStore, useUserScoreStore } from '@/mobx';
import {
  isNoEmpty,
  omit,
  getRandomNumber,
  encryptionEcbMeans,
  decryptEcbMeans,
  getDeviceInfo,
} from '@/utils/tools';

// 记住密码
export const remeberPsd = (
  isRemenber: boolean,
  account: string,
  password: string
) => {
  if (isRemenber) {
    Cookies.set('account', account, { expires: 10 });
    Cookies.set('password', encryptionEcbMeans(password), { expires: 10 });
  } else {
    Cookies.remove('account');
    Cookies.remove('password');
  }
};

const Login = observer(() => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [webkitId] = useGetSystemInfo();
  const { changeAllUserInfo, token } = useUserInfoStore();
  const { changeState, isLoading } = useGlobalStore();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const { changeUserScore } = useUserScoreStore(); // 用户金币
  const [isRedirectPass, setRedirectPass] = useState(false);

  // 获取验证码
  const getVcode = () => {
    const vcode = getRandomNumber();
    setCode(vcode);
  };

  useEffect(() => {
    if (form) {
      const account = Cookies.get('account') || '';
      const password = Cookies.get('password') || '';
      if (account && password) {
        form.setFieldsValue({
          account,
          password: decryptEcbMeans(password),
        });
      }
    }
  }, [form]);

  useEffect(() => {
    getVcode();
  }, []);

  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [token, navigate]);

  // 等成功的清下刷新用户
  const refreshUserScore = useCallback(() => {
    getUserScoreInfo()
      .then((res: any) => {
        if (res.Data) changeUserScore(res.Data);
      })
      .catch(() => {});
  }, [changeUserScore]);

  // 登录接口
  const handleLogin = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((result) => {
          changeState('isLoading', true);
          const { deviceInfo, systemVer, clientKind } = getDeviceInfo();
          login({
            ...omit(result, ['remeberPassword', 'verifyCode']),
            machineId: webkitId,
            deviceInfo,
            systemVer,
            clientKind,
          })
            .then((res: any) => {
              if (isNoEmpty(res?.Data)) {
                // 登录后保存用户信息
                changeAllUserInfo(res?.Data);
                refreshUserScore();
                navigate('/home');
                // 记住密码
                remeberPsd(
                  result.remeberPassword,
                  result.account,
                  result.password
                );
              }
            })
            .catch(() => {
              getVcode();
            })
            .finally(() => {
              changeState('isLoading', false);
              resolve && resolve();
            });
        })
        .catch((err) => {
          toastText(err[0]?.message);
          getVcode();
          resolve && resolve();
        });
    },
    [changeAllUserInfo, form, navigate, refreshUserScore, webkitId, changeState]
  );

  // 试玩登录接口
  const handleVirLogin = useCallback(
    (_, resolve) => {
      changeState('isLoading', true);
      const { deviceInfo, systemVer, clientKind } = getDeviceInfo();
      virLogin({
        machineId: webkitId,
        deviceInfo,
        systemVer,
        clientKind,
      })
        .then((res: any) => {
          if (isNoEmpty(res?.Data)) {
            // 登录后保存用户信息
            changeAllUserInfo(res?.Data);
            refreshUserScore();
            navigate('/home');
          }
        })
        .catch(() => {
          getVcode();
        })
        .finally(() => {
          resolve && resolve();
          changeState('isLoading', false);
        });
    },
    [changeAllUserInfo, navigate, refreshUserScore, webkitId, changeState]
  );

  const validatorCode = useCallback(
    (_, v) => {
      if (!v || v !== code) {
        return false;
      }
      return true;
    },
    [code]
  );

  useEffect(() => {
    redirectPass()
      .then((res: any) => {
        console.log('🚀 ~ file: redirectPass.tsx:102 ~ .then ~ res:', res.Data);
        setRedirectPass(res.Data);
      })
      .catch(() => {});
  }, [setRedirectPass]);

  // 处理同一设备只能注册一个账号
  const toRegistry = useCallback(
    (_, resolve) => {
      if (isLoading) return;
      changeState('isLoading', true);
      registerVerify({ Id: webkitId })
        .then(() => {
          navigate('/register');
        })
        .catch(() => {})
        .finally(() => {
          resolve && resolve();
          changeState('isLoading', false);
        });
    },
    [changeState, isLoading, navigate, webkitId]
  );

  return (
    <div className='d-f flex-1 bg-body fd-c'>
      <div className={`${styles['login-wrap']} d-f fd-c`}>
        <Img
          className={`${styles['login-logo-img']} m-0-auto m-t-30 m-b-30`}
          src='/login/login-logo.gif'
        />
        <Form className={`${styles['login-form']}`} form={form}>
          <FormItem
            colon={false}
            labelClassname={`${styles['label']} w-80`}
            label={
              <Img
                className={`${styles['label-img']} p-a zi-mid`}
                src='/login/accout.png'
              />
            }
            rules={[
              {
                validator: (_, v) => {
                  if (v) {
                    return REGEXOBJ.NUMBER_OR_LETTER_4_11.test(v);
                  }
                  return false;
                },
                message: `${t('enterAccount')}`,
              },
            ]}
            name='account'
          >
            <Input
              onChange={() => {
                const psd = form.getFieldValue('password');
                // 修改账号时，如果密码不为空就置为空
                if (psd) {
                  form.setFieldsValue({ password: '' });
                }
              }}
              placeholder={t('entryAccount')}
              maxLength={11}
            />
          </FormItem>
          <FormItem
            colon={false}
            labelClassname={`${styles['label']} w-80`}
            label={
              <Img
                className={`${styles['label-img']} p-a zi-mid`}
                src='/login/lock.png'
              />
            }
            rules={[
              {
                validator: (_, v) => {
                  if (v) {
                    return REGEXOBJ.NUMBER_OR_LETTER_8_12.test(v);
                  }
                  return false;
                },
                message: `${t('enterPassword')}`,
              },
            ]}
            name='password'
          >
            <Input
              placeholder={t('entryPassword')}
              type='password'
              maxLength={12}
            />
          </FormItem>
          <FormItem
            colon={false}
            rules={[
              {
                validator: validatorCode,
                message: `${t('enterCode')}`,
              },
            ]}
            labelClassname={`${styles['label']} w-80`}
            label={
              <Img
                className={`${styles['label-img']} p-a zi-mid`}
                src='/login/yanzheng.png'
              />
            }
            name='verifyCode'
          >
            <Input
              placeholder={t('entryVerify')}
              maxLength={4}
              afterfix={
                <div
                  className={`wds-big-title color-vf-tip p-a ${styles['verify-code']}`}
                >
                  {code}
                </div>
              }
            />
          </FormItem>
          <div className={`${styles['remebel-psd']} d-f ai-c jc-sb`}>
            <FormItem
              initialValue
              className='auo'
              name='remeberPassword'
              noStyle
            >
              <Checkbox label={t('rememberPassword')} />
            </FormItem>
            <OutLink
              className='wds-sm-title color-primary'
              href={isRedirectPass ? '/forgetPsw' : '/serCenter'}
            >
              {t('forgetPassword')}
            </OutLink>
          </div>
        </Form>
        <Button
          isPromise
          onClick={handleLogin}
          className={`${styles['registry-btn']} m-0-50 m-b-40`}
          size='large'
        >
          {t('signIn')}
        </Button>
        <Button
          isPromise
          onClick={handleVirLogin}
          className={`${styles.tryBtn} bg-gdt-sec m-0-50`}
          size='large'
        >
          {t('demo')}
        </Button>
        <div className='d-f ai-c jc-c wds-sm-title m-30-0'>
          <div className='m-r-20'>{t('noAccount')}</div>
          <div>
            <Button
              type='link'
              className='color-primary wds-sm-title'
              isPromise
              onClick={toRegistry}
            >
              {t('registerImmediately')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;

