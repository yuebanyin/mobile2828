import { Scratch } from '../gameComponents';
import avarar_1 from '@/assets/image/common/avatar/1.png';

const ScratchDemo = () => {
  // 刮开是背景图
  const onBeforeDrawMask = ({ dom }) => {
    dom.style.backgroundImage = `url(${avarar_1})`;
    dom.style.backgroundPosition = 'center';
    dom.style.backgroundRepeat = 'no-repeat';
  };

  // 刮开是图片
  const onDrawResult = ({ ctx }) => {
    const img = new Image();
    img.src = avarar_1;
    img.crossOrigin = 'true';
    img.onload = function() {
      console.log('图片加载完');
      ctx.globalCompositeOperation = 'destination-over';
      ctx.beginPath();
      ctx.drawImage(img, 0, 0, 100, 100);
      ctx.closePath();
    };
  };

  // 原理和上面一样，刮开是文字类型的图片
  const onDrawResult2 = ({ ctx }) => {
    ctx.globalCompositeOperation = 'destination-over';
    // 开始画一个圆
    ctx.beginPath();
    ctx.arc(80, 40, 30, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    // 画第一个圆内的数字
    ctx.fillText('12', 80, 50);
    ctx.closePath();
    // 画+运算符号
    ctx.beginPath();
    ctx.fillText('+', 130, 50);
    ctx.closePath();
    // 画第二个圆
    ctx.beginPath();
    ctx.arc(180, 40, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    // 画第二个圆内数字
    ctx.fillText('12', 180, 50);
    ctx.closePath();
    // 画=运算符
    ctx.beginPath();
    ctx.fillText('=', 230, 50);
    ctx.closePath();
    // 画第三个圆
    ctx.beginPath();
    ctx.arc(280, 40, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();
    // 画第三个圆内数字
    ctx.beginPath();
    // 设置遮罩的文字
    ctx.fillText('24', 280, 50);
    ctx.closePath();
  };

  return (
    <>
      <Scratch beforeDrawMask={onBeforeDrawMask} width={1080} height={300} />
      <Scratch drawResult={onDrawResult} width={1080} height={300} />
      <Scratch drawResult={onDrawResult2} width={1080} height={300} />
    </>
  );
};

export default ScratchDemo;
