import { memo, useMemo } from 'react';
import { GameMgr } from '@/engine/mgr/mgr';

interface FiveEleBallProps {
  text?: string | number;
  className?: string;
  resultNum?: number;
}

export const FiveEleBall = memo((props: FiveEleBallProps) => {
  const { className, resultNum } = props;
  const getCls = useMemo(() => {
    let cls = 'color-white br-half m-l-10';
    switch (resultNum) {
      case 19:
        cls = `${cls} bg-jin`;
        break;
      case 20:
        cls = `${cls} bg-mu`;
        break;
      case 21:
        cls = `${cls} bg-shui`;
        break;
      case 22:
        cls = `${cls} bg-huo`;
        break;
      case 23:
        cls = `${cls} bg-tu`;
        break;

      default:
        break;
    }
    return cls;
  }, [resultNum]);
  return <div className={`${getCls} ${className}`}>{GameMgr.GetResultDesc(3402, resultNum)}</div>;
});
