import { memo, useMemo } from 'react';
import { CMD_3501 } from '@/engine/game/pc/3501/CMD_3501';

interface ColorResultTypeProps {
  value?: string | number;
  text?: string;
  className?: string;
}

export const ColorResultTypeNumber = memo((props: ColorResultTypeProps) => {
  const { value, text, className } = props;
  const valueNum = useMemo(() => parseInt(`${value}`), [value]);
  const mergeClassName = useMemo(() => {
    const traText = CMD_3501.GetGameResult(valueNum);
    const csn = `${className}`;
    switch (traText) {
      case '大':
        return `color-red ${csn}`;
      case '小':
        return `color-blue ${csn}`;
      case '单':
        return `color-red ${csn}`;
      case '双':
        return `color-blue ${csn}`;
      //////////////////////////////////////////////////////////////////////////
      case '奇':
        return `color-red ${csn}`;
      case '和':
        return `color-green ${csn}`;
      case '偶':
        return `color-blue ${csn}`;
      //////////////////////////////////////////////////////////////////////////
      case '上':
        return `color-red ${csn}`;
      case '中':
        return `color-green ${csn}`;
      case '下':
        return `color-blue ${csn}`;
      //////////////////////////////////////////////////////////////////////////
      case '金':
        return `color-jin ${csn}`;
      case '木':
        return `color-mu ${csn}`;
      case '水':
        return `color-shui ${csn}`;
      case '火':
        return `color-huo ${csn}`;
      case '土':
        return `color-tu ${csn}`;
      default:
        return '';
    }
  }, [className, valueNum]);
  const mergeText = useMemo(() => {
    const traText = CMD_3501.GetGameResult(valueNum);
    return text || traText || '';
  }, [text, valueNum]);
  return <span className={`${mergeClassName}`}>{mergeText}</span>;
});
