import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Cell, CellGroup } from '@/components';
import { useGameConfigStore } from '@/mobx';
import { useNavigation } from '@/hooks';

const GameRules = () => {
  // const initRef = useRef(false);
  const { gameList } = useGameConfigStore();
  // const [gameList, setGameList] = useState([]);
  const navigate = useNavigation();

  /**
   * @description: 跳转
   * @param {*} useCallback
   * @return {*}
   */
  const clickItem = useCallback(
    (it) => {
      // const it = gameList[index];
      navigate(`/mine/gameRules/detail?title=${it.KindName}`, { state: { kindId: it.KindId, name: it.KindName } });
    },
    [navigate]
  );

  return (
    <CellGroup className='m-t-30'>
      {gameList && gameList.map((item, index) => <Cell key={`${index}` || item.KindId} title={item.KindName} isDivider={index !== gameList.length - 1} onClick={() => clickItem(item)} />)}
    </CellGroup>
  );
};

export default observer(GameRules);
