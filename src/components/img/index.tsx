/**
 * Img 该组件是为了统一处理图片路径，主要用于本地的图片
 * @param src 图片地址，默认都是以主题文件夹下一层开头
 * @param alt 加载错误提示，可以不传
 * @param borderRadius 图片圆角
 * @param width 图片宽度
 * @param height 图片高度
 * @param className 图片样式
 * @param style 图片行内样式
 * @param onClick 图片点击事件
 * @param cursor 图片鼠标移上事件鼠标形状
 * @param isNoTheme 图片是否需要支持换肤（注：不需要支持换肤的直接把src赋值给img标签）
 * @param isImgLayzed 是否开启懒加载
 */
import {
  useRef,
  useMemo,
  MouseEventHandler,
  ReactNode,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import imgDef from '@/assets/image/common/img-def.png';
import imgError from '@/assets/image/common/img-error.png';
import './index.scss';
import { useGameConfigStore, useGlobalStore } from '@/mobx';
import { useImgLazyload } from '@/hooks/useImgLazyload';
import { REGEXOBJ } from '@/constants';

export interface ImgProps {
  src: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: Record<string, string>;
  cursor?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
  isNoTheme?: boolean;
  alt?: string;
  isImgLayzed?: boolean;
  isDefaultBg?: boolean;
}

export const Img = observer(
  forwardRef((props: ImgProps, ref) => {
    const {
      src,
      alt,
      borderRadius,
      style = {},
      cursor,
      isNoTheme,
      className,
      isImgLayzed = true,
      isDefaultBg,
      ...rest
    } = props;
    const { theme } = useGlobalStore();
    const { imgHost } = useGameConfigStore();
    const imgRef = useRef<HTMLImageElement | null>(null);
    const divRef = useRef<HTMLDivElement>(null);

    // 获取远端完整路径
    const outlinkUrl = useMemo(() => {
      if (typeof src === 'string') {
        if (REGEXOBJ.OUTLINK.test(src) || !imgHost) return src;
        if (/^data:image\/png;base64/.test(src)) return src;
        if (imgHost) {
          return `${imgHost}/${src}`;
        }
      }
      return src;
    }, [imgHost, src]);

    // 抛出当前ref
    useImperativeHandle(ref, () => ({
      ...divRef,
    }));

    // 重新赋值路径
    const url = useMemo(() => {
      if (!isImgLayzed) {
        if (isNoTheme) {
          return outlinkUrl;
        }
        // 需要换肤的在这里统一做处理
        if (theme) {
          const imgUrl = `${theme}${src}`;
          return require(`@/assets/image/${imgUrl}`);
        }
      }
      // 浏览器本身只是img标签的懒加载
      if ('loading' in HTMLImageElement.prototype) {
        // 和原生img标签一样
        if (isNoTheme) {
          return outlinkUrl;
        }
        // 需要换肤的在这里统一做处理
        if (theme) {
          const imgUrl = `${theme}${src}`;
          return require(`@/assets/image/${imgUrl}`);
        }
      }
      return imgDef;
    }, [isNoTheme, src, theme, isImgLayzed, outlinkUrl]);

    // 赋值路径dataUrl
    const dataUrl = useMemo(() => {
      if (!isImgLayzed) return '';
      if (src) {
        // 和原生img标签一样
        if (isNoTheme) {
          return outlinkUrl;
        }
        // 需要换肤的在这里统一做处理
        if (theme) {
          const imgUrl = `${theme}${src}`;
          return require(`@/assets/image/${imgUrl}`);
        }
      }
      return '';
    }, [theme, src, isNoTheme, isImgLayzed, outlinkUrl]);

    useImgLazyload(imgRef, dataUrl);

    // 合并style样式
    const mergeStyle = useMemo(
      () => ({
        borderRadius: `${borderRadius}px`,
        cursor,
        ...style,
      }),
      [borderRadius, cursor, style]
    );

    return (
      <div
        ref={divRef}
        className={`${className} ${
          isDefaultBg ? `img-${theme}-default` : ''
        }  o-none`}
      >
        <img
          ref={isImgLayzed ? imgRef : null}
          style={mergeStyle}
          src={url}
          onError={() => {
            if (imgRef?.current) imgRef.current.setAttribute('src', imgError);
          }}
          loading={isImgLayzed ? 'lazy' : 'eager'}
          alt={alt || ''}
          {...rest}
        />
      </div>
    );
  })
);

/**
 * BgImg 该组件挂在Img组件上，api也是继承Img，特殊的只有一个url
 * @param url 图片地址，默认都是img开头
 */

interface BgImgProps extends Omit<ImgProps, 'src'> {
  url: string;
  children?: ReactNode;
  isNoTheme?: boolean;
}

// 对于需要支持换肤的背景图的组件封装
export const BgImg = observer(
  forwardRef((props: BgImgProps, ref) => {
    const { url, className, children, isNoTheme, ...rest } = props;
    const divRef = useRef<HTMLDivElement>(null);
    const { theme } = useGlobalStore();
    const { imgHost } = useGameConfigStore();

    // 获取远端完整路径
    const outlinkUrl = useMemo(() => {
      if (typeof url === 'string') {
        if (REGEXOBJ.OUTLINK.test(url) || !imgHost) return url;
        if (/^data:image\/png;base64/.test(url)) return url;
        if (imgHost) {
          return `${imgHost}/${url}`;
        }
      }
      return url;
    }, [imgHost, url]);

    // 抛出当前ref
    useImperativeHandle(ref, () => ({
      ...divRef,
    }));

    // 重新赋值路径
    const dataBgUrl = useMemo(() => {
      // if (typeof IntersectionObserver === 'function') {
      if (url) {
        // 不需要换肤，也就是外链的图片
        if (isNoTheme) {
          return outlinkUrl;
        }
        // 换肤的图片
        if (theme) {
          const imgUrl = `${theme}${url}`;
          return require(`@/assets/image/${imgUrl}`);
        }
      }
      // }
      return '';
    }, [theme, url, isNoTheme, outlinkUrl]);

    useImgLazyload(divRef, dataBgUrl);

    return (
      <div
        ref={divRef}
        className={`bg-img-defalut ${className}`}
        data-img-url={dataBgUrl}
        style={{ backgroundImage: `url(${dataBgUrl || imgDef})` }}
        {...rest}
      >
        {children}
      </div>
    );
  })
);
