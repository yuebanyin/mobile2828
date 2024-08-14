import { DataBuffer } from '@/engine/base/databuffer';
import CtrlGame from '@/engine/ctrl/CtrlGame';
import { GameRoute } from '@/engine/ctrl/NetRoute';
import { CMD_Game } from '@/engine/cmd/game/CMD_Game';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { BYTE } from '@/engine/base/basetype';
import { CMD_3402 } from './CMD_3402';

/**
 * @description: ���ر�28 pc28����Ҫ�������������ͬʱ������Ϣ--����������Ϣ�ͺ�������Ϣ
 */
export class Game3402 extends CtrlGame {
  constructor(url: string, webId: string) {
    super(url, webId);
  }

  /**
   * @description: ��������ˢ������
   * @return {*}
   */
  refreshBetConfig() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_UPDATE_CONFIG);
      return true;
    }
    return false;
  }

  /**
   * @description: ������Ϸ�����仯
   * @return {*}
   */
  sceneChange() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_SCENE_CHANGE);
      return true;
    }
    return false;
  }

  /**
   * @description: ���뷿����������50�ڵ���Ϸ��¼����������������һ�ڵĿ����������������ȫ����¼��
   * @return {*}
   */
  getHistoryRecord() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_HISTORY);
      return true;
    }
    return false;
  }

  /**
   * @description: ��̬����ָ�����������ҵ�����ĳ����ע������ۼ���ע������̬����ĳ����ע��������
    ��̬���ʰ�����ͨ���ʺ���������
    ���ڴ��ڶ�̬���ʣ�����·����ڶ�̬���ʵ���������
    �ڽ�����һ��֮�󣬿ͻ�����Ҫ���������һ�ڵĶ�̬���ʣ��ָ�����������
   * @return {*}
   */
  getDynamicMultiple() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_DYNAMIC_MULTIPLE);
      return true;
    }
    return false;
  }

  /**
   * @description: �û���ע
   * @param {common} betScore
   * @return {*}
   */
  userBetScore(betScore: common.CMD_C_PlaceBet) {
    if (this.isCan() && betScore) {
      this.SendData(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_C_PLACE_JETTON, betScore);
      return true;
    }
    return false;
  }

  /**
   * @description: ���ط���
   * @return {*}
   */
  initEvent(): void {
    super.initEvent();

    /////////////////////////////////////////////////////
    //ע������Ϸ��������

    // ����ˢ��
    this.RegistMessageEx(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_UPDATE_CONFIG, this.onRefreshBaseConfig.bind(this), CMD_3402.tagBaseConfig);
    // ������Ϸ�����仯
    this.RegistMessageEx(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_SCENE_CHANGE, this.onSceneChange.bind(this), CMD_3402.CMD_S_SceneChange);
    // ���뷿����������50�ڵ���Ϸ��¼����������������һ�ڵĿ����������������ȫ����¼��
    this.RegistMessageList(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_HISTORY, this.onHistoryRecord.bind(this), CMD_3402.tagRecordInfo);
    // ��Ϸ����
    this.RegistMessageEx(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_GAME_END, this.onGameEnd.bind(this), CMD_3402.CMD_S_GameEnd);
    // ��ȡ��̬����
    this.RegistMessageEx(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_DYNAMIC_MULTIPLE, this.onDynamicMultiple.bind(this), CMD_3402.CMD_S_DynamicMultiple);
    // ��̬�����·����
    this.RegistMessage(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_DYNAMIC_MULTIPLE_END, this.onDynamicMultipleFinish.bind(this));
    // �����û���ע�ɹ�
    this.RegistMessage(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_PLACE_JETTON_SUCCESS, this.onUserBetSuccess.bind(this));
    // �����û���עʧ��
    this.RegistMessage(CMD_Game.MDM_GF_GAME, CMD_3402.SUB_S_PLACE_JETTON_FAILURE, this.onUserBetFaild.bind(this));
  }

  /**
   * @description: ��Ϸ�����ӿ�
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
   * @description: ��Ϸ��������
   * @param {DataBuffer} data
   * @return {*}
   */
  onGameSceneConfig(data: DataBuffer): void {
    let gameScene = data.toStruct(CMD_3402.CMD_S_GameScene);
    this.dispatchGame(GameRoute.gameScenConfig, gameScene);
  }

  /**
   * @description: �������÷��ͱ仯ʱ���ͣ�һ�������һ�ڿ�ʼ������
   * @param {CMD_3402} data
   * @return {*}
   */
  private onRefreshBaseConfig(data: CMD_3402.tagBaseConfig) {
    this.dispatchGame(GameRoute.refreshBaseConfig, data);
  }

  /**
   * @description: ������Ϸ�����仯
   * @param {CMD_3402} data
   * @return {*}
   */
  private onSceneChange(data: CMD_3402.CMD_S_SceneChange) {
    this.dispatchGame(GameRoute.sceneChange, data);
  }

  /**
   * @description: ���뷿����������50�ڵ���Ϸ��¼����������������һ�ڵĿ����������������ȫ����¼��
   * @param {Array} list
   * @return {*}
   */
  private onHistoryRecord(list: Array<CMD_3402.tagRecordInfo>) {
    this.dispatchGame(GameRoute.historyRecord, list);
  }

  /**
   * @description: ��Ϸ����
   * @param {CMD_3402} data
   * @return {*}
   */
  private onGameEnd(data: CMD_3402.CMD_S_GameEnd) {
    this.dispatchGame(GameRoute.gameEnd, data);
  }

  /**
   * @description: ��ȡ��̬����
   * @param {CMD_3402} data
   * @return {*}
   */
  private onDynamicMultiple(data: CMD_3402.CMD_S_DynamicMultiple) {
    this.dispatchGame(GameRoute.dynamicMultiple, data);
  }

  /**
   * @description: ��̬�����·����
   * @param {DataBuffer} data
   * @return {*}
   */
  private onDynamicMultipleFinish(data: DataBuffer) {
    this.dispatchGame(GameRoute.dynamicMultipleFinish, data);
  }

  /**
   * @description: �û���ע�ɹ�
   * @param {DataBuffer} data
   * @return {*}
   */
  private onUserBetSuccess(data: DataBuffer) {
    this.dispatchGame(GameRoute.userBetSuccess, data);
  }

  /**
   * @description: �û���עʧ��
   * @param {DataBuffer} data
   * @return {*}
   */
  private onUserBetFaild(data: DataBuffer) {
    let strBetFaildTip = common.GetBetFaildDesc(data);
    this.dispatchGame(GameRoute.userBetFaild, strBetFaildTip);
  }
}
