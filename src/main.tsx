import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { routes } from '@/routes';
import { flexibleFn } from '@/utils/flexible';
import { lsGetItem } from '@/utils/localStorage';
import zhCN from '../public/locale/zh-cn.json';
import zhHK from '../public/locale/zh-hk.json';
import en from '../public/locale/en.json';
import CustomFunction from '@/utils/global';
import '@nutui/nutui-react/dist/style.css';
import '@/styles/global.scss';
import '@/styles/animate.scss';
import '@/styles/font.scss';
import '@/styles/boxLayout.scss';
import '@/styles/boxSize.scss';
import '@/styles/color.scss';
import '@/styles/overrides.scss';
/**
 * @description: 全局网络钩子函数
 * @return {*}
 */
CustomFunction();
// 设置多语言 接口请求头 命名
const resources = {
  'zh-TW': {
    translation: zhHK,
  },
  'zh-CN': {
    translation: zhCN,
  },
  en: {
    translation: en,
  },
};

// 初始化多语言包 默认繁体
i18n.use(initReactI18next).init({
  resources,
  lng: lsGetItem('language') || 'zh-TW',
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;

// 开发环境增加调试工具
if (process.env.NODE_ENV === 'development') {
  let vc = null;
  const script: HTMLScriptElement | null = document.createElement('script');
  if (script) {
    script.setAttribute('src', './commonModule/vconsole.min.js');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('async', 'async');
    script.setAttribute('defer', 'defer');
    script.setAttribute('charset', 'URT-8');
    script.onload = () => {
      const VConsole = window?.VConsole;
      if (VConsole && !vc) {
        // vc = new VConsole();
      } else {
        vc = null;
      }
    };
    document.body.append(script);
  }
}

const container = document.getElementById('root');

const root = createRoot(container as HTMLDivElement);

// 适配
flexibleFn(window, window['lib'] || (window['lib'] = {}));

root.render(
  <React.Suspense fallback={<></>}>
    <RouterProvider router={createHashRouter(routes)} />
  </React.Suspense>
);

