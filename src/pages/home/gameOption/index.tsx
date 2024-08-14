// import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import i18n from 'i18next';
import { useSearchParams } from 'react-router-dom';
import { Button, Img, OutLink } from '@/components';
import styles from '../index.module.scss';
import { useGameConfigStore } from '@/mobx';
import { isArray } from '@/utils/tools';
// import { Obj } from '@/constants';
import { useLanguage, useNavigation } from '@/hooks';
import { getGameInfo } from '@/utils/game';

const getBgUrl = (levelId: number) => {
  if (levelId === 1) {
    return '/home/GameField/png1.png';
  }
  if (levelId === 2) {
    return '/home/GameField/png2.png';
  }
  return '/home/GameField/png3.png';
};

const GameOption = observer(() => {
  const { formatMsg } = useLanguage();
  const { gameList } = useGameConfigStore();
  const [searchParam] = useSearchParams();
  const navigate = useNavigation();
  const kindId = searchParam.get('gameId');
  const pageOrigin = searchParam.get('origin') || '';

  // const [roomList, setRoomList] = useState<Obj>();

  const { roomList } = getGameInfo(gameList, kindId);

  // 切换房间 ： 区分游戏内切和首页切
  const choseHouse = (item) => {
    if (pageOrigin === 'games') {
      navigate(
        `/home/pc28?gameId=${kindId}&houseId=${item.FieldId}&title=${item.FieldName}`,
        { replace: true }
      );
    } else {
      navigate(
        `/home/pc28?gameId=${kindId}&houseId=${item.FieldId}&title=${item.FieldName}`,
        { replace: true }
      );
    }
  };

  return (
    <>
      <div
        className={`w-full d-f h-115  ai-c jc-end m-t-30 m-b-30 ${styles['p-r-50']}`}
      >
        <Img
          className={`${styles['w-57']} ${styles['h-57']}`}
          src='/home/ruleIcon.png'
        />
        <OutLink
          href={`/home/gameOption/playRule/?id=${kindId}&title=${formatMsg(
            'gameplayRules'
          )}`}
        >
          <span className={`${styles['m-l-18']}`}>
            {i18n.t('gameplayRules')}
          </span>
        </OutLink>
      </div>
      <div className='o-y m-0-50'>
        {isArray(roomList) &&
          roomList?.map((item, i) => (
            <div
              key={`${i}1` || item.id}
              className='d-f fd-c ai-c jc-sb ta-c p-r m-b-30'
              onClick={() => choseHouse(item)}
            >
              <Img
                className={`w-980 ${styles['h-452']}`}
                src={getBgUrl(item.Level.LevelId)}
              />
              <div className={`p-a left-0 ${styles['rome-title']}`}>
                {item.FieldName}
              </div>
              <div className={`p-a left-0 ${styles['rome-sub-title']}`}>
                {item.Level.Title}
              </div>
              <div className={`p-a left-0 ${styles['rome-desc']}`}>
                {item.Level.Desc}
              </div>
              <div className='p-a right-0 m-t-30 m-r-30'>
                <OutLink
                  key={`${i}12` || item.id}
                  href={`/home/gameOption/playRule/?id=${
                    item.FieldId
                  }&title=${formatMsg(String(item.KindId))}`}
                  // href={`/home/gameOption/playRule/?id=${item.FieldId}&title=${item.Level.LevelName}`}
                >
                  <Button
                    className='w-full color-white'
                    type='hollow'
                    size='h-nano'
                    onClick={() => {
                      console.log(`Wade${item.Level.LevelName}`);
                    }}
                  >
                    {i18n.t('oddsDescription')}
                  </Button>
                </OutLink>
              </div>
            </div>
          ))}
      </div>
    </>
  );
});

export default GameOption;
