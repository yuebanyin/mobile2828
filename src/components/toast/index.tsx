import { Toast } from '@nutui/nutui-react';
import { Obj } from '@/constants';

// 弹出文字
export const toastText = (t, o?: Obj) => {
  Toast.text(t, { duration: 2, ...o });
};

// 弹出文字 带成功图标
export const toastSuccess = (t, o?: Obj) => {
  Toast.success(t, { duration: 2, ...o });
};

// 弹出文字 带失败图标
export const toastFail = (t, o?: Obj) => {
  Toast.fail(t, { duration: 2, ...o });
};

// 手动隐藏
export const toastHide = () => {
  Toast.hide();
};

// 弹出文字 带loading图标
export const toastLoading = (t, o?: Obj) => {
  Toast.loading(t, { duration: 2, ...o });
};

// 弹出文字 带警告图标
export const toastWarn = (t, o?: Obj) => {
  Toast.warn(t, { duration: 2, ...o });
};
