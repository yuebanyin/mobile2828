import { CreateObject, CreateArray, BOOL, BYTE, CSTRING, DWORD, LONG, SCORE, Struct, WORD, WSTRING, INT, LONGLONG } from '../../base/basetype';
import { common } from '../common/CMD_COMMON';

export namespace CMD_Msg {
  export const MDM_MSG_LOGON: number = 1; //登录信息

  export const SUB_MSG_LOGON_TOKEN: number = 1; //Token登录

  export const SUB_MSG_LOGON_SUCCESS: number = 100; //登录成功

  export const SUB_MSG_LOGON_FAILURE: number = 101; //登录失败

  export const SUB_MSG_LOGON_FINISH: number = 102; //登录完成

  export const SUB_MSG_REPEAT_LOGON: number = 200; //重复登录

  export const MDM_MSG_USER: number = 2; //用户信息

  export const SUB_MSG_KICK_USER: number = 1; //踢出用户

  export const SUB_MSG_HONGBAO_CONFIG: number = 101; //红包配置

  export const SUB_MSG_HONGBAO_STATUS: number = 102; //红包用户状态

  export const SUB_MSG_HONGBAO_RECEIVE: number = 103; //领取红包

  export const SUB_MSG_SYSTEM_MESSAGE: number = 1000; //系统消息

  export const MDM_MSG_PUSH: number = 3; //推送服务

  export const SUB_MSG_PUSH_SCORE: number = 1; //刷新用户积分

  export const SUB_MSG_PUSH_NEW_EMAIL: number = 2; //新邮件

  export const SUB_MSG_PUSH_PAY: number = 3; //充值成功

  export const MDM_MSG_SSC: number = 4; //SSC相关

  export const SUB_MSG_SSC_STATUS: number = 1; //游戏状态

  export const SUB_MSG_SSC_AUTO_BET_START: number = 2; //自动跟随下注开始

  export const SUB_MSG_SSC_AUTO_BET_STOP: number = 3; //自动跟随下注停止

  export const SUB_MSG_SSC_AUTO_BET_STATUS: number = 4; //自动跟随下注操作返回

  export const MDM_MSG_FRAME: number = 100; //框架命令

  export const SUB_MSG_SOCKET_PING: number = 20; //游戏ping包

  export class CMD_MSG_LogonToken extends Struct {
    dwGameID = CreateObject(DWORD); //GameID
    strToken = CreateObject(CSTRING, common.LEN_TOKEN); //登录密码
    cbDeviceType = CreateObject(BYTE); //设备类型
    szMachineID = CreateObject(WSTRING, common.LEN_MACHINE_ID); //机器标识
  }
  export class CMD_MSG_LogonSuccess extends Struct {
    dwUserRight = CreateObject(DWORD); //用户权限
    dwMasterRight = CreateObject(DWORD); //管理权限
    btMemberOrder = CreateObject(BYTE); //会员等级
    dwMemberExp = CreateObject(DWORD); //会员等级
  }
  export class tagHongBaoConfig extends Struct {
    wID = CreateObject(WORD); //红包ID
    szTitle = CreateObject(WSTRING, 10); //红包标题
    lValidBetScore = CreateObject(SCORE); //领取条件：有效投注，不启用设置为0
    lUserScore = CreateObject(SCORE); //领取条件：身上金币，不启用设置为0
    lPayScore = CreateObject(SCORE); //领取条件：充值金币，不启用设置为0
    cbGameLevel = CreateObject(BYTE); //领取条件：游戏等级，不启用设置为0
    nShowScene = CreateArray(INT, [100]); //展示场景：-2.聊天室,-1.首页,大于0表示游戏房间
    stShowStartDate = CreateObject(LONGLONG); //展示开始时间
    stShowEndDate = CreateObject(LONGLONG); //展示结束时间
    stReceiveStartDate = CreateObject(LONGLONG); //领取开始时间
    stReceiveEndDate = CreateObject(LONGLONG); //领取结束时间
  }
  export class tagHongBaoUserStatus extends Struct {
    bReceiveStatus = CreateObject(BOOL); //领取状态：0.未领取，1.已领取
    lRewardScore = CreateObject(SCORE); //奖励金币
  }
  export class CMD_MSG_SystemMessage extends Struct {
    wMainCmdID = CreateObject(WORD);
    wSubCmdID = CreateObject(WORD);
    lRetCode = CreateObject(LONG); //返回代码:0.成功,其他.失败
    szDescribeString = CreateObject(WSTRING, 128, true); //描述消息
  }
  export class CMD_MSG_AutoFollowBetStart extends Struct {
    wServerID = CreateObject(WORD); //房间ID
    dwUserID = CreateObject(DWORD); //用户ID
    wKindID = CreateObject(WORD); //游戏ID
    StartInfo = CreateObject(common.tagAutoFollowBetStart); //下注开始信息
  }
  export class CMD_MSG_AutoFollowBetStop extends Struct {
    wServerID = CreateObject(WORD); //房间ID
    dwUserID = CreateObject(DWORD); //用户ID
    wKindID = CreateObject(WORD); //游戏ID
    ExpertPos = CreateObject(common.tagSSCForecastExpertPos); //专家位置
  }
  export class CMD_MSG_SOCKET_PING extends Struct {
    cbPing = CreateObject(BYTE);
  }
}
