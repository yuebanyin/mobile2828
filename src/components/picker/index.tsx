import { memo, useEffect, useState, useCallback } from 'react';
import PickerDom, { PickerProps, PickerOption } from './Picker';
import { isArray, isNoEmpty } from '@/utils/tools';
import { Icon } from '../icon';
import './index.scss';

const SN = memo(({ open, labelClassName, label, value, placeholder }: any) => (
  <div className={`bx-picker-label o-none ${labelClassName}`}>
    {label && <div>{label}</div>}
    <div className={`bx-picker-value ${label && 'pl-50'} oe`}>
      <div className={value ? 'oe' : 'bx-picker-value-placeholder'}>
        {value || placeholder}
      </div>
      <Icon
        className={`${
          open && 'translate-r-180'
        } bx-picker-value-icon color-assist w-50 h-24`}
        name='rect-down'
      />
    </div>
  </div>
));

export const Picker = memo(
  (
    props: PickerProps & {
      label?: string;
      value?: string | any[] | number;
      defaultValue?: any[];
      labelClassName?: string;
      placeholder?: string;
    }
  ) => {
    const {
      defaultValueData,
      label,
      sourceNode,
      listData,
      onChange,
      labelClassName,
      onConfirm,
      placeholder,
      value,
      defaultValue,
      ...rest
    } = props;
    const [valueText, setValueText] = useState('');

    useEffect(() => {
      if (value && valueText) return;
      let dv = defaultValueData || defaultValue;
      if (
        isArray(dv) &&
        isNoEmpty(dv) &&
        isArray(listData) &&
        isNoEmpty(listData)
      ) {
        let desc = null;
        let dvalue = [];
        listData.forEach((it: any) => {
          if (it.value === dv[0]) {
            desc = it.text;
            dvalue.push({ text: it.text, value: it.value });
            if (
              dv.length > 1 &&
              isArray(it.children) &&
              isNoEmpty(it.children)
            ) {
              it.children &&
                it.children.forEach((item: PickerOption) => {
                  if (item.value === dv[1]) {
                    desc += item.text;
                    dvalue.push({ text: item.text, value: item.value });
                  }
                });
            }
          }
        });
        if (typeof onChange === 'function') {
          onChange(dvalue);
        }
        setValueText(desc);
        dv = null;
        dvalue = null;
      }
    }, [defaultValueData, listData, onChange, defaultValue, value, valueText]);

    // form 表单直接修改值
    useEffect(() => {
      if (value && Array.isArray(value)) {
        let desc = '';
        value.forEach((it) => {
          if (it?.text) {
            desc += it.text;
          }
        });
        setValueText(desc);
      }
    }, [value]);

    // 确定
    const confirmPicker = (_: (string | number)[], options: PickerOption[]) => {
      let desc = '';
      options.forEach((option: any) => {
        desc += option.text;
      });
      setValueText(desc);
      if (typeof onChange === 'function') {
        onChange(options.map((it) => ({ value: it.value, text: it.text })));
      }
      if (typeof onConfirm === 'function') {
        onConfirm(options);
      }
    };

    const sn = useCallback(
      (open) => (
        <SN
          label={label}
          labelClassName={labelClassName}
          value={valueText}
          placeholder={placeholder}
          open={open}
        />
      ),
      [label, labelClassName, valueText, placeholder]
    );

    return (
      <PickerDom
        value={value}
        listData={listData}
        defaultValueData={defaultValue}
        onConfirm={confirmPicker}
        sourceNode={sourceNode || sn}
        {...rest}
      />
    );
  }
);
