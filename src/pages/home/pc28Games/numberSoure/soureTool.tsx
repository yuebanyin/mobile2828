/* eslint-disable max-len */
import { memo, useEffect, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import styles from './index.module.scss';
import { Button, Img, toastText } from '@/components';
import { copyText } from '@/utils/tools';
import { useLanguage } from '@/hooks';

const queryUrl = [
  'https://btc.com',
  'https://www.blockchain.com/btc/unconfirmed-transactions',
  'http://encode.chahuo.com',
  'https://tool.lu/hexconvert',
];

const TitleItem = (text) => (
  <div className='m-l-50 m-t-100 t-small-title font-w-bolder d-f jc-start'>
    <div className='h-40 w-16 bg-primary m-r-30' />
    <div>{text}</div>
  </div>
);

const ItemContent = (content, last?) => (
  <div
    className={`${
      last ? 'm-b-110' : ''
    } m-0-50 m-t-100 t-small-title color-primary-text`}
  >
    {content}
    {last ? <div className='m-b-110 h-100' /> : ''}
  </div>
);

const SoureTool = (props: { srcdata }) => {
  const { formatMsg } = useLanguage();
  const { srcdata } = props;
  const soureData = useRef('');
  const [sha256, setSha256] = useState('');
  const [sha16, setSha16] = useState('');
  const [strCb10, setStrCb10] = useState('');
  const [strNum, setStrNum] = useState('');
  const [strResult, setStrResult] = useState('');
  const divRef = useRef<HTMLDivElement | null>(null);

  /**
   * @description: 校验号源
   * @param {*} soureData
   * @return {*}
   */
  const checkSourceData = () => {
    if (soureData.current.length <= 0) {
      toastText(`${formatMsg('enterNumberSource')}`);
      return;
    }
    const str256 = CryptoJS.SHA256(soureData.current).toString();
    setSha256(str256);
    const str16 = str256.substring(0, 16);
    setSha16(str16);
    const cb10 = parseInt(str16, 16);
    setStrCb10(cb10.toString());
    // eslint-disable-next-line no-restricted-properties
    const sNum = (cb10 / Math.pow(2, 64)).toString();
    setStrNum(sNum);
    setStrResult(sNum.substring(2, 5));
  };

  const handleCopy = (index) => {
    copyText(queryUrl[index]);
  };

  const clearSoureData = () => {
    soureData.current = '';
    divRef.current.innerHTML = '';
  };

  const handleInput = () => {
    soureData.current = divRef.current.innerHTML;
  };

  useEffect(() => {
    if (soureData.current !== srcdata) {
      setSha256('');
      setSha16('');
      setStrCb10('');
      setStrNum('');
      setStrResult('');
      soureData.current = srcdata;
      divRef.current.innerHTML = soureData.current;
    }
  }, [srcdata]);
  return (
    <div className='h-full d-f fd-c o-y'>
      {TitleItem(formatMsg('btb_28_tool_1'))}
      <div className='m-0-50 m-t-50 d-f ai-c jc-sb'>
        <div
          ref={divRef}
          className={`${styles.input} bg-incon h-400 w-716 t-40 wb-w wb-all ws-n o-y`}
          suppressContentEditableWarning
          contentEditable
          onInput={handleInput}
          onClick={clearSoureData}
        >
          {soureData.current}
        </div>
        <div>
          <Button
            className='w-200 h-400 br-30'
            onClick={() => {
              checkSourceData();
            }}
          >
            {formatMsg('btb_28_tool_2')}
          </Button>
        </div>
      </div>
      <div className='d-f ai-c jc-c m-t-50'>
        <Img className={styles.xl} src='/home/GameField/img_xial2.png' />
      </div>

      {TitleItem(formatMsg('btb_28_tool_3'))}
      <div className='m-l-50 m-t-50 d-f ai-c jc-start'>
        <div className='t-small-title w-320'>{formatMsg('btb_28_tool_4')}</div>
        <div
          className={`${styles.dr} d-f fd-c ai-c jc-c bg-incon m-l-80 h-256 t-40 wb-w wb-all ws-n o-y`}
        >
          <div className='p-0-20'>{sha256}</div>
        </div>
      </div>

      <div className='m-l-50 m-t-50 d-f ai-c jc-start'>
        <div className='t-small-title w-320'>{formatMsg('btb_28_tool_5')}</div>
        <div
          className={`${styles.dr} d-f fd-c ai-c jc-c bg-incon m-l-80 h-100 t-40 wb-w wb-all ws-n o-y`}
        >
          <div className='p-0-20'>{sha16}</div>
        </div>
      </div>

      <div className='m-l-50 m-t-50 d-f ai-c jc-start'>
        <div className='t-small-title w-320'>{formatMsg('btb_28_con_5')}</div>
        <div
          className={`${styles.dr} d-f fd-c ai-c jc-c bg-incon m-l-80 h-100 t-40 wb-w wb-all ws-n o-y`}
        >
          <div className='p-0-20'>{strCb10}</div>
        </div>
      </div>

      <div className='m-l-50 m-t-50 d-f ai-c jc-start'>
        <div className='t-small-title w-320'>{formatMsg('btb_28_tool_6')}</div>
        <div
          className={`${styles.dr} d-f fd-c ai-c jc-c bg-incon m-l-80 h-100 t-40 wb-w wb-all ws-n o-y`}
        >
          <div className='p-0-20'>{strNum}</div>
        </div>
      </div>

      <div className='m-l-50 m-t-50 d-f ai-c jc-start'>
        <div className='t-small-title w-320'>{formatMsg('btb_28_tool_7')}</div>
        <div
          className={`${styles.dr} d-f fd-c ai-c jc-c bg-incon m-l-80 h-100 t-40 wb-w wb-all ws-n o-y`}
        >
          <div className='p-0-20'>{strResult}</div>
        </div>
      </div>
      {ItemContent(formatMsg('btb_28_tool_12'))}
      <div className='m-0-50 m-t-80 t-40'>
        <div>{formatMsg('btb_28_tool_8')}:</div>
        <div className='d-f jc-start ai-c'>
          <div className='d-f ai-c jc-c h-100 wds-sm-title'>{queryUrl[0]}</div>
          <div className='m-l-80 h-100 w-200'>
            <Button
              size='small'
              className='br-30'
              onClick={() => {
                handleCopy(0);
              }}
            >
              {formatMsg('btb_28_tool_11')}
            </Button>
          </div>
        </div>
        <div className='d-f jc-start ai-c m-t-30'>
          <div className='d-f ai-c jc-start w-716 wds-sm-title wb-w wb-all ws-n'>
            {queryUrl[1]}
          </div>
          <div className='m-l-80 h-100 w-200'>
            <Button
              size='small'
              className='br-30'
              onClick={() => {
                handleCopy(1);
              }}
            >
              {formatMsg('btb_28_tool_11')}
            </Button>
          </div>
        </div>
      </div>

      <div className='m-0-50 m-t-80 t-40'>
        <div>{formatMsg('btb_28_tool_9')}:</div>
        <div className='d-f jc-start ai-c'>
          <div className='d-f ai-c jc-c h-100 wds-sm-title'>{queryUrl[2]}</div>
          <div className='m-l-80 h-100 w-200'>
            <Button
              size='small'
              className='br-30'
              onClick={() => {
                handleCopy(2);
              }}
            >
              {formatMsg('btb_28_tool_11')}
            </Button>
          </div>
        </div>
      </div>

      <div className='m-0-50 m-t-80 t-40'>
        <div>{formatMsg('btb_28_tool_10')}:</div>
        <div className='d-f jc-start ai-c'>
          <div className='d-f ai-c jc-c h-100 wds-sm-title'>{queryUrl[3]}</div>
          <div className='m-l-80 h-100 w-200'>
            <Button
              size='small'
              className='br-30'
              onClick={() => {
                handleCopy(3);
              }}
            >
              {formatMsg('btb_28_tool_11')}
            </Button>
          </div>
        </div>
      </div>

      <div className='d-f ai-c jc-c m-t-50 m-0-50 m-b-110'>
        <Img className={styles.bg} src='/home/GameField/source_data_tips.png' />
      </div>
      <div className='h-100 m-b-110' />
    </div>
  );
};

export default memo(SoureTool);
