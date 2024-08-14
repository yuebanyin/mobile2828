/**
 * Iframe 展示 html链接的解决方案
 * @param src
 * @param height
 */
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStyleRem } from '@/hooks';
import './index.scss';
import { BaseReactHtml, REGEXOBJ } from '@/constants';
import { useGameConfigStore } from '@/mobx';

interface IframeProps extends BaseReactHtml {
  src?: string;
  srcDoc?: string;
  height?: string;
  id?: string;
}

export const Iframe = observer((props: IframeProps) => {
  const { src, height, className, id, srcDoc } = props;
  const { iframeHost } = useGameConfigStore();
  const { pxToRem } = useStyleRem();

  console.log({ iframeHost });
  const url = useMemo(() => {
    if (REGEXOBJ.OUTLINK.test(src)) return src;
    if (iframeHost && src) return `${iframeHost}${src}`;
    return src || '';
  }, [src, iframeHost]);

  // 计算真实物理像素相对于当前屏幕的高度
  const mergeHeight = useMemo(
    () => pxToRem(`${((Number(height) + 34) / 2).toFixed(5)}px`),
    [height, pxToRem]
  );

  return (
    <div className={`iframe-box ${className}`} style={{ height: mergeHeight }}>
      <iframe
        marginHeight={0}
        marginWidth={0}
        frameBorder={0}
        id={id}
        className='bx-iframe'
        width='100%'
        title='navigation'
        height='100%'
        src={url}
        srcDoc={srcDoc}
        sandbox='allow-scripts allow-same-origin allow-popups'
        seamless
      />
    </div>
  );
});
