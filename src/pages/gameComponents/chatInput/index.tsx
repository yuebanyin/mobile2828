import { memo, useCallback, useState, useRef, MouseEventHandler } from 'react';
import { Img, Button } from '@/components';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import EmojiInput from './EmojiInput';
import ExpandFooter from './ExpandFooter';
import styles from './index.module.scss';
import { useLanguage, useLimitBtn } from '@/hooks';
import { BetMainModel } from '@/pages/home/pc28Games/optionBet';

interface ChatInputProps {
  wsExample: CtrlChat;
  handleBet?: Function;
  isGame?: boolean;
  curGameId?: number;
  gameScen?: any;
  betPeriod?: string;
  gameWs?: any;
}

export const ChatInput = memo((props: ChatInputProps) => {
  const { wsExample, handleBet, isGame, ...rest } = props;
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<any>(null);
  const [showFootType, setShowFootType] = useState<string>('');
  const { limitBtnFn } = useLimitBtn();
  const { formatMsg } = useLanguage();

  // 发送消息
  const send = useCallback(() => {
    limitBtnFn(() => {
      if (wsExample && inputRef?.current?.ipt && value) {
        wsExample.sendChat(value);
        inputRef.current.ipt.innerHTML = '';
        setValue('');
        setShowFootType('');
      }
    }, formatMsg('send'));
  }, [value, wsExample, limitBtnFn, formatMsg]);

  // 展开底部
  const showFooterMore = useCallback(() => {
    setShowFootType((t) => (t === 'more' ? '' : 'more'));
  }, []);

  // 展开表情包
  const showFooterEmoji = useCallback(() => {
    setShowFootType((t) => {
      if (t === 'emoji') {
        return '';
      }
      if (inputRef?.current?.ipt) {
        inputRef?.current?.ipt.focus();
      }
      return 'emoji';
    });
  }, []);

  // 表情包选择
  const chooseEmojiItem = useCallback((item) => {
    if (inputRef?.current?.ipt) {
      inputRef.current.handleInput &&
        inputRef.current.handleInput(null, item, () => {
          if (inputRef.current?.ipt?.childNodes.length) {
            let v = '';
            for (
              let i = 0, len = inputRef.current?.ipt?.childNodes.length;
              i < len;
              i += 1
            ) {
              // 节点
              const el = inputRef.current?.ipt?.childNodes[i];
              if (el.nodeName === '#text') {
                // 如果是文本节点
                v += el.nodeValue;
              } else {
                // emoji 节点
                v += `[_${el.alt}_]`;
              }
            }
            setValue(v);
          } else {
            setValue('');
          }
        });
    }
  }, []);

  const closeExpand = useCallback(() => {
    setShowFootType('');
  }, []);

  return (
    <div>
      <div
        className={`d-f ai-end jc-sb w-full bg-body bs-primary ${styles['chat-input-wrap']}`}
      >
        {isGame ? (
          <BetMainModel
            {...rest}
            sourceNode={
              <div
                onClick={handleBet as MouseEventHandler}
                className={`w-220 flex-init m-r-10 br-10 bg-gdt-main wds-h1 color-home-login-btn d-f jc-c ai-c ${styles['tz-btn']}`}
              >
                {formatMsg('bet')}
              </div>
            }
          />
        ) : (
          <div
            onClick={handleBet as MouseEventHandler}
            className={`w-220 flex-init m-r-10 br-10 bg-gdt-main wds-h1 color-home-login-btn d-f jc-c ai-c ${styles['tz-btn']}`}
          >
            {formatMsg('bet')}
          </div>
        )}
        <div
          className={`bg-int-dark m-r-30 br-10 o-none d-f flex-1 ${styles['chat-input']}`}
        >
          <EmojiInput
            onChange={setValue}
            ref={inputRef}
            className='bg-int-dark br-10 flex-1'
          />
        </div>
        <Img
          onClick={showFooterEmoji}
          className={`${styles['chat-emot']} m-r-10`}
          src='/chatroom/emoticon.png'
        />
        {value ? (
          <Button
            onClick={send}
            size='small'
            className={`${styles['chat-send']} br-10 flex-init wds-h1 bg-primary`}
          >
            {formatMsg('send')}
          </Button>
        ) : (
          <Img
            onClick={showFooterMore}
            className={styles['chat-more']}
            src='/chatroom/add-more.png'
          />
        )}
      </div>
      <ExpandFooter
        isGame={isGame}
        footType={showFootType}
        chooseEmojiItem={chooseEmojiItem}
        closeExpand={closeExpand}
        {...rest}
      />
    </div>
  );
});
