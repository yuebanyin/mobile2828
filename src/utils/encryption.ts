import md5 from 'js-md5';
import CryptoJs from 'crypto-js';
import { aesKey } from '@/constants';

// 定义一个随机串
const SecretKey = 'AS54D4D54D5FQ5A6SDA';

/**
 * 使用MD5加密请求参数
 * @param data 要加密的数据
 * @param timeStamp 时间戳（可以不传，不传则不参与加密）
 * @returns 加密后的数据
 */
function encryptionMeans(data: Record<string, any>, timeStamp?: number) {
  // 定义一个字符串存放数据加密后的串
  let sign = '';
  // 按照ASCII码对对象的key进行排序
  let keysArr: null | any[] = Object.keys(data).sort();
  for (let i = 0, len = keysArr.length; i < len; i += 1) {
    const key = keysArr[i];
    const value = data[key];
    // 只有value 有值得情况下才会进行拼接 0 fasle
    if (value === false || value === 0 || value) {
      sign += `&${key}=${value}`;
    }
  }
  keysArr = null;
  // 加密
  sign = md5(sign.slice(1) + SecretKey + timeStamp);
  return { ...data, sign };
}

/**
 * 使用AES加密请求参数 ECB
 * @param data 要加密的数据
 * @param timeStamp 时间戳（可以不传，不传则不参与加密）
 * @returns 加密后的数据
 */
function encryptionEcbMeans(data: string) {
  const key = CryptoJs.enc.Utf8.parse(aesKey);
  const datas = CryptoJs.enc.Utf8.parse(data);
  const encrypted = CryptoJs.AES.encrypt(datas, key, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * 使用AES解密请求参数 ECB
 * @param data 要加密的数据
 * @param timeStamp 时间戳（可以不传，不传则不参与加密）
 * @returns 加密后的数据
 */
function decryptEcbMeans(code: string) {
  const key = CryptoJs.enc.Utf8.parse(aesKey);
  const encrypted = CryptoJs.AES.decrypt(code, key, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7,
  });
  return CryptoJs.enc.Utf8.stringify(encrypted).toString();
}

export { encryptionMeans, encryptionEcbMeans, decryptEcbMeans };
