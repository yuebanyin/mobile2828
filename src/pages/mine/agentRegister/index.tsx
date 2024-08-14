import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  FormDemo as Form,
  FormItem,
  Input,
  KindTips,
  Picker,
  toastText,
  CountDown,
} from '@/components';
import { agentRegistryFormItems, regKindTips } from '@/constants';
import {
  getBankOptions,
  postAgentRegister,
  getAgentRegisterTemp,
  sendSms,
} from '@/services';
import { useNavigation, useLanguage } from '@/hooks';
import { useGlobalStore, useUserInfoStore } from '@/mobx';

export type AgentRegisterLabelDto = {
  Label: string;
  Required: boolean;
};

export type AgentRegisterDto = {
  LoginName: string;
  LoginPwd: string;
  MobilePhone: string;
  RealName: string;
  BankId: number;
  BankAccount: string;
  BankAddress: string;
  QQNumber: string;
  Email: string;
};

/**
 * 代理注册-主界面
 * @returns
 */
const AgentRegister = () => {
  console.log('🚀 ~ file: index.tsx:12 ~ AgentRegister:');
  const { formatMsg } = useLanguage();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [btnStatus, setBtnStatus] = useState<string | number>(
    `${formatMsg('send')}`
  );
  const pingRef = useRef(false);
  const [bankList, setBankList] = useState([]);
  const [agentRegList, setAgentRegList] = useState([]); // 代理注册配置项
  const bankIdRef = useRef(-1);
  const initRef = useRef(false);
  const navigate = useNavigation();
  const { isAgent, setAgent } = useUserInfoStore();
  const { changeState } = useGlobalStore();

  // 获得代理注册模板
  useEffect(() => {
    changeState('isLoading', true);
    getAgentRegisterTemp()
      .then((res: any) => {
        if (res?.Data) {
          const newResList = res.Data.map((item) => {
            const its: any =
              agentRegistryFormItems.find((items) => items.Id === item.Id) ||
              {};
            return {
              ...item,
              ...its,
              required: item?.Required,
            };
          });
          setAgentRegList(newResList);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  // 触发提交的按钮点击事件
  const handleRegister = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((res) => {
          const params = { ...res };
          params.BankId = bankIdRef.current;
          console.log({ params });
          // 银行卡联合检测，如果填写某一项需要三项都写
          if (
            params.BankId !== -1 ||
            params.BankAccount !== '' ||
            params.BankAddress !== ''
          ) {
            if (params.BankId === -1) {
              // return Promise.reject(['请选择开户银行']);
              console.log({ err: `${formatMsg('entryBank')}` });
              toastText(`${formatMsg('entryBank')}`);
              resolve && resolve();
              return;
            }
            if (params.BankAccount === '') {
              // return new Promise.reject(['请输入银行卡号']);
              console.log({ err: `${formatMsg('enterBankAccount')}` });
              toastText(`${formatMsg('enterBankAccount')}`);
              resolve && resolve();
              return;
            }
            if (params.BankAddress === '') {
              // return new Promise.reject(['请输入开户地址']);
              console.log({ err: `${formatMsg('enterBankAddress')}` });
              toastText(`${formatMsg('enterBankAddress')}`);
              resolve && resolve();
              return;
            }
          }
          changeState('isLoading', true);
          postAgentRegister(params)
            .then((netRes: any) => {
              // toastText(netRes.Message);
              const msgObj = JSON.parse(netRes.Message);
              toastText(formatMsg(msgObj?.key, msgObj?.parm));
              setAgent(true);
              navigate('/mine', { replace: true });
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
          console.log({ err });
          toastText(err[0]?.message);
          resolve && resolve();
        });
    },
    [changeState, form, navigate, setAgent, formatMsg]
  );

  const getBkOptions = useCallback(() => {
    changeState('isLoading', true);
    getBankOptions()
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          setBankList([
            ...res.Data.map(({ Value, Key }) => ({
              value: Value,
              text: formatMsg(Key),
            })),
          ]);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, formatMsg]);

  useEffect(() => {
    if (!isAgent) {
      if (!initRef.current) {
        initRef.current = true;
        getBkOptions();
      }
    } else {
      navigate('/mine', { replace: true });
    }
  }, [getBkOptions, isAgent, navigate]);

  // const chooseAddress = useCallback(
  //   (item) => {
  //     if (item.length > 0) {
  //       let address = '';
  //       for (let index = 0; index < item.length; index += 1) {
  //         const element = item[index];
  //         address += element.text;
  //       }
  //       form.setFieldsValue({ BankAddress: address });
  //     }
  //   },
  //   [form]
  // );

  const chooseBank = useCallback(
    (item) => {
      if (item.length === 1) {
        console.log('🚀 ~ file: index.tsx:63 ~ CarddrawInfo ~ item:', item);
        bankIdRef.current = item[0].value;
        form.setFieldsValue({ BankId: item[0].text });
      }
    },
    [form]
  );

  const buildInput = useCallback(
    (item: any) => {
      if (item.name === 'BankId' && bankList.length) {
        return (
          <Picker
            listData={bankList}
            placeholder={t(item.placeholder)}
            onConfirm={chooseBank}
            labelClassName='pl-50'
          />
        );
      }
      if (item.name === 'BankAddress') {
        return (
          // <Picker
          //   listData={cnAddress}
          //   placeholder={t(item.placeholder)}
          //   onConfirm={chooseAddress}
          //   labelClassName='pl-50'
          // />
          <Input
            maxLength={item.maxlength || 999}
            placeholder={t(item.placeholder)}
            type={item.type}
            afterfix={item.afterfix}
            className={item.iptcn}
          />
        );
      }
      if (item.name === 'BankAccount') {
        return (
          <Input
            maxLength={item.maxlength || 999}
            type='number'
            placeholder={t(item.placeholder)}
            pattern='[0-9]*'
          />
        );
      }
      return (
        <Input
          maxLength={item.maxlength || 999}
          placeholder={t(item.placeholder)}
          type={item.type}
          afterfix={item.afterfix}
          className={item.iptcn}
        />
      );
    },
    [bankList, chooseBank, t]
  );

  const sendCode = useCallback(() => {
    const tel = form.getFieldValue('MobilePhone');
    if (!tel) {
      toastText(`${formatMsg('entryPhone')}`);
    } else if (!pingRef.current) {
      pingRef.current = true;
      sendSms({ id: tel, Type: 'agent' })
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
    <>
      <Form className='bg-main p-0' form={form}>
        {agentRegList.map((item, i) => {
          const gap =
            item.name === 'LoginName' ||
            item.name === 'MobilePhone' ||
            item.name === 'BankId';
          let rules = [];
          let cn = '';
          let iptcn = '';
          let afterfix = null;
          /*********************代理注册校验逻辑***************************** */
          if (item.required) {
            if (item.name === 'BankAccount') {
              rules = [
                { required: item.required, message: formatMsg(item.message) },
                {
                  validator: (_, v) => item.reg.test(v),
                  message: `${formatMsg('enterBank_10_20_number')}`,
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

          if (item.Id === 4) {
            cn = 'p-r';
            afterfix = <div className='p-a left-300'>+86</div>;
            iptcn = 'pl-130';
          }

          if (item.Id === 10) {
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
            <div
              key={`${i}` || item.name}
              className={`bg-body ${cn} ${gap ? 'm-t-30' : ''}`}
            >
              <FormItem
                classname={`m-l-50 m-r-50 bc-split ${gap ? '' : 'b-t-1'}`}
                rules={rules}
                required={item.required}
                name={item.name}
                label={t(item.text)}
              >
                {buildInput({ ...item, cn, afterfix, iptcn })}
              </FormItem>
            </div>
          );
        })}
      </Form>
      <div className='h-138 m-t-50 m-0-auto'>
        <Button
          className='w-940 h-138'
          isPromise
          onClick={handleRegister}
          size='large'
        >
          {t('saveBtn')}
        </Button>
      </div>
      <KindTips className='m-t-20' data={regKindTips} />
    </>
  );
};

export default AgentRegister;
