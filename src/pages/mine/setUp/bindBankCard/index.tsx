import { useEffect, useState } from 'react';
import {
 BgImg, Cell, Img, KindTips, OutLink, toastText, Icon 
} from '@/components';
import styles from '../index.module.scss';
import { bindBankKindTips } from '@/constants';
import { getBindBankCardList } from '@/services/personal';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

export type BankCardTypeDto = {
  CardNumber: number;
  Name: string;
  BankName: string;
  InsertTime: string;
};

// 银行卡列表
function BindBankCard() {
  const [count, setCount] = useState(3);
  const [bankCardList, setBankCardList] = useState<BankCardTypeDto[]>([]);
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  useEffect(() => {
    changeState('isLoading', true);
    getBindBankCardList()
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          setBankCardList(res.Data);
          setCount(res.Count);
        } else {
          toastText('Network Error');
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  return (
    <>
      <Cell
        title={(
          <div className='text d-f fd-r'>
            <span>
              {formatMsg('accountHasBind')}
              {count}
              {formatMsg('bindThree')}
            </span>
          </div>
        )}
        dividerFull
        rightDesc=' '
      />

      <div className='flex-1 o-y bg-body'>
        {count < 3 ? (
          <div className='d-f fd-c flex-1 ai-c jc-sb ta-c p-r m-t-48'>
            <OutLink href='./detail'>
              <BgImg className='w-860 h-400 fd-c d-f ai-c jc-sa' url='/mine/card_0.png'>
                <div className='d-f fd-c ai-c jc-sa'>
                  <Icon name='uploader' size={30} className={`${styles['add-icon']}`} />
                  <span className={`${styles['add-text']}`}>{formatMsg('addBankCard')}</span>
                  <span className={`${styles['add-text']}`}>({formatMsg('maxAddThree')})</span>
                </div>
              </BgImg>
            </OutLink>
          </div>
        ) : (
          ''
        )}
        {bankCardList.map((item, i) => (
          <div key={`${i}` || item.Name} className='d-f fd-c flex-1 ai-c jc-sb ta-c p-r m-t-48'>
            <Img className='w-860 h-400 ' src='/mine/card_2.png' />
            <div className='w-860 h-400 p-a'>
              <div className={`${styles['bank-card-name']}`}>{item.BankName}</div>
              <div className={`${styles['bank-card-number']}`}>{item.CardNumber}</div>
              <div className={`d-f flex-1 fd-r ai-c w-full  ${styles['m-t-100']}`}>
                <div className={`p-0-40 ${styles['bank-card-sub-title']}`}>{formatMsg('name')}</div>
                <div className='flex-1' />
                <div className={`${styles['p-r-150']} ${styles['bank-card-sub-title']}`}>{formatMsg('bindCard')}</div>
              </div>

              <div className={`d-f flex-1 fd-r ai-c w-full  ${styles['m-t-8']}`}>
                <div className={`p-0-40 ${styles['bank-card-name-time']}`}>{item.Name}</div>
                <div className='flex-1' />
                <div className={`${styles['p-r-44']} ${styles['bank-card-name-time']}`}>{item.InsertTime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <KindTips className='m-t-2 m-l-50' data={bindBankKindTips} />
    </>
  );
}

export default BindBankCard;
