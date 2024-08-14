/**
 * Tabs （注意：使用方式参考UI组件库，基本保持一致）
 * @param searchList 作为搜索功能时使用
 * @param isCapsule 是否要展示胶囊模式
 * @param type 默认是搜索 可切换tabs
 * @param onClick 单个 title 的点击事件
 * @param activeId 默认要展示的item，不传默认第一个
 * @param direction tabs title 方向，目前仅支持横向，默认是横向，可不传
 * @param onChange tabs title 发生变化的回调函数
 * @param animatedTime tabs children 切换时的动画
 */
/**
 * TabPane 作为tabs 的子组件 （注意：使用方式参考UI组件库，基本保持一致）
 * @param paneKey 组件key
 * @param title tabs 的标题
 */
import {
  memo,
  useCallback,
  useState,
  useMemo,
  ReactNode,
  Children,
  cloneElement,
  useRef,
  useEffect,
  isValidElement,
} from 'react';
import './index.scss';
import { BaseReactHtml } from '@/constants';
import { useLanguage } from '@/hooks';

class Title {
  title = '';

  paneKey = '';

  disabled = false;

  index = 0;
}

interface TabsProps extends BaseReactHtml {
  searchList?: any[];
  isCapsule?: boolean;
  isRectangle?: boolean; // title为实体方形块
  type?: 'search' | 'tabs';
  onClick?: Function;
  activeId?: number | string;
  direction?: 'horizontal' | 'vertical';
  onChange?: Function;
  animatedTime?: number;
  titleClassName?: string;
  titleItemClassName?: string;
  childreClassName?: string;
}

interface TabPaneProps extends BaseReactHtml {
  paneKey: string;
  title: ReactNode;
  childnull?: boolean;
  activeKey?: string | number;
  isActive?: boolean;
  direction?: 'horizontal' | 'vertical';
  isActChildren?: boolean;
}

export const TabPane = memo((props: TabPaneProps) => {
  const { children, direction, className, activeKey, isActive, isActChildren } =
    props;

  const mergeClassName = useMemo(() => {
    if (direction === 'vertical') {
      return `w-full h-full p-b-50 ${className || ''}`;
    }
    return `bx-tabpane w-full d-b ${className || ''}`;
  }, [direction, className]);

  return (
    <div className={mergeClassName}>
      {Children.map(children, (child: any) => {
        const childProps = {
          activekey: activeKey,
          isactive: isActive ? 1 : 0,
        };
        if (!isValidElement(child)) return <></>;
        if (isActChildren) {
          return isActive ? cloneElement(child, childProps as any) : '';
        }
        return cloneElement(child, childProps as any);
      })}
    </div>
  );
});

