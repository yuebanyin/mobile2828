import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import './index.scss';
import leaderBoard2D1 from '@/assets/image/common/leaderBoard/leaderBoard-2d-1.png';
import leaderBoard2D2 from '@/assets/image/common/leaderBoard/leaderBoard-2d-2.png';
import leaderBoard2D3 from '@/assets/image/common/leaderBoard/leaderBoard-2d-3.png';
import leaderBoard3D1 from '@/assets/image/common/leaderBoard/leaderBoard-3d-1.png';
import leaderBoard3D2 from '@/assets/image/common/leaderBoard/leaderBoard-3d-2.png';
import leaderBoard3D3 from '@/assets/image/common/leaderBoard/leaderBoard-3d-3.png';
import leaderBoardIconBg1 from '@/assets/image/common/leaderBoard/leaderBoard-icon-bg-1.png';
import leaderBoardIconBg2 from '@/assets/image/common/leaderBoard/leaderBoard-icon-bg-2.png';
import leaderBoardIconBg3 from '@/assets/image/common/leaderBoard/leaderBoard-icon-bg-3.png';
import leaderBoardTopBg from '@/assets/image/common/leaderBoard/leaderBoard-top-bg.png';
import { Avatar, BgImg, Img } from '@/components';
import { getRankRankingList } from '@/services';
import { avatarOptions, avatarOptions1 } from '@/constants';
import { formatDigit } from '@/utils/tools';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

type LeaderBoardDto = {
  Rank: number;
  Win: number;
  GameName: string;
  RoomName: string;
  NickName: string;
  FaceId: number;
  TypeId?: string | number;
  GameId?: string | number;
};

const LeaderBoardName = (props: { data: LeaderBoardDto }) => {
  const { data } = props;
  const newName = useMemo(() => data?.NickName || '--', [data]);
  return <span>{newName}</span>;
};

const LeaderBoardWin = (props: { data: number }) => {
  const { data } = props;
  const newWin = useMemo(() => formatDigit(data, 0), [data]);
  return <span className='color-red'>{newWin}</span>;
};

