import { CSSProperties, ReactNode } from 'react';
// ts

// type ItemKey = number | string;

// 换肤
export type ThemeName = 'blueyellow' | 'blackgold' | 'whiteblue' |null;

// 普通对象
export type Obj = Record<string, any>;

// 将某个类型全部变为可选类型
export type Optional<T> = {
  [P in keyof T]?: T[P];
};

// dom节点基本的类型
export interface BaseReactHtml {
  className?: string;
  style?: CSSProperties;
  iconFontClassName?: string;
  iconClassPrefix?: string;
  children?: ReactNode;
}

// form 类型
export interface BaseForm {
  /**
   * 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
   */
  form: any;
  /**
   * label的位置
   * 可选值 top/left/right
   */
  labelPosition: string | number;
  /**
   * 表单分组名称
   */
  formGroupTitle: string;
  starPositon: string;
  /**
   * 表单校验成功回调
   */
  onFinish: Function;
  /**
   * 表单校验失败回调
   */
  onFinishFailed: Function;
  //
  con;
}

interface FormItemRuleWithoutValidator {
  [key: string]: any;
  regex?: RegExp;
  required?: boolean;
  message?: string;
}
interface FormItemRule extends FormItemRuleWithoutValidator {
  validator?: Function;
}

export interface BaseFormField {
  /**
   * 字段名
   */
  name: string;
  /**
   * label 标签的文本
   */
  label?: ReactNode;
  /**
   * 校验规则，设置字段的校验逻辑
   */
  rules?: FormItemRule[];
  /**
   * 是否禁用表单项
   */
  disabled?: boolean;
}

export interface FormInstance {
  registerField: Function;
  getFieldValue: Function;
  getFieldsValue(): Obj;
  setFieldsValue: Function;
  validate: Function;
  resetFields: Function;
  submit: () => void;
  setCallback: Function;
}

export interface FieldEntity {
  onStoreChange: () => void;
  getNamePath: () => string | number;
  props: {
    name: string | number;
    rules?: any[];
    dependencies?: string | number[];
    initialValue?: any;
  };
}
export interface Callbacks {
  onValuesChange?: Function;
  onFinish?: Function;
  onFinishFailed?: Function;
}

export interface DefaultTimeOptions {
  year?: 'numeric' | '2-digit';
  month?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  weekday?: 'long' | 'short' | 'narrow';
  hour12?: boolean;
  timeZoneName?: 'long' | 'short';
  timeZone?: string;
}
