import { memo } from 'react';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { isArray } from '@/utils/tools';
import { tabListFirst } from '../const';
import type { CodeProps } from './SpecialCode';

const NumberCode = (props: CodeProps) => {
  const {
 curPeriodNumber, childrenData, className, getItememMultip, handleBetClick, ik 
} = props;

  return (
    <div className={className}>
      {tabListFirst.map((it) => (
        <div key={it.key}>
          <div className='m-b-30 wds-sm-title color-con-ass'>{it.title}</div>
          <div className='d-f flex-w'>
            {isArray(childrenData[it.listKey])
              && childrenData[it.listKey].map((item, i) => (
                <NumberButton
                  onChange={handleBetClick({ ...item, name: `${item.text}-${item.text.indexOf('0') !== -1 ? Number(item.text) : item.text}` })}
                  key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                  title={item.text}
                  topType={item.topType as any}
                  className={`${['双', '5', '10'].includes(item.text) ? '' : 'm-r-20'} m-b-30 `}
                  ballType='nb'
                  bottomTitle={getItememMultip(item, `${it.title}-${item.text.indexOf('0') !== -1 ? Number(item.text) : item.text}`)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(NumberCode);
