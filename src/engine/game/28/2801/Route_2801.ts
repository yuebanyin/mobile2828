// 子游戏从5000开始
export namespace Route2801 {
  export const refreshBaseConfig                  :number = 5000                //基础配置发送变化时推送，一般仅在新一期开始后推送
  export const sceneChange                        :number = 5001                //推送游戏场景变化
  export const historyRecord                      :number = 5002                //进入房间后，推送最近50期的游戏记录。后续仅推送最新一期的开奖结果，不再推送全部记录。
  export const dynamicMultiple                    :number = 5003                //动态赔率指会根据所有玩家当期在某个下注区域的累计下注额来动态调整某个下注区域赔率,动态赔率包含普通赔率和特殊赔率,当期存在动态赔率，则会下发存在动态赔率的所有区域,在进入新一期之后，客户端需要主动清除上一期的动态赔率，恢复至基础赔率
  export const userBetInfo                        :number = 5004                //推送其他玩家的下注信息
  export const userBetSuccess                     :number = 5005                //用户下注成功
  export const userBetFaild                       :number = 5006                //用户下注失败
  export const gameEnd                            :number = 5888                //游戏开奖结果--当前期游戏结束
}