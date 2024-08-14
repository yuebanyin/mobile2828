import { memo } from 'react';
import { CSTRING } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import styles from './index.module.scss';
import { copyText } from '@/utils/tools';
import { useLanguage } from '@/hooks';

interface SoureDialogProps {
  szPeriodNumber: CSTRING;
  szSourceData: Array<CSTRING>;
  stRequestTime: common.SYSTEMTIME;
}

const SoureDialog = (props: SoureDialogProps) => {
  const { szPeriodNumber, szSourceData, stRequestTime } = props;
  const { formatMsg } = useLanguage();

  const handleCopy = (params) => {
    copyText(params);
  };

  return (
    <>
      <div className='color-white d-f ai-c jc-c wds-h1 ta-c bg-gdt-top br-t-l-30 br-t-r-30 h-150'>
        <div>{formatMsg('completeNumSource')}</div>
      </div>
      <div className='wds-con d-f ai-c h-120'>
        <div className='color-assist m-l-50'>{szPeriodNumber.value}</div>
        <div className='ta-r flex-1 color-assist m-r-50'>
          {`${formatMsg('crawlTime')}: ${stRequestTime
            .format('yyyy-MM-dd')
            .replace(/-/g, '.')}`}
        </div>
      </div>
      <div className='wds-con d-f ai-c fd-c jc-c m-b-50'>
        {szSourceData.map((item, i) => (
          <div
            className='d-f ai-c jc-sb h-120'
            onClick={() => {
              handleCopy(item.value);
            }}
          >
            <div className='color-assist w-80 m-l-50'>{i + 1}.</div>
            <div
              className={`${styles.soureClor} flex-1 wb-w wb-all ws-n m-r-50`}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div className='wds-con color-assist m-b-50 m-l-50'>
        {formatMsg('copyTipsOne')}
      </div>
    </>
  );
};

export default memo(SoureDialog);
