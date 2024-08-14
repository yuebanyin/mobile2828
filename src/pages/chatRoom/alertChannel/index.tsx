import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Img } from '@/components';
import { Obj } from '@/constants';
import GameMenuItemBox from '@/pages/gameComponents/gameMenuItemBox';
import { useWSInstanceStore, useGameConfigStore } from '@/mobx';
// import { useGameConfigStore } from '@/mobx';

const games = [
  {
    id: 'hot',
    text: 'hotPlay',
    src: '/chatroom/hotgames.png',
    class: 'color-alt-hot',
  },
  {
    id: 'pc28',
    text: 'PC28',
    src: '/chatroom/pc28.png',
    class: 'color-alt-pc28',
  },
  {
    id: 'classic',
    text: 'classicColors',
    src: '/chatroom/sixgames.png',
    class: 'color-alt-cla',
  },
];

// showChannel :'d-n' | 'd-b'
interface SwitchChannelProps {
  showChannel?: string;
  closeFun?: Function;
}
const SwitchChannel = memo((props: SwitchChannelProps) => {
  const { showChannel, closeFun } = props;
  const { t } = useTranslation();
  const { setGameIdMobx, houseLevelId, setHouseLevel, setFieldId } =
    useGameConfigStore();
  const { chatws } = useWSInstanceStore();

  // 关闭弹窗 选择大厅游戏项目 选择经典彩游戏是否考虑保存serverId fieldId
  // 6.19 useCallBack 修改
  const handleChoseGameItem = useCallback(
    (item?: Obj) => {
      closeFun({ className: 'd-n', gameName: item.KindName });
      if (item.KindId) {
        setGameIdMobx(item.KindId); // 大厅聊天室 mobx存取全局gameID
        if (item.Field.length === 1) {
          setHouseLevel(1);
          setFieldId(item.Field[0].Room.ServerId);
          chatws.selectGame(item.KindId, item.Field[0].Room.ServerId);
        } else {
          setFieldId(item.Field[houseLevelId - 1]?.Room.ServerId);
          chatws.selectGame(
            item.KindId,
            item.Field[houseLevelId - 1]?.Room.ServerId
          );
        }
      }
    },
    [chatws, closeFun, houseLevelId, setFieldId, setGameIdMobx, setHouseLevel]
  );

  return (
    <div
      className={`w-full h-full p-f top-0 o-y zi-large bg-mask ${showChannel}`}
    >
      <div className='h-full view-contain df-aic-jcc fd-c'>
        <div className='w-900 h-min-1064 br-30 bg-body p-20 m-t-30'>
          {games.map((item, i) => (
            <div
              key={item.id}
              className={`h-min-340 df-aic-jcsb b-b-2 p-30 ${
                i === games.length - 1 ? '' : ' bc-split'
              }`}
            >
              <div className='w-180 ta-c'>
                <Img className='icon-120 m-0-auto' src={item.src} />
                <div className={`wds-con ${item.class}`}>{t(item.text)}</div>
              </div>
              <GameMenuItemBox
                boxClass='w-560'
                className='w-260 h-130 m-t-20 m-l-20'
                {...item}
                onChose={handleChoseGameItem}
              />
            </div>
          ))}
        </div>
        <div className='m-t-60'>
          <Button
            className='icon-chat-150 bg-gdt-blue'
            onClick={handleChoseGameItem}
          >
            <Icon name='close' color='#fff' className='t-large-64' />
          </Button>
        </div>
      </div>
    </div>
  );
});

export default SwitchChannel;
