/**
 * Form 基于UI库封装，主要是修改样式 使用方式以及Api同UI库使用方式
 */
import {
 cloneElement, ContextType, ReactElement, Component 
} from 'react';
import { BaseReactHtml, BaseFormField, Obj } from '@/constants';
import { FormItemContext } from './formItemContext';
import './index.scss';

export interface FormItemProps extends BaseReactHtml, BaseFormField {
  classname?: string;
  labelClassname?: string;
  controllClassName?: string;
  errorMessageAlign?: 'left' | 'center' | 'right';
  showErrorLine?: boolean;
  showErrorMessage?: boolean;
  initialValue?: string | boolean | any[] | Obj | number;
  required?: boolean;
  colon?: boolean;
  noStyle?: boolean;
  type?: null | 'card';
}

export class FormItem extends Component<FormItemProps> {
  //    const {
  //   children, name, initialValue, label, rules = [{ required: false, message: '' }], labelClassname, controllClassName, colon = true, classname, noStyle, type
  //  } = this.props || {};

  // eslint-disable-next-line react/static-property-placement
  static contextType: any = FormItemContext;

  // eslint-disable-next-line react/static-property-placement
  declare context: ContextType<typeof FormItemContext>;

  private cancelRegister: any;

  private isInitialValue = false;

  componentDidMount() {
    // 注册组件实例到FormStore
    const { registerField } = this.context;
    // eslint-disable-next-line react/destructuring-assignment
    this.cancelRegister = registerField && registerField(this);
  }

  componentWillUnmount() {
    if (this.cancelRegister) {
      this.cancelRegister();
    }
  }
  // const formItemRef = useRef({});
  // formItemRef.current = props;

  //  const { registerField, getFieldValue, setFieldsValue } = useContext(FormItemContext);
  //  let isInitialValue = false;

  // useEffect(() => {
  //   // 在form class类中保存该组件
  //   const re = registerField({ props: formItemRef.current });
  //   return () => {
  //     if (typeof re === 'function') {
  //       // 在form class类中清除该组件
  //       re();
  //     }
  //   };
  // }, [registerField]);

  // 给children 组件添加value和onChange属性
  getControlled = (child: ReactElement) => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name, initialValue } = this.props;
    const type = (child as any).type.NAME;
    // 获取默认值
    const defaultValue = initialValue || (child as any).props?.defaultValue || (child as any).props?.value;

    if (defaultValue && !this.isInitialValue) {
      // 赋值默认值
      setFieldsValue && setFieldsValue({ [name]: defaultValue });
      this.isInitialValue = true;
    }
    return {
      value: getFieldValue && getFieldValue(name),
      defaultValue,
      onChange: (e: any) => {
        const originOnChange = (child as any).props.onChange;
        if (originOnChange) {
          originOnChange(e);
        }
        let newValue = e;
        switch (type) {
          case 'checkbox':
            newValue = e?.target?.value;
            break;
          default:
        }
        setFieldsValue({ [name]: newValue });
      },
    };
  };

  onStoreChange = () => {
    this.forceUpdate();
  };

  formitemClassName = () => {
    const { type, classname, noStyle } = this.props;
    let cs = 'bx-form-item';
    if (type) {
      cs = `bx-form-item-${type}`;
    }
    if (classname) {
      cs = `${cs} ${classname}`;
    }
    if (noStyle) {
      cs = classname || '';
    }
    return cs;
  };

  render() {
    const {
 children, label, rules = [{ required: false, message: '' }], colon = true, type, labelClassname, controllClassName 
} = this.props;
    const formitemClassName = this.formitemClassName();
    // 只获取第一个节点（注意只渲染第一个节点）
    const oneDom = Array.isArray(children) ? children[0] : children;

    // 给子节点添加props
    const controlleNode = cloneElement(oneDom, this.getControlled(oneDom));

    return (
      <div className={formitemClassName}>
        {label && (
          <>
            {rules.length > 0 && rules[0].required && <i className={`bx-form-item-${type ? `${type}-` : ''}label-required`}>*</i>}
            <div className={`bx-form-item-${type ? `${type}-` : ''}label ${labelClassname}`}>{label}</div>
            {colon && ':'}
          </>
        )}
        <div className={`bx-form-item-controll ${controllClassName}`}>{controlleNode}</div>
      </div>
    );
  }
}
