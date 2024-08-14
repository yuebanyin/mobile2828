import {
 ReactNode, memo, useEffect, useState 
} from 'react';
import { useTranslation } from 'react-i18next';
import { BgImg } from '../img';
import './index.scss';
import { Eye } from '../eye';
import { formatDigit } from '@/utils/digit';
import { Score } from '../score';

interface BalanceProps {
  className?: string;
  children?: ReactNode;
  url?: string;
  title?: string;
  balanceTwoCls?: string;
  balanceThreeCls?: string;
  money?: string | number
}

export const Balance = memo((props: BalanceProps) => {
  const { t } = useTranslation();
  const {
 className, children, url, title = `${t('totalAccount')}`, balanceTwoCls, balanceThreeCls, money = null 
} = props;
  const [showMoney, setShowMoney] = useState(false);
  const [scoreMoney, setScoreMoney] = useState('0.0');
  const changeEey = (isShow) => {
    setShowMoney(isShow);
  };
  
  const ScoreMoney = () => {
    if (money !== null) {
      return scoreMoney;
    }
    return <Score />;
  };

  useEffect(() => {
    if (money != null) {
      setScoreMoney(formatDigit(money.toString()).toString());
    }
  }, [money]);

  return (
    <BgImg className={`bx-balance color-white ${className || ''}`} url={`${url || '/mine/itemsBk.png'}`}>
      <div className='bx-balance-1'>
        <div>{title}</div>
        {/* <div className='m-l-30 h-44'> */}
        <Eye className='m-l-30' onChange={changeEey} />
        {/* </div> */}
      </div>
      <div className={`bx-balance-2 ${balanceTwoCls}`}>{showMoney ? ScoreMoney() : '********'}</div>
      <div className={`bx-balance-3 ${balanceThreeCls}`}>{children}</div>
    </BgImg>
  );
});
