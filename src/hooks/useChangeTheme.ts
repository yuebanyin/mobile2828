import { useCallback } from 'react';
import { setTheme } from '@/theme/changeTheme';
import { ThemeName } from '@/constants';
import { useGlobalStore } from '@/mobx';
import { lsGetItem } from '@/utils/localStorage';


export const useChangeTheme = () => {
  const { changeState } = useGlobalStore();

  // 修改主题色
  const changeTheme = useCallback(
    (t: ThemeName) => {
      setTheme(t, (t) => changeState('theme', t));
    },
    [changeState]
  );

  // 初始化主题色
  const initTheme = useCallback(() => {
    const localTheme = lsGetItem('theme') || 'blueyellow';
    setTheme(localTheme as ThemeName, (t) => changeState('theme', t));
  }, [changeState]);

  return { changeTheme, initTheme };
};
