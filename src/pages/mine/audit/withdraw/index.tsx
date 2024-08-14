import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Cell, CellGroup, toastText } from '@/components';
import { useNavigation, useLanguage } from '@/hooks';

const Withdraw = () => {
  const { state } = useLocation();
  const navigate = useNavigation();
  const { formatMsg } = useLanguage();
  const handleClick = (name: string) => {
    switch (name) {
      case 'Bank':
        if (state?.Bank) navigate('/mine/audit/withdraw/cInfo');
        else {
          toastText(`${formatMsg('USDTWithdrawalMsg3')}`);
        }
        break;
      case 'USDT':
        if (state?.USDT) navigate('/mine/audit/withdraw/uInfo');
        else {
          toastText(`${formatMsg('notBindUSD')}`);
        }
        break;
      case 'Go':
        if (state?.Go) navigate('/mine/audit/withdraw/gInfo');
        else {
          toastText(`${formatMsg('notBindGoPay')}`);
        }
        break;
      default:
    }
  };
  return (
    <CellGroup className='m-t-30'>
      <Cell
        title={formatMsg('cardEmbody')}
        onClick={() => {
          handleClick('Bank');
        }}
      />
      <Cell
        title={formatMsg('usdtEmbody')}
        onClick={() => {
          handleClick('USDT');
        }}
      />
      {/* <Cell title='GoPay提现' onClick={() => { handleClick('Go'); }} isDivider={false} /> */}
    </CellGroup>
  );
};

export default memo(Withdraw);
