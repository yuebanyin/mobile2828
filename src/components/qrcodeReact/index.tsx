import QRCode from 'qrcode.react';
import { memo } from 'react';

interface SetImageProps {
  src: string;
  x: number;
  y: number;
  height: number;
  width: number;
  excavate: boolean;
}

interface QROption {
  value: string;
  size?: number;
  id?: string;
  bgColor?: string;
  fgColor?: string;
  level?: string;
  includeMargin?: boolean;
  marginSize?: number;
  imageSettings?: SetImageProps;
}

export const QrcodeReact = memo((props: QROption) => {
  const { id = 'qrcode', value, ...rest } = props;

  return (
    <QRCode
      id={id}
      value={value}
      fgColor='#000000' // 二维码的颜色
      style={{ margin: 'auto' }}
      // imageSettings={{
      //   // 二维码中间的logo图片
      //   src: 'logoUrl',a
      //   height: 100,
      //   width: 100,
      //   excavate: true, // 中间图片所在的位置是否镂空
      // }}
      {...rest}
    />
  );
});
