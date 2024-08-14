import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, CellGroup, Img } from '@/components';
import { getRedPacketRecordDetail } from '@/services';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { formatDigit } from '@/utils/tools';
import { useLanguage } from '@/hooks';

//   {
//     id: 1,
//     name: 'www',
//     date: '06:56',
//     value: '1200.0',
//     max: true,
//   },
//   {
//     id: 2,
//     name: 'www',
//     date: '06:56',
//     value: '220.0',
//     max: false,
//   },
//   {
//     id: 3,
//     name: 'www',
//     date: '06:56',
//     value: '230.0',
//     max: false,
//   },
//   {
//     id: 4,
//     name: 'www',
//     date: '06:56',
//     value: '240.0',
//     max: false,
//   },
// ];
const EnvelopeList = () => {
  const { state } = useLocation();
  const { nickname } = useUserInfoStore();
  const [recordList, setRecordList] = useState([]);
  const [current, setCurrent] = useState(0);
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();
  useEffect(() => {
    if (recordList.length === 0) {
      changeState('isLoading', true);
      getRedPacketRecordDetail({ id: state.id })
        .then((res: any) => {
          if (res.Data && res.Data.length) {
            setCurrent(res.Data.length);
            let maxIndex = -1;
            if (res.Data.length === state.totalCount) {
              let max = res.Data[0].Amount;
              for (let index = 1; index < res.Data.length; index += 1) {
                const element = res.Data[index];
                if (element.Amount > max) {
                  max = element.Amount;
                  maxIndex = index;
                }
              }
            }
            setRecordList([
              ...res.Data.map((it, i) => ({
                id: i,
                date: it.Date.substring(14),
                value: formatDigit(it.Amount),
                name: it.NickName,
                faceId: it.FaceId,
                max: maxIndex === i,
              })),
            ]);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [changeState, recordList.length, state]);

  return (
    <>
      <div className='df-fdc jc-c ai-c'>
        <div className='color-primary-text wds-big-title font-w-normal m-t-100'>
          {state?.title}
        </div>
        {/* 头像 */}
        <div className='d-f jc-c ai-c m-t-30'>
          <div className='avatar-mid b-1 d-f ai-c jc-c'>
            <Avatar className='icon-100' />
          </div>
          <div className='wds-sm-title color-primary-text'>
            {`${nickname}${formatMsg('sendRedPacket')}`}
          </div>
        </div>
      </div>
      <CellGroup
        className='m-t-30 br-t-l-30  br-t-r-30'
        title={
          <div className='h-120 color-con-ass d-f jc-c ai-c lh-150'>
            {`${formatMsg('remainingRed')}(${current} / ${
              state?.totalCount
            })${formatMsg('individual')}`}
          </div>
        }
        borderBottom
      />
      <CellGroup>
        {recordList.map((item, i) => (
          <div
            key={item.id || i}
            className={`${item.max ? 'bg-int-lig' : ''} ${
              i % 2 === 0 && !item.max ? 'bg-int-dark' : ''
            }`}
          >
            <div className='d-f jc-sb ai-c h-150 m-0-50'>
              {/* 头像Col */}
              <div className='d-f ai-c jc-start w-366'>
                <div className='avatar-mid b-1 df-fdc jc-c ai-c'>
                  <Avatar className='icon-100' avatorId={item.faceId} />
                </div>
                {/* 名字和时间 */}
                <div className='df-fdc jc-c ai-c m-0-30'>
                  <div className='wds-con color-primary-text oe'>
                    {item.name}
                  </div>
                  <div className='wds-explain-con color-con-ass m-t-10'>
                    {item.date}
                  </div>
                </div>
              </div>

              <div className='df-fdc jc-c ai-c color-con-ass w-366'>
                {formatMsg('grabredEnvelope')}
              </div>

              <div className='df-fdc jc-end m-10 w-366'>
                <div className='ta-r color-red wds-con'>
                  {`${item.value}${formatMsg('yuan')}`}
                </div>
                {item.max ? (
                  <div className='d-f jc-end ai-c'>
                    <Img className='icon-60' src='/common/vector.png' />
                    <div className='color-primary wds-con lh-64 m-l-20 m-t-16'>
                      {formatMsg('luckyPlayer')}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        ))}
      </CellGroup>
    </>
  );
};

export default memo(EnvelopeList);
