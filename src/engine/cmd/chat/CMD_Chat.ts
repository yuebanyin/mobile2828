import { CreateObject, CreateArray, BOOL, BYTE, CSTRING, DWORD, LONG, LONGLONG, SCORE, Struct, WORD, WSTRING } from '../../base/basetype';
import { common } from '../common/CMD_COMMON';
export namespace CMD_Chat {
  export const MDM_CRS_LOGON: number = 1; //登录信息

  export const SUB_CRS_LOGON_TOKEN: number = 1; //Token登录

  export const SUB_CRS_LOGON_MACHINE: number = 2; //设备码登录

  export const SUB_CRS_LOGON_SUCCESS: number = 100; //登录成功

  export const SUB_CRS_LOGON_FAILURE: number = 101; //登录失败

  export const SUB_CRS_LOGON_FINISH: number = 102; //登录完成

  export const SUB_CRS_REPEAT_LOGON: number = 200; //重复登录

  export const MDM_CRS_USER: number = 2; //用户信息

  export const SUB_CRS_USER_CHAT: number = 100; //聊天消息

  export const SUB_CRS_DELETE_MESSAGE: number = 101; //删除消息

  export const SUB_CRS_MANAGER_MESSAGE: number = 102; //管理员消息

  export const SUB_CRS_RECORD: number = 103; //历史消息

  export const SUB_CRS_RECORD_FINISH: number = 104; //历史消息完成

  export const SUB_CRS_USER_BET_INFO: number = 200; //用户下注信息

  export const SUB_CRS_QUERY_MULT_INFO: number = 201; //查询赔率信息

  export const SUB_CRS_USER_BET: number = 202; //用户下注

  export const SUB_CRS_USER_BET_SUCCESS: number = 203; //用户下注成功

  export const SUB_CRS_USER_BET_FAILURE: number = 204; //用户下注失败

  export const SUB_CRS_FORECAST_INFO: number = 205; //专家预测信息

  export const SUB_CRS_SET_GAME_INFO: number = 300; //设置所在游戏

  export const SUB_CRS_GAME_RECORD: number = 301; //游戏记录

  export const SUB_CRS_CHANGLONG_RECORD: number = 302; //长龙记录

  export const SUB_CRS_HONGBAO_SYSTEM: number = 400; //新增系统红包

  export const SUB_CRS_HONGBAO_USER: number = 401; //新增用户红包

  export const SUB_CRS_HONGBAO_STATUS: number = 402; //红包状态变化

  export const SUB_CRS_HONGBAO_RECEIVE: number = 403; //用户领取红包

  export const SUB_CRS_HONGBAO_RESULT: number = 404; //红包奖励结果

  export const SUB_CRS_HONGBAO_FAILURE: number = 405; //领取红包失败

  export const SUB_CRS_HONGBAO_RANKING: number = 406; //领取红包排行

  export const SUB_CRS_HONGBAO_QUERY_CONFIG: number = 407; //查询发送红包配置

  export const SUB_CRS_HONGBAO_SEND: number = 408; //玩家发送红包

  export const SUB_CRS_HONGBAO_SEND_SUCCESS: number = 409; //玩家发送红包成功

  export const SUB_CRS_HONGBAO_SEND_FAILURE: number = 410; //玩家发送红包失败

  export const SUB_CRS_HONGBAO_RECEIVE_STATUS: number = 411; //玩家发送领取状态

  export const SUB_CRS_NOTIVE_UPDATE: number = 500; //公告更新

  export const SUB_CRS_WIN_BROADCAST: number = 501; //赢分广播

  export const SUB_CRS_SYSTEM_MESSAGE: number = 1000; //系统消息

  export const MDM_CRS_FRAME: number = 100; //框架命令

  export const SUB_CRS_SOCKET_PING: number = 20; //游戏ping包

  export enum enHongBaoReturnType {
    HBRT_OK = 0, //成功
    HBRT_E_STOCK, //库存不足
    HBRT_E_REPEAT, //重复领取
    HBRT_E_UNKNOW, //未知错误
  }