const LeaderBoardAvatar = (props: {
  data: LeaderBoardDto;
  index: number;
  size: 110 | 120;
}) => {
  const { index, data, size } = props;
  const newAvatar = useMemo(() => {
    const temp = [...avatarOptions, ...avatarOptions1].find(
      (r) => r.id === data?.FaceId
    );
    return temp?.url || '';
  }, [data]);
  return (
    <>
      <div className={`d-f fd-c ai-c jc-c p-r lba-box-${size}`}>
        {index === 1 && (
          <BgImg
            isNoTheme
            url={leaderBoardIconBg1}
            className={`p-a lba-box-${size}`}
          />
        )}
        {index === 2 && (
          <BgImg
            isNoTheme
            url={leaderBoardIconBg2}
            className={`p-a lba-box-${size}`}
          />
        )}
        {index === 3 && (
          <BgImg
            isNoTheme
            url={leaderBoardIconBg3}
            className={`p-a lba-box-${size}`}
          />
        )}
        {newAvatar && (
          <Img
            isNoTheme
            className={`p-a lba-avatar-${size}`}
            src={newAvatar}
            alt=''
          />
        )}
      </div>
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const LeaderBoardButton = (props: {
  actIndex?: number;
  onChange: Function;
}) => {
  const { formatMsg } = useLanguage();
  const { onChange, actIndex = 0 } = props;
  const buttonList = [
    `${formatMsg('today')}`,
    `${formatMsg('yesterday')}`,
    `${formatMsg('aWeek')}`,
  ];
  const [act, setAct] = useState(actIndex);
  return (
    <>
      <div className='lbb-box'>
        <div className='lbb-bg' />
        <div className='d-f fd-r jc-c ai-c lbb-group'>
          {buttonList.map((r, i) => (
            <div
              key={r}
              className={`lbb-bt d-f fd-r ai-c jc-c ${
                act === i ? 'lbb-bt-active' : ''
              }`}
              onClick={() => {
                setAct(() => i);
                onChange && onChange(i);
              }}
            >
              {r}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const LeaderBoardRank = (props: { cup: 1 | 2 | 3; data?: LeaderBoardDto }) => {
  const { cup, data } = props;
  return (
    <>
      <div className='lbr-box'>
        {cup === 1 && (
          <BgImg isNoTheme url={leaderBoard3D1} className='lbr-img' />
        )}
        {cup === 2 && (
          <BgImg isNoTheme url={leaderBoard3D2} className='lbr-img' />
        )}
        {cup === 3 && (
          <BgImg isNoTheme url={leaderBoard3D3} className='lbr-img' />
        )}
        <LeaderBoardAvatar data={data} index={cup} size={120} />
        <div className='lbr-name'>
          <LeaderBoardName data={data} />
        </div>
        <div className='lbr-win '>
          <LeaderBoardWin data={data?.Win} />
        </div>
      </div>
    </>
  );
};

const LeaderBoardItem = (props: { data: LeaderBoardDto; index: number }) => {
  const { index, data } = props;
  const { formatMsg } = useLanguage();
  const [newData, setNewData] = useState(data);
  const { allGameList } = useGlobalStore();

  const buildIndexColor = useCallback((index: number) => {
    if (index === 0) return 'lbi-index-1';
    if (index === 1) return 'lbi-index-2';
    if (index === 2) return 'lbi-index-3';
    return '';
  }, []);

  const getGameItemObj = useCallback(
    (typeId?, gameId?) => {
      let gameItemObj;
      if (allGameList?.length > 0) {
        gameItemObj = allGameList.find(
          (item: any) =>
            Number(item?.TypeId) === Number(typeId) &&
            Number(item?.StrGameId) === Number(gameId)
        );
      }

      return formatMsg(gameItemObj?.Key);
    },
    [allGameList, formatMsg]
  );
  useEffect(() => {
    if (data) {
      const [GameName, RoomName] = getGameItemObj(
        data?.TypeId,
        data?.GameId
      ).split('/');
      setNewData((pre) => ({ ...pre, GameName, RoomName }));
    }
  }, [data, getGameItemObj]);

  return (
    <>
      <div className='lbi-box d-f fd-r ai-c'>
        <div className='flex-1 d-f fd-r ai-c jc-c p-10-0'>
          <div className='lbi-index'>
            {index === 0 && (
              <BgImg isNoTheme url={leaderBoard2D1} className='lbi-img' />
            )}
            {index === 1 && (
              <BgImg isNoTheme url={leaderBoard2D2} className='lbi-img' />
            )}
            {index === 2 && (
              <BgImg isNoTheme url={leaderBoard2D3} className='lbi-img' />
            )}
            <div className={`lbi-index-name ${buildIndexColor(index)}`}>
              <span>{index + 1}</span>
            </div>
          </div>
          <LeaderBoardAvatar data={data} index={index + 1} size={110} />
          <div className='d-f fd-c jc-c flex-1 p-20'>
            <div className='color-primary-text t-40'>{data?.NickName}</div>
            <div className='d-f fd-r m-t-10 t-small'>
              <span className='lbi-win'>{formatMsg('win')}</span>
              <LeaderBoardWin data={data?.Win} />
            </div>
          </div>
        </div>
        <div className='flex-none p-20 d-f fd-c jc-c color-primary-text t-40'>
          <span>{newData?.GameName}</span>
          {newData?.RoomName && (
            <span className='lbi-room ta-r'>
              <span>(</span>
              <span>{newData?.RoomName}</span>
              <span>)</span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

const LeaderBoard = () => {
  const [list, setList] = useState<LeaderBoardDto[]>([]);
  const [CurrentRank, setCurrentRank] = useState('0');
  const [CurrentWin, setCurrentWin] = useState(0);
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  const loadData = useCallback(
    (Id: number) => {
      console.log('🚀 ~ file: index.tsx:234 ~ loadData ~ Id:', Id);
      changeState('isLoading', true);
      getRankRankingList({ Id })
        .then((res: any) => {
          if (res.Code === 210 && res.Data) {
            setList(() => res.Data.List);
            setCurrentRank(() => res.Data.CurrentRank);
            setCurrentWin(() => res.Data.CurrentWin);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState]
  );

  useEffect(() => {
    console.log('LeaderBoard start');
    loadData(0);
  }, [loadData]);
  useEffect(
    () => () => {
      console.log('LeaderBoard end');
    },
    []
  );
  return (
    <>
      <LeaderBoardButton actIndex={0} onChange={(i) => loadData(i)} />
      <div className='lb-top-box'>
        <BgImg isNoTheme url={leaderBoardTopBg} className='lb-top-bg' />
        <div className='lbr-box-1'>
          <LeaderBoardRank cup={1} data={list[0]} />
        </div>
        <div className='lbr-box-2'>
          <LeaderBoardRank cup={2} data={list[1]} />
        </div>
        <div className='lbr-box-3'>
          <LeaderBoardRank cup={3} data={list[2]} />
        </div>
      </div>
      <div className='lb-list-box'>
        <div className='lb-list-tip'>{formatMsg('profitRanking')}</div>
        <div className='lb-list-header'>
          <div className='flex-5 p-20 ta-c'>{formatMsg('totalRevenue')}</div>
          <div className='flex-2 p-20 ta-c'>{formatMsg('bestGame')}</div>
        </div>
        {list.map((r, i) => (
          <LeaderBoardItem key={r.Rank} data={r} index={i} />
        ))}
      </div>
      <div className='lb-bottom-box d-f fd-r ai-c'>
        <Avatar className='lba-avatar-110' />
        <div className='flex-1 ta-c t-40'>
          <span className='lbi-win'>{formatMsg('win')}</span>
          <LeaderBoardWin data={CurrentWin} />
        </div>
        <div className='lb-rank t-40'>{CurrentRank}</div>
      </div>
    </>
  );
};

export default memo(LeaderBoard);

