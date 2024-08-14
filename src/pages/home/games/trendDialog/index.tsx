import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, Header, Button, Icon, Infiniteloading } from '@/components';
import { IconButton } from '@/pages/gameComponents/iconButton';
import styles from './index.module.scss';
import { formatDigit, isArray } from '@/utils/tools';
import { PearlDewPlate, handleBallType } from '@/pages/gameComponents';
import {
  tableTitles2901,
  ballTitle2901,
  ballType,
  tableTitles2902,
  ballTitle2902,
  ballAssetList,
  ballTitle2903,
  tableTitles2905,
  ballTitle2905,
  changlong,
  handleClData,
  ballTitle3501,
} from './const';
import { CMD_2905 } from '@/engine/game/pc/2905/CMD_2905';
import { GameMgr } from '@/engine/mgr/mgr';
import { Obj } from '@/constants';
import { geGameTsRecords } from '@/services';
import { useLanguage, useTableReducer } from '@/hooks';
import CL from './CL';
import { CustomNumberView } from './CustomNumberView';

interface TrendDialogProps {
  data: any[];
  gameType: number;
}

// 模块title
const TabsTitle = memo(({ onClick, titleArray = [], actId }: any) => {
  const { formatMsg } = useLanguage();
  return (
    <div className='w-full d-f ai-c wds-sm-title color-assist flex-w'>
      {titleArray.map((it) => (
        <div
          className={`${actId === it.key ? 'color-primary' : ''} ${
            it.cls || 'flex-1'
          } ta-c ${styles['title-item']}`}
          onClick={() => {
            typeof onClick === 'function' && onClick(it.key);
          }}
          key={it.key}
        >
          <span
            className={`${
              actId === it.key ? styles['title-item-act'] : ''
            } p-r zi-mini`}
          >
            {formatMsg(it.title)}
          </span>
        </div>
      ))}
    </div>
  );
});

// 开奖走势表格
const TrendTable = memo((props: any) => {
  const { data = [], gameType } = props;
  const [ballActId, setBallActId] = useState(1);
  const { formatMsg } = useLanguage();

  const onBallClick = useCallback((id) => {
    setBallActId(id);
  }, []);

  // 不同的游戏数据处理
  const getTableBodyData = (arr: any[], resTypeArr?: any[]) => {
    if (gameType === 2901) {
      return [...arr.slice(1), arr[0]];
    }
    if ([2902, 2904, 3102, 3202, 3203].includes(gameType)) {
      return arr;
    }
    if (gameType === 2905) {
      const value = CMD_2905.GetGameDnResultDesc(
        resTypeArr[CMD_2905.emResultPosType.RPT_NIU_DIAN].value
      );
      return [...arr, { value }];
    }
    return [];
  };

  // 展示大小、单双文字
  const getText = (info, resType, indexData) => {
    if (typeof info?.value === 'string' && gameType === 2905) {
      return <span>{info.value}</span>;
    }
    if (ballActId === 1) {
      // 号码
      return info?.value;
    }
    if (ballActId === 2) {
      // 大小
      const text = GameMgr.GetResultDesc(
        gameType,
        resType[indexData?.dx]?.value
      );
      return (
        <span
          className={`${
            text !== 'DA' ? 'color-game-ball-blue' : 'color-game-ball-red'
          }`}
        >
          {formatMsg(text)}
        </span>
      );
    }
    // 单双
    const text = GameMgr.GetResultDesc(gameType, resType[indexData?.ds]?.value);
    return (
      <span
        className={`${
          text === 'SHUANG' ? 'color-game-ball-blue' : 'color-game-ball-red'
        }`}
      >
        {formatMsg(text)}
      </span>
    );
  };

  // 通过判断游戏id 展示不同的页面内容
  const tableTitle = useMemo(() => {
    if (gameType === 2901) {
      return tableTitles2901;
    }
    if ([2902, 2904, 3102].includes(gameType)) {
      return tableTitles2902;
    }
    if (gameType === 2905) {
      return tableTitles2905;
    }
    // 区别2905  无牛展示
    if (gameType === 3202 || gameType === 3203) {
      return tableTitles2905.slice(0, 6);
    }
    return [];
  }, [gameType]);

  return (
    <>
      <TabsTitle
        actId={ballActId}
        onClick={onBallClick}
        titleArray={ballType}
      />
      <div
        className={`b-1 bc-split ${styles['trend-table-wrap']} m-0-auto o-none m-b-20`}
      >
        <div className='d-f ai-c bg-incon color-game-ass wds-con ta-c'>
          {tableTitle.map((it) => (
            <div className={styles['trend-table-title-td']} key={`${it.key}`}>
              {formatMsg(it.title)}
            </div>
          ))}
        </div>
        {data.map((it, i) => (
          <div
            key={it?.szPeriodNumber?.value || `${i}`}
            className={`d-f ai-c ${
              i % 2 === 0 ? 'bg-body' : 'bg-incon'
            } color-game-ass wds-con ta-c`}
          >
            <div className={styles['trend-table-body-td']}>
              {`${it?.szPeriodNumber?.value}`.slice(-4)}
            </div>
            {isArray(it.cbTableCard) &&
              getTableBodyData(it.cbTableCard, it.cbResultType).map(
                (its, i) => (
                  <div
                    className={`${styles['trend-table-body-td']} color-primary-text`}
                  >
                    {getText(its, it.cbResultType, tableTitle[i + 1])}
                  </div>
                )
              )}
          </div>
        ))}
      </div>
    </>
  );
});

