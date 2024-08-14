/**
 * 用户头像展示
 * 默认大小是132*132， 如果需要调整可以传样式类名修改,正常直接调用即可
 */
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useUserInfoStore } from '@/mobx';
import { Img, ImgProps } from '../img';
import { avatarOptions, avatarOptions1 } from '@/constants';

const Avators = observer(
  (
    props: Omit<ImgProps, 'src'> & { avatorId?: number; avatorUrl?: string }
  ) => {
    const { className, avatorId, avatorUrl, ...rest } = props;
    const { faceId } = useUserInfoStore();

    // 通过头像id 获取头像
    const url = useMemo(() => {
      if (avatorUrl) {
        return avatorUrl;
      }
      let id = avatorId || faceId || 1;
      if (id > 30) {
        id = 1;
      }
      return [...avatarOptions, ...avatarOptions1].find((it) => it.id === id)
        .url;
    }, [faceId, avatorId, avatorUrl]);

    return (
      <Img
        className={className || 'avatar-server'}
        isNoTheme
        {...rest}
        src={url as unknown as string}
      />
    );
  }
);

export default Avators;
