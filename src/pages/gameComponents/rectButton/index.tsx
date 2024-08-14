import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { MajiangBall } from '../majiangBall';
import { SingleColorBall } from '../singleColorBall';
import { useLanguage } from '@/hooks';

interface RectButtonProps {
  onClick: any; // change事件
  text: string; // 文字
  multipleValue: string | number; // 赔率值
  className?: string;
  type?: 'text' | 'majia' | 'single' | ''; // 文字展示的形式
  index?: string | number;
  isActive?: boolean;
}

export const RectButton = (props: RectButtonProps) => {
  const {
    onClick,
    text,
    className,
    multipleValue,
    type = 'text',
    index,
    isActive,
  } = props;
  const [active, setIsActive] = useState(false);
  const { formatMsg } = useLanguage();

  useEffect(() => {
    if (typeof isActive === 'boolean') {
      setIsActive(isActive);
    }
  }, [isActive]);

  const handleClick = () => {
    if (typeof onClick === 'function') {
      const res = onClick({
        active: !active,
        index,
      });
      if (res) {
        setIsActive(!active);
      }
    }
  };

  const textNode = () => {
    if (type === 'majia') {
      return <MajiangBall text={text} />;
    }
    if (type === 'single') {
      return <SingleColorBall bgColor='singGold' text={text} />;
    }
    if (text.indexOf('&') !== -1) {
      const [m, s] = text.split('&');
      return `${formatMsg(m)}${formatMsg(s)}`;
    }
    return formatMsg(text);
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles['item']} ${
        active ? 'bg-gdt-foc' : 'bg-body'
      } d-f ai-c jc-c t-40 b-b-1 b-l-1 bc-split ${className}`}
    >
      <div>{textNode()}</div>
      <div className='m-l-30 color-red'>{multipleValue}</div>
    </div>
  );
};
