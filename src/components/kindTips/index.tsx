/**
 * KindTips 温馨提示
 * @param data 正文要展示的数据，接收数组
 * @param title 正文要展示title
 * @param className 外部需要覆盖的样式类名
 * @param isFormatMsg 是否多语言转换
 * @param isService 是否展示客服图标
 */
import { useMemo, memo } from 'react';
import './index.scss';
import { OutLink } from '../outLink';
import { customerServiceUrl } from '@/constants';
import { useFormatMsg } from '@/hooks';

interface DataItem {
  text: string; // 要展示的文字
  id: number; // 序号（遍历时使用
  special?: string; // 要特殊处理的文字
  specialcn?: string; // 要特殊处理的文字的样式类名
}

interface KindTipsProps {
  data: DataItem[];
  title?: string;
  className?: string;
  isFormatMsg?: boolean;
  isService?: boolean;
}

export const KindTips = memo((props: KindTipsProps) => {
  const {
    data = [],
    title = 'reminder',
    className,
    isFormatMsg = true,
    isService,
  } = props;

  const { formatMsg } = useFormatMsg(isFormatMsg);

  const mergeClassName = useMemo(() => {
    if (className) {
      return `bg-main bx-kind-tips ${className}`;
    }
    return 'bg-main bx-kind-tips';
  }, [className]);

  return (
    <div className={mergeClassName}>
      {title && <div className='wds-sm-title m-b-30'>{formatMsg(title)}</div>}
      {data.map((item, index) => {
        let text = formatMsg(item.text);
        let sText = '';

        if (item?.special && item?.specialcn) {
          sText = formatMsg(item?.special);
          if (sText) {
            text = text.replace(
              sText,
              () => `<span class='${item?.specialcn}'>${sText}</span>`
            );
            return (
              <div
                dangerouslySetInnerHTML={{ __html: text }}
                className='t-40 lh-64 color-con-ass tip-text'
                key={item.id || index}
              />
            );
          }
        }
        return (
          <div
            className='t-40 lh-64 color-con-ass tip-text'
            key={item.id || index}
          >
            {formatMsg(text)}
          </div>
        );
      })}
      {isService && (
        <OutLink type={2} className='contact-us-tip' href={customerServiceUrl}>
          {formatMsg('contactUs', true)}
        </OutLink>
      )}
    </div>
  );
});
