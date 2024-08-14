/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Scratch 刮奖组件
 * @param width canvas 的刮奖区域 (直接传设计稿的值就可以，内部已做计算转换)
 * @param height canvas 的刮奖区域 (直接传设计稿的值就可以，内部已做计算转换)
 * @param beforeDrawMask canvas 的背景图设置，这里如果对结果不是很严谨，可以采用这种方式（也支持通过ctx 对象绘画内容等）
 */
import {
  TouchEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { BaseReactHtml, Obj } from '@/constants';
import { uipxtodevicepx } from '@/utils/tools';
import { useLanguage } from '@/hooks';

interface ScratchProps extends BaseReactHtml {
  width: string | number;
  height: string | number;
  beforeDrawMask?: Function;
  drawResult?: Function;
  clear?: Function;
}

export const Scratch = forwardRef((props: ScratchProps, ref: any) => {
  const {
    width,
    height,
    beforeDrawMask = () => {},
    drawResult,
    clear,
    ...rest
  } = props;
  const { formatMsg } = useLanguage();
  // canvas 的宽高支持可配置
  const [whObj, setWhObj] = useState<{
    w: string | number;
    h: string | number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 保存canvas绘画对象
  const [ctx, setCtx] = useState<Obj>(null);

  // 计算设计稿相当于当前设备的宽高
  useEffect(() => {
    const w = uipxtodevicepx(width);
    const h = uipxtodevicepx(height);
    setWhObj({ w, h });
  }, [width, height]);

  // 判断鼠标是否按下的状态
  let canDraw: boolean = false;
  // 添加鼠标移动时只用一次接口
  let showPrize: boolean = true;

  // 绘画遮罩层
  const initDraw = useCallback(() => {
    if (!canvasRef?.current || !ctx || !whObj) return;
    showPrize = false;
    beforeDrawMask && beforeDrawMask({ dom: canvasRef.current, ctx });
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.fillStyle = '#818181';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.font = `${uipxtodevicepx(50)}px Arial`;
    ctx.fillStyle = '#FFE200';
    // 文字水平对齐
    ctx.textAlign = 'center';
    // 文字垂直方向对齐
    ctx.textBaseLine = 'middle';
    // 设置遮罩的文字
    ctx.fillText(
      formatMsg('OPEN_WORDS'),
      Number(whObj.w) / 2,
      (Number(whObj.h) + 10) / 2
    );
    ctx.closePath();
    showPrize = true;
  }, [ctx, showPrize, whObj]);

  useEffect(() => {
    if (canvasRef?.current && whObj) {
      setCtx(
        canvasRef?.current?.getContext('2d', { willReadFrequently: true })
      );
    }
  }, [whObj]);

  useEffect(() => {
    initDraw();
  }, [initDraw]);

  // 阻止默认事件
  const onContextMenu = (event: any) => {
    event.preventDefault();
  };

  // 清除以(x,y)为中心的四周边长20px的正方形的遮罩，c时canvas对象
  function clearCircle(x, y) {
    // 混合模式
    ctx.globalCompositeOperation = 'destination-out';
    ctx.moveTo(x, y);
    ctx.arc(x, y, 12, 0, Math.PI * 2, true);
    ctx.fill();
    drawResult && drawResult({ ctx });
  }

  function clearAll() {
    // 获取当前节点
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawResult && drawResult({ ctx });
    showPrize = false;
  }

  useImperativeHandle(ref, () => ({
    initDraw,
    clearAll,
  }));

  // 计算当前刮开的面积比例
  function getFilledPercentage(_e, w, h) {
    // 阻止浏览器默认事件，重要
    // _e.preventDefault();
    // 获取整个canvas的元素点
    const { data } = ctx.getImageData(0, 0, w, h);
    let scrapeNum = 0;
    // 整个区域的面积
    const area = w * h;
    for (let i = 3, len = data.length; i < len; i += 4) {
      if (data[i] === 0) {
        scrapeNum += 1;
      }
    }
    // 达到一定比例后清除所有
    if (scrapeNum > area * 0.8) {
      clearAll();
      clear && clear();
      return true;
    }
    return false;
  }

  // 清除
  function drawCircle(e) {
    // 阻止浏览器默认事件
    // e.preventDefault();
    if (e.returnValue) {
      e.returnValue = false;
    }
    // 获取当前节点
    const canvas = canvasRef.current;
    // 手指到canvas元素左边的距离
    const canvX = e.changedTouches[0].pageX - canvas.offsetLeft;
    const p = canvas.getBoundingClientRect();
    // 手指到canvas元素上边的距离
    const canvY = e.changedTouches[0].pageY - p.top;
    clearCircle(canvX, canvY);
    getFilledPercentage(e, canvas.width, canvas.height);
  }

  const onTouchStart: TouchEventHandler<HTMLCanvasElement> = (e) => {
    if (!canvasRef?.current || !ctx || !showPrize) return;
    try {
      canDraw = true;
      // 刮奖时设置当前屏幕不可滚动
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      drawCircle(e);
    } catch (error) {
      console.error(error);
    }
  };

  const onTouchMove: TouchEventHandler<HTMLCanvasElement> = (e) => {
    if (!canvasRef?.current || !ctx || !showPrize) return;
    try {
      canDraw = true;
      if (canDraw && showPrize) {
        drawCircle(e);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onTouchEnd: TouchEventHandler<HTMLCanvasElement> = () => {
    if (!canvasRef?.current || !ctx || !showPrize) return;
    try {
      canDraw = true;
      // 刮奖时设置当前屏幕可滚动
      document.getElementsByTagName('body')[0].style.overflow = 'visible';
      canDraw = false;
    } catch (error) {
      console.error(error);
    }
  };

  if (!whObj) return <></>;

  return (
    <canvas
      style={{ touchAction: 'none' }}
      width={`${whObj.w}px`}
      height={`${whObj.h}px`}
      ref={canvasRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onContextMenu={onContextMenu}
      onTouchEnd={onTouchEnd}
      {...rest}
    />
  );
});
