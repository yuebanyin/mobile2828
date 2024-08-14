/**
 * 长龙组件子组件
 */
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import AWindow from '../../../../awindow/index';
import GameTime from '@/components/gameTime';
import { CountCLTimeBox } from '../../gameEntertained';
import { GameMgr } from '@/engine/mgr/mgr';
import { NumberButton } from '../../numberButton';
import { Obj } from '@/constants';
import { divide } from '@/utils/digit';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { PearlDewPlate, handleColor } from '../../pearlDewPlate';
import { isArray } from '@/utils/tools';
import { useLanguage } from '@/hooks';

interface CLItemProps {
  // 游戏id
  wKindID?: any;
  // 期号
  cPeriodNumber?: any;
  // 长龙主码
  cbChangLongMainType?: any;
  // 长龙子码
  cbChangLongSubType?: any;
  // 连开期数
  wSeriesCount?: any;
  // 游戏长链实例
  gameWs: any;
  // 赔率对象
  oddsObj?: Obj;
  // 按钮点击事件
  handleBtnClick?: Function;
  // 游戏历史记录
  history?: common.tagSSCChangLongInfoRecord;
}

export const ChidrenItem = observer((props: CLItemProps) => {
  const {
    wKindID,
    cPeriodNumber,
    cbChangLongMainType,
    cbChangLongSubType,
    wSeriesCount,
    oddsObj,
    handleBtnClick,
    gameWs,
    history,
  } = props;
  const { numKeyArr } = useChangLongBetStore();
  const [openBall, setOpenBall] = useState(false);
  const { formatMsg } = useLanguage();

  useEffect(() => {
    if (
      history?.cbChangLongMainType?.value === cbChangLongMainType?.value &&
      history?.wKindID?.value === wKindID?.value
    ) {
      setOpenBall(true);
    } else {
      setOpenBall(false);
    }
  }, [cbChangLongMainType?.value, history, wKindID?.value]);

  // 计算历史记录
  const balls = useMemo(() => {
    const ballList = [];
    if (history && isArray(history?.cbType)) {
      history.cbType.forEach((it) => {
        const [mt, text] = (
          GameMgr.CLSubTypeMap(
            wKindID.value,
            cbChangLongMainType.value,
            it.value
          ) || ''
        ).split('&');
        if (mt && text && text !== 'undefined') {
          ballList.push(text);
        }
      });
    }
    return ballList;
  }, [cbChangLongMainType.value, history, wKindID.value]);

  // 控制露珠盘是否展示，如果已展示就关闭，如果未展示就发送请求并展示
  const changeBallStatus = () => {
    if (!openBall) {
      gameWs?.queryLongDragonRecord(wKindID, cbChangLongMainType);
    } else {
      setOpenBall(false);
    }
  };

  const betName = useMemo(() => {
    const name = GameMgr.CLSubTypeMap(
      wKindID.value,
      cbChangLongMainType.value,
      cbChangLongSubType.value
    );
    if (name.indexOf('&') !== -1) {
      const [main, sub] = name.split('&');
      return `${formatMsg(main)}-${formatMsg(sub)}`;
    }
    return formatMsg(name);
  }, [
    cbChangLongMainType.value,
    cbChangLongSubType.value,
    formatMsg,
    wKindID.value,
  ]);

  const betNumberList = useMemo(
    () =>
      GameMgr.CLSubTypeMap(
        wKindID.value,
        cbChangLongMainType.value,
        cbChangLongSubType.value,
        true
      ),
    [cbChangLongMainType.value, cbChangLongSubType.value, wKindID.value]
  );

  return (
    <div className='bg-body br-30 p-r o-none' onClick={changeBallStatus}>
      <div className='p-r p-l-30 p-r-30 p-t-30'>
        <CountCLTimeBox gameId={wKindID?.value} />
        <div className='d-f ai-c jc-sb'>
          <div className='d-f fd-c'>
            <div className='wds-sm-title color-primary-text'>
              {AWindow.GameTypeList[wKindID.value]}
            </div>
            <div className='wds-sm-con color-con-ass m-t-10'>
              {cPeriodNumber.value}
              {formatMsg('qi')}
            </div>
            <div className='m-t-30 wds-sm-title color-primary'>{betName}</div>
          </div>
          <div className='flex-1 d-f fd-r jc-end'>
            {betNumberList.map((item, i) => {
              // 处理赔率
              const odd =
                oddsObj[
                  `${wKindID.value}-${cbChangLongMainType.value}-${cbChangLongSubType.value}`
                ] || {};
              let odds = null;
              if (odd?.dwNormalMultiple?.value) {
                odds = divide(
                  odd?.dwNormalMultiple?.value,
                  common.GOLD_RATIO,
                  null
                );
              }
              // if (odd?.dwSpecialMultiple?.value > 0) {
              //   odds = `${odds}/${divide(odd?.dwSpecialMultiple?.value, common.GOLD_RATIO, null)}`;
              // }

              return (
                <NumberButton
                  key={0 || i}
                  className='m-l-20 m-t-30'
                  topType='none'
                  title={item.title}
                  bottomTitle={odds}
                  isClBtn
                  onChange={({ active }) =>
                    handleBtnClick({
                      active,
                      ...item,
                      odds: odd?.dwNormalMultiple?.value,
                      tOdds: odd?.dwSpecialMultiple?.value,
                      gameId: wKindID.value,
                      cPeriodNumber: cPeriodNumber.value,
                    })
                  }
                  isActive={numKeyArr.includes(
                    `${wKindID.value}-${item.mainType}-${item.subMainType}`
                  )}
                />
              );
            })}
          </div>
        </div>
        <div className='flex-1 jc-sb d-f fd-r b-t-1 bc-split  p-20-30 m-t-30'>
          <div>
            <span>{formatMsg('continuousOpen')}</span>
            <span className='m-l-4 m-r-4'>{wSeriesCount?.value}</span>
            <span>{formatMsg('qi')}</span>
          </div>
          <div className='bg-main br-30 w-220 h-60 ai-c jc-c ta-c va-m'>
            <GameTime className='color-primary-text' gameId={wKindID?.value} />
          </div>
        </div>
      </div>
      <div className='w-full p-r d-f ai-c jc-sb'>
        <div className='w-full p-a zi-small ta-c top--10'>
          <span className='bg-yel p-a wds-explain-con p-l-10 p-r-10 br-10 color-primary-text font-w-bold'>
            pk
          </span>
        </div>
        <div className='w-half h-20 bg-game-ball-red br-b-l-30' />
        <div className='w-half h-20 bg-primary br-b-r-30' />
      </div>
      {openBall && (
        <div className='o-none d-f ai-c jc-sb p-t-10'>
          <div className='p-l-20 p-r-20'>
            {betNumberList.map((it) => (
              <div className='p-l-20 p-r-20 p-t-10 p-b-10 d-f ai-c'>
                <div className={`${handleColor(it.title)} br-half p-10`}>
                  {formatMsg(it.title)}
                </div>
                <div className='m-l-20 ta-l'>
                  {balls.filter((t) => t === it.title).length}
                </div>
              </div>
            ))}
          </div>
          <PearlDewPlate
            className='d-f b-1 bc-split o-x w-full'
            data={balls}
            sortType='ballType'
            size='small'
            colNum={14}
          />
        </div>
      )}
    </div>
  );
});
