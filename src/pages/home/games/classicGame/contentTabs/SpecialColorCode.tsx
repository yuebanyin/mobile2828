import { memo, useCallback } from 'react';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { isArray } from '@/utils/tools';
import { Obj } from '@/constants';
import { tabListFirst } from '../constFiles/const3501';
import { useLanguage } from '@/hooks';

export interface SpecialColorCodeProps {
  curPeriodNumber: string;
  childrenData: Obj | any[];
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
  className?: string;
}

export const SpecialColorCode = memo((props: SpecialColorCodeProps) => {
  const {
    curPeriodNumber,
    childrenData,
    className,
    getItememMultip,
    handleBetClick,
    ik,
    curGameId,
  } = props;
  const { formatMsg } = useLanguage();

  // 格式化号码按钮分布样式
  /**
   *
   * @param i 元素下标
   * @param item 展示子项包含对象
   * @param fatherTitle 类别标题
   * @returns
   */
  const getCls = useCallback(
    (fatherTitle: string, i: number, item: { text: string }) => {
      if (
        formatMsg(fatherTitle) === formatMsg('SUM') ||
        formatMsg(fatherTitle) === formatMsg('distributed')
      ) {
        if (formatMsg(item.text) === formatMsg('ou')) {
          return 'm-r-90';
        }
        return 'm-r-20';
      }
      if ((i + 1) % 5 !== 0) {
        return 'm-r-20';
      }
      return '';
    },
    [formatMsg]
  );

  const getTitleCls = useCallback((traText: string) => {
    const csn = '';
    switch (traText) {
      //////////////////////////////////////////////////////////////////////////
      case '奇':
        return `color-red ${csn}`;
      case '和':
        return `color-green ${csn}`;
      case '偶':
        return `color-blue ${csn}`;
      //////////////////////////////////////////////////////////////////////////
      case '上':
        return `color-red ${csn}`;
      case '中':
        return `color-green ${csn}`;
      case '下':
        return `color-blue ${csn}`;
      //////////////////////////////////////////////////////////////////////////
      case '金':
        return `color-jin ${csn}`;
      case '木':
        return `color-mu ${csn}`;
      case '水':
        return `color-shui ${csn}`;
      case '火':
        return `color-huo ${csn}`;
      case '土':
        return `color-tu ${csn}`;
      default:
        return '';
    }
  }, []);

  return (
    <div className={className}>
      {tabListFirst.map((it) => (
        <div key={it.key}>
          <div className='m-b-30 wds-sm-title color-con-ass'>{it.title}</div>
          <div className='d-f flex-w'>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => (
                <NumberButton
                  size={`${curGameId === 3501 ? 'big' : 'small'}`}
                  // onChange={handleBetClick({ ...item, name: item.key || `${'特码'}-${item.text.indexOf('0') !== -1 ? Number(item.text) : item.text}` })}
                  onChange={(o) => handleBetClick({ ...o, ...item })}
                  bottomTitle={getItememMultip(item)}
                  key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                  title={item.text}
                  topType={item.topType as any}
                  className={`m-b-30 ${getCls(it.title, i, item)} ${getTitleCls(
                    item.text
                  )}`}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});

// export default memo(SpecialColorCode);

