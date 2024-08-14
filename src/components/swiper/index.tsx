import { Swiper as NSwiper, SwiperSlide, SwiperProps } from 'swiper/react';
import {
 Autoplay, Pagination, Navigation, Scrollbar 
} from 'swiper';
import { useMemo } from 'react';
import { Img } from '../img';
import { isArray } from '@/utils/tools';
import { OutLink } from '../outLink';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export type SwiperType<T> = {
  [P in keyof T]?: T[P];
} & { list: { url: string; text?: string; to?: string; id?: number; linkType?: number }[]; imgClassName?: string; isImgLayzed?: boolean; autoModules?: string };

export const Swiper = (props: SwiperType<SwiperProps>) => {
  const {
 list, className, autoModules = 'navigation,autoplay', initialSlide = 0, imgClassName, autoplay = true, pagination = true, isImgLayzed = false, ...rest 
} = props;

  const mergeWrapClassName = useMemo(() => {
    if (className) {
      return `h-435 w-full ${className}`;
    }
    return 'h-435';
  }, [className]);

  const mergeImgClassName = useMemo(() => {
    if (imgClassName) {
      return `h-435 ${imgClassName}`;
    }
    return 'h-435';
  }, [imgClassName]);

  const mergeModule = useMemo(() => {
    const mds = [];
    if (autoModules.indexOf('navigation') !== -1) {
      mds.push(Navigation);
    }
    if (autoModules.indexOf('scrollbar') !== -1) {
      mds.push(Scrollbar);
    }
    if (autoModules.indexOf('pagination') !== -1) {
      mds.push(Pagination);
    }
    if (autoModules.indexOf('autoplay') !== -1) {
      mds.push(Autoplay);
    }
    return mds;
  }, [autoModules]);

  return (
    <NSwiper modules={mergeModule} initialSlide={initialSlide} className={mergeWrapClassName} spaceBetween={0} autoplay={autoplay} pagination={pagination} {...rest}>
      {isArray(list)
        && list.map((it: any, i: number) => (
          <SwiperSlide key={`${it.id}${i + 1}`}>
            <OutLink type={it.linkType || 2} href={it.to} id={it.id}>
              <Img className={mergeImgClassName} src={it.url} isNoTheme isImgLayzed={isImgLayzed} isDefaultBg />
            </OutLink>
          </SwiperSlide>
        ))}
    </NSwiper>
  );
};
