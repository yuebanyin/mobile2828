/**
 * CellGroup 多对用于Cell的组合组件
 * @param className CellGroup样式修改
 * @param title 描述文件
 * @param titleClassName 描述样式
 * @param borderRadius 是否带圆角
 * @param borderBottom 是否带下分割线
 * @param children 子节点
 */

import { ReactNode, memo, useMemo } from 'react';
import './index.scss';


interface CellGroupProps {
  className?:string
  title?:string|ReactNode
  titleClassName?:string
  borderRadius?: '30' | '50' | '80' //是否带圆角
  borderBottom?:boolean
  shadowShow?:boolean
  shadowClassName?:string
  children?:ReactNode
}

export const CellGroup = memo((props: CellGroupProps) => {
  const {
    className, title, titleClassName, borderRadius, borderBottom = false, shadowShow = false, shadowClassName, children
  } = props;
  const mergeClassName = useMemo(() => {
    let csn = `bx-cellgroup ${className || ''}`;
    csn = `${csn} ${borderRadius ? `bx-cellgroup-${borderRadius}` : ''}`;
    csn = `${csn} ${borderBottom ? 'bx-cellgroup-divider' : ''}`;
    csn = `${csn} ${shadowShow ? (shadowClassName || 'bx-cellgroup-shadow') : ''}`;
    return csn;
  }, [className, borderRadius, borderBottom, shadowShow, shadowClassName]);
  //描述标题
  const titleNode = useMemo(() => {
    if (title) {
      if (typeof title === 'string') {
        return (
          <div className={`bx-cellgroup-title ${titleClassName}`}>
            <span>{title}</span>
          </div>
        );
      }
      return title;
    }
    return '';
  }, [title, titleClassName]);

  return (
    <div className={mergeClassName}>
      {titleNode}
      { children }
    </div>
  );
});
