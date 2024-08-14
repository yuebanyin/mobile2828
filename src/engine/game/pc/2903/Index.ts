import { DataBuffer } from '@/engine/base/databuffer';
import CtrlGame from '@/engine/ctrl/CtrlGame';
import { GameRoute } from '@/engine/ctrl/NetRoute';
import { CMD_2903 } from './CMD_2903';
import { CMD_Game } from '@/engine/cmd/game/CMD_Game';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { BYTE } from '@/engine/base/basetype';

/**
 * @description: 比特币28 pc28还需要连接聊天服务器同时接收信息--处理聊天信息和红包相关信息
 */
export class Game2903 extends CtrlGame {
  constructor(url: string, webId: string) {
    super(url, webId);
  }

  /**
   * @description: 主动请求刷新配置
   * @return {*}
   */
  refreshBetConfig() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_UPDATE_CONFIG);
      return true;
    }
    return false;
  }

  /**
   * @description: 推送游戏场景变化
   * @return {*}
   */
  sceneChange() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_SCENE_CHANGE);
      return true;
    }
    return false;
  }

  /**
   * @description: 进入房间后，推送最近50期的游戏记录。后续仅推送最新一期的开奖结果，不再推送全部记录。
   * @return {*}
   */
  getHistoryRecord() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_HISTORY);
      return true;
    }
    return false;
  }

  /**
   * @description: 动态赔率指会根据所有玩家当期在某个下注区域的累计下注额来动态调整某个下注区域赔率
    动态赔率包含普通赔率和特殊赔率
    当期存在动态赔率，则会下发存在动态赔率的所有区域
    在进入新一期之后，客户端需要主动清除上一期的动态赔率，恢复至基础赔率
   * @return {*}
   */
  getDynamicMultiple() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_DYNAMIC_MULTIPLE);
      return true;
    }
    return false;
  }

  /**
   * @description: 用户下注
   * @param {CMD_2903} betScore
   * @return {*}
   */
  userBetScore(betScore: CMD_2903.CMD_C_PlaceBet) {
    if (this.isCan() && betScore) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_C_PLACE_JETTON, betScore);
      return true;
    }
    return false;
  }

  /**
   * @description: 重载方法
   * @return {*}
   */
  initEvent(): void {
    super.initEvent();

    /////////////////////////////////////////////////////
    //注册子游戏监听方法

    // 配置刷新
    this.RegistMessageEx(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_UPDATE_CONFIG, this.onRefreshBaseConfig.bind(this), CMD_2903.tagBaseConfig);
    // 推送游戏场景变化
    this.RegistMessageEx(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_SCENE_CHANGE, this.onSceneChange.bind(this), CMD_2903.CMD_S_SceneChange);
    // 进入房间后，推送最近50期的游戏记录。后续仅推送最新一期的开奖结果，不再推送全部记录。
    this.RegistMessageList(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_HISTORY, this.onHistoryRecord.bind(this), CMD_2903.tagRecordInfo);
    // 游戏结束
    this.RegistMessageEx(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_GAME_END, this.onGameEnd.bind(this), CMD_2903.CMD_S_GameEnd);
    // 获取动态赔率
    this.RegistMessageEx(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_DYNAMIC_MULTIPLE, this.onDynamicMultiple.bind(this), CMD_2903.CMD_S_DynamicMultiple);
    // 动态赔率下发完成
    this.RegistMessage(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_DYNAMIC_MULTIPLE_FINISH, this.onDynamicMultipleFinish.bind(this));
    // 监听用户下注成功
    this.RegistMessage(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_PLACE_JETTON_SUCCESS, this.onUserBetSuccess.bind(this));
    // 监听用户下注失败
    this.RegistMessage(CMD_Game.MDM_GF_GAME, CMD_2903.SUB_S_PLACE_JETTON_FAILURE, this.onUserBetFaild.bind(this));
  }

  /**
   * @description: 游戏场景接口
   * @param {DataBuffer} data
   * @return {*}
   */
  onGameSceneState(sceneState: BYTE) {
    if (sceneState) {
      this.gameSceneState = sceneState.value;
    }
    this.dispatchGame(GameRoute.gameSceneState, sceneState);
  }

  /**
   * @description: 游戏场景配置
   * @param {DataBuffer} data
   * @return {*}
   */
  onGameSceneConfig(data: DataBuffer): void {
    let gameScene = data.toStruct(CMD_2903.CMD_S_GameScene);
    this.dispatchGame(GameRoute.gameScenConfig, gameScene);
  }

  /**
   * @description: 基础配置发送变化时推送，一般仅在新一期开始后推送
   * @param {CMD_2903} data
   * @return {*}
   */
  private onRefreshBaseConfig(data: CMD_2903.tagBaseConfig) {
    this.dispatchGame(GameRoute.refreshBaseConfig, data);
  }

  /**
   * @description: 推送游戏场景变化
   * @param {CMD_2903} data
   * @return {*}
   */
  private onSceneChange(data: CMD_2903.CMD_S_SceneChange) {
    this.dispatchGame(GameRoute.sceneChange, data);
  }

  /**
   * @description: 进入房间后，推送最近50期的游戏记录。后续仅推送最新一期的开奖结果，不再推送全部记录。
   * @param {Array} list
   * @return {*}
   */
  private onHistoryRecord(list: Array<CMD_2903.tagRecordInfo>) {
    this.dispatchGame(GameRoute.historyRecord, list);
  }

  /**
   * @description: 游戏结束
   * @param {CMD_2903} data
   * @return {*}
   */
  private onGameEnd(data: CMD_2903.CMD_S_GameEnd) {
    this.dispatchGame(GameRoute.gameEnd, data);
  }

  /**
   * @description: 获取动态赔率
   * @param {CMD_2903} data
   * @return {*}
   */
  private onDynamicMultiple(data: CMD_2903.CMD_S_DynamicMultiple) {
    this.dispatchGame(GameRoute.dynamicMultiple, data);
  }

  /**
   * @description: 动态赔率下发完成
   * @param {DataBuffer} data
   * @return {*}
   */
  private onDynamicMultipleFinish(data: DataBuffer) {
    this.dispatchGame(GameRoute.dynamicMultipleFinish, data);
  }

  /**
   * @description: 用户下注成功
   * @param {DataBuffer} data
   * @return {*}
   */
  private onUserBetSuccess(data: DataBuffer) {
    this.dispatchGame(GameRoute.userBetSuccess, data);
  }

  /**
   * @description: 用户下注失败
   * @param {DataBuffer} data
   * @return {*}
   */
  private onUserBetFaild(data: DataBuffer) {
    let strBetFaildTip = common.GetBetFaildDesc(data);
    this.dispatchGame(GameRoute.userBetFaild, strBetFaildTip);
  }
}
