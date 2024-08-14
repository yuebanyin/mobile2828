// import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import styles from '../index.module.scss';
import {
  Button,
  FormDemo as Form,
  Input,
  FormItem,
  KindTips,
  toastText,
} from '@/components';
import { REGEXOBJ, modifyLoginPsdKindTips } from '@/constants';
import { setLoginPwd } from '@/services/personal';
import { useNavigation, useLanguage } from '@/hooks';
import { useGlobalStore, useUserInfoStore } from '@/mobx';

export const modifyWithDrawFormItems = [
  {
    text: 'oldLoginPSW',
    name: 'oldLoginPSW',
    placeholder: 'entryOldLoginPSW',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    required: false,
    message: 'entryOldLoginPSW',
    maxlength: 12,
  },
  {
    text: 'newLoginPSW',
    name: 'newLoginPSW',
    placeholder: 'numberOrLetter_8_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    required: false,
    message: 'numberOrLetter_8_12',
    maxlength: 12,
  },
  {
    text: 'confirmLoginPSWPassword',
    name: 'confirmLoginPSWPassword',
    placeholder: 'entryReLoginPassword',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    required: false,
    message: 'enterTwoSamePassward',
    maxlength: 12,
  },
];

function ModifyLoginPassword() {
  const [form] = Form.useForm();
  const { formatMsg } = useLanguage();
  const navigate = useNavigation();
  const { clearUserInfo } = useUserInfoStore();
  const { changeState } = useGlobalStore();

  const handleModifyLoginPsw = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((result) => {
          changeState('isLoading', true);
          setLoginPwd({
            OldPassword: result.oldLoginPSW,
            NewPassword: result.confirmLoginPSWPassword,
          })
            .then((res: any) => {
              // toastText(res.Message);
              const msgObj = JSON.parse(res.Message);
              toastText(formatMsg(msgObj?.key, msgObj?.parm));
              resolve && resolve();
              clearUserInfo();
              navigate('/login', { replace: true });
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
    [changeState, clearUserInfo, form, navigate, formatMsg]
  );

  return (
    <>
      <div className='d-f flex-1 fd-c m-t-30'>
        <Form
          className={`b-b-1 bg-body  ${styles['form-modify-loginpsd']}`}
          form={form}
        >
          {modifyWithDrawFormItems.map((item) => {
            let rules = [];
            if (item.reg) {
              if (item.name === 'confirmPassword') {
                // 确认密码的单独处理校验
                rules = [
                  { required: item.required, message: formatMsg(item.message) },
                  {
                    validator: (_, v) => item.reg.test(v),
                    message: formatMsg(item.message),
                  },
                  {
                    validator: (_, v) =>
                      form.getFieldValue('entryReWithdrawPassword') === v,
                    message: formatMsg(item.message),
                  },
                ];
              } else {
                rules = [
                  {
                    required: item.required,
                    message: formatMsg(item.message),
                    pattern: item.reg,
                  },
                ];
              }
            }
            return (
              <FormItem
                labelClassname={styles['loginLabel']}
                key={item.name}
                rules={rules}
                name={item.name}
                label={formatMsg(item.text)}
              >
                <Input
                  placeholder={formatMsg(item.placeholder)}
                  type='password'
                  maxLength={item.maxlength || 999}
                />
              </FormItem>
            );
          })}
        </Form>
        <div className='m-t-30 m-0-50 p-30'>
          <Button
            isPromise
            onClick={handleModifyLoginPsw}
            className='w-full'
            size='large'
          >
            {formatMsg('Submit')}
          </Button>
        </div>
        <KindTips className='m-t-2' data={modifyLoginPsdKindTips} />
      </div>
    </>
  );
}

export default ModifyLoginPassword;
