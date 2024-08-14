/**
 * Option 该组件下拉选项list面板封装
 * @param showNum 是第几个头部的展开面板 对应 select组件 title数组下标
 * @param options 组件下拉选项内容
 * @param defaultId 默认选中项的id
 * @param updateTitle 接受父级更新title的函数
 * @param expandId 控制展开哪个选项面板
 * @param className 需要修改样式可传其他样式来覆盖
 * @param btnClass 选项按钮得样式
 * @param onClick 点击调用外部函数
 * @param isBorder title是否有下边框
 */

import { memo, useCallback, useMemo, useState } from 'react';
import { BaseReactHtml, styleOptions } from '@/constants';
import { Icon } from '@/components';
import './index.scss';
import { useLanguage } from '@/hooks';

interface OptionListProps {
  id: string | number;
  text: string;
}
interface OptionProps extends BaseReactHtml {
  btnClass?: string;
  showNum: string | number;
  options?: OptionListProps[];
  defaultId?: string | number;
  updateTitle?: Function;
  expandId?: string | number;
  onClick?: Function;
  type?: 'btn' | 'normal';
  blockTitle?: string;
  isBorder?: boolean;
}

export const Option = memo((props: OptionProps) => {
  const {
    options = styleOptions,
    className,
    btnClass,
    showNum,
    updateTitle,
    expandId,
    defaultId = null,
    onClick,
    type = 'normal',
    blockTitle,
    isBorder = true,
  } = props;
  const { formatMsg } = useLanguage();

  const [params, setParams] = useState({ id: null, cln: '' });

  // 点击选项后
  const handlePickOption = useCallback(
    (item) => {
      if (item.id !== params.id) {
        setParams({ ...params, id: item.id });
      }
      updateTitle(item, showNum);
      onClick && onClick(item);
    },
    [onClick, params, showNum, updateTitle]
  );

  // 合并类名属性
  const mergeClassName = useMemo(() => {
    let csn = `expand-box ${isBorder ? 'expand-box-border' : ''}`;
    // let csn = 'expand-box expand-box-border';
    if (className) {
      csn = `${csn} ${className}`;
    }
    return csn;
  }, [className, isBorder]);

  return (
    <>
      <div
        className={`${mergeClassName} ${
          showNum === expandId ? 'ep-active' : ''
        }`}
      >
        {type === 'normal' ? (
          options.map((it) => (
            <div
              key={it.id}
              className={`item ${
                it.id === (params.id || defaultId) ? 'item-col' : ''
              }`}
              onClick={() => handlePickOption(it)}
            >
              <div>{formatMsg(it.text)}</div>
              <Icon
                className={`pick-icon ${
                  it.id === (params.id || defaultId) ? 'show-checkicon' : ''
                }`}
                name='checklist'
              />
            </div>
          ))
        ) : (
          <>
            <div className='block-title'>{blockTitle}</div>
            <div className='block-box'>
              {options.map((it) => (
                <div
                  key={it.id}
                  className={`${btnClass || 'btn-item'} ${
                    it.id === (params.id || defaultId) ? 'btn-item-active' : ''
                  }`}
                  onClick={() => handlePickOption(it)}
                >
                  {formatMsg(it.text)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
});
