import {
  ReactNode,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import styles from './index.module.scss';
import { ColorfulBall } from '../colorfulBall';
import { useGlobalStore } from '@/mobx';
import { getMultipleData } from '@/pages/home/games/game2903/rules';
import { DWORD } from '@/engine/base/basetype';
import { MutileItemEx } from '@/pages/home/games/game2903/betPage';
import { useLanguage } from '@/hooks';

interface NumberButtonProps {
  index?: string | number;
  className?: string;
  size?: 'small' | 'big' | 'middle' | 'large';
  topType?: 'b' | 'none';
  title: number | string | Array<number | string>;
  ballType?: 'wcf' | 'bc' | 'wb' | 'nb' | 'none';
  bottomTitle?: number | string | ReactNode;
  onChange?: Function;
  isActive?: boolean;
  data?: object;
  isClBtn?: boolean;
}

interface TopNodeProps {
  className?: string;
  topType?: string;
  ballType?: string;
  title: number | string | Array<number | string>;
  isTwoDigits?: boolean;
  isClBtn?: boolean;
}

const TopNode = memo((props: TopNodeProps) => {
  const {
    className,
    ballType = 'wcf',
    topType = 'b',
    title,
    isTwoDigits = true,
    isClBtn,
  } = props;
  const { formatMsg } = useLanguage();

  const mergeClassName = useMemo(() => {
    // console.log('seeeeeeeeeee', title, typeof title === 'string');

    if (typeof title === 'string' && isClBtn) {
      // if (['龙', '大', '单', '红'].includes(formatMsg(`${title}`))) {
      if (
        [
          formatMsg('LONG'),
          formatMsg('DA'),
          formatMsg('DAN'),
          formatMsg('red'),
        ].includes(formatMsg(`${title}`))
      ) {
        return 'color-red';
      }
      if (
        [
          formatMsg('HU'),
          formatMsg('XIAO'),
          formatMsg('SHUANG'),
          formatMsg('blue'),
        ].includes(formatMsg(`${title}`))
      ) {
        return 'color-blue';
      }
      if (
        [formatMsg('green'), formatMsg('HE')].includes(formatMsg(`${title}`))
      ) {
        return 'color-green';
      }
    }
    return 'color-primary-text';
  }, [isClBtn, title, formatMsg]);

  const node = useMemo(() => {
    if (topType === 'b') {
      //球
      if (ballType === 'wcf') {
        return (
          <ColorfulBall
            className={className}
            isTwoDigits={isTwoDigits}
            text={title.toString()}
            type='wordColorful'
          />
        );
      }
      if (ballType === 'wb') {
        return (
          <ColorfulBall
            className={className}
            isTwoDigits={isTwoDigits}
            text={title.toString()}
            type='wordBorder'
          />
        );
      }
      if (ballType === 'bc') {
        return (
          <ColorfulBall
            className={className}
            isTwoDigits={isTwoDigits}
            text={title.toString()}
            type='borderColorful'
          />
        );
      }
      if (ballType === 'nb') {
        return (
          <ColorfulBall
            className='bc-none'
            isTwoDigits={isTwoDigits}
            text={title.toString()}
            type='borderColorful'
          />
        );
      }
      return (
        <ColorfulBall
          className={className}
          isTwoDigits={isTwoDigits}
          text={title.toString()}
        />
      );
    }
    if (formatMsg(`${title}`) === formatMsg('HONG')) {
      return (
        <div className='wds-sm-title color-red font-w-bolder'>
          {formatMsg(`${title}`)}
        </div>
      );
    }
    if (formatMsg(`${title}`) === formatMsg('LAN')) {
      return (
        <div className='wds-sm-title color-blue font-w-bolder'>
          {formatMsg(`${title}`)}
        </div>
      );
    }
    if (formatMsg(`${title}`) === formatMsg('LV')) {
      return (
        <div className='wds-sm-title color-green font-w-bolder'>
          {formatMsg(`${title}`)}
        </div>
      );
    }
    return (
      <div className={`wds-sm-title font-w-bolder ${mergeClassName}`}>
        {formatMsg(`${title}`)}
      </div>
    );
  }, [
    topType,
    title,
    mergeClassName,
    formatMsg,
    ballType,
    className,
    isTwoDigits,
  ]);

  return node;
});

export const NumberButton = observer((props: NumberButtonProps) => {
  const {
    index,
    className,
    size = 'small',
    topType = 'b',
    title = 0,
    ballType = 'wcf',
    isActive = null,
    bottomTitle,
    onChange,
    data,
    isClBtn,
  } = props;
  const { audioCKRef } = useGlobalStore();

  const [activeId, setActiveId] = useState(false);

  useEffect(() => {
    if (typeof isActive === 'boolean') {
      setActiveId(isActive);
    }
  }, [isActive]);

  const mergeClassName = useMemo(() => {
    let csn = 'df-aic-jcc p-r';
    csn = `${csn} ${styles['nb-bg']} ${styles[size]} ${styles['fs']}`;
    if (className) {
      csn = `${csn} ${className}`;
    }
    if (activeId) {
      csn = `bs-by-foc ${csn} ${styles['nb-bg-active']}`;
    } else {
      csn = `${csn} ${styles['nb-bg-none']}`;
    }
    return csn;
  }, [className, size, activeId]);

  const ballClassName = useMemo(() => {
    if (activeId) {
      return 'bc-white';
    }
    return '';
  }, [activeId]);

  const clickItem = useCallback(
    (e) => {
      e?.stopPropagation();
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
      if (onChange && typeof onChange === 'function') {
        const ret = onChange({
          active: !activeId,
          title,
          bottomTitle,
          data,
          index,
        });

        if (ret) {
          setActiveId(!activeId);
        }
      }
    },
    [activeId, audioCKRef, bottomTitle, data, index, onChange, title]
  );

  return (
    <div className={`${mergeClassName} fd-c`} onClick={clickItem}>
      {typeof title !== 'object' ? (
        <TopNode
          isClBtn={isClBtn}
          className={`${ballClassName} m-r-0`}
          topType={topType}
          title={title.toString()}
          isTwoDigits
          ballType={ballType}
        />
      ) : (
        <div className='df-aic-jcc'>
          {title.map((item, i) => (
            <TopNode
              key={item || i}
              isClBtn={isClBtn}
              className={`${ballClassName} ${
                title.length % 5 === 0 ? 'm-r-4' : ''
              }`}
              topType={topType}
              title={item}
              isTwoDigits
              ballType={ballType}
            />
          ))}
        </div>
      )}
      {bottomTitle ? (
        <div
          className={isClBtn ? 'm-t-20 wds-sm-con color-red font-w-bolder' : ''}
        >
          {bottomTitle}
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

interface NumberButtonGroupProps {
  numberList: Array<any>;
  dynamicList: Array<any>;
  multType: number | Function;
  cbBetMainType: number;
  cbBetSubType: number;
  mutile: Array<DWORD>;
  curXiao?: number;
  onChange?: Function;
}

export const NumberButtonGroup = forwardRef(
  (props: NumberButtonGroupProps, ref) => {
    const {
      numberList,
      dynamicList,
      multType,
      cbBetMainType,
      cbBetSubType,
      mutile,
      curXiao,
      onChange,
    } = props;

    const activeArray = useRef([]);

    useEffect(() => {
      if (activeArray.current.length === 0) {
        for (let index = 0; index < numberList.length; index += 1) {
          activeArray.current.push(false);
        }
      }
    }, [numberList]);

    const onResetData = () => {
      for (let i = 0; i < activeArray.current.length; i += 1) {
        activeArray.current[i] = false;
      }
    };

    useImperativeHandle<any, any>(ref, () => ({
      onResetData,
    }));

    const onNumBtnHandleClick = useCallback(
      (isActive, _title, _bottomTitle, _data, index) => {
        for (let i = 0; i < activeArray.current.length; i += 1) {
          if (index === i) {
            activeArray.current[i] = isActive;
          }
        }
        onChange(isActive, _title, _bottomTitle, _data, index);
        return true;
      },
      [onChange]
    );

    return (
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        {numberList.map((item, i) => {
          const itemValue = getMultipleData(
            item,
            typeof multType === 'function' ? multType(item) : multType,
            false,
            cbBetMainType,
            cbBetSubType,
            mutile,
            dynamicList,
            curXiao
          );
          return (
            <NumberButton
              index={i}
              key={i || item - 1}
              isActive={activeArray.current[i]}
              className='m-l-20 m-t-30'
              title={item.value || item}
              bottomTitle={
                <MutileItemEx
                  dwNormalMultiple={itemValue.dwNormalMultiple}
                  dwSpecialMultiple={itemValue.dwSpecialMultiple}
                />
              }
              onChange={onNumBtnHandleClick}
              data={{ cbBetMainType, cbBetSubType, value: itemValue }}
            />
          );
        })}
      </div>
    );
  }
);
