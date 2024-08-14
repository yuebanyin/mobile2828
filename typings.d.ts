declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.mp3';
declare module '*.wav';
declare module '*.mp4';
declare module '*.avi';
declare module '*.ogg';
declare interface Window {
  flexible: Record<string, any>;
  eruda: Record<string, any>;
  VConsole: any;
  clipboardData: any;
  platform: string;
}

/**
 * @description: String扩展
 */
declare interface String {
  formatLogList(value);
  formatList(value);
  splice(index: number, remove: number, str: string);
  /**
   * @description: 转成base64
   * @return {*}
   */
  toBase64();
  /**
   * @description: base64转string
   * @return {*}
   */
  frombase64();
  /**
   * @description: 转成md5
   * @return {*}
   */
  toMD5(low: boolean);
  
  toFixedEx(fixed:number)
}

declare interface Number {
  toFixedEx(fixed:number);
}

/**
 * @description: Date扩展
 */
declare interface Date {
  Format(fmt: string): string;
}

/**
 * 日志接口
 */
interface clog {
  error(str, ...args);
  warn(str, ...args);
  info(str, ...args);
}

/**
 * 日志
 */
declare let clog: clog;