export const Tabs = memo((props: TabsProps) => {
  const {
    searchList,
    type = 'search',
    onClick,
    isCapsule,
    isRectangle,
    children,
    activeId: actId = null,
    onChange,
    direction = 'horizontal',
    animatedTime = 300,
    className,
    titleClassName,
    titleItemClassName,
    childreClassName,
  } = props;
  const { formatMsg } = useLanguage();
  const [activeId, setActiveId] = useState<string | number>(0);
  const [currentItem, setCurrentItem] = useState<Title>({ index: 0 } as Title);
  const titles = useRef<Title[]>([]);

  useEffect(() => {
    if (actId || actId === 0) {
      setActiveId(actId);
    }
  }, [actId]);

  // 初始化默认tabpane
  useEffect(() => {
    if (type === 'tabs') {
      let currentIndex = 0;
      titles.current = [];
      Children.forEach(children, (child, idx) => {
        // 如果有子节点
        if (isValidElement(child)) {
          const title = new Title();
          const childProps = child?.props;
          if (childProps?.title || childProps?.paneKey) {
            title.title = childProps?.title;
            title.paneKey = childProps?.paneKey || idx;
            title.disabled = childProps?.disabled;
            title.index = idx;
            if (title.paneKey === actId) {
              currentIndex = idx;
            }
          }
          titles.current.push(title);
        }
      });
      setCurrentItem(titles.current[currentIndex]);
    }
  }, [children, actId, type]);

  // 点击事件
  const onInnerClick = (data) => () => {
    if (data?.id === activeId) return;
    setActiveId(data?.id);
    if (typeof onClick === 'function') onClick(data);
  };

  // 控制外层的样式
  const mergeTitleClassName = useMemo(() => {
    let cs = '';
    if (type === 'search') {
      if (isCapsule) {
        cs = 'd-f ai-c jc-sb bx-search-capsule';
      } else {
        cs = 'd-f ai-c jc-sb bx-search-underline';
      }
    } else if (type === 'tabs') {
      if (isCapsule) {
        cs =
          direction === 'vertical'
            ? 'bx-tabs-capsule-vertical'
            : 'd-f ai-c jc-sb bx-search-capsule';
      } else {
        cs =
          direction === 'vertical'
            ? 'bx-tab-underline-vertical'
            : 'd-f ai-c jc-sb bx-tab-underline';
      }
    }
    if (titleClassName) {
      cs = `${cs} ${titleClassName}`;
    }
    return cs;
  }, [type, titleClassName, isCapsule, direction]);

  // 最外层样式
  const mergeWrapClassName = useMemo(() => {
    let csn = 'bx-tabs-wrap';
    if (direction === 'vertical') {
      csn = 'd-f o-none w-full flex-1';
    }
    return `${csn} ${className}`;
  }, [className, direction]);

  // 控制外层的样式
  const mergeTitleItemClassName = useCallback(
    (isAct: boolean) => {
      let cs = '';
      // 是否是垂直展示
      const isV = direction === 'vertical';
      if (type === 'search') {
        if (isCapsule) {
          cs = isAct
            ? 'flex-1 br-0 ta-c wds-sm-title bx-search-capsule-title-active'
            : 'wds-sm-title br-0 flex-1 bx-search-capsule-title ta-c';
        } else {
          cs = isAct
            ? 'flex-1 ta-c bx-search-underline-title-active'
            : 'flex-1 ta-c  bx-search-underline-title';
        }
      } else if (type === 'tabs') {
        // tabs
        if (isCapsule) {
          cs = `flex-1 br-0 ta-c wds-sm-title bx-search-capsule${
            isV ? '-vertical' : ''
          }-title${isAct ? '-active' : ''}`;
        } else if (isRectangle) {
          cs = `flex-1 ta-c bx-tab-rectangle${isV ? '-vertical' : ''}-title${
            isAct ? '-active' : ''
          }`;
        } else {
          cs = `flex-1 ta-c bx-tab-underline${isV ? '-vertical' : ''}-title${
            isAct ? '-active' : ''
          }`;
        }
      }
      if (titleItemClassName) {
        cs = `${cs} ${titleItemClassName}`;
      }
      return cs;
    },
    [direction, type, titleItemClassName, isCapsule, isRectangle]
  );

  // tabs 传为子组件的数据
  const tabChange = (item: Title) => {
    if (item.disabled || item?.paneKey === currentItem?.paneKey) {
      return;
    }
    setCurrentItem(item);
    onClick && onClick(item);
    onChange && onChange(item);
  };

  // 按钮胶囊组合样式
  if (type === 'search') {
    return (
      <div className={mergeTitleClassName}>
        {searchList?.map((it, i) => (
          <div
            className={mergeTitleItemClassName((it.id || i) === activeId)}
            onClick={onInnerClick(it || { id: i })}
            key={it.id || i}
          >
            {formatMsg(it.text)}
          </div>
        ))}
      </div>
    );
  }

  // 获取当前的选中tab
  const index = titles.current.findIndex(
    (t) => t.paneKey === currentItem.paneKey
  );

  // 处理滚动样式
  const contentStyle = {
    transform:
      direction === 'horizontal'
        ? `translate3d(-${index * 100}%, 0, 0)`
        : `translate3d(0, -${index * 100}%, 0)`,
    transitionDuration: `${animatedTime}ms`,
  };

  return (
    <div className={mergeWrapClassName}>
      <div className={mergeTitleClassName}>
        {titles?.current.map((item: any) => (
          <div
            className={mergeTitleItemClassName(
              item.paneKey === currentItem.paneKey
            )}
            onClick={() => tabChange(item)}
            key={item.paneKey}
          >
            {item.title}
            {/* {formatMsg(item.title)} */}
          </div>
        ))}
      </div>
      <div
        className={`${
          isRectangle
            ? 'd-f h-full p-b-220'
            : `${
                direction === 'vertical' ? 'flex-1' : 'd-f'
              } ${childreClassName}`
        }`}
        style={contentStyle}
      >
        {Children.map(children, (child, idx) => {
          if (!isValidElement(child)) {
            return null;
          }

          const childProps = {
            ...child.props,
            activeKey: currentItem.paneKey,
            isActive: Boolean(
              String(currentItem.paneKey) ===
                String(child.props?.paneKey || idx)
            ),
            direction,
          };

          // if (String(currentItem.paneKey) !== String(child.props?.paneKey || idx)) {
          //   childProps = {
          //     ...childProps,
          //   };
          // }
          return cloneElement(child, childProps);
        })}
      </div>
    </div>
  );
});
