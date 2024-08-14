// 号码趋势
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Tabs, toastText } from '@/components';
import { searchList } from '../dewdropTray';
import { numTrendDW, numTrendTM } from './const';
import SmallBox, { SmallBoxBorder } from './SmallBox';
import styles from './index.module.scss';
import { isArray } from '@/utils/tools';
import { useLanguage } from '@/hooks';

interface NumberTrendProps {
  data: any[];
  gameType: number;
  isactive?: number;
  lastPeriod?: number | string;
}

const NumberTrend = (props: NumberTrendProps) => {
  const { data } = props;
  const [actId, setActId] = useState(1);
  // 收集坐标
  const posArrRef = useRef(null);
  const [posArr, setPosArr] = useState(null);
  const numTrendRef = useRef<HTMLCanvasElement>(null);
  // 获取canvas的宽高
  const smallItemBoxRef = useRef<HTMLDivElement>(null);
  const conBoxRef = useRef<HTMLDivElement>(null);
  const [wh, setWh] = useState(null);
  // 获取canvas距离左边的距离
  const [lt, setLt] = useState('');
  // 控制延时器执行时机
  const timeoutRef = useRef(false);
  const { formatMsg } = useLanguage();

  // 获取宽高距离左边顶部的距离
  const getLTWH = useCallback(() => {
    const sd = smallItemBoxRef.current.getBoundingClientRect();
    const w = sd.width * 50;
    let h;
    if (actId === 1) {
      h = sd.height * numTrendTM.length;
    } else {
      h = sd.height * numTrendDW.length;
    }
    if (conBoxRef?.current) {
      const d = conBoxRef.current.getBoundingClientRect();
      console.log({ d });
      setLt(`${d.left},${sd.top}`);
    }
    setWh({ w, h });
    timeoutRef.current = true;
  }, [actId]);

  useEffect(() => {
    // 获取号码走势图canvas的宽高
    if (data && smallItemBoxRef?.current) {
      if (timeoutRef.current) {
        getLTWH();
      } else {
        setTimeout(() => {
          getLTWH();
        }, 220);
      }
    }
  }, [data, getLTWH]);

  useLayoutEffect(() => {
    if (data) {
      conBoxRef?.current.scrollTo(0, 0);
    }
  }, [data]);

  useEffect(() => {
    if (
      posArr &&
      posArr[actId] &&
      posArr[actId].length === 50 &&
      numTrendRef?.current
    ) {
      // 开始画图
      const ctx = numTrendRef.current.getContext('2d');
      if (ctx) {
        // 清除之前的线条
        ctx.beginPath();
        ctx.clearRect(
          0,
          0,
          numTrendRef.current.offsetWidth,
          numTrendRef.current.offsetHeight
        );
        ctx.closePath();
        // 重新开始画新的线条
        ctx.beginPath();
        // 定义区域颜色
        ctx.fillStyle = 'rgba(252,130,32, 0.2)';
        // 画线条
        for (let i = 0, len = posArr[actId]?.length; i < len; i += 1) {
          if (i === 0) {
            ctx.moveTo(posArr[actId][i]?.x, numTrendRef.current.offsetHeight);
            ctx.lineTo(posArr[actId][i]?.x, posArr[actId][i]?.y);
          } else {
            ctx.lineTo(posArr[actId][i]?.x, posArr[actId][i]?.y);
            if (i === len - 1) {
              ctx.lineTo(posArr[actId][i]?.x, numTrendRef.current.offsetHeight);
            }
          }
        }
        // 填充
        ctx.fill();
        ctx.closePath();
        // 画线
        ctx.beginPath();
        for (let i = 0, len = posArr[actId]?.length; i < len; i += 1) {
          if (i === 0) {
            ctx.moveTo(posArr[actId][i]?.x, posArr[actId][i]?.y);
          } else {
            ctx.lineTo(posArr[actId][i]?.x, posArr[actId][i]?.y);
          }
        }
        ctx.strokeStyle = '#FC8220';
        // 是否闭合
        ctx.stroke();
        ctx.closePath();
      } else {
        toastText(`${formatMsg('notSUpportCanvas')}`);
      }
    }
  }, [posArr, actId, formatMsg]);

  // 纵轴
  const zzArr = useMemo(() => {
    if (actId === 1) {
      return numTrendTM;
    }
    return numTrendDW;
  }, [actId]);

  // 判断当前是否是趋势图的点
  const handleTrendPox = (ballNum, yNum) => {
    let flag: boolean;
    if (ballNum === yNum) {
      flag = true;
    }
    return flag;
  };

  // 收集子组件坐标的方法
  const getPosArr = useCallback(
    (p) => {
      const [l, t] = lt.split(',');
      console.log({ p, l, t });
      if (lt && p) {
        const x = p.left - Number(l) + p.width / 2;
        const y = p.top - Number(t) + p.height / 2;
        if (isArray(posArrRef?.current)) {
          posArrRef?.current.push({ x, y });
        } else {
          posArrRef.current = [{ x, y }];
        }
        if (isArray(posArrRef?.current) && posArrRef.current.length === 50) {
          setPosArr({ [actId]: [...posArrRef.current] });
          posArrRef.current = null;
        }
      }
    },
    [lt, actId]
  );

  return (
    <div>
      <Tabs
        activeId={actId}
        onClick={(v) => {
          conBoxRef?.current.scrollTo(0, 0);
          posArrRef.current = null;
          setActId(v.id);
        }}
        titleClassName='b-b-1 bc-split'
        searchList={searchList.map((it) => ({
          ...it,
          text: formatMsg(it.text),
        }))}
      />
      <div
        className={`m-l-30 m-r-30 m-b-30 wds-explain-con color-assist d-f o-none ${styles['number-trend-box']}`}
      >
        <div className={`${styles['number-trend-asset']} p-t-50`}>
          {zzArr.map((n) => (
            <div
              className={`ta-r ${styles['number-trend-asset-number']}`}
              key={n}
            >
              {n}号
            </div>
          ))}
        </div>
        <div
          ref={conBoxRef}
          className={`${styles['number-trend-content']} p-l-10 p-t-50 m-b-16 d-f o-x flex-1 p-r`}
        >
          <div className='d-f fd-c'>
            {isArray(zzArr) &&
              zzArr.map((num, i) => (
                <SmallBoxBorder isY key={`${i}-${num}` || num} />
              ))}
          </div>
          {isArray(data) &&
            data.slice(0, 50).map((it, j) => (
              <div
                className='d-f fd-c'
                key={`${data?.length}-${it?.szPeriodNumber?.value}`}
              >
                {isArray(zzArr) &&
                  zzArr.map((num, i) => {
                    // 获取球的号码
                    const ballRes = it.cbTableCard[actId - 1]?.value;
                    if (zzArr.length - 1 === i) {
                      // 最后一个时
                      return (
                        <span
                          key={`${it?.szPeriodNumber?.value}-${i}-${j}` || num}
                        >
                          <SmallBox
                            key={i || num}
                            isBc={j !== 49}
                            value={ballRes}
                            isPos={handleTrendPox(ballRes, num)}
                            getPos={getPosArr}
                          />
                          <SmallBoxBorder
                            isBc={j !== 49}
                            text={`${`${it?.szPeriodNumber?.value}`.slice(
                              -6
                            )}${formatMsg('qi')}`}
                          />
                        </span>
                      );
                    }
                    return (
                      <SmallBox
                        ref={i === 0 && j === 0 ? smallItemBoxRef : null}
                        isBc={j !== 49}
                        key={`${i}-${num}` || num}
                        value={ballRes}
                        isPos={handleTrendPox(ballRes, num)}
                        getPos={getPosArr}
                      />
                    );
                  })}
              </div>
            ))}
          <canvas
            width={wh?.w}
            height={wh?.h}
            ref={numTrendRef}
            className={`p-a ${styles['canvas-box']}`}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(NumberTrend);
