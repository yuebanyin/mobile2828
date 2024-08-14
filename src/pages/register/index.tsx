import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormDemo as Form,
  Input,
  Button,
  toastText,
  OutLink,
  KindTips,
  FormItem,
  CellGroup,
  Img,
  CountDown,
} from '@/components';
import { Obj, registryFormItems, regKindTips } from '@/constants';
import styles from './index.module.scss';
import { isNoEmpty, getDeviceInfo } from '@/utils/tools';
import { registry, registerTemp, sendSms } from '@/services';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { useGetSystemInfo, useLanguage } from '@/hooks';
import { remeberPsd } from '@/pages/login';

const Register = () => {
  const { formatMsg } = useLanguage();
  const { t } = useTranslation();
  const [regList, setRegList] = useState([]);
  const [form] = Form.useForm();
  const { changeAllUserInfo, token } = useUserInfoStore();
  const { changeState } = useGlobalStore();
  const navigate = useNavigate();
  const [webkitId] = useGetSystemInfo();
  const [btnStatus, setBtnStatus] = useState<string | number>(
    `${formatMsg('send')}`
  );
  const pingRef = useRef(false);

  useEffect(() => {
    changeState('isLoading', true);
    registerTemp()
      .then((res: any) => {
        if (res?.Data) {
          const newResList = res.Data.map((item) => {
            const its: any =
              registryFormItems.find((items) => items.Id === item.Id) || {};
            return {
              ...item,
              ...its,
              required: item?.Required,
            };
          });
          setRegList(newResList);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [token, navigate]);

  // 触发提交的按钮点击事件
  const handleRegister = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((result) => {
          changeState('isLoading', true);
          const { deviceInfo, systemVer, clientKind } = getDeviceInfo();
          // 注册接口
          registry({
            ...result,
            spreadCode: result.spreadCode || 0,
            spreadType: location?.search.indexOf('sp') !== -1 ? 1 : 0,
            machineId: webkitId,
            deviceInfo,
            systemVer,
            clientKind,
            Host: location?.origin,
          })
            .then((res: any) => {
              if (isNoEmpty(res?.Data)) {
                // 登录后保存用户信息
                changeAllUserInfo(res?.Data);
                navigate('/home');
                // 记住密码
                remeberPsd(true, result.account, result.password);
              }
            })
            .catch(() => {})
            .finally(() => {
              changeState('isLoading', false);
            });
          resolve && resolve();
        })
        .catch((err) => {
          console.log({ err });
          toastText(err[0]?.message);
          resolve && resolve();
        });
    },
    [form, changeState, webkitId, changeAllUserInfo, navigate]
  );

  const sendCode = useCallback(() => {
    const tel = form.getFieldValue('mobliePhone');
    if (!tel) {
      toastText(`${formatMsg('entryPhone')}`);
    } else if (!pingRef.current) {
      pingRef.current = true;
      sendSms({ id: tel, Type: 'register' })
        .then(() => {
          // 发送成功
          setBtnStatus(60);
        })
        .catch((err) => {
          console.log({ err });
          // 发送失败
          setBtnStatus(`${formatMsg('resend')}`);
          pingRef.current = false;
        });
    }
  }, [form, formatMsg]);

  return (
    <div className='bg-body d-f fd-c'>
      <div className={`${styles['welcome-box']} d-f ai-c`}>
        <Img className={styles['login-logo-img']} src='/login/login-logo.gif' />
        <div className='m-l-10'>
          <div className='wds-h2'>{formatMsg('dearUser')}</div>
          <div className='wds-big-title m-t-10'>
            {formatMsg('welcomeAddRuyi')}
          </div>
        </div>
      </div>
      <CellGroup className='m-0-50 '>
        <Form form={form} className='p-0'>
          {regList.map((item) => {
            let rules = [];
            let initV: Obj = {};
            let readOnly = false;
            let cn = '';
            let afterfix = null;
            let iptcn = '';

            // 是否必填再做校验
            if (item.required) {
              if (item.name === 'confirmPassword') {
                // 确认密码的单独处理校验
                rules = [
                  { required: item.required, message: formatMsg(item.message) },
                  {
                    validator: (_, v) => item.reg.test(v),
                    message: formatMsg(item.message),
                  },
                  {
                    validator: (_, v) => form.getFieldValue('password') === v,
                    message: formatMsg(item.message),
                  },
                ];
              } else if (item.name === 'realName') {
                // 真实姓名的单独处理校验
                rules = [
                  { required: item.required, message: formatMsg(item.message) },
                  {
                    validator: (_, v) => item.reg.test(v),
                    message: `${formatMsg('enter_2_20_name')}`,
                  },
                ];
              } else {
                rules = [
                  {
                    required: item?.required,
                    message: formatMsg(item?.message),
                    pattern: item?.reg,
                  },
                ];
              }
            } else if (item?.reg) {
              // 非必填有值才判断
              rules = [
                { required: item.required, message: formatMsg(item.message) },
                {
                  validator: (_, v) => v && item.reg.test(v),
                  message: formatMsg(item.message),
                },
              ];
            } else {
              rules = [
                { required: item.required, message: formatMsg(item.message) },
              ];
            }
            if (item.Id === 7) {
              cn = 'p-r';
              afterfix = <div className='p-a left-300'>+86</div>;
              iptcn = 'pl-130';
            }
            if (item.Id === 10) {
              initV = {
                initialValue:
                  location?.search.indexOf('?p=') !== -1 ||
                  location?.search.indexOf('?sp=') !== -1
                    ? location?.search.replace(/[(?|=|s|p)]/g, '')
                    : '',
              };
              if (initV?.initialValue) {
                readOnly = true;
              }
            }
            if (item.Id === 11) {
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
                        setBtnStatus(`${formatMsg('resend')}`);
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
              <div key={item.name} className={`${cn} b-b-1 bc-split`}>
                <FormItem
                  rules={rules}
                  name={item.name}
                  label={t(item.text)}
                  classname='b-none'
                  {...initV}
                >
                  <Input
                    placeholder={t(item.placeholder)}
                    maxLength={item.maxlength || 999}
                    readOnly={readOnly}
                    afterfix={afterfix}
                    className={iptcn}
                    type={item.type}
                  />
                </FormItem>
              </div>
            );
          })}
        </Form>
      </CellGroup>
      <Button
        isPromise
        onClick={handleRegister}
        className={`${styles['registry-btn']}`}
        size='large'
      >
        {t('registry')}
      </Button>
      <div className='d-f ai-c jc-c wds-sm-title m-30-0'>
        <div className='m-r-20'>{formatMsg('hasRegister')}</div>
        <OutLink className='color-primary' href='/login'>
          {formatMsg('goLogined')}
        </OutLink>
      </div>
      <KindTips className='m-t-2' data={regKindTips} />
    </div>
  );
};

export default Register;

