import { MutableRefObject, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Img, OutLink } from '@/components';
import SendRedpacket from '@/pages/chatRoom/sendRedpacket';
import styles from './index.module.scss';
import { chatFooterConfig, emojiList, chatGameFooterConfig } from './const';
import { useGameConfigStore } from '@/mobx';
import { getGameInfo } from '@/utils/game';
import { useLanguage } from '@/hooks';

interface ExpandFooterProps {
  footType: string;
  chooseEmojiItem: Function;
  isGame?: boolean;
  inputRef?: MutableRefObject<HTMLInputElement>;
  curGameId?: number;
  closeExpand?: Function;
}

// 表情包
const FooterEmojiModle = memo(
  ({ chooseEmojiItem }: Pick<ExpandFooterProps, 'chooseEmojiItem'>) => (
    <div className={`${styles['emoji-view-box']} d-f ai-c flex-w`}>
      {emojiList.map((emo) => (
        <Img
          onClick={() => chooseEmojiItem(emo)}
          className={styles['emoji-item']}
          key={emo.key}
          src={emo.img}
          isImgLayzed={false}
          isNoTheme
        />
      ))}
    </div>
  )
);

// 点击+展开
const FooterRouterModle = observer(
  ({
    isGame,
    curGameId,
    closeExpand,
  }: Omit<ExpandFooterProps, 'footType' | 'chooseEmojiItem'>) => {
    const { formatMsg } = useLanguage();
    const { gameList } = useGameConfigStore();
    const { roomList } = getGameInfo(gameList, curGameId);
    const [searchParam] = useSearchParams();
    const houseId = searchParam.get('houseId');

    const roomInfo = roomList.find((it) => it.FieldId === Number(houseId));

    return (
      <div className={`flex-w d-f ai-c ${styles['expand-footer-box']}`}>
        {(isGame ? chatGameFooterConfig : chatFooterConfig).map((it) => {
          const childDom = (
            <>
              <Img
                className={`${styles['expand-footer-item-img']} m-0-auto w-150`}
                src={it.url}
                isNoTheme
                isImgLayzed={false}
              />
              <div className='ta-c m-t-20'>{formatMsg(it.text)}</div>
            </>
          );
          if (it.id === 2) {
            return (
              <SendRedpacket
                key={it.id}
                closeExpand={closeExpand}
                sourceNode={
                  <div
                    className={`m-t-50 o-n ${styles['expand-footer-item']}`}
                    key={it.id}
                  >
                    {childDom}
                  </div>
                }
              />
            );
          }
          let url = it.to;
          if (it.to === '/home/gameOption/playRule') {
            console.log(it);
            // url = `${it.to}/?id=${roomInfo?.FieldId}&title=${roomInfo?.Room?.ServerName}`;
            url = `${it.to}/?id=${roomInfo?.FieldId}&title=${formatMsg(
              roomInfo?.KindId
            )}`;
          }
          return (
            <OutLink
              href={url}
              className={`m-t-50 o-n ${styles['expand-footer-item']}`}
              key={it.id}
            >
              {childDom}
            </OutLink>
          );
        })}
      </div>
    );
  }
);

const ExpandFooter = (props: ExpandFooterProps) => {
  const { footType, chooseEmojiItem, closeExpand, isGame, curGameId } = props;

  if (!footType) return <></>;

  return (
    <div
      className={`o-y ${
        footType ? styles['chat-input-show-foot'] : styles['chat-input-foot']
      }`}
    >
      {footType === 'more' && (
        <FooterRouterModle
          isGame={isGame}
          curGameId={curGameId}
          closeExpand={closeExpand}
        />
      )}
      {footType === 'emoji' && (
        <FooterEmojiModle chooseEmojiItem={chooseEmojiItem} />
      )}
    </div>
  );
};

export default memo(ExpandFooter);
