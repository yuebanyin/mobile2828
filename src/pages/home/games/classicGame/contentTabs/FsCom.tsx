import { observer } from 'mobx-react-lite';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { isArray } from '@/utils/tools';
import type { SpecialCodeProps } from './SpecialCode';
import { tabListForth } from '../constFiles/const3102';
import { useChangLongBetStore } from '@/mobx/changLongBet';

export const FsCom = observer((props: SpecialCodeProps) => {
  const {
 curPeriodNumber, childrenData, className, getItememMultip, handleBetClick, ik 
} = props;

  // 选中的号码key
  const { keyArr } = useChangLongBetStore();

  return (
    <div className={className}>
      {tabListForth.map((it) => (
        <div key={it.key}>
          <div className='d-f flex-w'>
            {isArray(childrenData[it.listKey])
              && childrenData[it.listKey].map((item, i) => (
                <NumberButton
                  onChange={(o) => handleBetClick({ ...o, ...item, mode_type: 'gyzh' })}
                  bottomTitle={getItememMultip(item)}
                  key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                  title={item.text}
                  topType={item.topType as any}
                  className='m-r-10 m-b-30'
                  ballType='nb'
                  isActive={(keyArr || []).includes(item.text)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});
