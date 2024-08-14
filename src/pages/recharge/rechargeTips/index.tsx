import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 Button, Img, KindTips, OutLink 
} from '@/components';
import { getTipsDesc } from '@/utils/tools';
import { useLanguage } from '@/hooks';

interface RechargeTipsProps {
  submitFunction?:Function
  tips?:string
}

const RechargeTips = (props: RechargeTipsProps) => {
  const {
    submitFunction, tips = null
  } = props;
  const { t } = useTranslation();
  const [tip, setTips] = useState({ title: '', list: [] });
  const { formatMsg } = useLanguage();
  useEffect(() => {
    if (typeof tips === 'string') {
      setTips({ ...getTipsDesc(tips) });
    }
  }, [tips]);
  return (
    <>
      <div className='m-t-50'>
        <Button className='w-940 h-138 m-0-auto' isPromise onClick={submitFunction} size='large'>
          {t('Submit')}
        </Button>
        <div className='d-f jc-c p-t-40 p-b-20'>
          <div className='m-r-80'>
            <OutLink className='d-f wds-sm-title color-primary-text' href='/mine/fundingTransf/rechargeDetail'>
              <Img className='icon-50 m-r-10' src='/recharge/money_icon.png' />
              <div>{formatMsg('rechargeRecord')}</div>
            </OutLink>
          </div>
          <OutLink className='d-f wds-sm-title color-primary-text' href='/mine/quotaConvert'>
            <Img className='icon-50 m-r-10' src='/recharge/transf_icon.png' />
            <div>{formatMsg('quotaConversion')}</div>
          </OutLink>
        </div>
      </div>
      <KindTips className='m-t-2 bg-body' title={tip?.title} data={tip?.list} />
    </>
  );
};

export default memo(RechargeTips);