  // 聊天室下注HEAD
  export class CMD_CRS_C_PlaceBetHead extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    wServerID = CreateObject(WORD); //房间ID
  }

  export class CMD_CRS_LogonToken extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    wServerID = CreateObject(WORD); //房间ID
    dwGameID = CreateObject(DWORD); //GameID
    strToken = CreateObject(CSTRING, common.LEN_TOKEN); //登录密码
    cbDeviceType = CreateObject(BYTE); //设备类型
    szMachineID = CreateObject(WSTRING, common.LEN_MACHINE_ID); //机器标识
  }
  export class CMD_CRS_LogonMachine extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    wServerID = CreateObject(WORD); //房间ID
    cbDeviceType = CreateObject(BYTE); //设备类型
    szMachineID = CreateObject(WSTRING, common.LEN_MACHINE_ID); //机器标识
    tLogonTime = CreateObject(LONGLONG); //登录时间
    strLogonVerify = CreateObject(CSTRING, common.LEN_MD5); //登录校验
  }
  export class CMD_CRS_LogonSuccess extends Struct {
    dwUserRight = CreateObject(DWORD); //用户权限
    dwMasterRight = CreateObject(DWORD); //管理权限
    btMemberOrder = CreateObject(BYTE); //会员等级
    dwMemberExp = CreateObject(DWORD); //会员等级
  }
  export class CMD_CRS_C_UserChat extends Struct {
    szChatString = CreateObject(WSTRING, common.LEN_USER_CHAT); //聊天信息
  }
  export class tagChatUserInfo extends Struct {
    dwGameID = CreateObject(DWORD); //GameID
    cbFaceID = CreateObject(BYTE); //头像标识
    szNickName = CreateObject(WSTRING, common.LEN_NICKNAME); //用户昵称
  }
  export class CMD_CRS_S_UserChat extends Struct {
    UserInfo = CreateObject(tagChatUserInfo); //用户信息
    lMessageID = CreateObject(LONGLONG); //消息唯一标识，仅限同一用户
    szChatString = CreateObject(WSTRING, common.LEN_USER_CHAT, true); //聊天信息
  }
  export class CMD_CRS_S_DeleteMessage extends Struct {
    dwGameID = CreateObject(DWORD); //GameID
    lMessageID = CreateObject(LONGLONG); //消息唯一标识，仅限同一用户
  }
  export class CMD_CRS_S_ManagerMessage extends Struct {
    szNickName = CreateObject(WSTRING, common.LEN_NICKNAME); //用户昵称
    cFaceUrl = CreateObject(CSTRING, 128); //头像地址
    cImgMsgUrl = CreateObject(CSTRING, 128); //图片消息地址
    szText = CreateObject(WSTRING, common.LEN_USER_CHAT, true); //文本内容
  }
  export class CMD_CRS_S_PlaceBetInfo extends Struct {
    placeBetHead = CreateObject(CMD_CRS_S_PlaceBetHead); // 下注头部信息
    tagCommonBetInfo = CreateArray(common.tagCommonBetInfo, [common.LEN_SSC_BET_COUNT], 0, true); // 下注注单信息
    tagSpecialMultiple = CreateArray(common.tagSpecialMultiple, [common.LEN_SSC_BET_COUNT], 0, true); // 下注动态赔率信息
  }
  export class CMD_CRS_S_PlaceBetHead extends Struct {
    UserInfo = CreateObject(tagChatUserInfo); //用户信息
    wKindID = CreateObject(WORD); //游戏ID
    wServerID = CreateObject(WORD); //房间ID
    cPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    // tagUserBetInfo = CreateArray(common.tagCommonBetInfo, [common.LEN_SSC_BET_COUNT], 0, true); //下注信息
    wBetCount = CreateObject(WORD);
    wMultipleCount = CreateObject(WORD);
  }
  export class CMD_CRS_C_PlaceBet extends Struct {
    placeBetHead = CreateObject(CMD_CRS_C_PlaceBetHead); // 聊天室专用下注头部信息
    tagCommonBetClientHead = CreateObject(common.tagCommonBetClientHead); // 下注通用头部
    tagCommonBetInfo = CreateArray(common.tagCommonBetInfo, [common.LEN_SSC_BET_COUNT], 0, true); // 下注注单信息
    tagSpecialMultiple = CreateArray(common.tagSpecialMultiple, [common.LEN_SSC_BET_COUNT], 0, true); // 下注动态赔率信息
    // wKindID = CreateObject(WORD); //游戏ID
    // wServerID = CreateObject(WORD); //房间ID
    // cPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    // tagUserBetInfo = CreateArray(common.tagCommonBetInfo, [common.LEN_SSC_BET_COUNT]); //下注信息
  }
  export class CMD_CRS_S_BetFailure extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    nResultCode = CreateObject(LONG); //错误代码
    szDescribeString = CreateObject(WSTRING, 128); //错误消息
  }
  export class CMD_CRS_C_QueryMultInfo extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    wServerID = CreateObject(WORD); //房间ID
    cPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    // tagUserMultInfo = CreateArray(common.tagMultipleAreaInfo, [common.LEN_SSC_BET_COUNT], 0, true); //赔率区域信息
    tagCommonAreaInfo = CreateArray(common.tagCommonAreaInfo, [common.LEN_SSC_BET_COUNT], 0, true); // 赔率区域信息
  }
  export class CMD_CRS_C_SetGameInfo extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    wServerID = CreateObject(WORD); //房间ID
  }
  export class tagChatRoomWinBroadcast extends Struct {
    szNickName = CreateObject(WSTRING, common.LEN_NICKNAME); //昵称
    wServerID = CreateObject(WORD); //房间ID
    lWinScore = CreateObject(SCORE); //赢分
  }
  export class CMD_CRS_SystemMessage extends Struct {
    wMainCmdID = CreateObject(WORD);
    wSubCmdID = CreateObject(WORD);
    lRetCode = CreateObject(LONG); //返回代码:0.成功,其他.失败
    szDescribeString = CreateObject(WSTRING, 128, true); //描述消息
  }

  export class CMD_CRS_SOCKET_PING extends Struct {
    cbPing = CreateObject(BYTE);
  }

  //聊天记录类型
  export enum emCRSRecordType {
    CRSRT_USER_CHAT = 1, //用户聊天
    CRSRT_MANAGER_MSG = 2, //管理员信息
    CRSRT_SYS_HB = 3, //系统红包
    CRSRT_USER_HB = 4, //用户红包
  }
  export class tagRecordHead extends Struct {
    cbRecordType = CreateObject(BYTE); //记录类型
    wDataSize = CreateObject(WORD); //数据大小
  }
  export class tagChatHongBaoBaseConfig extends Struct {
    dwHongBaoID = CreateObject(DWORD); //红包ID
    szNickName = CreateObject(WSTRING, common.LEN_NICKNAME); //发送者昵称
    szTitle = CreateObject(WSTRING, 33); //红包标题
    wRewardCount = CreateObject(WORD); //红包个数
  }
  export class tagChatSystemHongBaoInfo extends Struct {
    BaseInfo = CreateObject(tagChatHongBaoBaseConfig); //基础信息
    bTop = CreateObject(BOOL); //是否置顶
    cFaceUrl = CreateObject(CSTRING, 128); //发送者头像URl
    cIconUrl = CreateObject(CSTRING, 128); //红包封面图片地址
  }
  export class tagChatUserHongBaoInfo extends Struct {
    BaseInfo = CreateObject(tagChatHongBaoBaseConfig); //基础信息
    dwGameID = CreateObject(DWORD); //发送者ID
    cbFaceID = CreateObject(BYTE); //发送者头像ID
  }
  export class tagHongBaoReceive extends Struct {
    dwGameID = CreateObject(DWORD); //GameID
    cbFaceID = CreateObject(BYTE); //头像标识
    szNickName = CreateObject(WSTRING, common.LEN_NICKNAME); //昵称
    lReceiveScore = CreateObject(SCORE); //红包金额
    tReceiveDate = CreateObject(LONGLONG); //领取时间
  }
  export class tagChatHongBaoSendConfig extends Struct {
    wMaxCount = CreateObject(WORD); //个数上限
    lMaxScore = CreateObject(SCORE); //分数上限
    wDurationHour = CreateObject(WORD); //持续时间，小时
  }
  export class CMD_CRS_C_HongBaoSend extends Struct {
    wCount = CreateObject(WORD); //红包个数
    lScore = CreateObject(SCORE); //红包分数
    szTitle = CreateObject(WSTRING, 33); //红包标题
  }
}
