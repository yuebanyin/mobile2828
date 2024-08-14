/**
 * Badge 该组件是徽标封装
 * @param className 徽标需要修改样式可传其他样式来覆盖
 * @param value 徽标数值
 * @param valueClassName value的样式修改
 * @param maxValue value最大值默认99
 * @param dot 只显示红点
 * @param children 子节点
 * @param rightTopSolt 自定义右上角插槽
 */

import { ReactNode, memo, useMemo } from 'react';
import './index.scss';

interface BadgeProps {
    className?:string
    value?:string|number
    valueClassName?:string
    maxValue?:number
    dot?:boolean
    children?:ReactNode
    rightTopSolt?:ReactNode
}

export const Badge = memo((props: BadgeProps) => {
    const {
        className, value = 0, valueClassName, maxValue = 99, children, dot = false, rightTopSolt
    } = props;

    //整合样式
    const mergeClassName = useMemo(() => `bx-badge ${className || ''}`, [className]);

    //数字或文字节点
    const numNode = useMemo(() => {
        if (value) {
            let numClassName = 'bx-badge-num';
            if (value.toString().length >= 3) {
                numClassName = `${numClassName} bx-badge-f-26`;
            } else {
                numClassName = `${numClassName} bx-badge-f-28`;
            }
            numClassName = `${numClassName} ${valueClassName || ''}`;
            if (typeof value === 'number') {
                const cn = value as number;
                if (cn <= 0) {
                    return '';
                }
                return (<div className={numClassName}>{`${cn > maxValue ? `+${cn - 1}` : cn}`}</div>);
            } 
            return (<div className={numClassName}>{value}</div>);
        }
        return '';
    }, [value, maxValue, valueClassName]);

    //构建右上角节点
    const rigtopNode = useMemo(() => {
        if (rightTopSolt) {
            return rightTopSolt;
        }
        if (dot) {
            return (
              <div className='bx-badge-dot' />
            );
        } 
        return (
          <>
            { numNode }
          </>
        );
    }, [dot, numNode, rightTopSolt]);

    return (
      <>
        <div className={mergeClassName}>
          {children}
          {rigtopNode}
        </div>
      </>
    );
});
