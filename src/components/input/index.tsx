import {
 memo, useMemo, HTMLAttributes, HTMLInputTypeAttribute, ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState, useRef, useEffect, ReactNode, useCallback, LegacyRef 
} from 'react';
import { BaseReactHtml } from '@/constants';
import { Icon } from '../icon';
import { Img } from '../img';
import './index.scss';

interface InputProps extends BaseReactHtml {
  placeholder?: string;
  defaultValue?: string | number;
  name?: string;
  pattern?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  value?: string | number;
  type?: HTMLInputTypeAttribute | 'textarea';
  rows?: number;
  inputAlign?: 'left' | 'center' | 'right';
  leftIcon?: string;
  leftIconSize?: string | number;
  afterfix?: ReactNode;
  rightIcon?: string;
  rightIconSize?: string | number;
  clearable?: boolean;
  clearIcon?: string;
  autofocus?: boolean;
  formatter?: Function;
  autosize?: boolean | { maxHeight: number; minHeight: number };
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClear?: Function;
  onClickInput?: Function;
  onClickLeftIcon?: Function;
  onClickRightIcon?: Function;
  onClick?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const Input = memo((props: InputProps & Omit<HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>, 'onChange' | 'onBlur' | 'onFocus' | 'onClick'>) => {
  const {
 className, type = 'text', rows, inputAlign, value, onChange, maxLength, defaultValue, clearable, clearIcon = 'close', autosize, formatter, afterfix, ...rest 
} = props;
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState<string | number>('');
  const [inputType, setInputType] = useState(type);
  const isDefault = useRef<boolean>(true);

  const mergeClassName = useMemo(() => {
    let cs = 'bx-input';
    if (className) {
      cs = `${cs} ${className}`;
    }
    return cs;
  }, [className]);

  useEffect(() => {
    if (type === 'textarea' && autosize) {
      const textarea: any = inputRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        let height = textarea?.scrollHeight;

        if (typeof autosize === 'object') {
          const { maxHeight, minHeight } = autosize;
          if (maxHeight !== undefined) {
            height = Math.min(height, maxHeight);
          }
          if (minHeight !== undefined) {
            height = Math.max(height, minHeight);
          }
        }
        if (height) {
          textarea.style.height = `${height}px`;
        }
      }
    }
  }, [inputValue, type, autosize]);

  const handleChange = () => {
    // if (e?.target?.value?.length > 4) return;
    // console.log(12);
  };

  const updateValue = useCallback(
    (value: any) => {
      let val = value;

      // 格式化数据
      if (formatter) {
        val = formatter(val);
      }

      if (inputRef?.current?.value !== val) {
        inputRef.current.value = val || '';
      }
      setInputValue(val);
    },
    [formatter]
  );

  useEffect(() => {
    if (isDefault?.current && !value) {
      if (defaultValue || defaultValue === 0) {
        updateValue(defaultValue);
      }
      isDefault.current = false;
    } else {
      // 支持外部直接修改value
      updateValue(value);
      if (isDefault?.current) isDefault.current = false;
    }
  }, [defaultValue, value, updateValue]);

  const handleInput: any = useCallback(
    (event: Event) => {
      let val: any = (event.target as any).value;
      if (type === 'number') {
        val = `${val}`.replace(/\D/g, '');
      }
      if (maxLength && val.length > Number(maxLength)) {
        val = val.slice(0, Number(maxLength));
      }
      updateValue(val);
      onChange && onChange(val);
    },
    [maxLength, onChange, updateValue, type]
  );

  // 清除当前出入框的内容
  const cleanValue = () => {
    updateValue(null);
    onChange && onChange(null);
    setInputValue(null);
  };

  // 后缀节点
  const afterfixNode = () => {
    if (afterfix) {
      return afterfix;
    }
    return <></>;
  };

  // 右侧图标
  const rightIcon = () => {
    if (!inputValue) return <></>;
    let picon = <></>;
    let cleanI = <></>;
    // 密码时的图标展示
    if (type === 'password') {
      picon = (
        <div
          className='d-f ai-c jc-c flex-1 m-l-10'
          onClick={() => {
            if (inputType === 'password') {
              setInputType('text');
            } else {
              setInputType('password');
            }
          }}
        >
          {inputType === 'password' ? (
            <Img className='input-psd-hiddle' src='/login/eye-1.png' isImgLayzed={false} />
          ) : (
            <div className='input-password-show d-f ai-c br-half'>
              <div className='br-half m-0-auto' />
            </div>
          )}
        </div>
      );
    }
    // 清除按钮
    if (clearable) {
      cleanI = (
        <div className='input-clear d-ib ta-c br-half' onClick={cleanValue}>
          <Icon className='input-clear-icon va-m o-none' name={clearIcon} />
        </div>
      );
    }
    return (
      <div className='input-addfix p-a d-f ai-c jc-end'>
        {cleanI}
        {picon}
      </div>
    );
  };

  // 处理数字输入框的粘贴事件
  const handlePaste = (e) => {
    if (type === 'number') {
      e.preventDefault();
      // 获取当前光标的位置
      let index = inputRef?.current?.selectionStart;
      if (typeof index !== 'number') {
        index = `${inputValue}`.length;
      }
      if (typeof index === 'number') {
        // 获取粘贴数据对象
        const clipboardData = e?.clipboardData || window?.clipboardData || e?.originalEvent?.clipboardData;
        // 获取粘贴的数据
        const pasteData = clipboardData?.getData('text/plain');
        let val;
        if (pasteData) {
          val = `${pasteData}`.replace(/\D/g, '');
          // 如果input本来就有值就做拼接
          if (inputValue) {
            val = `${inputValue}`.slice(0, index) + val + `${inputValue}`.slice(index);
          }
          updateValue(val);
          onChange && onChange(val);
        }
      }
    }
  };

  return (
    <>
      {type === 'textarea' ? (
        <textarea
          ref={inputRef as LegacyRef<HTMLTextAreaElement>}
          value={inputValue || ''}
          onChange={handleChange}
          className={mergeClassName}
          style={{
            textAlign: inputAlign,
            // height: `${Number(rows) * 24}px`,
          }}
          rows={rows}
          maxLength={maxLength}
          onInput={handleInput}
          {...rest}
        />
      ) : (
        <input
          ref={inputRef as LegacyRef<HTMLInputElement>}
          type={inputType}
          value={inputValue || ''}
          onChange={handleChange}
          className={mergeClassName}
          maxLength={maxLength}
          style={{ textAlign: inputAlign }}
          onInput={handleInput}
          onPaste={handlePaste}
          {...rest}
        />
      )}
      {afterfixNode()}
      {rightIcon()}
    </>
  );
});
