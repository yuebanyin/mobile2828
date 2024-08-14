import {
 ReactNode, forwardRef, useCallback, useImperativeHandle, useMemo, useState 
} from 'react';
import { observer } from 'mobx-react-lite';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { isArray } from '@/utils/tools';
import styles from './index.module.scss';
import { useGlobalStore } from '@/mobx';

export type RadioGroupRef = {
  // eslint-disable-next-line no-unused-vars
  onReset: () => void;
};

interface RadioGroupChangeFunction {
  // FIXME 2023-06-14 11:21:05 兼容多选
  // eslint-disable-next-line no-unused-vars
  (activeIndex: number | number[]): void;
}

interface RadioBuildFunction {
  // eslint-disable-next-line no-unused-vars
  (index: number): ReactNode;
}

interface RadioItemClassFunction {
  // eslint-disable-next-line no-unused-vars
  (index: number): string;
}

interface RadioGroupProps {
  className?: string;
  length?: number;
  data?: any[];
  onItemClass?: RadioItemClassFunction;
  onBuild?: RadioBuildFunction;
  activeIds?: number | number[];
  multiple?: boolean;
  onChange?: RadioGroupChangeFunction;
  gameMultiple?: any[];
  dyMultiple?: any[];
}

export const RadioGroup = observer(
  forwardRef<RadioGroupRef, RadioGroupProps>((props, ref) => {
    const {
 className, length, onBuild, activeIds = [], multiple = false, onChange 
} = props;
    const [selectIds, setSelectIds] = useState([...new Set([activeIds].flat())]);
    const { audioCKRef } = useGlobalStore();

    function cleanSelectIds() {
      setSelectIds(() => []);
      if (onChange && multiple) {
        onChange([]);
      }
    }

    useImperativeHandle<any, any>(ref, () => ({
      onReset: cleanSelectIds,
    }));

    const mergeClassName = useMemo(() => {
      const csn = 'w-full d-f fd-r flex-w bg-body b-t-1 b-l-1 bc-split';
      if (className) {
        return `${csn} ${className}`;
      }
      return csn;
    }, [className]);

    const getClassName = useCallback(
      (i: number) => {
        let csn = 'b-b-1 b-r-1 bc-split';
        if (length % 2 === 1 && i + 1 === length) csn += ' w-full';
        else csn += ' w-half';
        if (selectIds.includes(i)) csn += ' bg-gdt-foc';
        else csn += ' bg-body';
        return csn;
      },
      [selectIds, length]
    );

    const clickItem = useCallback(
      (i: number) => {
        // 点击音效
        if (audioCKRef?.current) {
          audioCKRef.current.currentTime = 0;
          const p = audioCKRef.current.play();
          if (p) {
            p.then(() => {
              audioCKRef.current.play();
            }).catch((e) => console.info(e));
          }
        }
        if (multiple) {
          const temp = selectIds.filter((r) => r !== i);
          if (temp.length === selectIds.length) {
            setSelectIds([...selectIds, i]);
            if (onChange) onChange([...selectIds, i]);
          } else {
            setSelectIds([...temp]);
            if (onChange) onChange([...temp]);
          }
        } else {
          setSelectIds([i]);
          if (onChange) onChange(i);
        }
      },
      [multiple, onChange, selectIds, audioCKRef]
    );

    return (
      <div className={`${mergeClassName}`}>
        {[...new Array(length).keys()].map((i) => (
          <div key={i} className={`${getClassName(i)}`} onClick={() => clickItem(i)}>
            {onBuild(i)}
          </div>
        ))}
      </div>
    );
  })
);

export const RadioGroupWarp = observer(
  forwardRef<RadioGroupRef, RadioGroupProps>((props, ref) => {
    const {
 className, data, onItemClass, gameMultiple, dyMultiple, activeIds = [], multiple = false, onChange 
} = props;
    const [selectIds, setSelectIds] = useState([...new Set([activeIds].flat())]);
    const { audioCKRef } = useGlobalStore();

    function cleanSelectIds() {
      setSelectIds(() => []);
      if (onChange && multiple) {
        onChange([]);
      }
    }
    useImperativeHandle<any, any>(ref, () => ({
      onReset: cleanSelectIds,
    }));

    const mergeClassName = useMemo(() => {
      const csn = 'w-full d-f fd-r flex-w';
      if (className) {
        return `${csn} ${className}`;
      }
      return csn;
    }, [className]);

    const getClassName = useCallback(
      (i: number) => {
        let csn = 'm-r-20 m-b-30 br-20 bc-split font-w-bolder t-small-title wds-sm-con p-r';
        if (selectIds.includes(i)) {
          csn = `bs-by-foc ${csn} ${styles['nb-bg-active']}`;
        } else {
          csn = `${csn} ${styles['nb-bg-none']}`;
        }
        return csn;
      },
      [selectIds]
    );

    const clickItem = useCallback(
      (i: number) => {
        // 点击音效
        if (audioCKRef?.current) {
          audioCKRef.current.currentTime = 0;
          const p = audioCKRef.current.play();
          if (p) {
            p.then(() => {
              audioCKRef.current.play();
            }).catch((e) => console.info(e));
          }
        }
        if (multiple) {
          const temp = selectIds.filter((r) => r !== i);
          if (temp.length === selectIds.length) {
            setSelectIds(() => [...selectIds, i]);
            if (onChange) onChange([...selectIds, i]);
          } else {
            setSelectIds(() => [...temp]);
            if (onChange) onChange([...temp]);
          }
        } else {
          setSelectIds([i]);
          if (onChange) onChange(i);
        }
      },
      [multiple, onChange, selectIds, audioCKRef]
    );

    return (
      <div className={`${mergeClassName}`}>
        {isArray(data)
          && data.map((it, i) => {
            const dyOddsInfo = dyMultiple.find(({ AreaInfo }) => {
              const equalMainType = AreaInfo.cbBetMainType.value === it.mainType;
              const equalSubType = AreaInfo.cbBetSubType.value === it.subType;

              const numberList = AreaInfo.cbNumber.map((r) => r.value).filter((r) => r !== 255);
              if (numberList.length === 0) {
                return equalMainType && equalSubType;
              }
              const equalNumber = `${numberList}` === `${it.number}`;
              return equalMainType && equalSubType && equalNumber;
            });
            const odds = ((dyOddsInfo?.dwMultiple?.value || gameMultiple[it.oddsKey].value) * 1.0) / common.GOLD_RATIO;
            return (
              <div key={it.key || i} className={`${getClassName(i)} && ${onItemClass && onItemClass(i)}`} onClick={() => clickItem(i)}>
                <div className='w-full h-full d-f fd-c ai-c jc-se'>
                  <div className='w-140 d-f ai-c jc-c t-small-title'>{it.name}</div>
                  <div className='w-140 d-f ai-c jc-c t-small color-red'>{odds}</div>
                </div>
              </div>
            );
          })}
      </div>
    );
  })
);