// 珠露盘
export const BigSmallBall = memo((props: any) => {
  const { data, gameType } = props;
  const { formatMsg } = useLanguage();
  // 第几球
  const [ballActId, setBallActId] = useState(
    [2903, 3402].includes(gameType) ? 2 : 1
  );
  // 大小2、单双1
  const [assetKey, setAssetKey] = useState(1);

  const ballTitleArr = useMemo(() => {
    if (gameType === 2901) {
      return ballTitle2901;
    }
    if ([2902, 2904, 3102].includes(gameType)) {
      return ballTitle2902;
    }
    if ([2903, 3402].includes(gameType)) {
      // if (gameType === 2903) {
      return ballTitle2903;
    }
    if (gameType === 2905) {
      return ballTitle2905;
    }
    // 区别2905  无牛展示
    if (gameType === 3202 || gameType === 3203) {
      return ballTitle2905.slice(0, 5);
    }
    if (gameType === 3501) {
      return ballTitle3501;
    }
    return [];
  }, [gameType]);

  // 计算大、小、单、双总数
  const ballInfo = useMemo(() => {
    // 通过key获取当前的配置
    const posResObj: Obj =
      ballTitleArr.filter((it) => it.key === ballActId)[0] || {};
    return handleBallType({
      data,
      posResObj,
      gameType,
      assetKey,
    });
  }, [data, ballActId, gameType, assetKey, ballTitleArr]);

  const onBallClick = useCallback((id) => {
    setBallActId(id);
  }, []);

  return (
    <>
      <TabsTitle
        actId={ballActId}
        titleArray={ballTitleArr}
        onClick={onBallClick}
      />
      <div
        className={`${styles['trend-ball-wrap']} m-0-auto o-none m-b-20 d-f`}
      >
        <div className={`d-f fd-c ${styles['ball-asset']} wds-sm-con`}>
          {ballAssetList.map((it) => (
            <div
              onClick={() => setAssetKey(it.key)}
              key={it.key}
              className={`${styles['ball-asset-item']} ${
                assetKey === it.key ? 'bg-main' : ''
              }`}
            >
              <div className='d-f ai-c jc-sb'>
                <div
                  className={`${styles['mid-ball']} font-w-bold ta-c  ${
                    assetKey !== it.key
                      ? 'bg-gdt-whgray color-game-ball-red bs-ball'
                      : 'color-white bg-gdt-red'
                  }`}
                >
                  {formatMsg(it.one)}
                </div>
                <div>{ballInfo[it.oneKey]}</div>
              </div>
              <div className='d-f ai-c jc-sb m-t-24'>
                <div
                  className={`${styles['mid-ball']} font-w-bold ta-c  ${
                    assetKey !== it.key
                      ? 'bg-gdt-whgray color-game-ball-blue bs-ball'
                      : 'color-white bg-gdt-purple'
                  }`}
                >
                  {formatMsg(it.two)}
                </div>
                <div>{ballInfo[it.twoKey]}</div>
              </div>
            </div>
          ))}
        </div>
        <PearlDewPlate
          className='d-f b-1 bc-split o-none'
          colNum={14}
          data={ballInfo.ballData}
        />
      </div>
    </>
  );
});

