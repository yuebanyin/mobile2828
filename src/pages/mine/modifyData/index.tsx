import { Fragment, memo, useCallback, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import {
  FormDemo as Form,
  FormItem,
  toastText,
  Input,
  KindTips,
  Button,
} from '@/components';
import { modifyDataFormItems, modifyKindTips } from '@/constants';
import { copyText, isArray, isNoEmpty } from '@/utils/tools';
import AvatarModal from './avatarModal';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { postUserEditUserInfo } from '@/services';
import { useLanguage, useNavigation } from '@/hooks';

export type Obj = Record<string, any>;

const ModifyData = observer(() => {
  const { t } = useTranslation();
  const { formatMsg } = useLanguage();

  const navigate = useNavigation();
  const [form] = Form.useForm();
  const initRef = useRef(false);
  const {
    account,
    nickname,
    realName,
    mobliePhone,
    qq,
    weChat,
    setOtherInfo,
    gameId,
    isVisitor,
  } = useUserInfoStore();
  const { changeState } = useGlobalStore();

  // const [loading, setLoading] = useState(false);

  // 触发提交的按钮点击事件
  const handleSave = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((res: any) => {
          changeState('isLoading', true);
          postUserEditUserInfo({
            NickName: res.nickName,
            MobliePhone: res.mobliePhone,
            RealName: res.realName,
            WeChat: res.weChat,
            QQ: res.qq,
          })
            .then((netRes: any) => {
              // toastText(netRes.Message);
              const msgObj = JSON.parse(netRes.Message);
              toastText(formatMsg(msgObj?.key, msgObj?.parm));
              setOtherInfo(
                res.nickName,
                res.qq,
                res.weChat,
                res.realName,
                res.mobliePhone
              );
              resolve && resolve();
              navigate('/mine');
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
    [changeState, form, navigate, setOtherInfo, formatMsg]
  );

  // 表单验证完成事件，此处做接口提交操作
  const onFinish = useCallback((values: Obj) => {
    console.log('表单提交接口处理', values);
  }, []);

  // 表单验证失败事件，此处做错误提示操作
  const onFinishFailed = useCallback((errList: any[]) => {
    if (isArray(errList) && isNoEmpty(errList)) {
      toastText(errList[0]?.message);
    }
  }, []);

  // 创建input
  const buildInput = useCallback(
    (item: any) => {
      if (['account', 'realName', 'mobliePhone'].includes(item.name)) {
        let ro = true;
        if (item.name === 'realName' && realName?.length === 0) {
          ro = false;
        }
        if (item.name === 'mobliePhone' && `${mobliePhone}`?.length === 0) {
          ro = false;
        }
        return (
          <Input
            placeholder={t(item.placeholder)}
            maxLength={item.maxlength || 999}
            readOnly={ro}
          />
        );
      }
      return (
        <Input
          placeholder={t(item.placeholder)}
          maxLength={item.maxlength || 999}
        />
      );
    },
    [t, realName, mobliePhone]
  );

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      form.setFieldsValue({
        account,
        nickName: nickname,
        realName,
        mobliePhone,
        weChat,
        qq,
      });
    }
  }, [account, form, mobliePhone, nickname, qq, realName, weChat]);

  return (
    <>
      <div className='bg-body'>
        <Form
          className='p-0'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <div className='df-aic-jcsb  m-0-50 bg-body m-t-30 b-b-1 bc-split'>
            <div className='d-f jc-sb w-230 wds-sm-title m-l-50'>
              <div>{formatMsg('tou')}</div>
              <div>{formatMsg('xiang')}:</div>
            </div>
            <AvatarModal />
          </div>
          {!isVisitor && gameId && (
            <div
              onClick={() => copyText(`${gameId}`)}
              className='m-0-50 p-l-50 d-f ai-c p-t-60 p-b-40 b-b-1 bc-split'
            >
              <div className='w-230 text-colon text-justify wds-sm-title m-r-50'>
                {t('user')}
                &nbsp;ID
              </div>
              {gameId}
            </div>
          )}
          {modifyDataFormItems.map((item) => {
            let rules = [];
            rules = [{ message: formatMsg(item.message), pattern: item.reg }];
            if (item.name === 'realName') {
              return (
                <Fragment key={item.name}>
                  <div className='h-30 bg-main' />
                  <FormItem
                    classname='p-l-50 m-0-50'
                    rules={rules}
                    name={item.name}
                    label={t(item.text)}
                  >
                    {buildInput(item)}
                  </FormItem>
                </Fragment>
              );
            }
            return (
              <FormItem
                classname={`p-l-50 m-0-50 ${
                  item.name === 'nickName' ? 'b-none' : ''
                }`}
                key={item.name}
                rules={rules}
                name={item.name}
                label={t(item.text)}
              >
                {buildInput(item)}
              </FormItem>
            );
          })}
        </Form>
      </div>
      <div className='h-138 m-t-50 m-0-auto'>
        <Button
          className='w-940 h-138'
          isPromise
          onClick={handleSave}
          size='large'
        >
          {t('saveBtn')}
        </Button>
      </div>
      <KindTips className='m-t-2 bg-body' data={modifyKindTips} />
    </>
  );
});

export default memo(ModifyData);
