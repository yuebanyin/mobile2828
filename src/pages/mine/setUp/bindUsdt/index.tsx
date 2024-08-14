import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  CellGroup,
  Img,
  Input,
  KindTips,
  OutLink,
  toastText,
} from '@/components';
import styles from '../index.module.scss';
import { bindUsdtKindTips } from '@/constants';
import { bindUsdt, getBindUsdtList } from '@/services';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

// BindGoPay
function BindUsdt() {
  const [trc20, setTRC20] = useState<string>('');
  const [erc20, setERC20] = useState<string>('');
  const [omini, setOMini] = useState<string>('');
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  useEffect(() => {
    changeState('isLoading', true);
    getBindUsdtList()
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          setTRC20(res.Data.UstdTrc20);
          setERC20(res.Data.UstdErc20);
          setOMini(res.Data.UstdOmini);
        } else {
          toastText('Network Error');
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  const handleBindUsdt = useCallback(
    (_, resolve) => {
      changeState('isLoading', true);
      bindUsdt({ UstdTrc20: trc20, UstdErc20: erc20, UstdOmini: omini })
        .then((res: any) => {
          // toastText(res.Message);
          const msgObj = JSON.parse(res.Message);
          toastText(formatMsg(msgObj?.key, msgObj?.parm));
          resolve && resolve();
        })
        .catch(() => {
          resolve && resolve();
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState, erc20, omini, trc20, formatMsg]
  );

  return (
    <>
      <CellGroup className='m-t-30'>
        <div className='d-f fd-c jc-start flex-1  p-l-50 p-t-30 p-b-30'>
          <span className={`${styles['title']}`}>USDT-TRC20(TRON)</span>
        </div>
        <div className='p-l-50 p-b-30 fd-r jc-end'>
          <span className={`${styles['title']}`}>
            {formatMsg('walletAddress')}
          </span>
          <Input
            placeholder={formatMsg('entryGoPayAddress')}
            maxLength={999}
            value={trc20}
            onChange={(e: any) => {
              setTRC20(e);
            }}
          />
        </div>
      </CellGroup>

      <CellGroup className='m-t-30'>
        <div className='d-f fd-c jc-start flex-1  p-l-50 p-t-30 p-b-30'>
          <span className={`${styles['title']}`}>USDT-ERC20</span>
        </div>
        <div className='p-l-50 p-b-30'>
          <span className={`${styles['title']}`}>
            {formatMsg('walletAddress')}
          </span>
          <Input
            placeholder={formatMsg('entryGoPayAddress')}
            maxLength={999}
            value={erc20}
            onChange={(e: any) => {
              setERC20(e);
            }}
          />
        </div>
      </CellGroup>

      <CellGroup className='m-t-30'>
        <div className='d-f fd-c jc-start flex-1  p-l-50 p-t-30 p-b-30'>
          <span className={`${styles['title']}`}>USDT-OMini</span>
        </div>
        <div className='p-l-50 p-b-30'>
          <span className={`${styles['title']}`}>
            {formatMsg('walletAddress')}
          </span>
          <Input
            placeholder={formatMsg('entryGoPayAddress')}
            maxLength={999}
            value={omini}
            onChange={(e: any) => {
              setOMini(e);
            }}
          />
        </div>
      </CellGroup>

      <div className='m-t-30 m-0-50 p-30'>
        <Button
          className='w-full'
          size='large'
          isPromise
          onClick={handleBindUsdt}
        >
          {formatMsg('confirm')}
        </Button>
      </div>
      <KindTips className='m-t-2' data={bindUsdtKindTips} />

      <div className='d-f ai-c jc-c m-t-50'>
        <OutLink
          href='http://106.14.81.24:81/#/home?tab=2&path='
          target='_blank'
          type={2}
          className='d-f fd-c ai-c jc-c'
        >
          <Img className='w-70 h-70' src='/mine/setUp/help_icon.png' />
          <div className='color-tips m-t-30'>{formatMsg('operationHelp')}</div>
        </OutLink>
      </div>
    </>
  );
}

export default BindUsdt;
