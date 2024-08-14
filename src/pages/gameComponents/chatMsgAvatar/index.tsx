/**
 * @description 聊天室以及游戏聊天室中的头像组件
 * @param UserInfo 用户的信息
 * @param children 消息的内容
 * @param cFaceUrl 如果有头像的连接急用头像连接，没有就用头像id获取
 * @param szNickName 消息对象的昵称
 */
import {
  Children,
  cloneElement,
  memo,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar } from '@/components';
import { CMD_Chat } from '@/engine/cmd/chat/CMD_Chat';
import { BaseReactHtml } from '@/constants';
import { useUserInfoStore } from '@/mobx';

type Props = Partial<Pick<CMD_Chat.CMD_CRS_S_PlaceBetHead, 'UserInfo'>> &
  BaseReactHtml &
  Partial<Pick<CMD_Chat.CMD_CRS_S_ManagerMessage, 'cFaceUrl' | 'szNickName'>>;

type AvatarShowsProps = Props & {
  srcollBottoms?: Function;
  dwGameID?: {
    value: number;
  };
};

const AvatarShows = observer((props: AvatarShowsProps) => {
  const { gameId } = useUserInfoStore();
  const { UserInfo, children, cFaceUrl, szNickName, srcollBottoms, dwGameID } =
    props;

  const magItemBoxRef = useRef<HTMLDivElement>(null);

  // 是否是自己
  const isOwner = useMemo(
    () => gameId === (dwGameID?.value || UserInfo?.dwGameID?.value),
    [gameId, dwGameID?.value, UserInfo?.dwGameID?.value]
  );

  useEffect(() => {
    if (magItemBoxRef?.current && typeof srcollBottoms === 'function') {
      const iot = magItemBoxRef.current.offsetTop;
      srcollBottoms(isOwner, iot);
    }
  }, [isOwner, srcollBottoms]);

  // 系统管理员头像获取
  const url = useMemo(() => cFaceUrl?.value, [cFaceUrl?.value]);

  return (
    <div
      ref={magItemBoxRef}
      className={`${
        isOwner ? 'jc-end' : ''
      } d-f ai-start m-t-30 ani-opa-tslY-100`}
    >
      {!isOwner && (
        <Avatar avatorId={UserInfo?.cbFaceID?.value} avatorUrl={url} />
      )}
      <div className={`${isOwner ? 'm-r-20' : 'm-l-20'} max-w-p-80 o-none`}>
        <div className={`m-b-20 ${isOwner ? 'ta-r' : ''}`}>
          {szNickName?.value || UserInfo?.szNickName?.value}
        </div>
        {Children.toArray(children).map((dom: any) =>
          cloneElement(dom, { isOwner }))}
      </div>
      {isOwner && <Avatar avatorId={UserInfo?.cbFaceID?.value} />}
    </div>
  );
});

export default memo(AvatarShows);
