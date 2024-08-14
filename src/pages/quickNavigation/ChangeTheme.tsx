import { observer } from 'mobx-react-lite';
import { useState, useCallback, ReactNode } from 'react';
import { useGlobalStore } from '@/mobx';
import { Img, Dialog } from '@/components';
import { useChangeTheme, useLanguage } from '@/hooks';
import { ThemeName, themeList } from '@/constants';
import styles from './index.module.scss';

const ChangeTheme = observer(({ sourceNode, popupRef }: { sourceNode: ReactNode; popupRef: any }) => {
  const { theme } = useGlobalStore();
  const { changeTheme } = useChangeTheme();
  const [themeKey, setThemeKey] = useState<ThemeName>(theme);
  const { formatMsg } = useLanguage();

  const changeThemeKey = useCallback(
    (key) => () => {
      if (key === 'wait') return;
      setThemeKey(key);
    },
    []
  );

  // 确认换肤
  const onOk = useCallback(() => {
    if (theme !== themeKey) {
      changeTheme(themeKey);
    }
    // 关闭右侧快捷导航侧窗
    if (typeof popupRef?.current?.onClose === 'function') {
      popupRef?.current?.onClose();
    }
  }, [theme, themeKey, popupRef, changeTheme]);

  return (
    <Dialog onOk={onOk} title={formatMsg('personalizedPeel')} sourceNode={sourceNode}>
      <div className='d-f ai-c m-30-0 jc-c'>
        {themeList.map((it) => (
          <div onClick={changeThemeKey(it.key)} className={`${styles['theme-box']} d-f fd-c m-0-50`} key={it.key}>
            <div className={`icon-50 d-f ai-c jc-c m-0-auto m-b-30 br-half ${themeKey === it.key ? 'bg-green' : ''}`}>{themeKey === it.key && <div className={styles['success-tag']} />}</div>
            <div className={`${themeKey === it.key ? 'br-10 b-2 bs-primary bc-primary p-6-10' : 'p-6-10 b-2'}`}>
              <Img className={styles['change-theme-img']} src={it.url} isNoTheme />
            </div>
            <div className={`m-t-20 ${themeKey === it.key ? 'color-primary ta-c' : 'ta-c color-primary-text'}`}>{formatMsg(it.title)}</div>
          </div>
        ))}
      </div>
    </Dialog>
  );
});

export default ChangeTheme;
