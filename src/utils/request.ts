import axios from 'axios';
import i18n from 'i18next';
import { lsGetItem, ssGetItem, ssGetJsonItem } from './localStorage';
import { encryptionEcbMeans } from './encryption';
import { toastText } from '@/components';
import { getFormatMsg } from './language';
// import { GetFormatMsg } from './language';

// import { openExpire } from '../Expire';

// 请求头字段映射 
// const languageObj = {
//   zh_hk: 'zh-TW',
//   zh_cn: 'zh-CN',
//   en: 'en'
// };


const noSignApi = [
  '/ApiV1/Client/V2/User/UserScoreInfo',
  '/ApiV1/Client/V2/Home/OnlineConfig',
  '/ApiV1/Client/V2/Home/UserWinLose',
  '/ApiV1/Client/V2/Record/CusBetList',
];

// let intl: null | Record<string, any>;
export const UTObj = {
  UT: '',
};
let isOneTip = false;

// 接口返回的类型
export interface Res {
  data: {
    Code: number;
    Message: string;
    Data: any;
    Count?: number;
    [key: string]: any;
  };
}

// 初始化实例
const service = axios.create({
  baseURL: '/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 组件外多语言使用
// function formatText(key: string, initValue: string) {
//   if (intl) {
//     return intl.formatMessage({ id: key, default: initValue });
//   }
//   return initValue;
// }

// 请求拦截器
service.interceptors.request.use((config) => {
  const autoConfig = { ...config };
  // 请求头添加毫秒级时间戳
  const timeStamp = new Date().getTime();
  autoConfig.headers['time-stamp'] = timeStamp;
  // 在请求头中添加语言字段
  // config.headers['Accept-Language'] = lsGetItem('language') || 'zh-TW'; // 设置语言字段为中文 zh-CN ;English en ;繁體 zh-TW
  config.headers['Accept-Language'] = i18n.language || 'zh-TW'; // 设置语言字段为中文 zh-CN ;English en ;繁體 zh-TW

  console.log('""""""language"""""""""', lsGetItem('language'), i18n.language);
  
  // 判断如果存在data 就对data进行加密
  // if (config?.data) {
  //   autoConfig.data = encryptionEcbMeans(config.data, timeStamp);
  // }
  // 添加token或者用户信息
  if (!UTObj.UT) {
    try {
      const { CurrToken, GameId } = ssGetJsonItem('userInfo') || {};
      if (CurrToken && GameId) {
        UTObj.UT = encryptionEcbMeans(`${CurrToken}.${GameId}`);
      }
    } catch (error) {
      //
    }
  }
  if (UTObj.UT) {
    autoConfig.headers.UT = UTObj.UT;
    // 如果是退出登录接口，就删除UT
    if (autoConfig?.url.indexOf('/Login/LoginOut') !== -1) {
      UTObj.UT = '';
    }
  }
  // 语言
  const language = lsGetItem('language');
  if (language) {
    autoConfig.headers.Language = language;
  }
  return config;
});

// 登录过期封装
const loginExpire = (msg?: string) => {
  console.log(msg);
  // const { CurrToken } = ssGetJsonItem('userInfo') || {};
  // if (!isOneTip && UT && CurrToken) {
  //   UT = '';
  //   isOneTip = true;
  //   openExpire(msg, () => {
  //     isOneTip = false;
  //   });
  // }
  UTObj.UT = '';
};
// confirm({
//   title: formatText('systemPrompt', '系统提示'),
//   content: formatText('expirePrompt', '登录状态已过期，您可以继续留在该页面，或者重新登录'),
//   okText: formatText('afreshLogin', '重新登录'),
//   cancelText: formatText('stayHere', '留在这里'),
//   centered: true,
//   onOk: () => {
// },
// });

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    const code = data?.Code;
    const msg = data?.Message;
    // if (!intl) {
    // intl = getIntl(getLocale());
    // }
    // 如果请求状态是200并且返回的数据中code是210为请求成功   
    if (status === 200) {
      if (code === 210) {
        return Promise.resolve(data);
      }
      //参数异常;
      if ([-2, -3, -4].includes(Number(code))) {
        // 异常情况 多语言展示提示语
        const parseMsg = JSON.parse(msg);        
        const transMsg = getFormatMsg(parseMsg.key, parseMsg?.parm);
        
        // 上面已经抛出错误这里不在做操作
        if (!isOneTip) {
          isOneTip = true;
          toastText(transMsg);          
          setTimeout(() => {
            isOneTip = false;
          }, 2000);
        }
      } else if (code === -999) {
        // 权限校验失败
        const parseMsg = JSON.parse(msg);        
        const transMsg = getFormatMsg(parseMsg.key, parseMsg?.parm || []);
        loginExpire(transMsg);
        // confirm({
        //   title: formatText('systemPrompt', '系统提示'),
        //   content: formatText('jurisdictionFailed', '权限校验失败，请联系管理员'),
        //   okText: formatText('determine', '确定'),
        //   cancelText: formatText('cancel', '取消'),
        //   centered: true,
        // });
      } else if ([-1000, -1001].includes(code)) {
        // token 失效
        const parseMsg = JSON.parse(msg);        
        const transMsg = getFormatMsg(parseMsg.key, parseMsg?.parm);
        loginExpire(transMsg);
      }
    }
    return Promise.reject(response);
  },
  (error: { response: { status: any }; message: string | string[] }) => {
    // axios设置的timeout超过后接口没有返回就会走这里  
    if (!error.response && error?.message.indexOf('timeout') !== -1) {
      // toastText('网络请求超时');
      return Promise.reject(error);
    }
    // 这里只会捕获http请求失败的状态码3x、4x、5x等
    switch (error?.response?.status) {
      // 未登录
      case 401:
        // confirm({
        //   title: formatText('systemPrompt', '系统提示'),
        //   content: formatText('notLoggedIn', '您还未登录，请先登录'),
        //   okText: formatText('goLogin', '去登录'),
        //   cancelText: formatText('goShoppingfirst', '先逛逛'),
        //   centered: true,
        //   onOk: () => {},
        // });
        loginExpire();
        break;
      // token 过期
      case 403:
        loginExpire();
        break;
      // 网络请求不存在
      case 404:
        // message.error(formatText('netNoExist', '网络请求不存在'));
        // toastText('网络请求不存在');
        break;
      // 服务端错误
      case 501:
      case 502:
      case 503:
      case 504:
        // message.error(formatText('serverError', '服务端错误'));
        // toastText('服务端错误');
        break;
      default:
        // message.error(formatText('unknownFailed', '未知错误'));
        break;
    }
    return Promise.reject(error);
  }
);

