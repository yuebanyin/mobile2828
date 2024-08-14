// 单双、大小露珠
import { memo, useMemo, useState } from 'react';
import { Tabs } from '@/components';
import { PearlDewPlate, handleBallType } from '@/pages/gameComponents';
import styles from './index.module.scss';
import { CMD_2801 } from '@/engine/game/28/2801/CMD_2801';
import { Obj } from '@/constants';
import { useLanguage } from '@/hooks';

export const searchList = [
  {
    text: 'TE',
    id: 1,
    dx: CMD_2801.emResultPosType.RPT_T_DX,
    ds: CMD_2801.emResultPosType.RPT_T_DS,
  },
  {
    text: 'DING_1',
    id: 2,
    dx: CMD_2801.emResultPosType.RPT_D1_DX,
    ds: CMD_2801.emResultPosType.RPT_D1_DS,
  },
  {
    text: 'DING_2',
    id: 3,
    dx: CMD_2801.emResultPosType.RPT_D2_DX,
    ds: CMD_2801.emResultPosType.RPT_D2_DS,
  },
  {
    text: 'DING_3',
    id: 4,
    dx: CMD_2801.emResultPosType.RPT_D3_DX,
    ds: CMD_2801.emResultPosType.RPT_D3_DS,
  },
];

const ballTypeTotal = {
  DS: {
    one: 'DAN',
    oneNum: 'fst',
    two: 'SHUANG',
    twoNum: 'sec',
  },
  DX: {
    one: 'DA',
    oneNum: 'thr',
    two: 'XIAO',
    twoNum: 'fr',
  },
};

interface DewdropTrayProps {
  ballType: 'DS' | 'DX';
  data: any[];
  gameType: number;
}

const DewdropTray = (props: DewdropTrayProps) => {
  const { data, ballType, gameType } = props;
  const [actId, setActId] = useState(1);
  const { formatMsg } = useLanguage();

  // 计算大、小、单、双总数
  const ballInfo = useMemo(() => {
    const posResObj: Obj = searchList.filter((it) => it.id === actId)[0] || {};
    return handleBallType({
      data,
      gameType,
      posResObj,
      assetKey: ballType === 'DS' ? 1 : 2,
    });
  }, [data, actId, ballType, gameType]);

  return (
    <div>
      <Tabs
        activeId={actId}
        onClick={(v) => setActId(v.id)}
        titleClassName='b-b-1 bc-split'
        searchList={searchList.map((it) => ({
          ...it,
          text: formatMsg(it.text),
        }))}
      />
      <div
        className={`m-0-50 d-f jc-sb ai-c wds-sm-title ${styles['big-road-box']}`}
      >
        <div>{formatMsg('BigRoad')}</div>
        <div className='d-f jc-sb ai-c wds-sm-con'>
          <div className='d-f jc-sb ai-c'>
            <div
              className={`bg-game-ball-red color-white m-r-10 br-half w-50 ta-c ${styles['big-road-title-ball']}`}
            >
              {formatMsg(ballTypeTotal[ballType].one)}
            </div>
            <div className='color-game-ball-red'>
              {ballInfo[ballTypeTotal[ballType].oneNum]}
            </div>
          </div>
          <div className='d-f jc-sb ai-c m-l-50'>
            <div
              className={`bg-game-ball-blue color-white m-r-10 br-half w-50 ta-c ${styles['big-road-title-ball']}`}
            >
              {formatMsg(ballTypeTotal[ballType].two)}
            </div>
            <div className='color-game-ball-blue'>
              {ballInfo[ballTypeTotal[ballType].twoNum]}
            </div>
          </div>
        </div>
      </div>
      <PearlDewPlate
        size='small'
        className={`m-0-50 d-f b-1 bc-split o-x ${styles['big-road-ball-box']}`}
        colNum={26}
        ballType='circle'
        sortType='ballType'
        data={ballInfo.ballData}
      />
      <div className={`m-0-50 wds-sm-title ${styles['big-road-box']}`}>
        {formatMsg('ZhupanRoad')}
      </div>
      <PearlDewPlate
        size='large'
        className={`m-0-50 o-none d-f b-1 bc-split ${styles['zp-road-ball-box']}`}
        data={ballInfo.ballData.slice(0, 50)}
        colNum={18}
      />
    </div>
  );
};

export default memo(DewdropTray);
