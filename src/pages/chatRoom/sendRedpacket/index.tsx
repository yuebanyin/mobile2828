import { useState, useEffect, memo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import {
  FormDemo as Form,
  Input,
  FormItemProps,
  Button,
  toastText,
  Dialog,
  Icon,
} from '@/components';
import styles from './index.module.scss';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import { useWSInstanceStore } from '@/mobx/wsInstance';
import { useGameConfigStore } from '@/mobx';

const FormItem = Form.Item;
const defaultRedpacketStore = '0.00';
//  抽出表单item公共配置
const formItemConfig: Pick<
  FormItemProps,
  'classname' | 'colon' | 'type' | 'labelClassname'
> = {
  classname: `m-b-50 bg-body br-30 ${styles['redpacket-form-item']} b-none`,
  colon: false,
  labelClassname: styles['redpacket-form-item-lable'],
};

// 发送按钮
const SendBtn = memo(({ form, onClose, chatws, config }: any) => {
  const { t } = useTranslation();
  // 发送红包逻辑
  const sendRedpacket = () => {
    const rCount = form.getFieldValue('rCount');
    if (rCount < 1) {
      toastText(`${t('enterRedPackets')}`);
      return;
    }
    const maxC = config && config.get('redPackCount');
    const maxS = config && config.get('redPackScore');
    if (maxC && rCount > maxC) {
      toastText(`${t('maxRedPackets')}${maxC}`);
      return;
    }
    const score = form.getFieldValue('score');
    if (score <= 0) {
      toastText(`${t('enterMoney')}`);
      return;
    }
    if (maxS && score > maxS) {
      toastText(`${t('maxMoneyNum')}${maxS}`);
      return;
    }
    const title = form.getFieldValue('title') || `${t('gxfc')}`;
    // 发送红包逻辑
    if (chatws) {
      (chatws as CtrlChat).sendRebPacket(Number(rCount), Number(score), title);
      onClose && onClose();
      return;
    }
    toastText(`${t('networkFails')}`);
  };
  return (
    <Button
      onClick={sendRedpacket}
      className={`flex-init m-0-auto br-20 ${styles['send-btn']}`}
    >
      {t('sendEnvelopes')}
    </Button>
  );
});

const SendRedpacketContent = ({ clear, onCancel, config, chatws }: any) => {
  const [form] = Form.useForm();
  const [sv, setSv] = useState(defaultRedpacketStore);
  console.log({ config });
  const { t } = useTranslation();
  const onClose = () => {
    setSv(defaultRedpacketStore);
    clear && clear();
    onCancel && onCancel();
  };

  return (
    <div className='df-fdc flex-1 jc-sb'>
      <Form className='bg-main' form={form}>
        <div className={`d-f ai-c ${styles['send-redpacket-wrap-title']}`}>
          <div className='h-150 df-aic-jcc'>
            <Icon
              name='rect-left'
              className={`w-80 t-h2 ${styles['send-redpacket-wrap-title-icon']}`}
              onClick={onClose}
            />
          </div>
          <div className='t-h1 ta-c flex-1'>{t('sendEnvelopes')}</div>
          <div className='w-80' />
        </div>
        <FormItem {...formItemConfig} name='rCount' label={t('numberPackets')}>
          <Input
            className='o-none'
            placeholder={t('writePackets')}
            inputAlign='right'
            afterfix={<span className='wds-sm-title'>{t('individual')}</span>}
          />
        </FormItem>
        <FormItem {...formItemConfig} name='score' label={t('numPackets')}>
          <Input
            className='o-none'
            onChange={(e) => setSv(`${e}`)}
            inputAlign='right'
            placeholder='￥0.00'
          />
        </FormItem>
        <FormItem {...formItemConfig} name='title'>
          <Input
            placeholder={t('gxfc')}
            className='ta-c wds-h2 color-con-ass'
            maxLength={24}
          />
        </FormItem>
        <div className={styles['send-redpacket-module']}>
          <div
            className={`ta-c wds-big-game color-primary-text font-w-bold ${styles['redpacket-value']}`}
          >
            <span className='wds-h1'>￥</span>
            {sv}
          </div>
          <SendBtn
            form={form}
            onClose={onClose}
            chatws={chatws}
            config={config}
          />
        </div>
      </Form>
      <div
        className={`ta-c wds-con color-con-ass ${styles['send-redpacket-footer']}`}
      >
        {t('notClaim')}
        {config && config.get('redPackHour')}
        {t('returnToAccount')}
      </div>
    </div>
  );
};

const openRedpacket = (redpacketConfig, chatws, clearRedpacketConfig, redPacket) => {
  Dialog.confirm({
    btnName: redPacket,
    isFooter: false,
    isTitle: false,
    bodyClassname: `bg-main flex-1 ${styles['send-redpacket-wrap']}`,
    children: (
      <SendRedpacketContent
        config={redpacketConfig}
        chatws={chatws}
        clear={clearRedpacketConfig}
      />
    ),
  });
};

const SendRedpacket = observer(({ sourceNode, closeExpand }: any) => {
  // const [redPacket, setRedPacket] = useState('');
  const { redpacketConfig, clearRedpacketConfig, setRedpacketConfig } =
    useGameConfigStore();
  const { chatws } = useWSInstanceStore();
  const isClick = useRef(false);
  // setRedPacket(t('redPacket'));

  useEffect(() => {
    if (redpacketConfig && redpacketConfig.get('isVisible')) {
      setRedpacketConfig('isVisible', false);
      openRedpacket(
        redpacketConfig,
        chatws,
        () => {
          clearRedpacketConfig();
          closeExpand();
        },
        'redPacket'
      );
    }
  }, [
    redpacketConfig,
    clearRedpacketConfig,
    chatws,
    setRedpacketConfig,
    closeExpand,
  ]);

  const sendInfo = () => {
    if (!isClick.current) {
      // 请求红包配置
      chatws && chatws.queryRedPacketConfig();
      isClick.current = true;
      setTimeout(() => {
        isClick.current = false;
      }, 5000);
    }
  };

  return <span onClick={sendInfo}>{sourceNode}</span>;
});

export default SendRedpacket;
