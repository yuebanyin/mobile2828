import { memo } from 'react';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { isArray } from '@/utils/tools';
import { Obj } from '@/constants';
import { tabListFirst } from '../../game3102/const';

export interface CodeProps {
  curPeriodNumber: string;
  childrenData: Obj;
  className: string;
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
}

const SpecialCode = (props: CodeProps) => {
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
                  onChange={handleBetClick({ ...item, name: `${'特码'}-${item.text.indexOf('0') !== -1 ? Number(item.text) : item.text}` })}
                  key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                  title={item.text}
                  topType={item.topType as any}
                  className={`${(i + 1) % 5 === 0 ? '' : 'm-r-20'} m-b-30`}
                  bottomTitle={getItememMultip(item, `特码-${item.text.indexOf('0') !== -1 ? Number(item.text) : item.text}`)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(SpecialCode);
