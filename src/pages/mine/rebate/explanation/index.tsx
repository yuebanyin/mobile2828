/**
 * 会员返水-返水说明
 * @returns
 */
import { useLanguage } from '@/hooks';

const RebateExplanation = () => {
  console.log('🚀 ~ file: index.tsx:6 ~ RebateExplanation:');
  const { formatMsg } = useLanguage();
  return (
    <>
      <div className='h-full p-0-52 color-primary-text bg-body'>
        <div className='t-h2 m-t-100'>{formatMsg('pc28_explain')}</div>
        <div className='t-main lh-64 m-t-30'>
          <span>{formatMsg('pc28_fuyinli')}</span>
          <span className='color-primary'>{formatMsg('systemCalc')}</span>
          <span>{formatMsg('waterAmount')}</span>
          <span className='color-primary'>{formatMsg('calcWater')}</span>
          <span>{formatMsg('systemInquire')}</span>
          <span className='color-primary'>{formatMsg('nearlyweek')}</span>
          <span>{formatMsg('dataShow')}</span>
        </div>
        <div className='t-small-title m-t-100'>{formatMsg('otherWater')}</div>
        <div className='t-main lh-64 m-t-30'>
          <span>{formatMsg('qtyxdmfs')}</span>
          <span className='color-primary'>{formatMsg('DT_jdcp')}</span>
          <span>{formatMsg('chanshengdama')}</span>
          <span>{formatMsg('returnValue')}</span>
          <span className='color-primary'>{formatMsg('fourpresentation')}</span>
          <span>{formatMsg('water_nodata')}</span>
          <span>{formatMsg('dong_ba_qu_time')}</span>
          <span>{formatMsg('defalut_week')}</span>
        </div>
      </div>
    </>
  );
};

export default RebateExplanation;

