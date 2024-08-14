/**
 * QRCode 生成二维码图片url  常用的api如下
 * @param text 二维码扫描获取的内容
 * @param size 生成的二维码的宽高，只支持生成正方形的二维码
 * @param margin 生成的二维码的比外边距
 * @param correctLevel 生成的二维码的容错率，一般使用默认即可
 * @param maskPattern 掩码风格
 * @param version 指定二维码编码使用的版本
 * @param colorDark 二维码上色颜色
 * @param colorLight 二维码空白地方颜色
 * @param backgroundImage 二维码背景图
 * @param autoColor 二维码自动计算颜色，默认true
 * @param className 需要修改样式可传其他样式来覆盖
 */
import { AwesomeQRCode, ComponentOptions } from '@awesomeqr/react';
import { memo, useMemo } from 'react';

interface QROption {
  text: string;
  size?: number;
  margin?: number;
  correctLevel?: number;
  maskPattern?: number;
  version?: number;
  components?: ComponentOptions;
  colorDark?: string;
  colorLight?: string;
  autoColor?: boolean;
  backgroundImage?: string | Buffer;
  backgroundDimming?: string;
  gifBackground?: ArrayBuffer;
  whiteMargin?: boolean;
  logoImage?: string | Buffer;
  logoScale?: number;
  logoMargin?: number;
  logoCornerRadius?: number;
  dotScale?: number; // DEPRECATED!!
  callback?: Function;
}

interface QRProps extends QROption {
  width?: number;
  height?: number;
  className?: string;
  style?: any;
}

export const QRCode = memo((props: QRProps) => {
  const {
 size = 360, dotScale = 0.6, className, ...rest 
} = props;

  // 合并类名属性
  const mergeClassName = useMemo(() => {
    let csn = 'w-366 h-366';
    if (className) {
      csn = className;
    }
    return csn;
  }, [className]);

  return (
    <div className={mergeClassName}>
      <AwesomeQRCode
        options={{
          size,
          dotScale,
          ...rest,
        }}
      />
    </div>
  );
});

// export default memo(QRCode);
