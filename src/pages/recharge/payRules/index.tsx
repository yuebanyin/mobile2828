import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import i18n from 'i18next';
import { getUserChargeChannelList, postRecharge } from '@/services';
import Channel from '../channel';
import { FormDemo as Form, toastText } from '@/components';
import { useLanguage, useNavigation } from '@/hooks';
import BankPage from '../pages/bankPage';
import RechargeTips from '../rechargeTips';
import RechargeDialog from '../rechargeDialog';
import OfflinePage from '../pages/offlinePage';
import OnlinePage from '../pages/onlinePage';
import { useGlobalStore } from '@/mobx';

const BankType = 'BankPay';
const PayRules = () => {
  const { formatMsg } = useLanguage();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const defaultChannel = 0; // 当前请求通道的value
  const [channelList, setChannelList] = useState([]); // 通道选项
  const [selectTitle, setSelectTitle] = useState([]); // 默认选中第一个通道
  const [rechargeInfo, setRechargeInfo] = useState({
    remitName: '',
    depositAmount: null,
    isVisible: false,
  }); // 存款下单提示
  const [subApi, setSubApi] = useState(''); // 存取提交api
  const navigate = useNavigation();
  const initRef = useRef(false);
  const [form] = Form.useForm();
  const [pageType, setPageType] = useState(-1); //页面切换
  // 线上使用的按钮列表
  const [moneyList, setMoneyList] = useState([]); // 选择通道选项
  // 线上信息
  const [onlineInfo, setOnlineInfo] = useState({
    subApi: '',
    payTypeId: -1,
    isConst: false,
  });

  const [tips, setTips] = useState(''); //描述信息
  const { changeState } = useGlobalStore();

  // 用户信息
  const [accountData, setAccountData] = useState<any>({ accountList: [] });
  const channelRef = useRef([]);

  // 统一api处理切换
  const getInfoApi = useCallback(
    (res: any) => {
      let rqp = {};
      switch (state.payName) {
        case BankType: {
          const reqParams = {
            Amount: res.Amount,
            CardId: accountData.Id,
            BankId: res?.BankId[0]?.value,
            PayType: res?.payStyle[0]?.value,
            RemittanceName: res.RemittanceName,
            // CardNumber: accountData?.accountList[3]?.text,
          };
          rqp = { ...reqParams };
          break;
        }
        default: {
          const reqParams = {
            Amount: res.Amount,
            Id: accountData.Id,
            Name: res.RemittanceName,
            Account: res.remitAccount,
          };
          rqp = { ...reqParams };
          break;
        }
      }
      return postRecharge(subApi, rqp);
    },
    [accountData, state, subApi]
  );

  // 切换切面数据更新
  const readAccountData = useCallback(
    (indexChannel: number) => {
      const data = channelRef.current;
      const firstItem = data[indexChannel];
      setPageType(firstItem.IsOffline ? 1 : 2);
      setSubApi(firstItem.Interface);
      let newList = null;
      const result = firstItem.OfflineData?.List?.length
        ? firstItem.OfflineData?.List[0]
        : null;
      const moneyRes = firstItem.OfflineData?.LimitAmount.length
        ? firstItem.OfflineData?.LimitAmount[0]
        : {};
      if (result && firstItem.IsOffline) {
        if (state.payName === BankType) {
          newList = [{}, {}, {}, {}];
          newList[0].text = result?.BankName;
          newList[1].text = result.Name;
          newList[2].text = result.SecondaryBankName;
          newList[3].text = result.BankAccount;
        } else {
          newList = [{}, {}];
          newList[0].text = result.Name;
          newList[1].text = result.Account;
        }
        setTips(result?.TipMsg || firstItem?.TipMsg);

        setAccountData({
          accountList: newList || [],
          account: result.Name,
          qrcode: result.QRCodeUrl,
          Id: state.payName === BankType ? result?.CardId : result?.Id,
          payType: result.PayType,
          minMoney: moneyRes?.DepositMin,
          maxMoney: moneyRes?.DepositMax,
        });
      }
      // 如果默认第一个通道是线上的话
      if (!firstItem.IsOffline) {
        const newMoneyBtnList = firstItem.BtnList?.map((item, i) => ({
          id: i + 1,
          text: `${item}${formatMsg('yuan')}`,
        }));
        setMoneyList(newMoneyBtnList);
        setOnlineInfo({
          ...firstItem,
          payTypeId: firstItem.Id,
          subApi: firstItem.Interface,
          isConst: firstItem.IsConst,
        });
      }
      setSelectTitle([
        {
          id: '0',
          text: firstItem?.Name,
          intApi: firstItem?.Interface,
          type: firstItem?.Id,
          isOffline: firstItem?.IsOffline,
          btnList: firstItem?.BtnList,
          isConst: firstItem.IsConst,
          tipMsg: firstItem?.TipMsg,
        },
      ]);
    },
    [state, formatMsg]
  );

  // 统一获取通道列表
  const getChannelList = useCallback(
    (type) => {
      changeState('isLoading', true);
      getUserChargeChannelList({ RechargeType: type })
        .then((res: any) => {
          if (res.Data && res.Data.length > 0) {
            channelRef.current = res.Data;
            readAccountData(defaultChannel);
            setChannelList([
              ...res.Data.map((item, i) => ({
                ...item,
                id: `${i}`,
                text: item.Name,
                intApi: item.Interface,
                type: item.Id,
                isOffline: item.IsOffline,
                btnList: item.BtnList,
                tipMsg: item?.TipMsg,
              })),
            ]);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [readAccountData, changeState]
  );

  // 切换通道 进行页面切换
  const choseChannel = useCallback(
    (item) => {
      readAccountData(parseInt(item.id));
      if (!item.isOffline) {
        setOnlineInfo({
          ...item,
          payTypeId: item.type,
          subApi: item.intApi,
          isConst: item.IsConst,
        });
        const newMoneyBtnList = item?.btnList?.map((item, i) => ({
          id: i + 1,
          text: `${item}${formatMsg('yuan')}`,
        }));
        setMoneyList(newMoneyBtnList);
        setTips(item?.TipMsg);
      }
    },
    [readAccountData, formatMsg]
  );

  // 提交
  const handleSubmit = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then((formRes) => {
          if (subApi) {
            if (parseFloat(formRes.Amount) <= 0) {
              toastText(`${i18n.t('enterMoneyNum')}`);
              return;
            }
            if (formRes.RemittanceName.lenght === 0) {
              toastText(`${i18n.t('enterUserInfo')}`);
              return;
            }
            changeState('isLoading', true);
            getInfoApi(formRes)
              .then((res: any) => {
                if (res.Code === 210) {
                  setRechargeInfo({
                    remitName: formRes.RemittanceName,
                    depositAmount: formRes.Amount,
                    isVisible: true,
                  });
                }
                resolve && resolve();
              })
              .catch(() => {
                resolve && resolve();
              })
              .finally(() => {
                changeState('isLoading', false);
              });
          } else {
            toastText(`${i18n.t('pleaseSelectChannel')}`);
            resolve && resolve();
          }
        })
        .catch((err) => {
          toastText(err[0]?.message);
          resolve && resolve();
        });
    },
    [changeState, form, getInfoApi, subApi]
  );

  // 页面切换显示
  const changePage = useMemo(() => {
    if (pageType === 2) {
      // false 线上页面
      return <OnlinePage mList={moneyList} cInfo={onlineInfo} tips={tips} />;
    }
    if (pageType === 1 && state.payName === BankType) {
      //线下银行卡页面
      return (
        <>
          <BankPage aData={accountData} form={form} />
          <RechargeTips tips={tips} submitFunction={handleSubmit} />
          <RechargeDialog {...rechargeInfo} />
        </>
      );
    }
    if (pageType === 1) {
      //线下页面
      return (
        <>
          <OfflinePage aData={accountData} form={form} />
          <RechargeTips tips={tips} submitFunction={handleSubmit} />
          <RechargeDialog {...rechargeInfo} />
        </>
      );
    }
    return <></>;
  }, [
    accountData,
    form,
    handleSubmit,
    moneyList,
    onlineInfo,
    pageType,
    rechargeInfo,
    state.payName,
    tips,
  ]);

  //
  useEffect(() => {
    const type = params.get('type');
    const regPos = /^\d+$/;
    if (!regPos.test(type) || !state) {
      toastText(`${i18n.t('incorrectRechargeType')}`);
      navigate('/recharge');
      return;
    }
    if (!initRef.current) {
      initRef.current = true;
      getChannelList(type);
    }
  }, [
    getChannelList,
    navigate,
    onlineInfo,
    pageType,
    params,
    selectTitle,
    state,
  ]);

  return (
    <>
      {selectTitle.length ? (
        <Channel
          titleList={selectTitle}
          channelValue={defaultChannel}
          channelList={channelList}
          choseChannel={choseChannel}
        />
      ) : (
        ''
      )}
      {changePage}
    </>
  );
};

export default memo(PayRules);
