import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog, Icon, Tabs, TabPane, Img } from '@/components';
import { BetInput } from '@/pages/gameComponents/betInput';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import styles from './index.module.scss';
import { Obj, defaultAmount } from '@/constants';
import { betNumberList } from './const';
import { getGameConfigInfo, getGameSubTypeMap } from './index';
import { divide, isArray, isNoEmpty } from '@/utils/tools';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { GameMgr } from '@/engine/mgr/mgr';
import { BYTE, CreateArray, CreateObject } from '@/engine/base/basetype';
import CountDownTime from '@/pages/gameComponents/countDownTime';
import { useGameConfigStore } from '@/mobx';
import entertainedPng from '@/assets/image/common/entertained.png';
import { specialNumList } from '../games/classicGame/constFiles/constCommon';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

interface BetModelProps {
  gameWs: any;
  curGameId: number;
  onCancel?: Function;
  gameScen?: Obj;
  betPeriod?: any;
}

const CountTimeBox = observer(({ handleFun }: any) => {
  const { countTime } = useGameConfigStore();

  useEffect(() => {
    // 封盘中的操作
    if (typeof countTime === 'string') {
      handleFun && handleFun();
    }
  }, [countTime, handleFun]);

  if (typeof countTime === 'string') {
    return (
      <div className='bg-mask d-f jc-c ai-c p-a w-full h-full zi-middle'>
        <Img
          className={styles['entertained-png']}
          src={entertainedPng}
          isNoTheme
        />
      </div>
    );
  }
  return <></>;
});

