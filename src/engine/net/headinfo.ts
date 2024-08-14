/* eslint-disable */
import { BYTE, CreateObject, Struct, WORD, WSTRING } from '../base/basetype';

export class TCP_Info extends Struct {
  cbDataKind = CreateObject(BYTE);
  cbCheckCode = CreateObject(BYTE);
  wPacketSize = CreateObject(WORD);
}

export class TCP_Command extends Struct {
  wMainCmdID = CreateObject(WORD);
  wSubCmdID = CreateObject(WORD);
}

export class TCP_Head extends Struct {
  TCPInfo = CreateObject(TCP_Info);
  CommandInfo = CreateObject(TCP_Command);
}

//发送验证信息
export class TCP_Validate extends Struct {
  szValidateKey = CreateObject(WSTRING, 64); //验证字符
}

export const NetHeadLen = {
  /**
   * @description: 网络头部大小 固定
   */
  TCP_HEAD_LEN: 8,
  /**
   * @description: 头部信息大小
   */
  TCP_INFO_LEN: 4,
  /**
   * @description: 命令信息大小
   */
  TCP_COMMAND_LEN: 4,
};
