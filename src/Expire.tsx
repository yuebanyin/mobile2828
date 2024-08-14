import { observer } from 'mobx-react-lite';
import { Dialog } from './components';
import { useLanguage } from './hooks';
import { useGlobalStore, useUserInfoStore } from './mobx';
import { UTObj } from './utils/request';

const Content = ({ msg, cb, onCancel }: any) => {
  const { formatMsg } = useLanguage();

  const { clearUserInfo } = useUserInfoStore();
  const { navigation } = useGlobalStore();

  const handleOk = (url?: string) => {
    clearUserInfo && clearUserInfo();
    onCancel && onCancel();
    if (url && navigation) {
      navigation(url);
    }
    cb && cb();
  };

  return (
    <div className=''>
      <div className='ta-c wds-sm-title m-42-0-34'>{msg}</div>
      <div className='d-f ai-c jc-sb b-t-1 bc-split'>
        <div
          onClick={() => handleOk('/login')}
          className='wds-con flex-1 color-primary ta-c p-30 b-r-1 bc-split'
        >
          {formatMsg('afreshLogin')}
        </div>
        <div
          onClick={() => handleOk('/home')}
          className='wds-con flex-1 ta-c p-30'
        >
          {formatMsg('goHome')}
        </div>
      </div>
    </div>
  );
};

const RepeatContent = observer(
  ({ msg, cb, confirmText, onCancel, isGameTips = false }: any) => {
    const { formatMsg } = useLanguage();
    const { clearUserInfo } = useUserInfoStore();
    const { navigation } = useGlobalStore();

    const handleOk = () => {
      if (!isGameTips) {
        // 清空UT
        if (UTObj.UT) {
          UTObj.UT = '';
        }
        clearUserInfo && clearUserInfo();
        navigation('/login');
      }
      cb && cb();
      onCancel && onCancel();
    };

    return (
      <div className='p-0-30'>
        <div className='ta-c t-h2 font-w-bold m-42-0-34'>
          {formatMsg('tips')}
        </div>
        <div
          className={`m-42-0-34 ${
            isGameTips ? 't-small-title lh-64' : 'wds-sm-title'
          }`}
        >
          {msg || formatMsg('logYourAccountInAnotherPlace')}
        </div>
        <div className='d-f ai-c jc-sb b-t-1 bc-split'>
          <div
            onClick={handleOk}
            className={
              isGameTips
                ? 't-h2 color-primary flex-1 ta-c p-30'
                : 'wds-con flex-1 ta-c p-30'
            }
          >
            {confirmText || formatMsg('determine')}
          </div>
        </div>
      </div>
    );
  }
);

export const openExpire = (msg, cb) => {
  Dialog.confirm({
    isFooter: false,
    isTitle: false,
    children: <Content msg={msg} cb={cb} />,
  });
};

export const openRepeatExpire = (props?: any) => {
  Dialog.confirm({
    isFooter: false,
    isTitle: false,
    isMask: false,
    children: <RepeatContent {...props} />,
  });
};
