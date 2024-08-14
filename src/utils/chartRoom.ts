/**
 * 
 * @param activeId 传入当前选择游戏kindid
 * @returns string 小球的类型 // 2906：澳洲PC28 目前没有
 */
export const getBallType = (activeId: number) => {
  switch (activeId) {
    case 2801:
    case 2802:
    case 2803:
    case 2804:
    case 2901:
      return 'bothColor';
    case 2902:
    case 2904:
    case 3102:
      return 'majiang';
    case 2903:
    case 3402:
      return 'colorful';
    case 2906:
      return 'singRed';
      // return null;
    case 2905:
    case 3202:
    case 3203:
      return 'singGold';
    case 3501:
      return 'twenty';
    default:
      return 'bothColor';
  }
};
