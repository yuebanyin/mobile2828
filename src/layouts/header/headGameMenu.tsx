import { observer } from 'mobx-react-lite';
import { memo } from 'react';
import { Img } from '@/components';
import GameMenuItemBox from '@/pages/gameComponents/gameMenuItemBox';
import { useLanguage, useNavigation } from '@/hooks';
import { pc28 } from '@/constants';

const games = [
  {
    id: 'pc28',
    forward: 'PC',
    text: '28',
    src: '/chatroom/pc28.png',
    class: 'color-alt-pc28',
  },
  {
    id: 'classic',
    forward: 'jing',
    text: 'diancai',
    src: '/chatroom/sixgames.png',
    class: 'color-alt-cla',
  },
];
interface HeadGameMenuProps {
  className?: string;
  handleChose?: Function; // 选择游戏后回调函数
}

// const classicGamePathMap = {
//   2901: 'canadaPc',
//   2902: 'luckyAs',
//   2903: 'markSix',
//   2904: 'auTen',
//   2905: 'auFive',
//   3102: 'bitRacing',
//   3202: 'sloLuckyFive',
//   3203: 'canLuckyFive',
// };
//http://localhost:8080/#/home/gameOption?gameId=pc01

const HeadGameMenu = observer((props: HeadGameMenuProps) => {
  const { formatMsg } = useLanguage();
  const { className, handleChose } = props;
  const navigate = useNavigation();

  // 游戏聊天室选择完游戏的回调
  const handleChoseGame = (it) => {
    console.log(it);
    handleChose();
    // setGameIdMobx(it.KindId);
    // const pathKey = it.KindId;
    if (pc28.includes(it.KindId)) {
      navigate(`home/gameOption?gameId=${it.KindId}&origin=games`, {
        replace: true,
      });
    } else if (it.KindId === 2903) {
      // 2903-香港六合彩游戏单独处理
      navigate(`home/classic?gameId=${it.KindId}`, { replace: true });
      // navigate(`home/markSix?gameId=${it.KindId}`, { replace: true });
    } else {
      navigate(`home/classic?gameId=${it.KindId}`, { replace: true });
    }
  };
  return (
    <div
      className={`w-full h-full-head p-f bottom-0 zi-large bg-mask ${className}`}
    >
      <div className='p-a left-0 right-0 zi-large bg-main'>
        {games.map((item, i) => (
          <div
            key={item.text}
            className={`bg-body d-f p-30-50 ${
              i > 0 ? 'h-auto' : 'h-332 m-b-20'
            }`}
          >
            <div className='df-fdc jc-sa m-r-20 ta-c'>
              <div className={`w-140 ws-no ${item.class}`}>
                <span className='t-large'>{formatMsg(item.forward)}</span>
                <span className='t-main'>{formatMsg(item.text)}</span>
              </div>
              <Img className='icon-120 m-0-auto' src={item.src} />
            </div>
            <GameMenuItemBox
              className='w-260 h-130 m-l-10 m-b-20'
              {...item}
              onChose={handleChoseGame}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
export default memo(HeadGameMenu);

