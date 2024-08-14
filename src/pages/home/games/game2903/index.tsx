import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Toast } from '@nutui/nutui-react';
// import { useSearchParams } from 'react-router-dom';
import {
  useGameConfigStore,
  useGlobalStore,
  useUserInfoStore,
  useUserScoreStore,
} from '@/mobx';
import { GameRoute, NetCommonRoute, NetData } from '@/engine/ctrl/NetRoute';
import { Game2903 } from '@/engine/game/pc/2903/Index';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { Content } from './Content';

import { CreateArray, CreateObject, DWORD } from '@/engine/base/basetype';
import { ClassicsTop } from '@/pages/gameComponents/classicsTop';
import { useGetSystemInfo, useWsGameChat } from '@/hooks';
import CountTimeS from '../countTimes';
import { onGetBetSubDes } from './rules';
import CtrlGame from '@/engine/ctrl/CtrlGame';
import { getUserScoreInfo } from '@/services';
import { BetInput } from '@/pages/gameComponents/betInput';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { isArray } from '@/utils/tools';
import { GameMgr } from '@/engine/mgr/mgr';
import { Obj } from '@/constants/type';
import { getGameInfo } from '@/utils/game';

// const url = 'ws://20.187.121.211:10015';
// const url = 'ws://192.168.3.11:10015';
function HkMarkSix() {
  const { gameWsUrl, gameList, saveCountTime } = useGameConfigStore();
  // 连接ws 实例
  const { curGameId } = useWsGameChat({
    isOnlyChatRoom: false,
    gameList,
    gameWsUrl,
  });

  const { fieldInfo } = getGameInfo(gameList, 2903);

  // const [params] = useSearchParams();
  // const pathKey = params.get('gameId');
  const gamgeUrl = useMemo(() => {
    if (fieldInfo?.Room?.ServerPort)
      return `${gameWsUrl}${fieldInfo?.Room?.ServerPort}`;
    return null;
  }, [fieldInfo?.Room?.ServerPort, gameWsUrl]);

  // const kindId = useMemo(() => {
  //   if (serviceConfig) return serviceConfig.get(pathKey).KindId;
  //   return null;
  // }, [serviceConfig, pathKey]);
  //保存游戏记录
  const [gameRecords, setGameRecords] = useState([]);
  const { changeState } = useGlobalStore();
  const { token, gameId } = useUserInfoStore();
  // const [gameScene, setGameScene] = useState(CreateObject(CMD_2903.CMD_S_GameScene));
  const gameSceneRef = useRef<CMD_2903.CMD_S_GameScene>(
    CreateObject(CMD_2903.CMD_S_GameScene)
  );
  const numlist = [];
  const mutilelist = useRef<Array<DWORD>>(CreateArray(DWORD, [136]));
  const [mutilelistEx, setMutilelistEx] = useState<Array<DWORD>>(
    CreateArray(DWORD, [136])
  );
  const [gameHandle, setGameHandle] = useState<any>();
  const curPeriodRef = useRef<string>('');
  const cbCurrXiaoRef = useRef<number>(0);
  // const [periodNumber, setPeriodNumber] = useState<string>('');
  const [curPeriodNumber, setCurPeriodNumber] = useState<string>('');
  // const [tBetInfo, setTBetInfo] = useState<any[]>([]);
  // const [tableCard, setTableCard] = useState<Array<BYTE>>([]);
  const notSatisfyTips = useRef<string>('');
  // const getMultypeRef = useRef<Function>();
  const handleReset = useRef<any>();
  const handleBetInputRef = useRef<any>();
  const selectArrayRef = useRef([]);
  const [betCount, setBetCount] = useState<number>(0);
  const [webkitId] = useGetSystemInfo();
  const selectObj = useRef({}); ///供连码等使用
  const selectNumArrayRef = useRef([]);
  const isDyFinished = useRef(true);
  const dMutipleListAssist = useRef<any[]>([]);
  const [dMutipleList, setDMutipleList] = useState<any[]>([]);
  const wsCC = useRef(null);

  /**
   *@description 处理开始封盘和开始下注的逻辑
   */
  const sceneChange = useCallback(
    (data: any) => {
      if (data?.cbSceneStatus?.value === 101) {
        // 倒计时结束，时间改为封盘中
        saveCountTime('封盘中');
        handleReset.current?.onResetData(false);
        handleBetInputRef.current?.onResetData();
        selectArrayRef.current = [];
        setBetCount(0);
        // setTBetInfo([]);
      } else if (data?.cbSceneStatus?.value === 100) {
        // 重新倒计时
        saveCountTime(data?.dwAllSeconds?.value);
      } else if (data?.cbSceneStatus?.value === 0) {
        // 倒计时结束，时间改为未开盘
        saveCountTime('未开盘');
      }
    },
    [saveCountTime]
  );

  const { changeUserScore } = useUserScoreStore();
  /**
   * @description: 更新用户金额
   * @param {*} useCallback
   * @return {*}
   */
  const getUserScore = useCallback(() => {
    getUserScoreInfo()
      .then((res: any) => {
        if (res.Data) changeUserScore(res.Data);
      })
      .catch(() => {});
  }, [changeUserScore]);

  for (let index = 1; index < 50; index += 1) {
    numlist.push(index);
  }
  /**
   * @description: 网络回调
   * @param {NetData} msg
   * @param {Game2903} cc 第二参数可以拿
   * @return {*}
   */
  const netMessage = useCallback(
    (msg: NetData, cc: Game2903): any => {
      switch (msg.dateType) {
        case NetCommonRoute.loginSuccess: //data:CMD_CRS_LogonSuccess
          console.log(msg.data);
          cc.postGameScene();
          changeState('isLoading', false);
          break;
        case NetCommonRoute.systemMessage: //data:CMD_CRS_SystemMessage
          console.log(msg.data);
          break;
        case NetCommonRoute.webSocketClose:
          console.log('网络关闭');
          changeState('isLoading', false);
          break;
        case NetCommonRoute.webSocketReconnect:
          console.log('重连失败');
          break;
        default:
      }
    },
    [changeState]
  );

  // ///获取动态赔率对应的赔率类型
  const getMultype = (
    cbMainType,
    cbSubType,
    dwCurMultiple,
    bSpecial,
    cbAreaInfoNumber
  ) => {
    console.log(
      '🚀 ~ file: index.tsx:771 ~ HkMarkSix ~ bSpecial:',
      bSpecial,
      cbAreaInfoNumber
    );
    //特码
    if (cbMainType === CMD_2903.emBetMainType.BTM_TE) {
      //数字
      if (cbSubType === CMD_2903.emSubBetTypeTeMa.SBTT_NUM) {
        mutilelist.current[CMD_2903.emMultipleType.MT_TE_NUM].value =
          dwCurMultiple;
      }
      if (
        cbSubType > CMD_2903.emSubBetTypeTeMa.SBTT_NUM &&
        cbSubType <= CMD_2903.emSubBetTypeTeMa.SBTT_WEI_XIAO
      ) {
        mutilelist.current[
          CMD_2903.emMultipleType.MT_TE_NUM +
            cbSubType -
            CMD_2903.emSubBetTypeTeMa.SBTT_NUM
        ].value = dwCurMultiple;
      }
      //红
      if (cbSubType === CMD_2903.emSubBetTypeTeMa.SBTT_HONG) {
        mutilelist.current[CMD_2903.emMultipleType.MT_TE_HONG].value =
          dwCurMultiple;
      }
      //蓝
      if (cbSubType === CMD_2903.emSubBetTypeTeMa.SBTT_LAN) {
        mutilelist.current[CMD_2903.emMultipleType.MT_TE_LAN].value =
          dwCurMultiple;
      }
      //绿
      if (cbSubType === CMD_2903.emSubBetTypeTeMa.SBTT_LV) {
        mutilelist.current[CMD_2903.emMultipleType.MT_TE_LV].value =
          dwCurMultiple;
      }
    } else if (
      cbMainType >= CMD_2903.emBetMainType.BTM_ZHENG_1 &&
      cbMainType <= CMD_2903.emBetMainType.BTM_ZHENG_6
    ) {
      //正码1-6
      if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM) {
        mutilelist.current[CMD_2903.emMultipleType.MT_ZN_NUM].value =
          dwCurMultiple;
      }
      if (
        cbSubType > CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM &&
        cbMainType <= CMD_2903.emSubBetTypeZhengNum.SBTZN_HE_SHUANG
      ) {
        //大小单双合单合双
        mutilelist.current[
          CMD_2903.emMultipleType.MT_ZN_NUM +
            cbSubType -
            CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM
        ].value = dwCurMultiple;
      }
      //红
      if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_HONG) {
        mutilelist.current[CMD_2903.emMultipleType.MT_ZN_HONG].value =
          dwCurMultiple;
      }
      //蓝
      if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_LAN) {
        mutilelist.current[CMD_2903.emMultipleType.MT_ZN_LAN].value =
          dwCurMultiple;
      }
      //绿
      if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_LV) {
        mutilelist.current[CMD_2903.emMultipleType.MT_ZN_LV].value =
          dwCurMultiple;
      }
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_ZHENG) {
      /////正码
      //数字
      if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM) {
        if (cbSubType === CMD_2903.emSubBetTypeZheng.SBTZ_NUM) {
          //数字
          mutilelist.current[CMD_2903.emMultipleType.MT_ZHENG_NUM].value =
            dwCurMultiple;
        }
      }
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_HE) {
      /////正码BTM_HE
      if (cbSubType === CMD_2903.emSubBetTypeHe.SBTH_DA) {
        //总大
        mutilelist.current[CMD_2903.emMultipleType.MT_HE_DA].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeHe.SBTH_XIAO) {
        //总小
        mutilelist.current[CMD_2903.emMultipleType.MT_HE_XIAO].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeHe.SBTH_DAN) {
        //总单
        mutilelist.current[CMD_2903.emMultipleType.MT_HE_DAN].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeHe.SBTH_SHUANG) {
        //总双
        mutilelist.current[CMD_2903.emMultipleType.MT_HE_SHUANG].value =
          dwCurMultiple;
      }
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_BAN_BO) {
      //半波
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_DA) {
        //红-大
        mutilelist.current[CMD_2903.emMultipleType.MT_B_HONG_DA].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_XIAO) {
        //红-小
        mutilelist.current[CMD_2903.emMultipleType.MT_B_HONG_XIAO].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_DAN) {
        //红-单
        mutilelist.current[CMD_2903.emMultipleType.MT_B_HONG_DAN].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_SHUANG) {
        //红-双
        mutilelist.current[CMD_2903.emMultipleType.MT_B_HONG_SHUANG].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_DA) {
        //蓝-大
        mutilelist.current[CMD_2903.emMultipleType.MT_B_LAN_DA].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_XIAO) {
        //蓝-小
        mutilelist.current[CMD_2903.emMultipleType.MT_B_LAN_XIAO].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_DAN) {
        //蓝-单
        mutilelist.current[CMD_2903.emMultipleType.MT_B_LAN_DAN].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_SHUANG) {
        //蓝-双
        mutilelist.current[CMD_2903.emMultipleType.MT_B_LAN_SHUANG].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_DA) {
        //绿-大
        mutilelist.current[CMD_2903.emMultipleType.MT_B_LV_DA].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_XIAO) {
        //绿-小
        mutilelist.current[CMD_2903.emMultipleType.MT_B_LV_XIAO].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_DAN) {
        //绿-单
        mutilelist.current[CMD_2903.emMultipleType.MT_B_LV_DAN].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_SHUANG) {
        //绿-双
        mutilelist.current[CMD_2903.emMultipleType.MT_B_LV_SHUANG].value =
          dwCurMultiple;
      }
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
      //特肖
      mutilelist.current[
        CMD_2903.emMultipleType.MT_TX_SHU +
          cbSubType -
          CMD_2903.emXiaoType.XT_SHU
      ].value = dwCurMultiple;
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
      //一肖
      mutilelist.current[
        CMD_2903.emMultipleType.MT_YX_SHU +
          cbSubType -
          CMD_2903.emXiaoType.XT_SHU
      ].value = dwCurMultiple;
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_ZHENG_TE_WEI) {
      //正特尾
      mutilelist.current[
        CMD_2903.emMultipleType.MT_ZTW_0 +
          cbAreaInfoNumber[0] +
          CMD_2903.emSubBetTypeZTW.SBTZTW_NUM
      ].value = dwCurMultiple;
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_LIAN_MA) {
      //连码
      if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SI_QUAN) {
        //四全中
        mutilelist.current[CMD_2903.emMultipleType.MT_L_SI_QUAN].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SAN_QUAN) {
        //三全中
        mutilelist.current[CMD_2903.emMultipleType.MT_L_SAN_QUAN].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SAN_ER) {
        //三中二
        if (bSpecial) {
          mutilelist.current[CMD_2903.emMultipleType.MT_L_SAN_ER_SAN].value =
            dwCurMultiple;
        } else {
          mutilelist.current[CMD_2903.emMultipleType.MT_L_SAN_ER].value =
            dwCurMultiple;
        }
      }
      if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_ER_QUAN) {
        //二全中
        mutilelist.current[CMD_2903.emMultipleType.MT_L_ER_QUAN].value =
          dwCurMultiple;
      }
      if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_ER_TE) {
        //二中特
        if (bSpecial) {
          mutilelist.current[CMD_2903.emMultipleType.MT_L_ER_TE_ER].value =
            dwCurMultiple;
        } else {
          mutilelist.current[CMD_2903.emMultipleType.MT_L_ER_TE].value =
            dwCurMultiple;
        }
      }
      if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_TE_CHUAN) {
        //特串
        mutilelist.current[CMD_2903.emMultipleType.MT_L_TE_CHUAN].value =
          dwCurMultiple;
      }
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_HE_XIAO) {
      //合肖
      mutilelist.current[
        CMD_2903.emMultipleType.MT_HE_ZHONG_1 +
          cbSubType -
          CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_1
      ].value = dwCurMultiple;
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) {
      //生肖连
      let isCurXiao = false;
      for (let i = 0; i < cbAreaInfoNumber.length; i += 1) {
        if (cbAreaInfoNumber[i] === cbCurrXiaoRef.current) {
          isCurXiao = true;
          break;
        }
      }
      if (isCurXiao) {
        mutilelist.current[
          cbSubType + CMD_2903.emMultipleType.MT_SXL_ZHONG_2_BEN
        ].value = dwCurMultiple;
        if (cbAreaInfoNumber.length === 1) return;
      }

      mutilelist.current[
        cbSubType + CMD_2903.emMultipleType.MT_SXL_ZHONG_2
      ].value = dwCurMultiple;
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_WEI_SHU_LIAN) {
      //尾数连
      let isZeroValue = false;
      for (let i = 0; i < cbAreaInfoNumber.length; i += 1) {
        if (cbAreaInfoNumber[i] === 0) {
          isZeroValue = true;
          break;
        }
      }
      if (isZeroValue) {
        mutilelist.current[
          cbSubType + CMD_2903.emMultipleType.MT_WSL_ZHONG_2_0
        ].value = dwCurMultiple;
        if (cbAreaInfoNumber.length === 1) return;
      }

      mutilelist.current[
        cbSubType + CMD_2903.emMultipleType.MT_WSL_ZHONG_2
      ].value = dwCurMultiple;
    } else if (cbMainType === CMD_2903.emBetMainType.BTM_QUAN_BU_ZHONG) {
      //全不中
      mutilelist.current[cbSubType + CMD_2903.emMultipleType.MT_QBZ_5].value =
        dwCurMultiple;
    }
  };

  const resetData = useCallback(() => {
    handleBetInputRef.current?.onResetData();
    handleReset.current?.onResetData();
    selectArrayRef.current = [];
    selectNumArrayRef.current = [];
    selectObj.current = [];
    // setTBetInfo([]);
    console.log(
      '🚀 ~ file: index.tsx:310 ~ resetData ~ setTBetInfo:1`111111111'
    );
  }, []);

  /**
   * @description: 游戏网络逻辑
   * @param {NetData} msg
   * @param {Game2903} cc
   * @return {*}
   */
  const gameNetMessage = useCallback(
    (msg: NetData, cc: CtrlGame) => {
      switch (msg.dateType) {
        case GameRoute.refreshBaseConfig:
          console.log('刷新配置:', msg.data);
          break;
        case GameRoute.gameSceneState:
          console.log('场景状态:', msg.data);
          break;
        case GameRoute.gameScenConfig:
          {
            console.log('场景配置:', msg.data);
            setGameHandle(cc);
            const scene = msg.data as CMD_2903.CMD_S_GameScene;
            gameSceneRef.current = scene;
            curPeriodRef.current = scene.szPeriodNumber.value;
            cbCurrXiaoRef.current = scene.cbCurrXiao.value;
            // mutilelist.current = scene.stGameConfig.dwMultiple;
            // setMutilelistEx(scene.stGameConfig.dwMultiple);
            mutilelist.current = [];
            const tempArr = [];
            gameSceneRef.current.stGameConfig.dwMultiple.forEach((it) => {
              const tempVal = CreateObject(DWORD);
              tempVal.value = it.value;
              mutilelist.current.push(tempVal);

              const val = CreateObject(DWORD);
              val.value = it.value;
              tempArr.push(val);
            });
            setMutilelistEx(tempArr);
            setCurPeriodNumber(scene.szPeriodNumber.value);
            // setPeriodNumber((parseInt(scene.szPeriodNumber.value) - 1).toString());
            // 0 未开始 100 下注 101 封盘
            const sts = cc.getGameSceneState();
            console.log({ sts });
            let ct = (msg?.data as any)?.dwTimeLeave?.value;
            if (sts === 0) {
              ct = '未开盘';
            } else if (sts === 101) {
              ct = '封盘中';
            }
            saveCountTime(ct);
          }
          break;
        case GameRoute.sceneChange:
          {
            console.log('场景切换:', msg.data); //切换到下期下注处理
            curPeriodRef.current = `${msg.data['szPeriodNumber'].value}`;
            cbCurrXiaoRef.current = msg.data['cbCurrXiao'].value;
            mutilelist.current = [];
            dMutipleListAssist.current = [];
            const scene1 = msg.data as CMD_2903.CMD_S_GameScene;
            setCurPeriodNumber(scene1.szPeriodNumber.value);
            setDMutipleList(dMutipleListAssist.current);
            gameSceneRef.current.stGameConfig.dwMultiple.forEach((it) => {
              const tempVal = CreateObject(DWORD);
              tempVal.value = it.value;
              mutilelist.current.push(tempVal);
            });
            setMutilelistEx(mutilelist.current);
            sceneChange(msg?.data);
          }
          break;
        case GameRoute.historyRecord:
          console.log('开奖记录:', msg.data);
          // setTableCard(recordData[0].cbTableCard);
          setGameRecords(msg.data as any[]);
          break;
        case GameRoute.dynamicMultiple:
          {
            console.log('动态赔率:', msg.data);
            if (isDyFinished.current) {
              dMutipleListAssist.current = [];
              isDyFinished.current = false;
            }
            const tempVal = msg.data['stMultipleList'];
            for (let i = 0; i < tempVal.length; i += 1) {
              const areaInfo = tempVal[i].AreaInfo;
              const dwCurMultiple = tempVal[i].dwMultiple.value;
              const cbMainType = areaInfo.cbBetMainType.value;
              const cbSubType = areaInfo.cbBetSubType.value;
              // const bSpecial = tempVal[i].bSpecial.value;
              const bSpecial = false;
              const cbAreaInfoNumber = areaInfo.cbNumber;
              getMultype(
                cbMainType,
                cbSubType,
                dwCurMultiple,
                bSpecial,
                cbAreaInfoNumber
              );
              dMutipleListAssist.current.push(tempVal[i]);
            }
            setDMutipleList(dMutipleListAssist.current);
            // setMutilelistEx(() => [...mutilelist.current]);
          }
          break;
        case GameRoute.dynamicMultipleFinish:
          console.log('动态赔率下发完成:', msg.data);
          isDyFinished.current = true;
          break;
        case GameRoute.userBetSuccess:
          console.log('下注成功:', msg.data);
          resetData();
          Toast.text('下注成功');
          getUserScore();
          break;
        case GameRoute.userBetFaild:
          console.log('下注失败:', msg.data);
          resetData();
          Toast.text(`${msg.data}`);
          break;
        case GameRoute.gameEnd:
          {
            console.log('游戏结束:', msg.data);
            resetData();
            mutilelist.current = [];
            const gameEnd = msg.data as CMD_2903.CMD_S_GameEnd;
            setCurPeriodNumber(
              (
                parseInt(gameEnd.stRecordInfo.szPeriodNumber.value) + 1
              ).toString()
            );
            gameSceneRef.current.stGameConfig.dwMultiple.forEach((it) => {
              const tempVal = CreateObject(DWORD);
              tempVal.value = it.value;
              mutilelist.current.push(tempVal);
            });
            setGameRecords((preRed) => [
              { ...(msg?.data as any)?.stRecordInfo },
              ...preRed,
            ]);
          }
          break;
        default:
      }
    },
    [
      setGameHandle,
      getUserScore,
      setGameRecords,
      setMutilelistEx,
      saveCountTime,
      sceneChange,
      resetData,
    ]
  );

  useEffect(() => {
    if (gamgeUrl && webkitId && !wsCC?.current) {
      changeState('isLoading', true);
      wsCC.current = new Game2903(gamgeUrl, webkitId);
      wsCC.current.dispatcherCall(netMessage, gameNetMessage);
      console.log(token, gameId);
      wsCC.current.connect({ token, gameId });
      // FIXME 2023-09-04 14:47:05 北丐本地服务器地址
      // wsCC.current = new Game2903('ws://192.168.3.117:10015', webkitId);
      // wsCC.current.dispatcherCall(netMessage, gameNetMessage);
      // wsCC.current.connect({ token: '0dc131b81a534991abeae90cdbe724a3', gameId: '57885776' });
    }

    return () => {
      if (wsCC.current) {
        wsCC.current.Close();
        wsCC.current = null;
      }
    };
  }, [
    token,
    gameId,
    gameNetMessage,
    gamgeUrl,
    webkitId,
    changeState,
    netMessage,
  ]);

  // let resultTmp = [];
  const resultTmpRef = useRef([]);
  const BetGroupSub = useCallback((item, nuc, groupl) => {
    let itemc = [];
    const nucc = Array.from(nuc);
    const margin = groupl - item.length;

    if (margin === 0) {
      resultTmpRef.current.push(item);
      return;
    }
    if (margin === 1) {
      for (let j = 0; j < nuc.length; j += 1) {
        itemc = Array.from(item);
        itemc.push(nuc[j]);
        resultTmpRef.current.push(itemc);
      }
    }
    if (margin > 1) {
      itemc = Array.from(item);
      itemc.push(nucc.splice(0, 1)[0]);
      BetGroupSub(itemc, nucc, groupl);

      if (item.length + nucc.length >= groupl) {
        BetGroupSub(item, nucc, groupl);
      }
    }
  }, []);

  //自选号码拆分
  const BetGroup = useCallback(
    (nu, groupl) => {
      const nuc = Array.from(nu);
      let item = nuc.splice(0, 1);
      item = Array.isArray(item) ? item : [item];
      BetGroupSub(item, nuc, groupl);

      if (nuc.length >= groupl) {
        return BetGroup(nuc, groupl);
      }
      return resultTmpRef.current;
    },
    [BetGroupSub]
  );

  const OnGetMinBet = (cbBetMainType, cbBetSubType) => {
    if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE) {
      //特码
      //数字
      if (cbBetSubType === CMD_2903.emSubBetTypeTeMa.SBTT_NUM) return 1;
      if (cbBetSubType > CMD_2903.emSubBetTypeTeMa.SBTT_NUM) return 0;
    } else if (
      cbBetMainType >= CMD_2903.emBetMainType.BTM_ZHENG_1 &&
      cbBetMainType <= CMD_2903.emBetMainType.BTM_ZHENG_6
    ) {
      //正码1-6
      //数字
      if (cbBetSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM) return 1;

      if (cbBetSubType > CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM) return 0;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_HE) {
      //总和
      return 0;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_BAN_BO) {
      //半波
      return 0;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
      //特肖
      return 0;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
      //一肖
      return 0;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_LIAN_MA) {
      //连码
      if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SI_QUAN) return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SAN_QUAN) return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SAN_ER) return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_ER_QUAN) return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_ER_TE) return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_TE_CHUAN) return 2;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_HE_XIAO) {
      //合肖
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_1) return 1;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_2) return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_3) return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_4) return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_5) return 5;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_6) return 6;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_7) return 7;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_8) return 8;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_9) return 9;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_10)
        return 10;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_2)
        return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_3)
        return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_4)
        return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_5)
        return 5;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_6)
        return 6;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_7)
        return 7;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_8)
        return 8;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_9)
        return 9;
      if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_10)
        return 10;
      return 2;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) {
      //生肖连
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_2) return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_3) return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_4) return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_5) return 5;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_2) return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_3) return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_4) return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_5) return 5;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_2_BEN)
        return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_3_BEN)
        return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_4_BEN)
        return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_5_BEN)
        return 5;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_2_BEN)
        return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_3_BEN)
        return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_4_BEN)
        return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_5_BEN)
        return 5;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_WEI_SHU_LIAN) {
      //尾数连
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_2) return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_3) return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_4) return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_2) return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_3) return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_4) return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_2_0) return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_3_0) return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_4_0) return 4;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_2_0)
        return 2;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_3_0)
        return 3;
      if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_4_0)
        return 4;
    } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_QUAN_BU_ZHONG) {
      //全不中
      if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_5) return 5;
      if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_6) return 6;
      if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_7) return 7;
      if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_8) return 8;
      if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_9) return 9;
      if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_10) return 10;
      if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_11) return 11;
      if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_12) return 12;
    }
    return 1;
  };

  const getIsValidArray = (
    cbBetMainType: CMD_2903.emBetMainType,
    cbBetSubType: number
  ) => {
    if (
      cbBetMainType === CMD_2903.emBetMainType.BTM_TE &&
      cbBetSubType === CMD_2903.emSubBetTypeTeMa.SBTT_NUM
    ) {
      return true;
    }

    if (
      (cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG_1 ||
        cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG_2 ||
        cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG_3 ||
        cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG_4 ||
        cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG_5 ||
        cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG_6 ||
        cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG) &&
      (cbBetSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM ||
        cbBetSubType === CMD_2903.emSubBetTypeZheng.SBTZ_NUM)
    ) {
      return true;
    }

    if (
      cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG_TE_WEI &&
      cbBetSubType === CMD_2903.emSubBetTypeZTW.SBTZTW_NUM
    ) {
      return true;
    }
    return false;
  };

  const getAnimalsType = (
    currentRadioId: number,
    currentRadioIdEx: number,
    isCurXiao: boolean
  ) => {
    if (currentRadioId === 0) {
      ///中
      if (currentRadioIdEx === 0) {
        //二连肖
        if (isCurXiao) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_2_BEN,
            multType: CMD_2903.emMultipleType.MT_SXL_ZHONG_2_BEN,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_2,
          multType: CMD_2903.emMultipleType.MT_SXL_ZHONG_2,
        };
      }
      if (currentRadioIdEx === 1) {
        //三连肖
        if (isCurXiao) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_3_BEN,
            multType: CMD_2903.emMultipleType.MT_SXL_ZHONG_3_BEN,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_3,
          multType: CMD_2903.emMultipleType.MT_SXL_ZHONG_3,
        };
      }
      if (currentRadioIdEx === 2) {
        if (isCurXiao) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_4_BEN,
            multType: CMD_2903.emMultipleType.MT_SXL_ZHONG_4_BEN,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_4,
          multType: CMD_2903.emMultipleType.MT_SXL_ZHONG_4,
        };
      }
      if (currentRadioIdEx === 3) {
        if (isCurXiao) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_5_BEN,
            multType: CMD_2903.emMultipleType.MT_SXL_ZHONG_5_BEN,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_5,
          multType: CMD_2903.emMultipleType.MT_SXL_ZHONG_5,
        };
      }
    } else if (currentRadioId === 1) {
      //buzhong
      if (currentRadioIdEx === 0) {
        //二连肖
        if (isCurXiao) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_2_BEN,
            multType: CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_2_BEN,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_2,
          multType: CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_2,
        };
      }
      if (currentRadioIdEx === 1) {
        //三连肖
        if (isCurXiao) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_3_BEN,
            multType: CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_3_BEN,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_3,
          multType: CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_3,
        };
      }
      if (currentRadioIdEx === 2) {
        if (isCurXiao) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_4_BEN,
            multType: CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_4_BEN,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_4,
          multType: CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_4,
        };
      }
      if (currentRadioIdEx === 3) {
        if (isCurXiao) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_5_BEN,
            multType: CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_5_BEN,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_5,
          multType: CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_5,
        };
      }
    }
    return {
      cbBetSubType: CMD_2903.emSubBetTypeSXL.SBTSXL_COUNT,
      multType: CMD_2903.emMultipleType.MT_INVALID,
    };
  };

  const getWslType = (
    currentRadioId: number,
    currentRadioIdEx: number,
    isZeroValue: boolean
  ) => {
    if (currentRadioId === 0) {
      ///中
      if (currentRadioIdEx === 0) {
        //二尾连
        if (isZeroValue) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_2_0,
            multType: CMD_2903.emMultipleType.MT_WSL_ZHONG_2_0,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_2,
          multType: CMD_2903.emMultipleType.MT_WSL_ZHONG_2,
        };
      }
      if (currentRadioIdEx === 1) {
        //三尾连
        if (isZeroValue) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_3_0,
            multType: CMD_2903.emMultipleType.MT_WSL_ZHONG_3_0,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_3,
          multType: CMD_2903.emMultipleType.MT_WSL_ZHONG_3,
        };
      }
      if (currentRadioIdEx === 2) {
        if (isZeroValue) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_4_0,
            multType: CMD_2903.emMultipleType.MT_WSL_ZHONG_4_0,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_4,
          multType: CMD_2903.emMultipleType.MT_WSL_ZHONG_4,
        };
      }
    } else if (currentRadioId === 1) {
      //buzhong
      if (currentRadioIdEx === 0) {
        //二尾连
        if (isZeroValue) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_2_0,
            multType: CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_2_0,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_2,
          multType: CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_2,
        };
      }
      if (currentRadioIdEx === 1) {
        //三尾连
        if (isZeroValue) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_3_0,
            multType: CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_3_0,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_3,
          multType: CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_3,
        };
      }
      if (currentRadioIdEx === 2) {
        if (isZeroValue) {
          return {
            cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_4_0,
            multType: CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_4_0,
          };
        }
        return {
          cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_4,
          multType: CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_4,
        };
      }
    }
    return {
      cbBetSubType: CMD_2903.emSubBetTypeWSL.SBTWSL_COUNT,
      multType: CMD_2903.emMultipleType.MT_INVALID,
    };
  };

  // 下注的信息
  const placeBetInfo = useMemo(() => {
    const betInfo = CreateObject(common.CMD_C_PlaceBet);
    betInfo.tagCommonBetInfo = [];
    betInfo.tagSpecialMultiple = [];
    betInfo.placeBetHead.cPeriodNumber.value = curPeriodNumber;
    return betInfo;
  }, [curPeriodNumber]);

  const checkButtonPressed = useCallback(
    (isActive, title, item, data) => {
      console.log('🚀 ~ file: index.tsx:813 ~ HkMarkSix ~ data:', data);
      if (!placeBetInfo || !curGameId) return false;
      placeBetInfo.tagCommonBetInfo = [];
      placeBetInfo.tagSpecialMultiple = [];

      if (title === '连码') {
        if (item['numVal'] === -1) {
          selectObj.current['cbBetMainType'] = data['cbBetMainType'];
          selectObj.current['cbBetSubType'] = data['cbBetSubType'];
          // selectObj.current['multType'] = item['multType'];
          selectObj.current['dwNormalMultiple'] =
            data['value']['dwNormalMultiple'];
          selectObj.current['dwSpecialMultiple'] =
            data['value']['dwSpecialMultiple'];
          return true;
        }

        if (isActive) {
          if (selectNumArrayRef.current.length >= 10) {
            notSatisfyTips.current = '当前玩法最多选择10项!';
          } else {
            notSatisfyTips.current = '';
          }
          selectNumArrayRef.current.push(data['value']['value']);
        } else {
          selectNumArrayRef.current = selectNumArrayRef.current.filter(
            (itemNum) => itemNum !== data['value']['value']
          );
        }
        const tempVal = {
          cbBetMainType: data['cbBetMainType'],
          cbBetSubType: data['cbBetSubType'],
          dwNormalMultiple: data['value']['dwNormalMultiple'],
          dwSpecialMultiple: data['value']['dwSpecialMultiple'],
          multTypeSpecial: data['value']['multTypeSpecial'],
          array: selectNumArrayRef.current,
        };
        selectObj.current = tempVal;
        console.log('🚀 ~ file: index.tsx:851 ~ HkMarkSix ~ tempVal:', tempVal);

        ///////////////////////////////////
        const tempArr = selectObj.current['array'];
        const minCount = OnGetMinBet(
          selectObj.current['cbBetMainType'],
          selectObj.current['cbBetSubType']
        );
        if (tempArr.length < minCount) {
          const desIndex = onGetBetSubDes(
            selectObj.current['cbBetMainType'],
            selectObj.current['cbBetSubType']
          );
          notSatisfyTips.current = `${desIndex}最少选择${minCount}个号码！`;
        } else {
          notSatisfyTips.current = '';
        }

        if (tempArr.length > minCount) {
          resultTmpRef.current = [];
          const groupArray = BetGroup(tempArr, minCount);
          for (let index = 0; index < groupArray.length; index += 1) {
            const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
            sTagUserBetInfo.AreaInfo.cbBetMainType.value =
              selectObj.current['cbBetMainType'];
            sTagUserBetInfo.AreaInfo.cbBetSubType.value =
              selectObj.current['cbBetSubType'];
            sTagUserBetInfo.lBetScore.value = 0;
            groupArray[index].sort((x, y) => x - y);

            for (
              let i = 0;
              i < sTagUserBetInfo.AreaInfo.cbNumber.length;
              i += 1
            ) {
              sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
            }
            for (let j = 0; j < groupArray[index].length; j += 1) {
              sTagUserBetInfo.AreaInfo.cbNumber[j].value = groupArray[index][j];
            }
            sTagUserBetInfo.dwNormalMultiple.value =
              selectObj.current['dwNormalMultiple'];
            if (selectObj.current['multTypeSpecial']) {
              const specialMultipleInfo = CreateObject(
                common.tagSpecialMultiple
              );
              specialMultipleInfo.wBetIndex.value = index;
              specialMultipleInfo.wID.value =
                selectObj.current['multTypeSpecial'];
              specialMultipleInfo.dwMultiple.value =
                selectObj.current['dwSpecialMultiple'];
              placeBetInfo.tagSpecialMultiple.push(specialMultipleInfo);
            }

            // sTagUserBetInfo.dwSpecialMultiple.value = selectObj.current['dwSpecialMultiple'];
            placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
          }
        } else {
          const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
          sTagUserBetInfo.AreaInfo.cbBetMainType.value =
            selectObj.current['cbBetMainType'];
          sTagUserBetInfo.AreaInfo.cbBetSubType.value =
            selectObj.current['cbBetSubType'];
          sTagUserBetInfo.lBetScore.value = 0;
          tempArr.sort((x, y) => x - y);
          for (
            let i = 0;
            i < sTagUserBetInfo.AreaInfo.cbNumber.length;
            i += 1
          ) {
            sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
          }
          for (let j = 0; j < tempArr.length; j += 1) {
            sTagUserBetInfo.AreaInfo.cbNumber[j].value = tempArr[j];
          }
          sTagUserBetInfo.dwNormalMultiple.value =
            selectObj.current['dwNormalMultiple'];
          // sTagUserBetInfo.dwSpecialMultiple.value = selectObj.current['dwSpecialMultiple'];
          if (selectObj.current['multTypeSpecial']) {
            const specialMultipleInfo = CreateObject(common.tagSpecialMultiple);
            specialMultipleInfo.wBetIndex.value = 0;
            specialMultipleInfo.wID.value =
              selectObj.current['multTypeSpecial'];
            specialMultipleInfo.dwMultiple.value =
              selectObj.current['dwSpecialMultiple'];
            placeBetInfo.tagSpecialMultiple.push(specialMultipleInfo);
          }
          placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
        }
        // setTBetInfo(placeBetInfo.tagCommonBetInfo);
        ///////////////////////////////////
        setBetCount(selectNumArrayRef.current.length);
        return true;
      }

      if (title === '合肖') {
        const tempVal = {
          cbBetMainType: data['cbBetMainType'],
          cbBetSubType: data['cbBetSubType'],
          // multType: data['multType'],
          mutile: item['mutile'],
          array: item['array'],
        };
        selectObj.current = tempVal;
        //////////////////////////////////
        const tempArr = selectObj.current['array'];
        const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
        sTagUserBetInfo.AreaInfo.cbBetMainType.value =
          selectObj.current['cbBetMainType'];
        sTagUserBetInfo.AreaInfo.cbBetSubType.value =
          selectObj.current['cbBetSubType'];
        sTagUserBetInfo.lBetScore.value = 0;
        for (let i = 0; i < sTagUserBetInfo.AreaInfo.cbNumber.length; i += 1) {
          sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
        }
        for (let j = 0; j < tempArr.length; j += 1) {
          sTagUserBetInfo.AreaInfo.cbNumber[j].value = tempArr[j];
        }
        sTagUserBetInfo.dwNormalMultiple.value = selectObj.current['mutile'];
        placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
        setBetCount(tempArr.length);
        /////////////////////////////////
        return true;
      }

      if (title === '生肖连') {
        selectObj.current = data;
        // onSendPlaceJetton();
        //////////////////
        const tempArr = selectObj.current['array'];
        if (!tempArr) {
          return false;
        }
        const minCount = OnGetMinBet(
          selectObj.current['cbBetMainType'],
          selectObj.current['cbBetSubType']
        );
        if (tempArr?.length < minCount) {
          const desIndex = onGetBetSubDes(
            selectObj.current['cbBetMainType'],
            selectObj.current['cbBetSubType']
          );
          // Toast.text(`${desIndex}最少选择${minCount}个号码！`);
          notSatisfyTips.current = `${desIndex}最少选择${minCount}个号码！`;
          // return false;
        } else {
          notSatisfyTips.current = '';
        }
        if (tempArr?.length > minCount) {
          resultTmpRef.current = [];
          const groupArray = BetGroup(tempArr, minCount);

          for (let index = 0; index < groupArray.length; index += 1) {
            const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
            sTagUserBetInfo.AreaInfo.cbBetMainType.value =
              selectObj.current['cbBetMainType'];
            sTagUserBetInfo.lBetScore.value = 0;
            groupArray[index].sort((x, y) => x - y);

            for (
              let i = 0;
              i < sTagUserBetInfo.AreaInfo.cbNumber.length;
              i += 1
            ) {
              sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
            }
            let tempVal = false;
            for (let j = 0; j < groupArray[index].length; j += 1) {
              sTagUserBetInfo.AreaInfo.cbNumber[j].value = groupArray[index][j];
              if (cbCurrXiaoRef.current === groupArray[index][j]) {
                tempVal = true;
              }
            }

            const types = getAnimalsType(
              selectObj.current['currentRadioId'],
              selectObj.current['currentRadioIdEx'],
              tempVal
            );
            sTagUserBetInfo.AreaInfo.cbBetSubType.value = types['cbBetSubType'];
            sTagUserBetInfo.dwNormalMultiple.value =
              mutilelist.current[types['multType']].value;
            // sTagUserBetInfo.dwSpecialMultiple.value = 0;
            placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
          }
        } else {
          const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
          sTagUserBetInfo.AreaInfo.cbBetMainType.value =
            selectObj.current['cbBetMainType'];
          sTagUserBetInfo.AreaInfo.cbBetSubType.value =
            selectObj.current['cbBetSubType'];
          sTagUserBetInfo.lBetScore.value = 0;
          tempArr?.sort((x, y) => x - y);
          let tempVal = false;
          for (
            let i = 0;
            i < sTagUserBetInfo.AreaInfo.cbNumber.length;
            i += 1
          ) {
            sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
          }
          for (let j = 0; j < tempArr?.length; j += 1) {
            sTagUserBetInfo.AreaInfo.cbNumber[j].value = tempArr[j];
            if (cbCurrXiaoRef.current === tempArr[j]) {
              tempVal = true;
            }
          }
          const types = getAnimalsType(
            selectObj.current['currentRadioId'],
            selectObj.current['currentRadioIdEx'],
            tempVal
          );
          sTagUserBetInfo.dwNormalMultiple.value =
            mutilelist.current[types['multType']].value;

          placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
        }
        setBetCount(tempArr.length);
        ////////////////////
        return true;
      }

      if (title === '尾数连') {
        console.log(
          '🚀 ~ file: index.tsx:199 ~ checkButtonPressed ~ 尾数连:',
          data
        );
        selectObj.current = data;
        ///////////////////////////
        //尾数连
        const tempArr = selectObj.current['array'];
        if (!tempArr) {
          return false;
        }
        const minCount = OnGetMinBet(
          selectObj.current['cbBetMainType'],
          selectObj.current['cbBetSubType']
        );
        if (tempArr?.length < minCount) {
          const desIndex = onGetBetSubDes(
            selectObj.current['cbBetMainType'],
            selectObj.current['cbBetSubType']
          );
          notSatisfyTips.current = `${desIndex}最少选择${minCount}个号码！`;
        } else {
          notSatisfyTips.current = '';
        }
        if (tempArr?.length > minCount) {
          resultTmpRef.current = [];
          const groupArray = BetGroup(tempArr, minCount);

          for (let index = 0; index < groupArray.length; index += 1) {
            const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
            sTagUserBetInfo.AreaInfo.cbBetMainType.value =
              selectObj.current['cbBetMainType'];
            sTagUserBetInfo.lBetScore.value = 0;
            groupArray[index].sort((x, y) => x - y);

            for (
              let i = 0;
              i < sTagUserBetInfo.AreaInfo.cbNumber.length;
              i += 1
            ) {
              sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
            }
            let tempVal = false;
            for (let j = 0; j < groupArray[index].length; j += 1) {
              sTagUserBetInfo.AreaInfo.cbNumber[j].value = groupArray[index][j];
              if (groupArray[index][j] === 0) {
                tempVal = true;
              }
            }

            const types = getWslType(
              selectObj.current['currentRadioId'],
              selectObj.current['currentRadioIdEx'],
              tempVal
            );
            sTagUserBetInfo.AreaInfo.cbBetSubType.value = types['cbBetSubType'];
            sTagUserBetInfo.dwNormalMultiple.value =
              mutilelist.current[types['multType']];

            placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
          }
        } else {
          const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
          sTagUserBetInfo.AreaInfo.cbBetMainType.value =
            selectObj.current['cbBetMainType'];

          sTagUserBetInfo.lBetScore.value = 0;
          tempArr?.sort((x, y) => x - y);
          let tempVal = false;
          for (
            let i = 0;
            i < sTagUserBetInfo.AreaInfo.cbNumber.length;
            i += 1
          ) {
            sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
          }
          for (let j = 0; j < tempArr.length; j += 1) {
            sTagUserBetInfo.AreaInfo.cbNumber[j].value = tempArr[j];
            if (tempArr[j] === 0) {
              tempVal = true;
            }
          }
          const types = getWslType(
            selectObj.current['currentRadioId'],
            selectObj.current['currentRadioIdEx'],
            tempVal
          );
          sTagUserBetInfo.AreaInfo.cbBetSubType.value = types['cbBetSubType'];
          sTagUserBetInfo.dwNormalMultiple.value =
            mutilelist.current[types['multType']];
          placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
        }
        setBetCount(tempArr.length);
        ///////////////////////////
        return true;
      }
      if (title === '全不中') {
        console.log(
          '🚀 ~ file: index.tsx:199 ~ checkButtonPressed ~ 全不中:',
          data
        );
        selectObj.current = data;
        // onSendPlaceJetton();
        /////////////////
        const tempArr = selectObj.current['array'];
        if (!tempArr) {
          return false;
        }
        const minCount = OnGetMinBet(
          selectObj.current['cbBetMainType'],
          selectObj.current['cbBetSubType']
        );
        if (tempArr.length < minCount) {
          const desIndex = onGetBetSubDes(
            selectObj.current['cbBetMainType'],
            selectObj.current['cbBetSubType']
          );
          notSatisfyTips.current = `${desIndex}最少选择${minCount}个号码！`;
        } else {
          notSatisfyTips.current = '';
        }
        if (tempArr.length > minCount) {
          resultTmpRef.current = [];
          const groupArray = BetGroup(tempArr, minCount);
          console.log(
            '🚀 ~ file: index.tsx:425 ~ onSendPlaceJetton ~ groupArray:',
            groupArray
          );

          for (let index = 0; index < groupArray.length; index += 1) {
            const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
            sTagUserBetInfo.AreaInfo.cbBetMainType.value =
              selectObj.current['cbBetMainType'];
            sTagUserBetInfo.AreaInfo.cbBetSubType.value =
              selectObj.current['cbBetSubType'];
            sTagUserBetInfo.dwNormalMultiple.value = selectObj.current['value'];
            sTagUserBetInfo.lBetScore.value = 0;
            groupArray[index].sort((x, y) => x - y);

            console.log(
              '🚀 ~ file: index.tsx:349 ~ onSendPlaceJetton ~ groupArray:',
              groupArray[index]
            );
            for (
              let i = 0;
              i < sTagUserBetInfo.AreaInfo.cbNumber.length;
              i += 1
            ) {
              sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
            }
            for (let j = 0; j < groupArray[index].length; j += 1) {
              sTagUserBetInfo.AreaInfo.cbNumber[j].value = groupArray[index][j];
            }

            placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
          }
        } else {
          const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
          sTagUserBetInfo.AreaInfo.cbBetMainType.value =
            selectObj.current['cbBetMainType'];
          sTagUserBetInfo.AreaInfo.cbBetSubType.value =
            selectObj.current['cbBetSubType'];
          sTagUserBetInfo.dwNormalMultiple.value = selectObj.current['value'];

          sTagUserBetInfo.lBetScore.value = 0;
          tempArr.sort((x, y) => x - y);
          for (
            let i = 0;
            i < sTagUserBetInfo.AreaInfo.cbNumber.length;
            i += 1
          ) {
            sTagUserBetInfo.AreaInfo.cbNumber[i].value = 255;
          }
          for (let j = 0; j < tempArr.length; j += 1) {
            sTagUserBetInfo.AreaInfo.cbNumber[j].value = tempArr[j];
          }
          placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
        }
        // gameHandle.userBetScore(stPlaceBet);
        setBetCount(tempArr.length);
        // setTBetInfo(placeBetInfo.tagCommonBetInfo);
        ///////////////////
        return true;
      }

      if (title !== 'clear') {
        /////特码---正特尾
        const tempArr = {
          cbBetMainType: data['cbBetMainType'],
          cbBetSubType: data['cbBetSubType'],
          dwNormalMultiple: data['value']['dwNormalMultiple'],
          dwSpecialMultiple: data['value']['dwSpecialMultiple'] || 0,
          array: data['value']['value'],
        };
        if (isActive) {
          selectArrayRef.current.push(tempArr);
        } else {
          selectArrayRef.current = selectArrayRef.current.filter(
            (item) => item.array !== data['value']['value']
          );
        }
        ////curRuleIndex 特码---正特尾
        for (let i = 0; i < selectArrayRef.current.length; i += 1) {
          const sTagUserBetInfo = CreateObject(common.tagCommonBetInfo);
          sTagUserBetInfo.AreaInfo.cbBetMainType.value =
            selectArrayRef.current[i].cbBetMainType;
          sTagUserBetInfo.AreaInfo.cbBetSubType.value =
            selectArrayRef.current[i].cbBetSubType;
          for (
            let j = 0;
            j < sTagUserBetInfo.AreaInfo.cbNumber.length;
            j += 1
          ) {
            sTagUserBetInfo.AreaInfo.cbNumber[j].value = 255;
          }

          if (
            getIsValidArray(
              selectArrayRef.current[i].cbBetMainType,
              selectArrayRef.current[i].cbBetSubType
            )
          ) {
            ///纯数字
            sTagUserBetInfo.AreaInfo.cbNumber[0].value =
              selectArrayRef.current[i].array;
          }

          sTagUserBetInfo.lBetScore.value = 0;
          sTagUserBetInfo.dwNormalMultiple.value =
            selectArrayRef.current[i].dwNormalMultiple;
          placeBetInfo.tagCommonBetInfo.push(sTagUserBetInfo);
        }
        setBetCount(placeBetInfo.tagCommonBetInfo.length);
      }
      return true;
    },
    [BetGroup, curGameId, placeBetInfo]
  );

  const handleTabs = (item) => {
    selectArrayRef.current = [];
    selectNumArrayRef.current = [];
    selectObj.current = {};
    handleReset.current?.onResetData();
    notSatisfyTips.current = '';
    console.log('item+++++++++', item['index'], item, selectObj.current);
  };

  // 投注单条信息
  const tagDynamicMultiple = useMemo(() => {
    let tagDynamicMultiple = CreateArray(
      common.tagDynamicMultiple,
      [common.LEN_SSC_BET_COUNT],
      0,
      true
    );
    tagDynamicMultiple = [];
    return tagDynamicMultiple;
  }, []);

  // 清除所有选中
  const onClear = useCallback(() => {
    if (typeof handleBetInputRef?.current?.onResetData === 'function') {
      // 清除金额
      handleBetInputRef?.current?.onResetData();
    }
    if (placeBetInfo?.tagCommonBetInfo.length) {
      placeBetInfo.tagCommonBetInfo = [];
      placeBetInfo.tagSpecialMultiple = [];
    }
    setBetCount(0);
    // setK((preK) => preK + 1);
  }, [placeBetInfo]);

  const handleBet = useCallback(() => {
    if (!gameHandle || !curPeriodNumber) return;

    // 普通下注
    const betInfo = CreateObject(common.CMD_C_PlaceBet);
    betInfo.placeBetHead.cPeriodNumber.value =
      placeBetInfo.placeBetHead.cPeriodNumber.value;
    betInfo.placeBetHead.wBetCount.value = placeBetInfo.tagCommonBetInfo.length;
    betInfo.placeBetHead.wMultipleCount.value =
      placeBetInfo.tagSpecialMultiple.length;
    const nameMapKey: Obj = {};
    placeBetInfo.tagCommonBetInfo.forEach((it, i) => {
      const codeName = GameMgr.GetBetRecordDesc(
        curGameId,
        it.AreaInfo.cbBetMainType.value,
        it.AreaInfo.cbBetSubType.value,
        it.AreaInfo.cbNumber
      );
      nameMapKey[codeName] = i;
      betInfo.tagCommonBetInfo[i] = CreateObject(common.tagCommonBetInfo);
      betInfo.tagCommonBetInfo[i].AreaInfo.cbBetMainType.value =
        it.AreaInfo.cbBetMainType.value;
      betInfo.tagCommonBetInfo[i].AreaInfo.cbBetSubType.value =
        it.AreaInfo.cbBetSubType.value;
      betInfo.tagCommonBetInfo[i].AreaInfo.cbNumber = [...it.AreaInfo.cbNumber];
      betInfo.tagCommonBetInfo[i].dwNormalMultiple.value =
        it.dwNormalMultiple.value;
      betInfo.tagCommonBetInfo[i].lBetScore.value = it.lBetScore.value;
      return it;
    });
    if (
      isArray(placeBetInfo.tagSpecialMultiple) &&
      placeBetInfo.tagSpecialMultiple.length
    ) {
      const newTagSpecialMultiple = CreateArray(
        common.tagSpecialMultiple,
        [common.LEN_SSC_BET_COUNT],
        0,
        true
      );
      placeBetInfo.tagSpecialMultiple.forEach((it, i) => {
        newTagSpecialMultiple[i] = CreateObject(common.tagSpecialMultiple);
        newTagSpecialMultiple[i].dwMultiple.value = it.dwMultiple.value;
        newTagSpecialMultiple[i].wID.value = it.wID.value;
        newTagSpecialMultiple[i].wBetIndex.value = it.wBetIndex.value;
      });
      betInfo.tagSpecialMultiple = newTagSpecialMultiple;
      // 赋值完清空
      // tagDynamicMultiple.splice(0, tagDynamicMultiple.length);
    } else {
      betInfo.tagSpecialMultiple = [];
    }
    console.log('🚀 ~ file: index.tsx:1279 ~ HkMarkSix ~ betInfo:', betInfo);

    gameHandle.userBetScore(betInfo as any);
    onClear();
  }, [gameHandle, curPeriodNumber, placeBetInfo, curGameId, onClear]);

  return (
    <>
      <CountTimeS />
      <div className='df-aic-jcc flex-1 fd-c o-none'>
        <ClassicsTop
          gameType={2903}
          curPeriodNumber={curPeriodNumber}
          gameRecords={gameRecords}
        />
        <Content
          numlist={numlist}
          mutile={mutilelistEx}
          dynamicList={dMutipleList}
          onChange={checkButtonPressed}
          onTabs={handleTabs}
          curXiao={cbCurrXiaoRef.current}
          ref={handleReset}
        />
        <BetInput
          betChip={gameSceneRef.current.stGameConfig.lBetChip}
          ref={handleBetInputRef}
          onBetClick={handleBet}
          betCount={betCount}
          onClear={() => {
            resetData();
            setBetCount(0);
          }}
          curGameId={2903}
          betPeriod={curPeriodNumber}
          tagCommonBetInfo={placeBetInfo.tagCommonBetInfo}
          tagDynamicMultiple={tagDynamicMultiple}
          notSatisfyTips={notSatisfyTips.current}
        />
      </div>
    </>
  );
}

export default observer(HkMarkSix);
