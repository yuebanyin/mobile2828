/**
 * Collapse 折叠组件
 *
 */
import {
 memo, useMemo, useState, ReactNode, useEffect, useCallback, Children, cloneElement, useRef 
} from 'react';
import { Icon } from '../icon';
import './index.scss';
import { isArray, isNoEmpty } from '@/utils/tools';

interface CollapseProps {
  children: ReactNode;
  activeName?: string[] | string;
  accordion?: boolean;
  className?: string;
  expandIcon?: ReactNode;
  rotate?: number;
  onChange?: Function;
  bodyClassName?: string;
}

interface CollapseItemProps {
  name: string;
  title: string;
  subTitle?: string;
  childnull?: boolean;
  expandIcon?: ReactNode;
  isOpen?: boolean;
  onToggle?: Function;
  rotate?: number;
  children: ReactNode;
}

export const CollapseItem = memo((props: CollapseItemProps) => {
  const {
 title, subTitle, isOpen, children, onToggle, name 
} = props;

  const childrenRef = useRef<HTMLDivElement>(null);

  const mergeChildrenClassname = useMemo(() => {
    let cs = 'bx-colllapse-children';
    if (isOpen) {
      cs = `${cs} max-height-1000 b-b-1 bc-split`;
    }
    return cs;
  }, [isOpen]);

  const mergeIconClassname = useMemo(() => {
    let cs = 'rote-icon';
    if (isOpen) {
      cs = `${cs} rote-90`;
    }
    return cs;
  }, [isOpen]);

  const mergePrefixClassname = useMemo(() => {
    let cs = 'bx-colllapse-header-prefix';
    if (isOpen) {
      cs = `${cs} bx-colllapse-header-prefix-active`;
    }
    return cs;
  }, [isOpen]);

  return (
    <>
      <div className='bx-colllapse-header-box d-f ai-c jc-sb'>
        <div className='d-f ai-c bx-colllapse-header'>
          <div className={mergePrefixClassname} />
          <div className='t-small color-con-ass bx-colllapse-header-sub-title'>{subTitle}</div>
          <div className='t-small-title'>{title}</div>
        </div>
        <Icon
          className={mergeIconClassname}
          onClick={() => {
            onToggle(isOpen, name);
          }}
          name='rect-right'
        />
      </div>
      <div ref={childrenRef} className={mergeChildrenClassname}>
        {children}
      </div>
    </>
  );
});

export const Collapse = memo((props: CollapseProps) => {
  const {
 activeName, accordion = true, children, expandIcon, rotate, onChange, bodyClassName 
} = props;
  const [activeId, setActiveId] = useState<string[]>([]);

  const childrenDom = Children.toArray(children);

  // 处理默认展开的id
  const handleActiveId = useCallback(() => {
    let actArr = [];
    // 只处理传入的初始参数类型为 string 或者 string[];
    if (isArray(activeName) && isNoEmpty(activeName)) {
      // 手风琴模式
      if (accordion) {
        if (activeName[0]) {
          actArr.push(activeName[0]);
        }
      } else {
        // 非手风琴模式
        actArr = [...activeName];
      }
    }

    if (typeof activeName === 'string') {
      actArr.push(activeName);
    }
    return actArr;
  }, [accordion, activeName]);

  useEffect(() => {
    const activeArr = handleActiveId();
    setActiveId(activeArr);
  }, [handleActiveId]);

  const onToggle = useCallback(
    (isOpen: boolean, name: string) => {
      let newActId = [...activeId];
      if (isOpen) {
        const removeActId = newActId.findIndex((v) => v === name);
        newActId.splice(removeActId, 1);
      } else if (accordion) {
        newActId = [name];
      } else {
        newActId.push(name);
      }
      setActiveId(newActId);
      onChange && onChange(!isOpen, name);
    },
    [accordion, activeId, onChange]
  );

  return (
    <div className={`bg-body ${bodyClassName}`}>
      {childrenDom.map((dom: any) => cloneElement(dom, {
          isOpen: activeId.includes(dom.props.name),
          onToggle: (isOpen: boolean, name: string) => onToggle(isOpen, name),
          expandIcon: dom.props.expandIcon || expandIcon,
          rotate,
          childnull: !!dom.props.children,
        }))}
    </div>
  );
});
