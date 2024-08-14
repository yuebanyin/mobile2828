/**
 * Form 基于UI库封装，主要是修改样式 使用方式以及Api同UI库使用方式
 */
import { Form as NutForm, FormProps as NutFormProps } from '@nutui/nutui-react';
import { FC, memo } from 'react';
import { Optional } from '@/constants';

type FormType = Omit<Optional<NutFormProps>, 'Item' | 'useForm'>;

export const Form = memo((props: FormType) => {
  const { className, ...rest } = props;

  return <NutForm className={`bx-form-wrap ${className}`} {...rest} />;
}) as unknown as FC<FormType> & {
  Item: typeof NutForm.Item;
  useForm: typeof NutForm.useForm;
};

Form.Item = NutForm.Item;
Form.useForm = NutForm.useForm;
