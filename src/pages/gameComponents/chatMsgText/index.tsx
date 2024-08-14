/**
 * GameChatMessage
 * @description 聊天室纯文本组件组件
 * @param isOwner 是否直接发的消息
 * @param szChatString 消息内容
 * @returns
 */
import { memo, useEffect, useState } from 'react';
import { CMD_Chat } from '@/engine/cmd/chat/CMD_Chat';
import styles from './index.module.scss';
import { emojiList } from '../chatInput/const';

const ChatMsgText = memo((props: Omit<CMD_Chat.CMD_CRS_S_UserChat, 'UserInfo'> & { isOwner?: boolean }) => {
  const { isOwner, szChatString } = props;
  const [htm, setHtm] = useState<string>(null);

  useEffect(() => {
    if (!szChatString.value) return;
    const strArr = `${szChatString.value}`.replace(/\[_emoji_[0-9]{1}[0-9]{0,2}_]/g, (m) => {
      const key = m.replace(/\[_|_]/g, '');
      const imgInfo = emojiList.find((it) => it.key === key);
      if (!imgInfo) return m;
      return `<img style='display:inline-block' class=${styles['emoji-text']} src=${imgInfo.img} alt=${key}></img>`;
    });
    setHtm(strArr);
  }, [szChatString]);

  return <div dangerouslySetInnerHTML={{ __html: htm }} className={`wds-con wb-all br-30 p-30 ${isOwner ? `${styles['auth-chat-text']} br-t-r-0` : 'bg-body br-t-l-0'} ${styles['chat-text']}`} />;
});

export default ChatMsgText;
