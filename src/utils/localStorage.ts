/**
 * getItem
 * @param key  获取 本地存贮key对应的值
 * @returns value
 */
export const lsGetItem = (key: string) => localStorage.getItem(key);
// sessionStorage
export const ssGetItem = (key: string) => sessionStorage.getItem(key);

/**
 * setItem
 * @param key  设置本地存贮key，value
 * @returns 无
 */
export const lsSetItem = (key: string, value: string) => localStorage.setItem(key, value);
//
export const ssSetItem = (key: string, value: string) => sessionStorage.setItem(key, value);

/**
 * setJsonItem
 * @param key  设置本地存贮key，value为json字符串
 * @returns 无
 */
export const lsSetJsonItem = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const ssSetJsonItem = (key: string, value: any) => sessionStorage.setItem(key, JSON.stringify(value));

/**
 * setJsonItem
 * @param key  设置本地存贮key，value为json 对象
 * @returns value
 */
export const lsGetJsonItem = (key: string) => JSON.parse(localStorage.getItem(key) || '{}');

export const ssGetJsonItem = (key: string) => JSON.parse(sessionStorage.getItem(key) || '{}');

/**
 * cleanAll 清空本地存贮
 * @returns value
 */
export const lsCleanAll = () => localStorage.clear();

export const ssCleanAll = () => sessionStorage.clear();
