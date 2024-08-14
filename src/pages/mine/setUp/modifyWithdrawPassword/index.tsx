import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import styles from '../index.module.scss';
import {
  Button,
  FormDemo as Form,
  Input,
  FormItem,
  KindTips,
  toastText,
  OutLink,
} from '@/components';
import { REGEXOBJ, modifyWithdrawPsdKindTips } from '@/constants';
import { setWithdrawPwd } from '@/services/personal';
import { useLanguage, useNavigation } from '@/hooks';
import { useGlobalStore } from '@/mobx';

export const modifyWithDrawFormItems = [
  {
    text: 'oldWithdrawPSW',
    name: 'password',
    placeholder: 'entryOldWithdrawPSW',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    required: false,
    message: '请输入原提现密码',
    maxlength: 12,
    type: 'password',
  },
  {
    text: 'newWithdrawPSW',
    name: 'reWithdrawPSWPassword',
    placeholder: 'entrNewWithdrawPSW_6_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    required: false,
    message: '请输入6-12位新密码',
    maxlength: 12,
    type: 'password',
  },
  {
    text: 'reWithdrawPSWPassword',
    name: 'confirmPassword',
    placeholder: 'entryReWithdrawPassword',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    required: false,
    message: '两次输入的密码不一致，请重新输入',
    maxlength: 12,
    type: 'password',
  },
];

export const createWithdrawPsFormItems = [
  {
    text: 'withdrawPSW',
    name: 'withdrawPSW',
    placeholder: 'entrNewWithdrawPSW_6_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    required: false,
    message: '请输入6-12位新密码',
    maxlength: 12,
  },
  {
    text: 'rePassword',
    name: 'confirmPassword',
    placeholder: 'entryReWithdrawPassword',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    required: false,
    message: '两次输入的密码不一致，请重新输入',
    maxlength: 12,
  },
];

// modifyWithdrawPassword

function ModifyWithdrawPassword() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  const handleModifyWithdrawPsw = useCallback(
    (_, resolve) => {
      changeState('isLoading', true);
      form
        .validate()
        .then((result) => {
          setWithdrawPwd({
            oldPwd: result.password,
            pwd: result.confirmPassword,
          })
            .then((res: any) => {
              // toastText(res.Message);
              const msgObj = JSON.parse(res.Message);
              toastText(formatMsg(msgObj?.key, msgObj?.parm));
              resolve && resolve();
              navigate('/mine/setUp', { replace: true });
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
          changeState('isLoading', false);
        });
    },
    [changeState, form, navigate, formatMsg]
  );

  return (
    <>
      <div className='d-f flex-1 fd-c m-t-30'>
        <Form
          className={`b-b-1 bg-body  ${styles['form-modify-withdrawpsd']}`}
          form={form}
        >
          {modifyWithDrawFormItems.map((item) => {
            let rules = [];
            if (item.reg) {
              if (item.name === 'confirmPassword') {
                // 确认密码的单独处理校验
                rules = [
                  { required: item.required, message: item.message },
                  {
                    validator: (_, v) => item.reg.test(v),
                    message: item.message,
                  },
                  {
                    validator: (_, v) =>
                      form.getFieldValue('reWithdrawPSWPassword') === v,
                    message: item.message,
                  },
                ];
              } else {
                rules = [
                  {
                    required: item.required,
                    message: item.message,
                    pattern: item.reg,
                  },
                ];
              }
            }
            return (
              <FormItem
                key={item.name}
                labelClassname={styles['withdrawlabel']}
                rules={rules}
                name={item.name}
                label={t(item.text)}
              >
                <Input
                  placeholder={t(item.placeholder)}
                  maxLength={item.maxlength || 999}
                  type={item.type}
                />
              </FormItem>
            );
          })}
        </Form>
        <div className='m-t-30 m-0-50 p-30'>
          <Button
            isPromise
            onClick={handleModifyWithdrawPsw}
            className='w-full'
            size='large'
          >
            {t('determine')}
          </Button>
          <OutLink
            href='/findwithdrawpsw'
            className='color-blue m-30 ta-c wds-sm-title'
          >
            {formatMsg('ForgotWithdrawalPwd')}
          </OutLink>
        </div>
        <KindTips className='m-t-2' data={modifyWithdrawPsdKindTips} />
      </div>
    </>
  );
}

export default ModifyWithdrawPassword;
