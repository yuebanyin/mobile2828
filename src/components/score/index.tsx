import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useGeneralStore, useUserInfoStore, useUserScoreStore } from '@/mobx';
import { formatDigit } from '@/utils/tools';
import { useLanguage } from '@/hooks';

export const Score = observer(() => {
  const { score } = useUserScoreStore();
  const getScore = () => {
    let res = score || '0';
    res = formatDigit(res, 2);
    return <span>{res}</span>;
  };
  return getScore();
});

export const BindScore = observer(() => {
  const { bindScore } = useUserScoreStore();
  return <span>{bindScore || '0.00'}</span>;
});

export const RewardScore = observer(() => {
  const { rewardScore } = useUserScoreStore();
  const getScore = () => {
    let res = rewardScore || '0';
    res = formatDigit(res, 2);
    return <span>{res}</span>;
  };
  return getScore();
});

export type UserLevelProp = {
  level?: number;
};

export const UserLevel = observer((props: UserLevelProp) => {
  const { level } = props;
  const { formatMsg } = useLanguage();
  const { accountLevel } = useUserScoreStore();
  const { levelList } = useGeneralStore();
  const str = useCallback(
    (level: any) => {
      const val = level ?? accountLevel ?? 1;
      return levelList.find((r) => r.Value === val)?.Key ?? formatMsg('S-GL-1');
    },
    [accountLevel, levelList, formatMsg]
  );
  return <span>{str(level)}</span>;
});

export type UserLevelRateProp = {
  levelRateList: any;
};

export const UserLevelRate = observer(() => {
  const { level } = useUserInfoStore();
  const { levelList } = useGeneralStore();

  const value = useMemo(() => {
    const temp = levelList.find((it) => it.Value === level);
    return `${temp?.Expand || 0.0}%`;
  }, [level, levelList]);

  return <span>{value}</span>;
});

