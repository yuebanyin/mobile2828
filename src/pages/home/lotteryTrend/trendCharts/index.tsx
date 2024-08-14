/**
 * 走势图表开发
 */
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGlobalStore } from '@/mobx';
import { getSscHistoryRecordList } from '@/services';
import { isArray } from '@/utils/tools';
import { ColorfulBall } from '@/pages/gameComponents';
import styels from './index.module.scss';
import { toastText } from '@/components';
// import { getGameInfo } from '@/utils/game';
import { useLanguage } from '@/hooks';

// const ballArr = [
//   { id: 1, text: '特码' },
//   { id: 2, text: '第一球' },
//   { id: 3, text: '第二球' },
//   { id: 4, text: '第三球' },
// ];

const TrendCharts = () => {
  const [data, setData] = useState(null);
  // const { gameList } = useGameConfigStore();
  const { changeState } = useGlobalStore();
  const [searchParam] = useSearchParams();
  const kindId = searchParam.get('gameId');
  const [actId, setActId] = useState(1);
  // 获取canvas的宽高
  const [wh, setWh] = useState({ w: 0, h: 0 });
  // 获取坐标集合
  const posArrRef = useRef([]);
  const [posMap, setPosMap] = useState(null);
  // canvas 距离顶部和左边的距离
  const [topLeft, setTopLeft] = useState(null);
  // canvas 节点，画图用
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // 用来计算canvas 的总高度
  const canvasHRef = useRef<HTMLDivElement | null>(null);
  // 获取单个数字盒子宽度，用来计算canvas的总宽度
  const canvasWRef = useRef<HTMLDivElement | null>(null);
  // 用来获取canvas 距离左边的距离
  const canvasLRef = useRef<HTMLUListElement | null>(null);
  const { formatMsg } = useLanguage();

  const ballArr = [
    { id: 1, text: `${formatMsg('TE')}` },
    { id: 2, text: `${formatMsg('DING_1')}` },
    { id: 3, text: `${formatMsg('DING_2')}` },
    { id: 4, text: `${formatMsg('DING_3')}` },
  ];
  // const { fieldInfo } = getGameInfo(gameList, 2902);

  // 获取游戏Id
  const id = useMemo(() => {
    if (kindId) {
      return Number(kindId);
    }
    return null;
  }, [kindId]);

  // 获取数据
  useEffect(() => {
    if (id) {
      changeState('isLoading', true);
      getSscHistoryRecordList({ id })
        .then((res: any) => {
          if (isArray(res?.Data)) {
            setData(res.Data);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [id, changeState]);

  // 获取canvas 的宽高
  useEffect(() => {
    if (!data) return;
    if (canvasHRef?.current?.offsetHeight > 0) {
      setWh((preO) => ({ ...preO, h: canvasHRef?.current?.offsetHeight }));
    }
    if (canvasWRef?.current?.offsetWidth > 0) {
      const p = canvasWRef?.current?.getBoundingClientRect();
      setWh((preO) => ({
        ...preO,
        w: actId === 1 ? p.width * 28 : p.width * 10,
      }));
    }
  }, [actId, data]);

  // 获取canvas对应表格第一行第一个元素距离顶部和左边的距离
  useEffect(() => {
    if (!data || !actId) return;
    if (
      canvasLRef?.current?.offsetWidth > 0 &&
      canvasWRef?.current?.offsetWidth
    ) {
      const pl = canvasLRef?.current?.getBoundingClientRect();
      const pw = canvasWRef?.current?.getBoundingClientRect();
      setTopLeft(`${pw.top},${pl.x}`);
    }
  }, [data, actId]);

  // 画图
  useEffect(() => {
    // debugger;
    if (
      canvasRef?.current?.offsetHeight > 0 &&
      canvasRef?.current?.offsetWidth > 0 &&
      posMap[actId]?.length
    ) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // 清除之前的线条
        ctx.beginPath();
        ctx.clearRect(
          0,
          0,
          canvasRef.current.offsetWidth,
          canvasRef.current.offsetHeight
        );
        ctx.closePath();
        // 重新开始画新的线条
        ctx.beginPath();
        // 画线条
        for (let i = 0, len = posMap[actId]?.length; i < len; i += 1) {
          if (i === 0) {
            ctx.moveTo(posMap[actId][i]?.x, posMap[actId][i]?.y);
          } else {
            ctx.lineTo(posMap[actId][i]?.x, posMap[actId][i]?.y);
          }
        }
        // 线条颜色
        ctx.strokeStyle = 'red';
        // 是否闭合
        ctx.stroke();
        ctx.closePath();
      } else {
        toastText(`${formatMsg('notSUpportCanvas')}`);
      }
    }
  }, [actId, posMap, formatMsg]);

  // 生成特码、定位球的数字数组
  const numberList = useMemo(() => {
    let len = 28;
    const list = [];
    if (actId !== 1) {
      len = 10;
    }
    for (let i = 0; i < len; i += 1) {
      if (i < 10) {
        list[i] = `0${i}`;
      } else {
        list[i] = `${i}`;
      }
    }
    return list;
  }, [actId]);

  // 获取结果号
  const getResultNumber = useCallback(
    (gameResult) => {
      const resNumber = gameResult.split(',');
      if (resNumber.length === 4) {
        return resNumber[actId - 1];
      }
      return -1;
    },
    [actId]
  );

  // 生成特码、定位球的数字数组
  const renderDataList = useMemo(() => {
    const newList = [];
    if (isArray(data)) {
      let len = 28;
      if (actId !== 1) {
        len = 10;
      }
      data.forEach((it, j) => {
        let clist = null;
        // 获取结果号码
        const resNumber = getResultNumber(`${it.GameResult}`);
        for (let i = 0; i < len; i += 1) {
          if (!clist) {
            clist = [];
          }
          if (Number(resNumber) === i) {
            // 结果号的位置
            if (i < 10) {
              clist.push({ num: `0${i}`, t: '' });
            } else {
              clist.push({ num: `${i}`, t: '' });
            }
          } else {
            let n = 1;
            if (
              newList[0] &&
              typeof newList[j - 1]?.children[i]?.t === 'number'
            ) {
              n = newList[j - 1]?.children[i]?.t + 1;
            }
            clist.push({ num: '', t: n });
          }
        }
        newList.push({ key: it.PeriodId, children: clist });
      });
    }
    return newList.reverse();
  }, [actId, data, getResultNumber]);

  // 号码切换
  const changeActId = (id) => {
    if (id !== actId) {
      canvasHRef?.current?.scrollTo(0, 0);
      posArrRef.current = [];
      setActId(id);
    }
  };

  // 收集结果球的坐标位置
  const getCpos = useCallback(
    (pos, id) => {
      if (topLeft) {
        const [top, left] = topLeft.split(',');
        // 计算该球球心的位置
        const y = pos.top - top - pos.height / 2;
        const x = pos.left - left + pos.width / 2;
        if (posArrRef?.current && posArrRef?.current.length > 0) {
          posArrRef.current.push({ x, y, id });
        } else {
          posArrRef.current = [{ x, y, id }];
        }
        // 当全部收集完时，保存在state中并清空当前ref
        if (posArrRef?.current?.length === 50) {
          setPosMap({ [actId]: [...posArrRef?.current] });
          posArrRef.current = null;
        }
      }
    },
    [topLeft, setPosMap, actId]
  );

  return (
    <div className={`${styels['trend-chart-box']} d-f flex-1`}>
      <div
        className={`${styels['trend-chart-content']} d-f flex-1 bg-body o-y`}
      >
        <div className={`${styels['trend-chart-sidebar']} ta-c b-r-1 bc-split`}>
          <div
            className={`${styels['trend-chart-sidebar-title']} wds-h1 color-assist b-b-1 bc-split`}
          >
            {formatMsg('issue')}
          </div>
          {isArray(data) &&
            [...data].reverse().map((it, i) => (
              <div
                className={`${styels['trend-chart-sidebar-text']} ${
                  i % 2 === 0 ? 'bg-incon' : ''
                } wds-sm-con`}
                key={it.PeriodId}
              >
                {it.PeriodId}
              </div>
            ))}
        </div>
        <div
          className={`${styels['trend-chart-number-list']} flex-1 h-full o-none`}
        >
          <ul
            ref={canvasLRef}
            className='d-f ai-c wds-con color-primary-text ta-c'
          >
            {ballArr.map((it) => (
              <li
                onTouchEnd={() => changeActId(it.id)}
                key={it.id}
                className={`p-r ${styels['trend-chart-number-title']} ${
                  actId === it.id ? styels['trend-chart-number-title-act'] : ''
                }`}
              >
                {it.text}
              </li>
            ))}
          </ul>
          <div ref={canvasHRef} className='o-x h-full p-r'>
            <div className='d-f ai-c'>
              {isArray(numberList) &&
                numberList.map((num, i) => (
                  <div
                    ref={i === 0 ? canvasWRef : null}
                    key={num}
                    className={`${styels['number-item']} d-f jc-c ai-c b-t-b-1 bc-split b-r-1`}
                  >
                    {num}
                  </div>
                ))}
            </div>
            {isArray(renderDataList) &&
              renderDataList.map((it) => (
                <div key={it.key} className='d-f ai-c'>
                  {isArray(it?.children) &&
                    it?.children.map((item, i) => (
                      <div
                        key={`${it.key}-${i}1` || item.t}
                        className={`${
                          styels['number-item']
                        } p-r d-f jc-c ai-c bc-split b-r-1 ${
                          i % 2 === 0 ? 'bg-main' : 'bg-incon'
                        }`}
                      >
                        {item?.num ? (
                          <ColorfulBall
                            key={`${it.key}-${i}2` || item.num}
                            getCpos={getCpos}
                            params={`${it.key}-${actId}`}
                            className='m-0-auto wds-sm-con p-a zi-small'
                            type={actId === 1 ? 'bgColorful' : 'bgGrey'}
                            text={item.num}
                          />
                        ) : (
                          item?.t
                        )}
                      </div>
                    ))}
                </div>
              ))}
            <canvas
              ref={canvasRef}
              width={wh.w}
              height={wh.h}
              className={`p-a left-0 right-0 bottom-0 zi-mini ${
                styels['line-canvas']
              } ${actId !== 1 ? styels['line-canvas-nine'] : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TrendCharts);
