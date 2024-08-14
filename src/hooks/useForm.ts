import { useRef } from 'react';
import Schema from 'async-validator';
import {
 Obj, Callbacks, FormInstance, FieldEntity 
} from '@/constants';
/**
 * 用于存储表单的数据
 */
class FormStore {
  private store: Obj = {}; // 存放表单中所有的数据 eg. {password: "ddd",username: "123"}

  private fieldEntities: FieldEntity[] = []; // 所有的组件实例

  // 成功和失败的回调
  private callbacks: Callbacks = {};

  private errList: any[] = [];

  constructor() {
    this.callbacks = {
      // eslint-disable-next-line no-unused-vars
      onFinish: (_v: any) => {},
      onFinishFailed: () => {},
    };
  }

  /**
   * 注册组件实例
   * @param field
   */
  registerField = (field: any) => {
    this.fieldEntities.push(field);
    // console.log('r=========', { field }, this.store);
    // 获取当前name
    const name = field?.props?.name;
    // 获取当前默认值
    const defaultValue = field?.props?.initialValue;
    // 获取当前表单保存的值
    const curValue = this.store[name];
    // 首先判断是否有name
    if (name) {
      // 判断当前组件是否有给默认值
      if (curValue || typeof curValue === 'boolean') {
        // 如果该item已存在就不做操作
        this.store[name] = curValue;
      } else if (defaultValue || typeof defaultValue === 'boolean') {
        this.store[name] = defaultValue;
      } else {
        this.store[name] = '';
      }
    }
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== field);
      delete this.store[name];
    };
  };

  getFieldValue = (name: string) => this.store[name];

  getFieldsValue = () => this.store;

  /**
   * 存储组件数据
   * @param newStore { [name]: newValue }
   */
  setFieldsValue = (newStore: Obj) => {
    this.store = {
      ...this.store,
      ...newStore,
    };

    // console.log(this.store);
    this.fieldEntities.forEach((enetity: FieldEntity) => {
      const { name } = enetity.props;
      Object.keys(newStore).forEach((key) => {
        if (key === name) {
          enetity.onStoreChange();
        }
      });
    });
  };

  /**
   * 表单校验
   * rules: { required: true, message: '' }
   * descriptor: {
   *    username: {
   *      type: 'string',
   *      required: true,
   *      validator: (rule, value) => {
   *        return /^[a-zA-Z0-9]+$/.test(value)
   *      },
   *    },
   *  }
   */
  validate = () => {
    // const err: any = [];
    this.errList.length = 0;
    return new Promise((resove, reject) => {
      this.fieldEntities.forEach((entity: FieldEntity) => {
        const { name, rules = [] } = entity.props;
        const descriptor: any = {};
        if (rules.length) {
          // 多条校验规则
          if (rules.length > 1) {
            descriptor[name] = [];
            rules.forEach((v: any) => {
              descriptor[name].push(v);
            });
          } else {
            // eslint-disable-next-line prefer-destructuring
            descriptor[name] = rules[0];
          }
        }
        const validator = new Schema(descriptor);

        validator.validate({ [name]: Array.isArray(this.store[name]) ? this.store[name].join('') : this.store[name] }, (errors) => {
          if (errors) {
            // err.push(...errors);
            this.errList.push(...errors);
            // 表单项更新
          }
          entity.onStoreChange();
        });
      });
      if (this.errList.length > 0) return reject(this.errList);
      return resove(this.store);
    });
  };

  setCallback = (callback: Callbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback,
    };
  };

  submit = () => {
    this.validate()
      .then(() => this.callbacks.onFinish?.(this.store))
      .catch((err) => this.callbacks.onFinishFailed?.(err));
    // if (err.length === 0) {
    //   this.callbacks.onFinish?.(this.store);
    // } else if (err.length > 0) {
    //   this.callbacks.onFinishFailed?.(err);
    // }
  };

  resetFields = () => {
    this.errList.length = 0;

    this.fieldEntities.forEach((enetity: FieldEntity) => {
      enetity.onStoreChange();
    });
  };

  getForm = () => ({
    setCallback: this.setCallback,
    registerField: this.registerField,
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    validate: this.validate,
    resetFields: this.resetFields,
    submit: this.submit,
    store: this.store,
    errList: this.errList,
    fieldEntities: this.fieldEntities,
  });
}

export const useForm = (form?: FormInstance) => {
  const formRef = useRef<any>();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
};
