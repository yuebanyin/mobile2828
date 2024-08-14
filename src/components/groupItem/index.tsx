/**
 * GroupItem flex盒子内部子元素横向排列，超过最大宽度默认换行
 * @param data 子元素的数据
 * @param type 'primary' | 'number' | 'img-text' 默认是primary, number 是子元素为数字的时候，img-text是子元素为图文时
 * @param className 单个子元素的样式
 * @param classNameBox 外层盒子的样式
 * @param defaultActiveId 默认要选中的子元素
 * @param valueId 如果需要外部控制选中的时候直接传入该字段
 * @param onItemClick 每个子元素的点击事件
 * @param isActive 是否需要展示选中的样式
 */
import { useMemo, useCallback, useState, useEffect, memo } from 'react';
import { Img } from '../img';
import './index.scss';

export interface QueueDataItem {
  id: number;
  text: string | number;
  key?: string;
  isMR?: number;
  url?: string;
}

interface GroupItemProps {
  data: QueueDataItem[];
  type?: 'primary' | 'number' | 'img-text';
  size?: 'large' | 'normal' | 'small';
  valueId?: number;
  className?: string;
  classNameBox?: string;
  style?: string;
  defaultActiveId?: number;
  isActive?: boolean;
  onItemClick?: Function;
  // onItemClick?: (p?: QueueDataItem) => void;
  isFormatMsg?: boolean;
  loading?: boolean;
  getItemCS?: Function;
}

export const GroupItem = memo((props: GroupItemProps) => {
  const {
    data = [],
    className,
    getItemCS,
    type = 'primary',
    size = 'normal',
    defaultActiveId = 1,
    valueId,
    classNameBox,
    onItemClick,
    isActive = true,
  } = props;
  const [activeId, setActiveId] = useState(defaultActiveId);
  console.log({ valueId, defaultActiveId });

  useEffect(() => {
    // 如果传入valueId 就直接走外部
    if (!valueId) return;
    setActiveId((id) => {
      if (id !== valueId) {
        return valueId;
      }
      return id;
    });
  }, [valueId]);

  // 合并css样式
  const getClassName = useCallback(
    (id: number, i?: number) => {
      let cls = 'queue-item';
      cls = `${cls} queue-item-${type}-${size}`;
      if (activeId === id && isActive) {
        cls = `${cls} queue-item-${type}-${size}-active`;
      }
      if (className) {
        cls = `${cls} ${className}`;
      }
      // 大图文模式下的选中效果
      if (type === 'img-text' && activeId === id && isActive) {
        cls = `${cls} queue-item-${type}-${size}-select`;
      }
      if (getItemCS) {
        return `${cls} ${getItemCS(i)}`;
      }
      return cls;
    },
    [className, type, activeId, isActive, size, getItemCS]
  );

  const mergeBoxClassName = useMemo(() => {
    if (classNameBox) {
      return `queue-box ${classNameBox}`;
    }
    return 'queue-box';
  }, [classNameBox]);

  // const textNode = useCallback((item: QueueDataItem) => <div>{item.text}</div>, []);

  return (
    <div className={mergeBoxClassName}>
      {data.map((item, i) => (
        <div
          onClick={() => {
            if (typeof onItemClick === 'function') {
              // if (!valueId) {
              //   setActiveId(item.id || i);
              // }
              onItemClick(item);
            }
          }}
          // style={{ marginRight: `${item.isMR || 0}px` }}
          key={item.id || i}
          className={getClassName(item.id || i, i)}
        >
          {item.url && (
            <Img
              isNoTheme
              className='m-r-10'
              width='44'
              height='44'
              src={item.url}
            />
          )}
          {item.text}
        </div>
      ))}
    </div>
  );
});
