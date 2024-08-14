import type { Dispatch } from 'react';
import { ThemeName } from '@/constants';

// 手机顶部导航栏背景色
const themeBgObj = {
  blackgold: '#0e0e0e',
  blueyellow: '#fc8220',
  whiteblue: '#6854ee',
};

/**
 * changeStyle 修改样式的变量值的方法
 * @param obj 要修改的主题色的 js 对象
 */
const changeClassName = (className: ThemeName) => {
  try {
    // 获取对应节点设置变量
    (document.querySelector(':root') as HTMLBodyElement).className = `theme-${className}`;
    const metaTheme = document.querySelectorAll('head meta[name=theme-color]');
    if (metaTheme[0] && className && themeBgObj[className]) {
      metaTheme[0].setAttribute('content', themeBgObj[className]);
    }
  } catch (error) {
    //
  }
};

/**
 * setTheme 设置主题色
 * @param themeName 要修改的主题色名称
 */
const setTheme = (themeName: ThemeName, changeStateTheme: Dispatch<ThemeName>) => {
  try {
    // 当前的主题色名称修改为传进来的名称
    localStorage.setItem('theme', themeName);

    // 判断传入的主题色名称是否有误
    const isHaveTheme = ['blueyellow', 'blackgold', 'whiteblue'].includes(themeName);

    // 如果有该配置就直接修改
    if (isHaveTheme) {
      changeClassName(themeName);
      changeStateTheme(themeName);
    } else {
      // 否则使用默认的颜色配置
      localStorage.setItem('theme', 'blueyellow');
      changeClassName('blueyellow');
      changeStateTheme('blueyellow');
    }
  } catch (error) {
    //
  }
};

export { setTheme };
