/**
 * BetDialogCard 连码、生肖连、尾数连、全不中 禁止删除
 * @description pc跟注小弹窗
 * @param CMD_Chat.CMD_CRS_S_PlaceBet
 * @returns
 */
import { useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Input, Img, toastText } from '@/components';
import styles from './index.module.scss';
import { isArray, divide, multiply } from '@/utils/tools';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { GameMgr } from '@/engine/mgr/mgr';
import deletePng from '@/assets/image/common/delete-icon.png';
import AWindow from '../../../awindow/index';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

const BetDialogCardCL = () => {
  const { formatMsg } = useLanguage();
  const { filterBetInfo, betInfoArr, changeBetInfoArr, isChange } =
    useChangLongBetStore();

  const deleteItem = (it?: common.tagCommonBetInfo, gameId?: number) => {
    if (!isArray(betInfoArr)) return;
    let len = 0;
    betInfoArr.forEach((it) => {
      len += it.tagCommonBetInfo.length;
    });
    if (len > 1) {
      let betArr = [
        {
          mainType: it.AreaInfo.cbBetMainType.value,
          subMainType: it.AreaInfo.cbBetSubType.value,
        },
      ];
      filterBetInfo(gameId, betArr);
      betArr = null;
    } else {
      toastText(`${formatMsg('hasAlredLast')}`);
    }
  };

  // 注单的条数和金额
  const betLenOrValue = useMemo(() => {
    let len = 0;
    // 本金总额
    let v: number = 0;
    console.log(isChange);
    if (isArray(betInfoArr)) {
      betInfoArr.forEach((item) => {
        len += item.tagCommonBetInfo.length;
        if (item.tagCommonBetInfo.length) {
          for (
            let index = 0, len = item.tagCommonBetInfo.length;
            index < len;
            index += 1
          ) {
            // 赋值基础倍率
            if (item.tagCommonBetInfo[index].lBetScore.value) {
              v += Number(item.tagCommonBetInfo[index].lBetScore.value);
            }
          }
        }
      });
    }
    return {
      len,
      v: Number(divide(v, common.GOLD_RATIO, null).toFixedEx(2)),
    };
  }, [betInfoArr, isChange]);

  // 注单金额
  const changeValues = useCallback(
    (idx: number, i: number) => (e) => {
      changeBetInfoArr((betArr) => {
        const newBetArr = [];
        betArr.forEach((it, bidx) => {
          if (idx === bidx) {
            it.tagCommonBetInfo[i].lBetScore.value = Number(
              multiply(e, common.GOLD_RATIO, null)
            );
          }
          newBetArr.push(it);
        });
        return newBetArr;
      });
    },
    [changeBetInfoArr]
  );

  return (
    <>
      <div
        className={`color-white wds-h1 ta-c bg-gdt-top br-t-l-30 br-t-r-30 ${styles['bet-dialog-title']}`}
      >
        {formatMsg('bettingDetail')}
      </div>
      <div
        className={`wds-con d-f ai-c jc-sb b-b-1 bc-split p-b-16 p-r-50 p-l-50 ${styles['bet-content-title']}`}
      >
        <div className='ta-c flex-1'>{formatMsg('selectNumber')}</div>
        <div className='ta-c flex-1'>{formatMsg('odds')}</div>
        <div className='ta-c flex-1'>{formatMsg('amount')}</div>
      </div>
      <div
        className={`wds-con d-f fd-c b-b-1 bc-split flex-1 o-y p-r-50 p-l-50 ${styles['bet-list']}`}
      >
        {isArray(betInfoArr) &&
          betInfoArr.map((item, idx) => {
            if (
              isArray(item.tagCommonBetInfo) &&
              item.tagCommonBetInfo.length > 0
            ) {
              return item.tagCommonBetInfo.map((it, i) => {
                const codeName = GameMgr.GetBetRecordDesc(
                  item.placeBetHead.wKindID.value,
                  it.AreaInfo.cbBetMainType.value,
                  it.AreaInfo.cbBetSubType.value,
                  it.AreaInfo.cbNumber
                );
                const gameName =
                  AWindow.GameTypeList[
                    item.placeBetHead.wKindID.value.toString()
                  ];
                const [main, sub] = codeName.split('&');
                const name = `${formatMsg(main)}-${formatMsg(sub)}`;
                const tsm: common.tagSpecialMultiple =
                  item.tagSpecialMultiple.find(
                    (its) => its.wBetIndex.value === i
                  );
                return (
                  <div key={codeName} className='d-f ai-c jc-sb m-30-0'>
                    <div className='d-f ai-c fd-c'>
                      <div className='ta-c flex-1'>{`${gameName}`}</div>
                      <div className='ta-c flex-1'>{name}</div>
                    </div>
                    <div className='ta-c flex-1 p-r p-0-30'>
                      {it.dwNormalMultiple.value
                        ? Number(
                            divide(
                              it.dwNormalMultiple.value,
                              common.GOLD_RATIO,
                              null
                            ).toFixedEx(3)
                          )
                        : ''}
                      {item.placeBetHead.wKindID.value === 2903 && tsm ? (
                        <span>
                          /
                          {Number(
                            divide(
                              tsm.dwMultiple.value,
                              common.GOLD_RATIO,
                              null
                            ).toFixedEx(3)
                          )}
                        </span>
                      ) : (
                        ''
                      )}
                      <div className='color-con-ass p-a top-0 right-28'>x</div>
                    </div>
                    <div className='ta-c flex-1 d-f ai-c p-r jc-c'>
                      <span className='color-con-ass p-a left-0 top-0 zi-small'>
                        ￥
                      </span>
                      <div
                        className={`br-10 p-0-30 d-f ai-c o-none ${styles['bet-dialog-input']}`}
                      >
                        <Input
                          maxLength={7}
                          onChange={changeValues(idx, i)}
                          value={parseInt(
                            `${divide(
                              it.lBetScore.value,
                              common.GOLD_RATIO,
                              null
                            )}`,
                            10
                          )}
                          className='o-none p-0 ta-c'
                        />
                      </div>
                      <Img
                        onClick={() =>
                          deleteItem(it, item.placeBetHead.wKindID.value)
                        }
                        className={`${styles['delete-icon']} p-a right-0 top-0`}
                        src={deletePng}
                        isNoTheme
                      />
                    </div>
                  </div>
                );
              });
            }
            return null;
          })}
      </div>
      <div className='wds-con p-30 m-0-50'>
        <div className='m-t-20 ta-r'>
          {formatMsg('beted')}：
          <span className='color-red m-r-10'>{betLenOrValue.len}</span>
          {formatMsg('sumTotal')}
          <span className='color-red'>￥{betLenOrValue.v}</span>
        </div>
      </div>
    </>
  );
};

export default observer(BetDialogCardCL);
