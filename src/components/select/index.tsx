/**
 * Select 下拉选项父级组件
 * @param titleList 默认传入初始化表头数组
 * @param children 子组件内容
 * @param className 需要修改样式可传其他样式来覆盖
 * @param titleClassName title样式可传其他样式来覆盖
 * @param isArrow 是否点击箭头展开
 */

import {
  Children,
  cloneElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import i18n from 'i18next';
import { BaseReactHtml } from '@/constants';
import { Icon } from '../icon';
import './index.scss';
import { isArray } from '@/utils/tools';
import { useLanguage } from '@/hooks';

interface OptionListProps {
  id: string | number;
  text: string;
}
interface SelectProps extends BaseReactHtml {
  value?: string;
  titleList?: OptionListProps[];
  titleClassName?: string;
  isArrow?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    children,
    titleList,
    className,
    titleClassName,
    isArrow = true,
  } = props;
  const { formatMsg } = useLanguage();

  const [title, setTitle] = useState<OptionListProps[]>([]);
  const [pickTitleItem, setPickTitleItem] = useState({
    id: null,
    curTitle: null,
  });

  const childrenDom = Children.toArray(children);

  // 选中表头
  const handlePickTitle = useCallback(
    (item) => {
      if (item.id === pickTitleItem.id) {
        setPickTitleItem({ id: null, curTitle: null });
      } else {
        setPickTitleItem({ id: item.id, curTitle: item.text });
      }
    },
    [pickTitleItem.id]
  );

  //更新表头 item: 替换的表头 showNum:表头下标
  const updateTitle = (item, showNum: string) => {
    setTitle((tl) =>
      tl.map((it, i) => {
        if (`${i}` === showNum) {
          return { ...item, id: `${showNum}` };
        }
        return it;
      })
    );
    setPickTitleItem({ id: null, curTitle: null });

    //保留上次进入选择的数据
    // title[showNum].text = item.text;
    // setTitle([...title]);
    // setPickTitleItem({ id: null, curTitle: null });
  };

  //点击蒙层收起下拉框
  const handleClose = () => {
    setPickTitleItem({ id: null, curTitle: null });
  };

  // 合并表头类名属性
  const mergeClassName = useMemo(() => {
    let csn = 'title-box';
    if (className) {
      csn = `${csn} ${className}`;
    }
    return csn;
  }, [className]);

  // 合并title类名属性
  const mergeTitleClassName = useMemo(() => {
    let csn = 'title-item';
    if (titleClassName) {
      csn = `${csn} ${titleClassName}`;
    }
    return csn;
  }, [titleClassName]);

  useEffect(() => {
    if (isArray(titleList)) {
      setTitle(titleList);
    }
  }, [titleList]);

  return (
    <div className='select-box'>
      <div className={`${mergeClassName}`}>
        {title.map((item) => (
          <div
            key={item.text}
            className={`${mergeTitleClassName} ${isArrow ? 'jc-c' : 'jc-sb'}`}
            onClick={() => handlePickTitle(item)}
          >
            <div>{formatMsg(item?.text)}</div>
            {isArrow ? (
              <Icon
                className='arrow-icon'
                name={pickTitleItem.id === item.id ? 'rect-up' : 'rect-down'}
              />
            ) : (
              <div className='btnCon p-a left-600'>
                {i18n.t('switchChannel')}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`overlay ${pickTitleItem.id !== null ? 'overlay-show' : ''}`}
        onClick={handleClose}
      />
      {childrenDom.map((dom: any) =>
        cloneElement(dom, {
          updateTitle,
          expandId: pickTitleItem.id,
        })
      )}
    </div>
  );
});
