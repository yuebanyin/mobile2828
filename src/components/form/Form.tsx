/**
 * Form 基于UI库封装，主要是修改样式 使用方式以及Api同UI库使用方式
 */
import { FC, memo, useMemo } from 'react';
import { BaseReactHtml, Optional, BaseForm } from '@/constants';
import { FormItem } from './FormItem';
import { FormItemContext } from './formItemContext';
import { useForm } from '@/hooks';
import './index.scss';

interface FormProps extends BaseReactHtml, BaseForm {}

type FormType = Omit<Optional<FormProps>, 'Item' | 'useForm'>;

// interface FormItemProps extends BaseReactHtml, BaseFormField {
//   classname?: string;
//   labelClassname?: string;
//   controllClassName?: string;
//   errorMessageAlign?: 'left' | 'center' | 'right';
//   showErrorLine?: boolean;
//   showErrorMessage?: boolean;
//   initialValue?: string | boolean | any[] | Obj;
//   required?: boolean;
//   colon?: boolean;
//   noStyle?: boolean;
//   type?: null | 'card';
// }

// export const FormItem = memo(
//   (props: FormItemProps) => {
//     const {
//  children, name, initialValue, label, rules = [{ required: false, message: '' }], labelClassname, controllClassName, colon = true, classname, noStyle, type
// } = props;
//     const formItemRef = useRef();

//     const { registerField, getFieldValue, setFieldsValue } = useContext(FormItemContext);
//     let isInitialValue = false;

//     useEffect(() => {
//       // 在form class类中保存该组件
//       const re = registerField({ props });
//       return () => {
//         if (typeof re === 'function') {
//           // 在form class类中清除该组件
//           re();
//         }
//       };
//     }, [props, registerField]);

//     // 给children 组件添加value和onChange属性
//     const getControlled = (child: ReactElement) => {
//       // const { getFieldValue, setFieldsValue } = context;
//       const type = (children as any).type.NAME;
//       // 获取默认值
//       const defaultValue = initialValue || (child as any).props?.defaultValue || (child as any).props?.value;
//       if (defaultValue && !isInitialValue) {
//         // 赋值默认值
//         setFieldsValue({ [name]: defaultValue });
//         isInitialValue = true;
//       }
//       return {
//         value: getFieldValue(name),
//         defaultValue: getFieldValue(name),
//         onChange: (e: any) => {
//           const originOnChange = (child as any).props.onChange;
//           if (originOnChange) {
//             originOnChange(e);
//           }
//           let newValue = e;
//           switch (type) {
//             case 'checkbox':
//               newValue = e?.target?.value;
//               break;
//             default:
//           }
//           setFieldsValue({ [name]: newValue });
//         },
//       };
//     };

//     const formitemClassName = useMemo(() => {
//       let cs = 'bx-form-item';
//       if (type) {
//         cs = `bx-form-item-${type}`;
//       }
//       if (classname) {
//         cs = `${cs} ${classname}`;
//       }
//       if (noStyle) {
//         cs = classname || '';
//       }
//       return cs;
//     }, [classname, noStyle, type]);

//     // 只获取第一个节点（注意只渲染第一个节点）
//     const oneDom = Array.isArray(children) ? children[0] : children;

//     // 给子节点添加props
//     const controlleNode = cloneElement(oneDom, getControlled(oneDom));

//     return (
//       <div className={formitemClassName} ref={formItemRef}>
//         {label && (
//           <>
//             {rules.length > 0 && rules[0].required && <i className={`bx-form-item-${type ? `${type}-` : ''}label-required`}>*</i>}
//             <div className={`bx-form-item-${type ? `${type}-` : ''}label ${labelClassname}`}>{label}</div>
//             {colon && ':'}
//           </>
//         )}
//         <div className={`bx-form-item-controll ${controllClassName}`}>{controlleNode}</div>
//       </div>
//     );
//   },
//   (pre, cur) => {
//     console.log({ pre, cur });
//     if (pre.rules !== cur.rules) {
//       return false;
//     }
//     return true;
//   }
// );

export const FormDemo = memo((props: FormType) => {
  const {
 className, children, form = {}, starPositon, onFinish, onFinishFailed, ...rest 
} = props;
  const [formIns] = useForm();

  let formInstance: any = {};

  if (Object.keys(form).length !== 0) {
    formInstance = form;
  } else {
    formInstance = formIns;
  }

  formInstance.starPositon = starPositon;
  const { setCallback, submit, resetFields } = formInstance;

  setCallback({
    onFinish,
    onFinishFailed,
  });

  const mergeClassName = useMemo(() => {
    let cs = 'bx-form';
    if (className) {
      cs = `${cs} ${className}`;
    }
    return cs;
  }, [className]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      onReset={(e) => {
        e.preventDefault();
        resetFields();
      }}
      className={mergeClassName}
      {...rest}
    >
      <FormItemContext.Provider value={formInstance}>{children}</FormItemContext.Provider>
    </form>
  );
}) as unknown as FC<FormType> & {
  useForm: typeof useForm;
  Item: typeof FormItem;
};

FormDemo.useForm = useForm;
FormDemo.Item = FormItem;
