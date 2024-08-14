import { observer } from 'mobx-react-lite';
import { useMemo, useRef, useEffect } from 'react';
import styles from './index.module.scss';
import { useGameConfigStore, useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

interface SystemMsgProps {
  text: string;
  tipKey: string;
  period: string;
  title: string;
  srcollBottoms?: Function;
  audioRef?: any;
}
/**
 * @description 展示进入房间时间和欢迎语类似的样式
 * @param text 需要展示的文本
 */
export const SystemDate = observer(
  ({ text, tipKey }: Pick<SystemMsgProps, 'text' | 'tipKey'>) => {
    const { formatMsg } = useLanguage();
    const { systemTip } = useGameConfigStore();

    return (
      <div className='ta-c m-t-30'>
        <span
          className={`${styles['system-date-text']} bg-tips-lig br-10 wds-con color-primary-text`}
        >
          {formatMsg(text) || formatMsg(systemTip[tipKey])}
        </span>
      </div>
    );
  }
);

/**
 * @description 展示开盘封盘状态的系统消息
 * @param title title
 * @param period 期数
 * @param text 主体描述
 * @param tipKey 可配置
 */
export const SystemMsg = observer(
  ({
    title,
    period,
    text,
    tipKey,
    srcollBottoms,
  }: Pick<
    SystemMsgProps,
    'period' | 'tipKey' | 'text' | 'title' | 'srcollBottoms'
  >) => {
    const { formatMsg } = useLanguage();
    const { systemTip } = useGameConfigStore();
    const { audioPZRef } = useGlobalStore();

    const magItemBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (magItemBoxRef?.current && typeof srcollBottoms === 'function') {
        const iot = magItemBoxRef.current.offsetTop;
        srcollBottoms(false, iot);
      }
    }, [srcollBottoms]);

    useEffect(() => {
      // 开始下注、开奖结果音效
      if (audioPZRef?.current && ['Startbet', 'Lottery'].includes(tipKey)) {
        audioPZRef.current.currentTime = 0;
        const p = audioPZRef.current.play();
        if (p) {
          p.then(() => {
            audioPZRef.current.play();
          }).catch((e) => console.info(e));
        }
      }
    }, [audioPZRef, tipKey]);

    // title 的颜色
    const mergeTitleCls = useMemo(() => {
      if (tipKey === 'Startbet') {
        return 'color-green';
      }
      if (tipKey === 'Lottery') {
        return 'color-blue';
      }
      return 'color-red';
    }, [tipKey]);

    return (
      <div
        ref={magItemBoxRef}
        className={`${styles['system-msg-box']} ani-opa-tslY-100 ta-c bg-tips-lig br-10 p-30`}
      >
        <div className={`${mergeTitleCls} wds-sm-title`}>{title}</div>
        <div className='m-t-20 wds-sm-con'>
          [<span className='color-red'>{period}</span>]
          <span className='m-l-10'>
            {formatMsg(text) || formatMsg(systemTip[tipKey])}
          </span>
        </div>
      </div>
    );
  }
);