// 长龙排行、最近交易
const ClOnlyTs = memo((props: any) => {
  const { data, gameType } = props;
  const [ballActId, setBallActId] = useState(1);
  const [renData, setRenData] = useState(null);
  const infinyeloadRef = useRef<any>();
  const [{ data: tableData, isMore, pageIndex, params }, dispatch] =
    useTableReducer();
  const { formatMsg } = useLanguage();

  // 处理长龙的逻辑
  const handleCLData = useCallback(() => {
    if (ballActId !== 1) return;
    const arr = handleClData(data);
    setRenData(arr);
  }, [data, ballActId]);

  // 获取最近交易的数据
  const getTsData = useCallback(
    (pi?: number, preD?: any[]) => {
      if (ballActId === 2) {
        geGameTsRecords({
          KindId: gameType,
          PageIndex: pi || pageIndex,
          PageSize: 15,
        })
          .then((res: any) => {
            if (isArray(res?.Data)) {
              dispatch({
                type: 'success',
                payload: {
                  data: preD ? preD.concat(res?.Data) : res?.Data,
                  isMore:
                    res?.Count >
                    (preD ? preD.concat(res?.Data).length : res?.Data.length),
                  total: res?.Count,
                  params: { pageIndex: pi || pageIndex },
                },
              });
            } else {
              dispatch({ type: 'error' });
            }
          })
          .catch(() => {
            dispatch({ type: 'error' });
          });
      }
    },
    [ballActId, dispatch, gameType, pageIndex]
  );

  const getChildrenDom = () => {
    if (ballActId === 1) {
      // 长龙
      if (renData && renData.length > 0) {
        return <CL renData={renData} gameType={gameType} />;
      }
    }
    if (ballActId === 2) {
      // 最近交易
      if (tableData && tableData.length > 0) {
        return (
          <div id='ts-refreshScroll' className='d-f flex-1 fd-c o-y'>
            <div className='d-f ai-c p-16-0 color-assist wds-con bg-incon'>
              <div className='flex-1 ta-c'>时间</div>
              <div className='flex-1 ta-c'>详情</div>
            </div>
            <Infiniteloading
              hasMore={isMore}
              ref={infinyeloadRef}
              containerId='ts-refreshScroll'
              loadMore={() => getTsData(params?.pageIndex + 1, tableData)}
            >
              {tableData.map((it, i) => {
                const codeName = GameMgr.GetBetRecordDesc(
                  gameType,
                  it.BetMainType,
                  it.BetSubType,
                  it.BetNumber
                );
                let name = '';
                if (codeName.indexOf('&') !== -1) {
                  const [s, e] = codeName.split('&');
                  name = `${formatMsg(s)}-${formatMsg(e)}`;
                } else {
                  name = formatMsg(codeName);
                }
                return (
                  <div
                    key={`${i}` || it.Data}
                    className={`d-f ai-c wds-sm-con color-primary-text p-20 ${
                      i % 2 !== 0 ? 'bg-alternate' : 'bg-body'
                    }`}
                  >
                    <div className='flex-1 ta-c'>
                      {it.Date && `${it.Date}`.slice(5)}
                    </div>
                    <div className={`flex-1 ${styles['ts-item-right']}`}>
                      <div>
                        <span>期数:</span>
                        <span className='m-l-20'>{it.PeriodId}</span>
                      </div>
                      <div className='m-t-10'>
                        <span>{name}</span>
                        <span>:</span>
                        <span className='m-l-20'>
                          <span className='m-r-20'>{it.NormalMultiple}</span>
                          {it?.SpecialMultiple?.map((idx, i) => (
                            <span key={`${i + 1}`}>{`/${idx}`}</span>
                          ))}
                        </span>
                      </div>
                      <div className='m-t-10'>
                        <span>金额:</span>
                        <span className='color-red m-l-20'>
                          {formatDigit(it.BetScore)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Infiniteloading>
          </div>
        );
      }
    }
    return (
      <div
        className={`bg-main w-full d-f ai-c jc-c ta-c wds-sm-title color-assist ${styles['cl-empty-box']}`}
      >
        暂无数据
      </div>
    );
  };

  useEffect(() => {
    handleCLData();
    getTsData();
  }, [handleCLData, getTsData]);

  console.log({ renData, data, isMore });

  const onBallClick = useCallback((id) => {
    setBallActId(id);
  }, []);

  return (
    <>
      <TabsTitle
        titleArray={changlong}
        actId={ballActId}
        onClick={onBallClick}
      />
      {getChildrenDom()}
    </>
  );
});

const TrendDialog = (props: TrendDialogProps) => {
  const { data, gameType } = props;
  const trendDialogRef = useRef(null);

  // 关闭弹窗
  const onClose = useCallback(() => {
    if (trendDialogRef?.current) {
      trendDialogRef.current.onClose();
    }
  }, []);

  // 构建号码趋势
  const buildTabsNumber = useCallback(() => {
    if (gameType === 2903 || gameType === 3402) return <></>;
    if (gameType === 3501) {
      return (
        <CustomNumberView
          gameType={gameType}
          data={isArray(data) ? data.slice(0, 5) : []}
        />
      );
    }
    return (
      <TrendTable
        gameType={gameType}
        data={isArray(data) ? data.slice(0, 5) : []}
      />
    );
  }, [gameType, data]);

  // 构建露珠趋势
  const buildTabsBall = useCallback(
    () => (
      <BigSmallBall
        gameType={gameType}
        data={isArray(data) ? data.slice(0, 50) : []}
      />
    ),
    [gameType, data]
  );

  // 构建长龙趋势
  const buildTabsChangLong = useCallback(
    () => <ClOnlyTs gameType={gameType} data={data} />,
    [gameType, data]
  );

  return (
    <Dialog
      bodyClassname={`${styles['trend-body']} w-full h-full bg-body o-none`}
      contentCls='w-full h-full p-r'
      isFooter={false}
      isTitle={false}
      ref={trendDialogRef}
      sourceNode={
        <IconButton
          className='m-r-15'
          title='走势'
          iconClass={styles.icon}
          icon='/home/GameField/zs.png'
        />
      }
    >
      <Header autoClose={onClose} title='开奖走势' />
      {buildTabsNumber()}
      {buildTabsBall()}
      {buildTabsChangLong()}
      <div className={`${styles['close-png']} p-a zi-large`}>
        <Button
          className='icon-chat-150 m-0-auto bg-gdt-blue'
          onClick={onClose}
        >
          <Icon name='close' color='#fff' className='t-large-64' />
        </Button>
      </div>
    </Dialog>
  );
};

export default memo(TrendDialog);
