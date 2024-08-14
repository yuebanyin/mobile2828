import {
 memo, useState, useEffect, useCallback 
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUserChargeChannelList, postRecharge } from '@/services';
import Channel from '../channel';
import UsdtPage from '../pages/usdtPage';
import { FormDemo as Form, toastText } from '@/components';
import RechargeDialog from '../rechargeDialog';
import RechargeTips from '../rechargeTips';
import { useGlobalStore } from '@/mobx';
import { Obj } from '@/constants';
import { useLanguage } from '@/hooks';

const EnterUsdt = () => {
  const [params] = useSearchParams();
  const [nameList, setNameList] = useState([]);
  const [channelList, setChannelList] = useState([]); // 通道选项
  const [selectTitle, setSelectTitle] = useState([]); // 默认选中第一个通道
  const reqChannelValue = Number(params.get('type')); // 当前请求通道的value
  const channelBtnValue = Number(params.get('channel')) || 0; // 当前请求通道的value
  const [protoInfo, setProtoInfo] = useState<Obj>({});
  const [rechargeInfo, setRechargeInfo] = useState({ walletAddress: '', depositAmount: null, isVisible: false }); // 存款下单提示
  const { changeState } = useGlobalStore();
  const [form] = Form.useForm();
  const { formatMsg } = useLanguage();

  // 触发提交的按钮点击事件 ProtocolId
  const handleSubmit = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((res) => {
          const params = { ...res, UsdtAmount: Number(res.UsdtAmount), ProtocolId: protoInfo.Id };
          if (selectTitle[0]?.intApi) {
            changeState('isLoading', true);
            postRecharge(selectTitle[0]?.intApi, params)
              .then((res: any) => {
                if (res.Code === 210) {
                  setRechargeInfo({ walletAddress: params.Address, depositAmount: params.UsdtAmount, isVisible: true });
                }
              })
              .catch(() => {})
              .finally(() => {
                changeState('isLoading', false);
                resolve && resolve();
              });
          } else {
            toastText(`${formatMsg('pleaseSelectChannel')}`);
            resolve && resolve();
          }
        })
        .catch((err) => {
          toastText(err[0]?.message);
          resolve && resolve();
        });
    },
    [changeState, form, protoInfo.Id, selectTitle, formatMsg]
  );

  useEffect(() => {
    changeState('isLoading', true);
    getUserChargeChannelList({ RechargeType: reqChannelValue })
      .then((res: any) => {
        if (res?.Data) {
          setSelectTitle([
            {
              id: '0',
              text: res?.Data[channelBtnValue]?.Name,
              intApi: res?.Data[channelBtnValue]?.Interface,
              type: res?.Data[channelBtnValue]?.Id,
            },
          ]);
          const newList = res.Data.map((item, i) => ({
            id: `${i}`,
            text: item.Name,
            intApi: item.Interface,
            type: item.Id,
          }));
          setChannelList(newList);
          setNameList(res?.Data[0]?.OfflineData);
          setProtoInfo({ ...res?.Data[0]?.OfflineData[0] });
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, channelBtnValue, reqChannelValue]);

  return (
    <>
      {selectTitle.length ? <Channel titleList={selectTitle} channelValue={channelBtnValue} channelList={channelList} /> : ''}
      <UsdtPage nameList={nameList} form={form} changeName={setProtoInfo} protoInfo={protoInfo} />
      <RechargeTips tips={protoInfo?.TipMsg} submitFunction={handleSubmit} />
      <RechargeDialog {...rechargeInfo} />
    </>
  );
};

export default memo(EnterUsdt);
