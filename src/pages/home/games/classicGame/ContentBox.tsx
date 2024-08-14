import { memo, useEffect } from 'react';
import {
 Content2901, Content2903, Content2904, Content2905, Content3102, Content3501, Content3402 
} from './contents';
import { useChangLongBetStore } from '@/mobx/changLongBet';

const ContentBox = memo((props: any) => {
  const { curGameId } = props;
  const { changeKeyArr } = useChangLongBetStore();

  // 切换游戏清空选中号码的key
  useEffect(
    () => () => {
      if (curGameId) {
        changeKeyArr([]);
      }
    },
    [changeKeyArr, curGameId]
  );

  switch (curGameId) {
    case 2901:
      return <Content2901 {...props} />;
    case 2905:
    case 3202:
    case 3203:
      // 幸运5系列：
      //   澳洲幸运5
      //   斯洛伐克幸运5
      //   加拿大幸运5
      return <Content2905 {...props} />;
    case 2904:
      // 澳洲幸运10
      return <Content2904 {...props} />;
    case 2902:
    case 3102:
      //赛车系列游戏：
      //  新幸运飞艇
      //  比特币1分赛车
      return <Content3102 {...props} />;
    case 2903:
      return <Content2903 {...props} />;
    case 3501:
      return <Content3501 {...props} />;
    case 3402:
      return <Content3402 {...props} />;
    default:
      return <></>;
  }
});

export default ContentBox;
