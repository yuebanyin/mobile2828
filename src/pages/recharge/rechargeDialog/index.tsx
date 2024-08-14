import { memo } from 'react';
import { Dialog } from '@/components';
import { formatDate } from '@/utils/dayjs';
import { useLanguage } from '@/hooks';

interface RechargeDialogProps {
  depositAmount?: number | string;
  remitName?: string;
  walletAddress?: string;
  isVisible?: boolean;
}

const RechargeDialog = (props: RechargeDialogProps) => {
  const { isVisible, depositAmount, remitName, walletAddress } = props;
  const { formatMsg } = useLanguage();
  const subTime = formatDate(new Date(), '_YMDHms');

  return (
    // <Dialog title='存款提示' defaultVisible={}>
    <Dialog title={formatMsg('depositTips')} visible={isVisible}>
      <div className='p-0-50 m-30-0'>
        <div className='t-small-title'>{formatMsg('depositTipLineOne')}</div>
        <div className=''>
          <div className='m-t-50'>
            <span className='m-r-50'>
              {remitName
                ? `${formatMsg('remittanceName')}:`
                : `${formatMsg('walletAddress')}:`}
            </span>
            <span>{remitName || walletAddress}</span>
          </div>
          <div className='m-t-50'>
            <span className='m-r-50'>{formatMsg('DepositAmount')}:</span>
            <span>{depositAmount}</span>
          </div>
          <div className='m-t-50'>
            <span className='m-r-50'>{formatMsg('subTime')}:</span>
            <span>{subTime}</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default memo(RechargeDialog);
