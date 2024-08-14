import { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Button, Input, toastText } from '@/components';
import { Score } from '@/components/score';
import { useGlobalStore, useUserScoreStore } from '@/mobx';
import {
  getTransferIn,
  getTransferOut,
  getUserScoreInfo,
  getYebInfo,
} from '@/services';
import { useNavigation, useLanguage } from '@/hooks';
import { formatDate, formatDigit } from '@/utils/tools';

/**
 * 余额宝-转入转出
 * @returns
 */
const RollInOut = () => {
  const { score, changeUserScore } = useUserScoreStore();
  const { state } = useLocation();
  const [title, setTitle] = useState('');
  const [params] = useSearchParams();
  const mode = params.get('mode');
  const [yebInfo, setYebInfo] = useState({
    Total: 0,
    TotalProfit: 0,
    LastProfit: 0,
    SettleDate: '',
  });
  const navigate = useNavigation();
  const { changeState } = useGlobalStore();
  const [value, setValue] = useState(state.settleValue || '');
  const { formatMsg } = useLanguage();

  useEffect(() => {
    if (mode === 'in') setTitle(`${formatMsg('shiftTo')}`);
    if (mode === 'out') setTitle(`${formatMsg('rollOut')}`);
    changeState('isLoading', true);
    getYebInfo()
      .then((res: any) => {
        if (res.Data) setYebInfo(res.Data);
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, mode, formatMsg]);

  const allIn = () => {
    setValue(mode === 'out' ? yebInfo.Total.toString() : score.toString());
  };

  const getUserScore = useCallback(() => {
    changeState('isLoading', true);
    getUserScoreInfo()
      .then((res: any) => {
        if (res.Data) changeUserScore(res.Data);
        navigate('/mine/yueBao', { replace: true });
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, changeUserScore, navigate]);

  const handleRoll = useCallback(
    (_, resolve) => {
      if (value.length === 0) {
        toastText(`${formatMsg('pleaseEnterAmount')}`);
        resolve && resolve();
        return;
      }
      const val = parseFloat(value);
      if (val === 0) {
        toastText(`${formatMsg('enterMoneyNot0')}`);
        resolve && resolve();
        return;
      }
      if (mode === 'in') {
        changeState('isLoading', true);
        getTransferIn({ Amount: val })
          .then((res: any) => {
            const msgObj = JSON.parse(res.Message);
            toastText(formatMsg(msgObj?.key, msgObj?.parm));
            resolve && resolve();
            getUserScore();
          })
          .catch(() => {
            resolve && resolve();
          })
          .finally(() => {
            changeState('isLoading', false);
          });
      }
      if (mode === 'out') {
        changeState('isLoading', true);
        getTransferOut({ Amount: val })
          .then((res: any) => {
            const msgObj = JSON.parse(res.Message);
            toastText(formatMsg(msgObj?.key, msgObj?.parm));
            resolve && resolve();
            getUserScore();
          })
          .catch(() => {
            resolve && resolve();
          })
          .finally(() => {
            changeState('isLoading', false);
          });
      }
    },
    [changeState, getUserScore, mode, value, formatMsg]
  );

  const handleChange = (r) => {
    if (r === '') {
      setValue('');
      return;
    }
    setValue(r);
  };

  return (
    <>
      <div className='d-f fd-r p-50-42 bg-body'>
        <span className='flex-1'>
          {mode === 'out'
            ? `${formatMsg('yeb_all_account')}`
            : `${formatMsg('DT_account')}`}
        </span>
        <span className='color-red font-w-bold'>
          {mode === 'out' ? (
            <span>{formatDigit(yebInfo.Total)}</span>
          ) : (
            <Score />
          )}
        </span>
      </div>
      <div className='m-t-30 p-50-42 bg-body wds-con'>
        <div>{formatMsg('transferAmount')}</div>
      </div>
      <div className='p-0-50 p-b-30 bg-body b-b-1 bc-split d-f fd-r ai-c wds-con'>
        <div className='font-w-bold color-tips'>￥</div>
        <Input
          className='flex-1 h-80 w-280 wds-big-title font-w-bold'
          placeholder={formatMsg('pleaseEnterAmount')}
          type='number'
          value={value}
          onChange={(r) => handleChange(r)}
        />
        <div onClick={() => allIn()}>{formatMsg('all')}</div>
      </div>
      <div className='p-50-42 bg-body d-f fd-r'>
        <div className='flex-1 wds-con color-primary-text'>
          {mode === 'out'
            ? `${formatMsg('rollOutToDT')}`
            : `${formatMsg('accountingDate')}`}
        </div>
        {/* <div className='color-assist wds-sm-con'>{state?.settleDate ? state.settleDate.replace(/\//g, '-') : '0000-00-00 00:00:00'}</div> */}
        <div className='color-assist wds-sm-con'>
          {formatDate(new Date(), '_YMDHms')}
        </div>
      </div>
      <div className='w-full h-138 p-0-52 m-t-100'>
        <Button
          className='w-940 h-138'
          isPromise
          type='primary'
          size='large'
          onClick={handleRoll}
        >
          <span>{formatMsg('confirm')}</span>
          <span>{title}</span>
        </Button>
      </div>
    </>
  );
};

export default memo(RollInOut);

