import { CreateObject, CreateArray, BYTE, CSTRING, DWORD, LONG, LONGLONG, Struct, WORD, WSTRING } from '../../base/basetype';
import { common } from '../common/CMD_COMMON';

export namespace CMD_Game {
  export const MDM_GR_LOGON: number = 1; //登录信息

  export const SUB_GR_LOGON_TOKEN: number = 6; //Token登录

  export const SUB_GR_LOGON_MACHINE: number = 7; //设备码登录

  export const SUB_GR_LOGON_SUCCESS: number = 100; //登录成功

  export const SUB_GR_LOGON_FAILURE: number = 101; //登录失败

  export const SUB_GR_LOGON_FINISH: number = 102; //登录完成

  export const SUB_GR_REPEAT_LOGON: number = 300; //重复登录

  export const MDM_GR_USER: number = 3; //用户信息

  export const SUB_GR_SYSTEM_MESSAGE: number = 1000; //系统消息

  export const MDM_GF_FRAME: number = 100; //框架命令

  export const SUB_GF_SCENE_CONFIG: number = 4; //场景配置

  export const SUB_GF_GAME_STATUS: number = 100; //游戏状态

  export const SUB_GF_GAME_SCENE: number = 101; //游戏场景

  export const MDM_GR_SSC: number = 7; //SSC相关

  export const SUB_GR_SSC_CL_ENTER: number = 1; //进入长龙场景

  export const SUB_GR_SSC_CL_LEAVE: number = 2; //离开长龙场景

  export const SUB_GR_SSC_CL_QUERY_RECORD: number = 4; //查询记录

  export const SUB_GR_SSC_CL_QUERY_BET: number = 5; //查询下注

  export const SUB_GR_SSC_CL_ITEM: number = 6; //区域信息

  export const SUB_GR_SSC_CL_REMOVE_ITEM: number = 7; //移除区域

  export const SUB_GR_SSC_CL_MULT: number = 8; //赔率信息

  export const SUB_GR_SSC_CL_BET_INFO: number = 9; //下注信息

  export const SUB_GR_SSC_CL_USER_BET: number = 10; //用户下注

  export const SUB_GR_SSC_CL_USER_BET_SUCCESS: number = 11; //用户下注成功

  export const SUB_GR_SSC_CL_USER_BET_FAILURE: number = 12; //用户下注失败

  export const SUB_GR_SSC_CL_CLOSE: number = 13; //游戏关闭

  export const MDM_GF_GAME: number = 200; //游戏命令

  export class CMD_GR_SSCCL_PlaceBetHead extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
  }

  export class CMD_GR_LogonMachine extends Struct {
    cbDeviceType = CreateObject(BYTE); //设备类型
    szMachineID = CreateObject(WSTRING, common.LEN_MACHINE_ID); //机器标识
    tLogonTime = CreateObject(LONGLONG); //登录时间
    strLogonVerify = CreateObject(CSTRING, common.LEN_MD5); //登录校验
  }
  export class CMD_GR_LogonToken extends Struct {
    dwGameID = CreateObject(DWORD); //GameID
    strToken = CreateObject(CSTRING, common.LEN_TOKEN); //登录密码
    cbDeviceType = CreateObject(BYTE); //设备类型
    szMachineID = CreateObject(WSTRING, common.LEN_MACHINE_ID); //机器标识
  }
  export class CMD_GR_LogonSuccess extends Struct {
    dwUserRight = CreateObject(DWORD); //用户权限
    dwMasterRight = CreateObject(DWORD); //管理权限
    btMemberOrder = CreateObject(BYTE); //会员等级
    dwMemberExp = CreateObject(DWORD); //会员等级
  }
  export class CMD_GR_SystemMessage extends Struct {
    wMainCmdID = CreateObject(WORD);
    wSubCmdID = CreateObject(WORD);
    lRetCode = CreateObject(LONG); //返回代码:0.成功,其他.失败
    szDescribeString = CreateObject(WSTRING, 128, true); //描述消息
  }

  //查询记录
  export class CMD_GR_SSCCL_QueryRecord extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    cbChangLongMainType = CreateObject(BYTE); //长龙主类型
  }

  //移除区域
  export class CMD_GR_SSCCL_RemoveItem extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    cbChangLongMainType = CreateObject(BYTE); //长龙主类型
  }

  //用户下注
  export class CMD_GR_SSCCL_PlaceBet extends Struct {
    placeBetHead = CreateObject(CMD_GR_SSCCL_PlaceBetHead);
    tagCommonBetClientHead = CreateObject(common.tagCommonBetClientHead);
    tagCommonBetInfo = CreateArray(common.tagCommonBetInfo, [common.LEN_SSC_BET_COUNT], 0, true); //下注信息
    tagSpecialMultiple = CreateArray(common.tagSpecialMultiple, [common.LEN_SSC_BET_COUNT], 0, true); // 下注动态赔率信息
  }

  //用户下注失败
  export class CMD_GR_SSCCL_BetFailure extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    nResultCode = CreateObject(LONG); //错误代码
    szDescribeString = CreateObject(WSTRING, 128); //错误消息
  }
}
