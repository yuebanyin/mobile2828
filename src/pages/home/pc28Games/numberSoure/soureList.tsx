import { memo, useCallback } from 'react';
import { ColorfulBall } from '@/pages/gameComponents';
import CountDownTime from '@/pages/gameComponents/countDownTime';
import styles from './index.module.scss';
import { Dialog, Icon } from '@/components';
import SoureDialog from './soureDialog';
import { useLanguage } from '@/hooks';

interface SoureListProps {
  recordData?: any[];
  onCheck?: Function;
}

const SoureList = (props: SoureListProps) => {
  const { recordData, onCheck } = props;
  const { formatMsg } = useLanguage();

  const itemClick = useCallback(
    (item: any) => {
      Dialog.confirm({
        isTitle: false,
        onlyConfirm: false,
        okText: formatMsg('btb_28_tool_2'),
        onOk: () => {
          let srcData = '';
          for (let index = 0; index < item.szSourceData.length; index += 1) {
            const element = item.szSourceData[index];
            srcData += element.value;
          }
          onCheck && onCheck(srcData);
        },
        children: (
          <SoureDialog
            szPeriodNumber={item.szPeriodNumber}
            szSourceData={item.szSourceData}
            stRequestTime={item.stRequestTime}
          />
        ),
      });
    },
    [onCheck, formatMsg]
  );

  return (
    <div className='o-none h-full d-f fd-c'>
      <div className='p-0-50 t-40 '>
        <div className='d-f jc-sb m-t-30 m-b-30 color-primary-text'>
          <div className='d-f ai-c '>
            <div className='m-r-30 wds-sm-title'>{formatMsg('btb_1_28')}</div>
            <div className=''>
              <span>{formatMsg('di')}</span>
              <span className='color-red'>
                {(parseInt(recordData[0]?.szPeriodNumber?.value) + 1)
                  .toString()
                  .slice(4)}
              </span>
              <span>{formatMsg('qi')}</span>
            </div>
          </div>
          <div className='d-f ai-c '>
            <CountDownTime className='p-10-40 br-10 bg-incon color-primary' />
          </div>
        </div>
        <div className='d-f ai-c jc-c m-b-30'>
          <ColorfulBall
            className='w-86 h-86 t-h1'
            text={recordData[0]?.cbTableCard[1]?.value}
            type='normal'
          />
          <ColorfulBall
            className='w-86 h-86 t-h1'
            text={recordData[0]?.cbTableCard[2]?.value}
            type='normal'
          />
          <ColorfulBall
            className='w-86 h-86 t-h1'
            text={recordData[0]?.cbTableCard[3]?.value}
            type='normal'
          />
          <ColorfulBall
            className='w-86 h-86 t-h1'
            text={recordData[0]?.cbTableCard[0]?.value}
            type='wordBorder'
          />
        </div>
      </div>
      <div className='p-0-50 d-f ai-c jc-sb t-main color-con-ass bg-incon'>
        <div className='d-f ai-c h-120'>
          <span>{formatMsg('issue')}</span>
        </div>
        <div className='d-f ai-c h-120'>
          <span>{formatMsg('winNums')}</span>
        </div>
        <div className='d-f ai-c h-120'>
          <span className='lh-26'>
            {formatMsg('signal')} （{formatMsg('jin')}
          </span>
          <span className='color-red font-w-bold lh-26'>50</span>
          <span className='lh-26'>{formatMsg('qi')}）</span>
        </div>
      </div>
      <div className='o-y'>
        {recordData?.map((item, i) => (
          <div
            key={`${i + 1}`}
            className={`h-120 p-0-50 d-f ai-c jc-sb t-main font-w-bolder color-primary-text ${
              i % 2 === 0 ? '' : 'bg-alternate'
            }`}
            onClick={() => {
              itemClick(item);
            }}
          >
            <div className='m-r-20'>
              <span>{item.szPeriodNumber?.value.slice(4)}</span>
            </div>
            <div className='d-f ai-c jc-c'>
              <div className='wds-con m-r-20'>
                {item?.cbTableCard[1]?.value}
              </div>
              <div className='wds-con m-r-20'>
                {item?.cbTableCard[2]?.value}
              </div>
              <div className='wds-con m-r-20'>
                {item?.cbTableCard[3]?.value}
              </div>
              <ColorfulBall
                text={item?.cbTableCard[0]?.value}
                type='wordBorder'
              />
            </div>
            <div className={`${styles.soureClor} wds-sm-con d-f ai-c`}>
              <div className='w-330 h-80 wb-w wb-all ws-n'>
                {item?.szSourceData[0].value.substring(0, 30)}
              </div>
              <Icon name='rect-right' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SoureList);
