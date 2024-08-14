/**
 * BetDialogCard
 * @description pc跟注小弹窗
 * @param CMD_Chat.CMD_CRS_S_PlaceBet
 * @returns
 */
import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { Input, Img, toastText } from '@/components';
import styles from './index.module.scss';
import { isArray, divide, sum, minus, multiply } from '@/utils/tools';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { GameMgr } from '@/engine/mgr/mgr';
import deletePng from '@/assets/image/common/delete-icon.png';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

interface BetDialogCardProps {
  wKindID: {
    value: number;
  };
  tagCommonBetInfo: common.tagCommonBetInfo[];
  cPeriodNumber: {
    value: string;
  };
  tagDynamicMultiple: common.tagDynamicMultiple[];
}

const BetDialogCard = (props: BetDialogCardProps) => {
  const { formatMsg } = useLanguage();
  const { cPeriodNumber, tagCommonBetInfo, wKindID, tagDynamicMultiple } =
    props;
  const [betList, setBetList] = useState([]);
  const { changeKeyArr } = useChangLongBetStore();

  useEffect(() => {
    setBetList([...tagCommonBetInfo]);
  }, [tagCommonBetInfo]);

  const deleteItem = (
    index: number,
    name: string,
    it?: common.tagCommonBetInfo
  ) => {
    if (!isArray(betList)) return;
    if (betList.length > 1) {
      changeKeyArr((preKeys) => {
        const newKeys = [];
        (preKeys || []).forEach((key) => {
          if (`${key}`.split('').filter((c) => c === '-').length === 1) {
            // 3102 冠亚组合
            if (
              key !==
              `${it.AreaInfo.cbNumber[0].value}-${it.AreaInfo.cbNumber[1].value}`
            ) {
              newKeys.push(key);
            }
          } else if (
            `${it.AreaInfo.cbBetMainType.value}-${it.AreaInfo.cbBetSubType.value}-${it.AreaInfo.cbNumber[0].value}` !==
            key
          ) {
            newKeys.push(key);
          }
        });
        return newKeys;
      });
      setBetList((list) => {
        list.splice(index, 1);
        tagCommonBetInfo.splice(index, 1);
        return [...list];
      });
      if (name) {
        tagDynamicMultiple.forEach((item, i) => {
          const codeName = GameMgr.GetBetRecordDesc(
            wKindID.value,
            item.AreaInfo.cbBetMainType.value,
            item.AreaInfo.cbBetSubType.value,
            item.AreaInfo.cbNumber
          );
          if (name === codeName) {
            tagDynamicMultiple.splice(i, 1);
          }
        });
      }
    } else {
      toastText(`${formatMsg('hasAlredLast')}`);
    }
  };

  // 注单的条数和金额
  const betLenOrValue = useMemo(() => {
    let len = 0;
    // 本金总额
    let v: number = 0;
    // 奖金
    let bonus: string | number = '0.00';
    // 盈利
    let profit: string | number = '0.00';

    if (isArray(betList)) {
      len = betList.length;
      v = 0;
      bonus = 0;
      betList.forEach((item) => {
        // const codeName = GameMgr.GetBetRecordDesc(wKindID.value, item.AreaInfo.cbBetMainType.value, item.AreaInfo.cbBetSubType.value, item.AreaInfo.cbNumber);
        // 赋值基础倍率
        const dwns = Number(
          divide(item.dwNormalMultiple.value, common.GOLD_RATIO, null)
        );
        // 如果特殊倍率存在，就除以特殊倍率

        // if (isArray(tagDynamicMultiple) && tagDynamicMultiple.length > 0) {
        //   for (let i = 0, len = tagDynamicMultiple?.length; i < len; i += 1) {
        //     const ocodeName = GameMgr.GetBetRecordDesc(
        //       wKindID.value,
        //       tagDynamicMultiple[i].AreaInfo.cbBetMainType.value,
        //       tagDynamicMultiple[i].AreaInfo.cbBetSubType.value,
        //       tagDynamicMultiple[i].AreaInfo.cbNumber
        //     );
        //     const sv = tagDynamicMultiple[i].dwMultiple.value;
        //     if (ocodeName === codeName && dwns > 0 && sv > 0) {
        //       dwns = Number(divide(dwns * common.GOLD_RATIO, sv, 4));
        //     }
        //   }
        // }

        if (item.lBetScore.value) {
          v += Number(item.lBetScore.value);
          // 如果倍率存在就乘以对应的本金
          if (dwns > 0) {
            const socre = divide(item.lBetScore.value, common.GOLD_RATIO, null);
            bonus = +sum(bonus, multiply(dwns, socre, null), null);
          }
        }
      });

      profit = Number(
        minus(bonus, divide(v, common.GOLD_RATIO, null), null).toFixedEx(2)
      );
    }
    return {
      len,
      v: Number(divide(v, common.GOLD_RATIO, null).toFixedEx(2)),
      bonus: Number(divide(bonus, 1, null).toFixedEx(2)),
      profit,
    };
  }, [betList]);

  // 注单金额
  const changeValues = useCallback(
    (name) => (e) => {
      tagCommonBetInfo.map((item) => {
        const codeName = GameMgr.GetBetRecordDesc(
          wKindID.value,
          item.AreaInfo.cbBetMainType.value,
          item.AreaInfo.cbBetSubType.value,
          item.AreaInfo.cbNumber
        );

        if (name === codeName) {
          item.lBetScore.value = Number(multiply(e, common.GOLD_RATIO, null));
        }
        return item;
      });
      setBetList((list) => {
        list.map((item) => {
          const codeName = GameMgr.GetBetRecordDesc(
            wKindID.value,
            item.AreaInfo.cbBetMainType.value,
            item.AreaInfo.cbBetSubType.value,
            item.AreaInfo.cbNumber
          );
          if (name === codeName) {
            item.lBetScore.value = Number(multiply(e, common.GOLD_RATIO, null));
          }
          return item;
        });
        return [...list];
      });
    },
    [tagCommonBetInfo, wKindID.value]
  );

  return (
    <>
      <div
        className={`color-white wds-h1 ta-c bg-gdt-top br-t-l-30 br-t-r-30 ${styles['bet-dialog-title']}`}
      >
        {formatMsg('sureOrder')}
        {cPeriodNumber.value}
        {formatMsg('qi')}
      </div>
      <div
        className={`wds-con d-f ai-c jc-sb b-b-1 bc-split p-b-16 p-r-50 p-l-50 ${styles['bet-content-title']}`}
      >
        <div className='ta-c flex-1'>{formatMsg('selectNumber')}</div>
        <div className='ta-c flex-1'>{formatMsg('odds')}</div>
        <div className='ta-c flex-1'>{formatMsg('amount')}</div>
      </div>
      <div
        className={`wds-con d-f fd-c b-b-1 bc-split flex-1 o-y p-r-50 p-l-50 p-t-20 p-b-20 ${styles['bet-list']}`}
      >
        {isArray(betList) &&
          betList.map((it, i) => {
            const codeName = GameMgr.GetBetRecordDesc(
              wKindID.value,
              it.AreaInfo.cbBetMainType.value,
              it.AreaInfo.cbBetSubType.value,
              it.AreaInfo.cbNumber
            );
            // 获取主码对应的文字
            const [main, sub, other] = codeName.split('&');
            // 有这几项的不展示删除图标
            const isDel = !['LM', 'SXL', 'WSL', 'QBZ'].includes(main);
            const name = other
              ? `${formatMsg(main)}-${formatMsg(sub)}-${other}`
              : `${formatMsg(main)}-${formatMsg(sub)}`;

            const tsm = isArray(tagDynamicMultiple)
              ? tagDynamicMultiple.filter((its) => {
                  const ocodeName = GameMgr.GetBetRecordDesc(
                    wKindID.value,
                    its.AreaInfo.cbBetMainType.value,
                    its.AreaInfo.cbBetSubType.value,
                    its.AreaInfo.cbNumber
                  );
                  return codeName === ocodeName;
                })
              : [];

            return (
              <div
                key={`${codeName + i}`}
                className={`d-f ai-c jc-sb ${
                  i === betList.length - 1 ? '' : 'm-b-30'
                }`}
              >
                <div className='ta-c flex-1 p-15-0'>{name}</div>
                <div className='ta-c flex-1 d-f jc-sb ai-c p-15-0'>
                  <div className='flex-1 ta-c d-f jc-c'>
                    {/* 常规赔率 */}
                    {it.dwNormalMultiple.value
                      ? Number(
                          divide(
                            it.dwNormalMultiple.value,
                            common.GOLD_RATIO,
                            null
                          ).toFixedEx(3)
                        )
                      : ''}
                    {/* 特殊赔率 */}
                    {/* {wKindID.value === 3501
                      ? tagDynamicMultiple.map((its: common.tagDynamicMultiple, index: number) => (
                        <span key={0 || index}>
                          /
                          {Number(divide(its.dwMultiple.value, common.GOLD_RATIO, null).toFixedEx(3))}
                        </span>
                        ))
                      : isArray(tsm)
                        && tsm.length > 0
                        && tsm.map((its: common.tagDynamicMultiple, index: number) => (
                          <span key={0 || index}>
                            /
                            {Number(divide(its.dwMultiple.value, common.GOLD_RATIO, null).toFixedEx(3))}
                          </span>
))} */}
                    {wKindID.value === 2903 &&
                      isArray(tsm) &&
                      tsm.length > 0 &&
                      tsm.map(
                        (its: common.tagDynamicMultiple, index: number) => (
                          <span key={0 || index}>
                            /
                            {Number(
                              divide(
                                its.dwMultiple.value,
                                common.GOLD_RATIO,
                                null
                              ).toFixedEx(3)
                            )}
                          </span>
                        )
                      )}
                  </div>
                  <div className='color-con-ass m-0-10'>x</div>
                </div>
                <div
                  className={`ta-c flex-1 d-f br-10 ai-c jc-sb bg-incon ${styles['bet-dialog-input-box']} m-r-20`}
                >
                  <span className='color-con-ass'>￥</span>
                  <div
                    className={`br-10 d-f ai-c flex-1 o-none ${styles['bet-dialog-input']}`}
                  >
                    <Input
                      maxLength={7}
                      onChange={changeValues(codeName)}
                      value={parseInt(
                        `${divide(
                          it.lBetScore.value,
                          common.GOLD_RATIO,
                          null
                        )}`,
                        10
                      )}
                      className='o-none p-0 ta-c bg-incon'
                    />
                  </div>
                </div>
                {isDel && (
                  <Img
                    onClick={() =>
                      deleteItem(i, tsm.length ? codeName : '', it)
                    }
                    className={`${styles['delete-icon']}`}
                    src={deletePng}
                    isNoTheme
                  />
                )}
              </div>
            );
          })}
      </div>
      <div className='wds-con p-30 m-0-50'>
        {![2902, 2903, 2904, 2905, 3501].includes(wKindID?.value) && (
          <div className='color-con-ass ta-r'>
            {formatMsg('winBouns')}
            <span className='color-red'>￥{betLenOrValue.bonus}</span>，
            {formatMsg('profit')}
            <span className='color-red'>￥{betLenOrValue.profit}</span>
          </div>
        )}
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

export default memo(BetDialogCard);
