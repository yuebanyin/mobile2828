import { memo, useCallback, useState } from 'react';
import { BgImg, Img, FormDemo as Form, FormItem, Input } from '@/components';
import { copyText, isArray } from '@/utils/tools';
import { useLanguage } from '@/hooks';

interface UsdtPageProps {
  nameList?: Array<any>;
  protoInfo?: any;
  form: any;
  changeName?: Function;
}

const UsdtPage = (props: UsdtPageProps) => {
  const { nameList, protoInfo, form, changeName } = props;
  const { formatMsg } = useLanguage();

  const [rmb, setRmb] = useState(null);

  // 切换USDT选项
  const handleClick = (info) => {
    changeName && changeName(info);
  };

  //点击复制icon
  const handleCopy = (params) => {
    copyText(params);
  };

  // 输入金额
  const handleMoney = useCallback(
    (item) => {
      console.log(item);
      const money = item * protoInfo.Rate;
      setRmb(money);
    },
    [protoInfo]
  );

  return (
    <BgImg url='/recharge/aliyellow.png' className='img-bg-s'>
      <div className='p-0-40 m-b-20'>
        <div className='d-f ai-c m-t-34'>
          {isArray(nameList) &&
            nameList.map((item) => (
              <div
                onClick={() => handleClick(item)}
                key={item.Id}
                className={`m-r-20 w-340 p-14-20 oe br-100 wds-explain font-w-bold bg-incon ${
                  item.Id === protoInfo?.Id ? 'bg-sm-org color-primary' : ''
                }`}
              >
                {item.Name}
              </div>
            ))}
        </div>
        <div className='d-f jc-sb m-t-50'>
          <div className='w-180 h-180 df-aic-jcc b-2 bc-white br-20'>
            <Img className='icon-160' isNoTheme src={protoInfo?.ChargeQrcode} />
          </div>
          <div className='d-f fd-c jc-sb wds-con color-white '>
            <div className='d-f'>
              <p>{formatMsg('billingMsg')}</p>
              <Img className='icon-50 m-l-20' src='/recharge/tips_icon.png' />
            </div>

            <div className='w-716 h-114 o-none p-15-20 br-20 bg-re-low t-small color-primary-text wb-w'>
              {protoInfo?.Address}
            </div>
          </div>
          <div className='d-f fd-cr jc-sb'>
            <Img
              className='icon-50 m-r-10'
              src='/recharge/copy_icon.png'
              onClick={() => handleCopy(protoInfo?.Address)}
            />
          </div>
        </div>
      </div>
      <div className='m-t-60 p-t-50 p-b-30 br-30 bg-body bs-primary'>
        <div className='d-f ai-c br-50 p-l-70 m-b-20'>
          <Img className='w-55 h-30 m-r-10' src='/recharge/two_ball.png' />
          <div>{formatMsg('payInfo')}</div>
        </div>
        <Form className='bg-body' form={form}>
          <FormItem
            labelClassname='ws-no'
            type='card'
            rules={[
              {
                validator: (_, v) => {
                  if (v) {
                    return true;
                  }
                  return false;
                },
                message: `${formatMsg('WalletAddressNotEmpty')}`,
              },
            ]}
            colon={false}
            name='Address'
            label={formatMsg('goPayAddress')}
          >
            <Input
              placeholder={formatMsg('entryGoPayAddress')}
              className='ta-r o-none'
            />
          </FormItem>
          <FormItem
            labelClassname='w-min-344 ws-no'
            type='card'
            rules={[
              {
                validator: (_, v) => {
                  if (v) {
                    return true;
                  }
                  return false;
                },
                message: `${formatMsg('pleaseEnterAmount')}`,
              },
            ]}
            name='UsdtAmount'
            colon={false}
            label={`${formatMsg('deposits')}(USDT)`}
          >
            <Input
              placeholder={`${formatMsg('pleaseEnterAmount')}${
                protoInfo?.DepositMin || ' '
              }${protoInfo?.DepositMin ? '~' : ' '}${
                protoInfo?.DepositMax || ' '
              }`}
              type='number'
              onChange={handleMoney}
              className='ta-r o-none'
            />
          </FormItem>
        </Form>
        <div className='wds-sm-title d-f jc-sb p-l-70 p-r-70'>
          <div className='laber'>{formatMsg('exchangeRate')}</div>
          <div className='ta-r'>
            <div>{`1USDT≈${protoInfo?.Rate || 0} RMB`}</div>
            <div className='color-tips'>
              {formatMsg('arrivalRmb')}:{rmb}
            </div>
          </div>
        </div>
      </div>
    </BgImg>
  );
};

export default memo(UsdtPage);