// 把这个tabs单独做成组件用memo包裹下，避免该组件因为不相关的数据造成重复渲染
const OptionTabs = observer(
  (props: {
    handleClick: Function;
    getItememMultip: Function;
    betPeriod: string;
    subMainType: any;
    mainType: any;
  }) => {
    const { handleClick, getItememMultip, betPeriod, subMainType, mainType } =
      props;
    const [actId, setActId] = useState('1');
    const { keyArr } = useChangLongBetStore();
    const { formatMsg } = useLanguage();
    console.log({ keyArr });

    return (
      <Tabs type='tabs' activeId={actId} onClick={(t) => setActId(t.paneKey)}>
        {betNumberList.map((item) => (
          <TabPane
            key={item.paneKey}
            paneKey={item.paneKey}
            title={formatMsg(item.title)}
          >
            <div className={`d-f flex-w o-y ${styles['number-btn-box']}`}>
              {item.list.map((it, i) => (
                <NumberButton
                  onChange={(o) => handleClick({ ...o, ...it })}
                  className={`${styles['number-button']} ${it.cls}`}
                  size='small'
                  bottomTitle={getItememMultip(it)}
                  ballType={item.paneKey === '1' ? 'wcf' : 'none'}
                  topType={it.topType as any}
                  isActive={keyArr.includes(
                    `${mainType[it.mainType]}-${
                      subMainType[it.subTypeName][it.subMainType]
                    }-${Number(it.text) > -1 ? Number(it.text) : 255}`
                  )}
                  key={`${betPeriod}-${i}` || it.key}
                  title={it.text}
                />
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>
    );
  }
);

/**
 * 游戏操作弹窗真实的节点
 * @returns node
 */
const BetModel = observer((props: BetModelProps) => {
  const { onCancel, curGameId, gameScen, betPeriod, gameWs } = props;

  const { initOdds, moveOdds } = useGameConfigStore();

  // 借用长龙投注的mobx收集选中按钮的key
  const { changeKeyArr } = useChangLongBetStore();

  const [count, setCount] = useState(0);

  const [k, setK] = useState(0);

  const betInputRef = useRef(null);

  useEffect(
    () => () => {
      // 组件卸载清空保存的号码的key
      changeKeyArr([]);
    },
    [changeKeyArr]
  );

  // 获取筹码
  const betChip = useMemo(
    () => gameScen?.stGameConfig?.lBetChip || [],
    [gameScen?.stGameConfig?.lBetChip]
  );

  // 投注单条信息
  const tagDynamicMultiple = useMemo(() => {
    let tagDynamicMultiple = CreateArray(
      common.tagDynamicMultiple,
      [common.LEN_SSC_BET_COUNT],
      0,
      true
    );
    tagDynamicMultiple = [];
    return tagDynamicMultiple;
  }, []);

  // 主码
  const mainType = useMemo(
    () => getGameConfigInfo(curGameId, 'emBetMainType'),
    [curGameId]
  );

  // 子码
  const subMainType = useMemo(() => getGameSubTypeMap(curGameId), [curGameId]);

  // 下注的信息
  const betInfo = useMemo(() => {
    const placeBetInfo = CreateObject(common.CMD_C_PlaceBet);
    placeBetInfo.tagCommonBetInfo = [];
    placeBetInfo.tagSpecialMultiple = [];
    placeBetInfo.placeBetHead.cPeriodNumber.value = betPeriod;
    return placeBetInfo;
  }, [betPeriod]);

  // 获取当前赔率
  const getItememMultip = useCallback(
    (item: Obj) => {
      if (!betPeriod || !curGameId) return defaultAmount;
      // 常规赔率
      let va = '';
      // 特殊赔率
      let tva = '';
      const emmultipObj = getGameConfigInfo(curGameId, 'emMultipleType');
      // 初始化赔率
      va =
        `${divide(
          initOdds[emmultipObj[item.mutil]]?.value,
          common.GOLD_RATIO,
          null
        )}` || defaultAmount;

      item.mutilV = initOdds[emmultipObj[item.mutil]]?.value;
      if (item.tMutil) {
        tva = `/${divide(
          initOdds[emmultipObj[item.tMutil]]?.value,
          common.GOLD_RATIO,
          null
        )}`;
        item.mutilTV = [initOdds[emmultipObj[item.tMutil]]?.value];
      }

      // 有动态赔率时
      const moveOddsArr = moveOdds ? moveOdds.get(betPeriod) : [];
      if (isArray(moveOddsArr)) {
        moveOddsArr.forEach((moveOddItem) => {
          const cbMainType = moveOddItem.AreaInfo.cbBetMainType.value;
          const cbSubType = moveOddItem.AreaInfo.cbBetSubType.value;
          const cbNum = moveOddItem.AreaInfo?.cbNumber[0].value;

          // 数字号码球 '00'
          if (Number(item.text) > -1) {
            // 数字号码球 ： 主码、子码、数字号码
            if (
              mainType[item.mainType] === cbMainType &&
              subMainType[item.subTypeName][item.subMainType] === cbSubType &&
              Number(item.text) === cbNum
            ) {
              // 当前动态赔率下标是否是特殊赔率
              if (
                specialNumList(curGameId).includes(
                  moveOddItem.wMultipleID.value
                )
              ) {
                tva = `/${divide(
                  moveOddItem.dwMultiple.value,
                  common.GOLD_RATIO,
                  null
                )}`;
                item.mutilTV = [moveOddItem.dwMultiple.value];
              } else {
                va = `${divide(
                  moveOddItem.dwMultiple.value,
                  common.GOLD_RATIO,
                  null
                )}`;
                item.mutilV = moveOddItem.dwMultiple.value;
              }
            }
          } else if (
            mainType[item.mainType] === cbMainType &&
            subMainType[item.subTypeName][item.subMainType] === cbSubType
          ) {
            // 文字球 匹配主码+子码
            // 当前动态赔率下标是否是特殊赔率
            if (
              specialNumList(curGameId).includes(moveOddItem.wMultipleID.value)
            ) {
              tva = `/${divide(
                moveOddItem.dwMultiple.value,
                common.GOLD_RATIO,
                null
              )}`;
              item.mutilTV = [moveOddItem.dwMultiple.value];
            } else {
              va = `${divide(
                moveOddItem.dwMultiple.value,
                common.GOLD_RATIO,
                null
              )}`;
              item.mutilV = moveOddItem.dwMultiple.value;
            }
          }
        });
      }

      console.warn(tva);

      return (
        <span className='wds-sm-con color-red font-w-bolder'>
          {va}
          {/* {tva} */}
        </span>
      );
    },
    [betPeriod, curGameId, initOdds, moveOdds, mainType, subMainType]
  );

  // 点击单个注
  const handleClick = useCallback(
    (it) => {
      if (!betInfo || !curGameId) return false;
      const num = Number(it.text);
      const tagCommonBetInfoItem = CreateObject(common.tagCommonBetInfo);
      // 主码
      const mainTypeVal = mainType[it.mainType];
      // 子码
      const subMainTypeVal = subMainType[it.subTypeName][it.subMainType];
      if (it.active) {
        const emmultipObj = getGameConfigInfo(curGameId, 'emMultipleType');
        tagCommonBetInfoItem.AreaInfo.cbBetMainType.value = mainTypeVal;
        tagCommonBetInfoItem.AreaInfo.cbBetSubType.value = subMainTypeVal;
        tagCommonBetInfoItem.dwNormalMultiple.value = it.mutilV;

        if (num > -1) {
          tagCommonBetInfoItem.AreaInfo.cbNumber[0].value = num;
        }
        // 选中的号码保存到mobx中
        changeKeyArr((preArr) => [
          ...preArr,
          `${mainTypeVal}-${subMainTypeVal}-${tagCommonBetInfoItem.AreaInfo.cbNumber[0].value}`,
        ]);
        // 特殊赔率（特殊赔率的动态赔率会覆盖常规特殊赔率：1对1的关系
        console.warn({ mt: it.mutilTV });
        if (isNoEmpty(it.mutilTV) && isArray(it.mutilTV)) {
          // 特殊赔率
          it.mutilTV.forEach((tv) => {
            console.warn({ tv });
            // 特殊赔率单条结构体
            const tagDynamicMultipleItem = CreateObject(
              common.tagDynamicMultiple
            );
            tagDynamicMultipleItem.AreaInfo.cbBetMainType.value = mainTypeVal;
            tagDynamicMultipleItem.AreaInfo.cbBetSubType.value = subMainTypeVal;
            tagDynamicMultipleItem.wMultipleID.value = emmultipObj[it.tMutil]; // 特殊赔率的ID;
            tagDynamicMultipleItem.dwMultiple.value = tv;
            if (num > -1) {
              tagDynamicMultipleItem.AreaInfo.cbNumber[0].value = num;
            }
            tagDynamicMultiple.push(tagDynamicMultipleItem);
          });
        }

        console.log({ tagDynamicMultiple });
        betInfo.tagCommonBetInfo.push(tagCommonBetInfoItem);
        setCount((c) => c + 1);
      } else {
        // 取消选中时，要清掉该条数据
        const maxCount = getGameConfigInfo(curGameId, 'MAX_NUMBER_COUNT');
        const cbNumber = CreateArray(BYTE, [maxCount]);
        if (num > -1) {
          cbNumber[0].value = num;
        }
        // 选中的号码保存到mobx中
        changeKeyArr((preArr) => {
          const newArr = [];
          (preArr || []).forEach((key) => {
            if (
              key !== `${mainTypeVal}-${subMainTypeVal}-${cbNumber[0].value}`
            ) {
              newArr.push(key);
            }
          });
          return newArr;
        });
        const name = GameMgr.GetBetRecordDesc(
          curGameId,
          mainTypeVal,
          subMainTypeVal,
          cbNumber
        );
        const newUserBetInfo: common.tagCommonBetInfo[] = [];
        betInfo.tagCommonBetInfo.forEach((it, i) => {
          const curName = GameMgr.GetBetRecordDesc(
            curGameId,
            it.AreaInfo.cbBetMainType.value,
            it.AreaInfo.cbBetSubType.value,
            it.AreaInfo.cbNumber
          );
          if (name === curName) {
            newUserBetInfo.push(it);
            betInfo.tagCommonBetInfo.splice(i, 1);
            if (isArray(tagDynamicMultiple) && tagDynamicMultiple.length) {
              tagDynamicMultiple.forEach((its, index) => {
                const tName = GameMgr.GetBetRecordDesc(
                  curGameId,
                  its.AreaInfo.cbBetMainType.value,
                  its.AreaInfo.cbBetSubType.value,
                  its.AreaInfo.cbNumber
                );
                if (tName === curName) {
                  tagDynamicMultiple.splice(index, 1);
                }
              });
            }
          }
        });
        console.log({ maxCount, tagDynamicMultiple });
        setCount((c) => c - 1);
      }
      return true;
    },
    [
      betInfo,
      curGameId,
      tagDynamicMultiple,
      mainType,
      subMainType,
      changeKeyArr,
    ]
  );

  // 清除所有选中
  const onClear = useCallback(() => {
    if (typeof betInputRef?.current?.onResetData === 'function') {
      // 清除金额
      betInputRef?.current?.onResetData();
    }
    if (betInfo?.tagCommonBetInfo.length) {
      betInfo.tagCommonBetInfo = [];
      betInfo.tagSpecialMultiple = [];
      tagDynamicMultiple.length = 0;
    }
    changeKeyArr([]);
    setCount(0);
    setK((preK) => preK + 1);
  }, [betInfo, tagDynamicMultiple, changeKeyArr]);

  // 真实的下注操作
  const optionBet = useCallback(() => {
    if (!gameWs || !betPeriod) return;
    console.log({ tagDynamicMultiple });
    betInfo.placeBetHead.wBetCount.value = betInfo.tagCommonBetInfo.length;
    betInfo.placeBetHead.wMultipleCount.value = tagDynamicMultiple.length;
    const nameMapKey: Obj = {};
    betInfo.tagCommonBetInfo.map((it, i) => {
      const codeName = GameMgr.GetBetRecordDesc(
        curGameId,
        it.AreaInfo.cbBetMainType.value,
        it.AreaInfo.cbBetSubType.value,
        it.AreaInfo.cbNumber
      );
      nameMapKey[codeName] = i;
      return it;
    });
    if (isArray(tagDynamicMultiple) && tagDynamicMultiple.length) {
      const newTagSpecialMultiple = CreateArray(
        common.tagSpecialMultiple,
        [common.LEN_SSC_BET_COUNT],
        0,
        true
      );
      tagDynamicMultiple.forEach((it, i) => {
        const ocodeName = GameMgr.GetBetRecordDesc(
          curGameId,
          it.AreaInfo.cbBetMainType.value,
          it.AreaInfo.cbBetSubType.value,
          it.AreaInfo.cbNumber
        );
        newTagSpecialMultiple[i] = CreateObject(common.tagSpecialMultiple);
        newTagSpecialMultiple[i].dwMultiple.value = it.dwMultiple.value;
        newTagSpecialMultiple[i].wID.value = it.wMultipleID.value;
        newTagSpecialMultiple[i].wBetIndex.value = nameMapKey[ocodeName];
      });
      betInfo.tagSpecialMultiple = newTagSpecialMultiple;
    }
    console.log({ betInfo });
    gameWs.userBetScore(betInfo);
    onCancel && onCancel();
    onClear();
  }, [
    gameWs,
    betPeriod,
    betInfo,
    tagDynamicMultiple,
    onCancel,
    curGameId,
    onClear,
  ]);

  return (
    <div className={`w-full d-f fd-c jc-end o-none ${styles['bet-content']}`}>
      <div
        className={`bg-primary color-white h-150 d-f ai-c jc-sb p-0-50 ${styles['bet-content-title']}`}
      >
        <div />
        <div className='d-f fd-c'>
          <div className='t-h1 ta-c'>投注</div>
          <CountDownTime className='color-white t-main d-b ta-c' />
        </div>
        <Icon onClick={onCancel} className={styles['goback']} name='close' />
      </div>
      <div className='p-r bg-main'>
        <CountTimeBox handleFun={onClear} />
        <OptionTabs
          handleClick={handleClick}
          getItememMultip={getItememMultip}
          betPeriod={`${betPeriod}-${k}`}
          mainType={mainType}
          subMainType={subMainType}
        />
        <BetInput
          ref={betInputRef}
          betCount={count}
          onBetClick={optionBet}
          betChip={betChip}
          betPeriod={betPeriod}
          tagCommonBetInfo={betInfo.tagCommonBetInfo}
          tagDynamicMultiple={tagDynamicMultiple}
          curGameId={curGameId}
          onClear={onClear}
        />
      </div>
    </div>
  );
});

export const BetMainModel = (props: any) => {
  const dialogRef = useRef(null);
  const { formatMsg } = useLanguage();

  const onCancel = useCallback(() => {
    if (typeof dialogRef?.current?.onClose === 'function') {
      dialogRef?.current?.onClose();
    }
  }, []);

  return (
    <Dialog
      ref={dialogRef}
      sourceNode={props?.sourceNode}
      isFooter={false}
      isTitle={false}
      btnName={formatMsg('bet')}
      bodyClassname={`${styles['bet-dody']} w-full h-full`}
      contentCls='w-full h-full jc-end'
    >
      <BetModel {...props} onCancel={onCancel} />
    </Dialog>
  );
};