/**
 * 获取完整访问地址
 * @param url 没有域名的地址
 * @returns 完整访问地址
 */
function getAllUrl(url) {
  const host = ssGetItem('api_host');
  if (url === '/ApiV1/Client/V2/ClientInterface/GameSwitchConfig') return url;
  if (!url || !host) return '';
  return `${host}${url}`;
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url: string, params?: Record<string, any>) {
  const allUrl = getAllUrl(url);
  if (!allUrl) return new Promise(() => {});
  return new Promise((resolve, reject) => {
    service
      .get(allUrl, { params })
      .then((res: Res) => resolve(res))
      .catch((err: Res) => reject(err));
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url: string, params: Record<string, any>) {
  const allUrl = getAllUrl(url);
  if (!allUrl) return new Promise(() => {});
  return new Promise((resolve, reject) => {
    if (!UTObj.UT) {
      try {
        const { CurrToken, GameId } = ssGetJsonItem('userInfo') || {};
        if (!CurrToken || !GameId) {
          if (noSignApi.includes(url)) {
            // 当未登录时，这些接口是不用调用的
            return;
          }
        }
      } catch (error) {
        //
      }
    }
    service
      .post(allUrl, params)
      .then((res: Res) => resolve(res))
      .catch((err: Res) => reject(err));
  });
}

/**
 * postForm方法，对应postForm请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function postForm(url: string, params: Record<string, any>) {
  const allUrl = getAllUrl(url);
  if (!allUrl) return new Promise(() => {});
  // TODO 文件上传需要对参数进行formData 转化，目前还没用到，还未实现
  return new Promise((resolve, reject) => {
    service
      .postForm(allUrl, params)
      .then((res: Res) => resolve(res))
      .catch((err: Res) => reject(err));
  });
}

export { get, post, postForm };
