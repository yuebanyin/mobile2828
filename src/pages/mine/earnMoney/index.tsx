import { observer } from 'mobx-react-lite';
import { Button, OutLink, Cell, Img, QrcodeReact } from '@/components';
import { copyText } from '@/utils/tools';
import { useGameConfigStore, useUserInfoStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const EarnMoney = () => {
  const { getGameSwitchConfig } = useGameConfigStore();
  const { gameId } = useUserInfoStore();
  const { formatMsg } = useLanguage();
  //点击复制icon
  const handleCopy = (params) => {
    copyText(params);
  };

  console.log(getGameSwitchConfig('s12'));

  //点击保存图片
  const handleDown = () => {
    const canvasImg = document.getElementById('qrCode') as HTMLCanvasElement; // 获取canvas类型的二维码
    const img = new Image();
    img.src = canvasImg.toDataURL('image/png'); // 将canvas对象转换为图片的data url

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = img.src;
    a.download = '二维码';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return false;
  };
  return (
    <>
      <div className='wds-con p-30-0-30-50 color-con-ass'>
        {formatMsg('IntroducerInformation')}
      </div>
      <Cell
        className='wds-con m-0'
        title={`${formatMsg('IntroducerCode')} ${gameId}`}
        rightSolt={
          <Img
            className='icon-copy m-r-50'
            alt=''
            src='/mine/copyIcon.png'
            onClick={() => handleCopy(gameId)}
          />
        }
        dividerFull
      />
      <Cell
        className='wds-con m-0'
        title={`${formatMsg('IntroducerLink')} ${getGameSwitchConfig(
          's12'
        )}?p=${gameId}`}
        titleClassName='w-400 oe'
        isDivider={false}
        rightSolt={
          <Img
            className='icon-copy m-r-50'
            alt=''
            src='/mine/copyIcon.png'
            onClick={() =>
              handleCopy(`${getGameSwitchConfig('s12')}?p=${gameId}`)
            }
          />
        }
      />
      <div className='wds-con p-30-0-30-50 color-con-ass'>
        {formatMsg('promotionCode')}
      </div>
      <div className='h-500 d-f ai-c jc-sb p-0-52 bg-body'>
        <div className='w-400 h-400 df-aic-jcc b-1 bc-primary br-30'>
          <QrcodeReact
            id='qrCode'
            value={`${getGameSwitchConfig('s12')}?p=${gameId}`}
          />
        </div>
        <div>
          <div
            className='w-400 h-132 df-aic-jcc wds-h1 bs-unu color-primary m-b-50 br-10'
            onClick={() => handleDown()}
          >
            {formatMsg('saveImg')}
          </div>
          <div
            className='w-400 h-132 df-aic-jcc wds-h1 bs-unu color-primary br-10'
            onClick={() =>
              handleCopy(`${getGameSwitchConfig('s12')}?p=${gameId}`)
            }
          >
            {formatMsg('copyLink')}
          </div>
        </div>
      </div>
      <OutLink className='h-138 m-t-100 m-0-auto' href='proBonus'>
        <Button text={formatMsg('vewPromotionRecord')} className='w-940 h-138' />
      </OutLink>
    </>
  );
};

export default observer(EarnMoney);
