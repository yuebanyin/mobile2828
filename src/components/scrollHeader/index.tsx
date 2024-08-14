/**
 * ScrollHeader
 * @param bgImg 背景大图
 * @param bgHeaderImg 头部图
 * @param isPlubicIcon 是否展示信封图标
 * @param isArrow 是否展示左箭头
 * @param title 标题
 * @param omultiple 大图的透明度设置
 */
import { useEffect, useRef, useCallback, RefObject } from 'react';
import { observer } from 'mobx-react-lite';
import { Img, BgImg } from '../img';
import { OutLink } from '../outLink';
import { Badge } from '../badge';
import { mineNotice } from '@/constants/mine';
import './index.scss';
import { BaseReactHtml } from '@/constants';
import { useNavigation } from '@/hooks';
import { Icon } from '../icon';
import {
  useUserEmailCountStore,
  useUserEmailStatusStore,
} from '@/mobx/userEmail';
import { getUserMail } from '@/services/personal';
import { LanguageChange } from '../languageChange';

interface ScrollHeaderHeaderProps extends BaseReactHtml {
  bgImg: string;
  bgImgClassName?: string;
  bgHeaderImg?: string;
  isPlubicIcon?: boolean;
  title?: string;
  omultiple?: number;
  isArrow?: boolean;
  contentClassName?: string;
}

export const ScrollHeader = observer((props: ScrollHeaderHeaderProps) => {
  const {
    bgImg,
    className,
    contentClassName,
    bgImgClassName,
    bgHeaderImg,
    title,
    children,
    isPlubicIcon = false,
    isArrow = false,
    omultiple = 2.5,
  } = props;
  const bgImgRef = useRef<RefObject<HTMLDivElement>>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<RefObject<HTMLDivElement>>(null);
  const { changeUserEmailCount, userEmailCount } = useUserEmailCountStore();
  const { changeTabsEmailStatus } = useUserEmailStatusStore();

  const navigate = useNavigation();

  const changeHeight = useCallback(() => {
    // 获取当前元素的滚动高度
    const scrollTop = wrapRef?.current?.scrollTop;
    // 获取屏幕的宽度
    const winW = window.innerWidth;
    // 获取150相对于当前设备宽度换算后的物理像素高度
    const headerH = parseInt(`${(150 / 1080) * winW}`);
    // 获取透明图
    const o = scrollTop / headerH;
    const co = o / omultiple;
    if (typeof scrollTop === 'number') {
      // console.log({
      //   scrollTop,
      //   winW,
      //   headerH,
      //   o,
      // });
      // 设置头部的透明度
      bgImgRef?.current?.current?.style.setProperty('opacity', `${o}`);
      // 刚好是临界点时
      if (o >= 0.9999) {
        //
        // bgImgRef?.current?.current.style.setProperty('url')
      }
      // 设置背景图的透明度
      imgRef?.current?.current?.style.setProperty('opacity', `${1 - co}`);
    }
  }, [omultiple]);

  const getUserEmailCount = useCallback(() => {
    changeTabsEmailStatus(false);
    getUserMail()
      .then((res: any) => {
        let val = 0;
        for (let i = 0; i < res.Data.List.length; i += 1) {
          if (res.Data.List[i].Status === false) {
            val += 1;
          }
        }

        if (val > 0 && val !== userEmailCount) {
          changeUserEmailCount(val);
          console.log(
            '🚀 ~ file: index.tsx:88 ~ .then ~ val:',
            val,
            userEmailCount
          );
        }
      })
      .catch(() => {});
  }, [changeUserEmailCount, changeTabsEmailStatus, userEmailCount]);

  useEffect(() => {
    // changeUserEmailCount(0);
    getUserEmailCount();

    changeHeight();
  }, [changeHeight, getUserEmailCount, changeUserEmailCount]);

  // 滚动事件处理函数
  const onScroll = useCallback(() => {
    changeHeight();
  }, [changeHeight]);

  const handleMove = useCallback((e) => {
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      onTouchMove={handleMove}
      onScroll={onScroll}
      className={`o-y ${className || ''}`}
    >
      <div className={`w-full bx-header-wrap ${contentClassName}`}>
        <BgImg
          url={bgHeaderImg}
          ref={bgImgRef}
          className='w-full d-f ai-c jc-c ta-c h-150 p-f zi-large opa-0 wds-h1 color-white'
        >
          {title}
        </BgImg>
        {isArrow && (
          <div className='p-f left-50 top-43 zi-large'>
            <Icon
              name='rect-left'
              className='color-white w-80 t-h2 goback-icon'
              onClick={() => {
                console.log('scrool-1返回上一级');
                navigate(-1);
              }}
            />
          </div>
        )}
        {isPlubicIcon && (
          <div>
            <OutLink
              className='p-f right-150 top-43 zi-large'
              href={mineNotice.href}
            >
              <Badge value={userEmailCount}>
                <Img className='w-72 h-64' src={mineNotice.icon} />
              </Badge>
            </OutLink>
            <LanguageChange
              src='/mine/mineLanguage.png'
              className='p-f right-40 top-40 zi-large'
              iconCls='w-72 h-72'
              boxCls='zi-large top-100'
            />
          </div>
        )}

        <Img
          className={`p-r w-full ${bgImgClassName || ''}`}
          ref={imgRef}
          src={bgImg}
        />
      </div>
      {children}
    </div>
  );
});
