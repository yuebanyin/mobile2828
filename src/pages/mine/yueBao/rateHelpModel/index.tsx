import { Dialog, Img } from '@/components';
import { useLanguage } from '@/hooks';

export type YebRateDto = {
  Key: string;
  Value: string;
  Expand: number;
};

export type RateHelpModalProps = {
  data: YebRateDto[];
};

/**
 * 余额宝-结算日率
 * @returns
 */
const RateHelpModal = (props: RateHelpModalProps) => {
  const { data } = props;
  const { formatMsg } = useLanguage();

  return (
    <>
      <Dialog
        title={formatMsg('SettleRate')}
        isShowOkBtn={false}
        sourceNode={
          <Img src='/mine/yeb/icon_yw.png' alt='' className='m-l-10 icon-50' />
        }
      >
        <div className='d-f fd-c ai-c'>
          <div className='w-900 h-102 b-b-1 bc-split d-f df-c ai-c'>
            <div className='flex-1 ta-c'>{formatMsg('AccountLevel')}</div>
            <div className='flex-1 ta-c'>{formatMsg('dayRate')}</div>
          </div>
          {data.map((r, i) => (
            <div
              key={r.Key}
              className={`${
                i !== data.length - 1 ? 'b-b-1' : ''
              } w-900 h-102 bc-split d-f df-c ai-c m-r-20 m-l-20`}
            >
              <div className='flex-1 ta-c'>{formatMsg(r.Key)}</div>
              <div className='flex-1 ta-c'>{r.Value}</div>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default RateHelpModal;

