import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Picker, Icon, Button } from '@/components';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import CountDownTime from '@/pages/gameComponents/countDownTime';
import { getGameInfo } from '@/utils/game';
import { useGameConfigStore } from '@/mobx';
import { pc28 } from '@/constants';
import { CreateObject } from '@/engine/base/basetype';
import { isArray } from '@/utils/tools';
import { useLanguage } from '@/hooks';

const defAara = [common.emForecastAreaType.FAT_D1];
const defPlan = [common.emForecastPlanType.FPT_5];

const ExpertRank = (props: any) => {
  const {
    lastPeriod,
    // setMsg,
    // gameRecords,
    // curGameId,
    // topRedpacket,
    // roomInfo,
    // chatWs,
    gameWs,
    // msg,
    // gameScen,
    forecastRank,
  } = props || {};

  const [plan, setPlan] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [params] = useSearchParams();
  const { gameList } = useGameConfigStore();
  const kindId = params.get('gameId');
  const houseId = params?.get('houseId');

  console.log({ forecastRank });

  // 查询预测专家（参数）
  const forecastRankParams = useMemo(() => {
    const params = CreateObject(common.CMD_C_ForecastRank);
    params.wAreaID.value = area;
    params.wPlanID.value = plan;
    return params;
  }, [plan, area]);
  const { formatMsg } = useLanguage();

  useEffect(() => {
    if (gameWs?.getForecastRank && forecastRankParams) {
      gameWs.getForecastRank(forecastRankParams);
    }
  }, [gameWs, forecastRankParams]);

  const { gameInfo, fieldInfo } = useMemo(
    () => getGameInfo(gameList, kindId, houseId),
    [gameList, kindId, houseId]
  );

  const onConfirmPlan = useCallback((info) => {
    setPlan(info[0]?.value);
  }, []);

  const onConfirmArea = useCallback((info) => {
    console.log({ info }, info.value);
    setArea(info[0]?.value);
  }, []);

  return (
    <div className='d-f fd-c h-full'>
      <div className='bg-body my-20 px-50 py-30'>
        <div className='d-f ai-c jc-sb'>
          <Picker
            listData={common.areaTypes}
            defaultValue={defAara}
            value={area}
            onConfirm={onConfirmArea}
            labelClassName='bg-main h-80 br-10 px-30 py-10 mr-30 wds-sm-con'
          />
          <Picker
            listData={common.planTypes}
            defaultValue={defPlan}
            value={plan}
            onConfirm={onConfirmPlan}
            labelClassName='bg-main h-80 br-10 px-30 py-10 mr-30 wds-sm-con'
          />
          <div className='flex-1'>
            <span className='mr-10'>{formatMsg('curRoundNum')}:</span>
            {forecastRank?.wCurrRound?.value}/{forecastRank?.wRoundCount?.value}
          </div>
        </div>
        <div className='d-f ai-c jc-sb mt-20'>
          <div className='ta-c flex-1'>
            {formatMsg('di')}
            <span className='color-red font-w-bold'>
              {`${lastPeriod}`.slice(-8)}
            </span>
            {formatMsg('qi')}
          </div>
          <div className='ta-c flex-1'>
            <span className='mr-10'> {formatMsg('Close')}:</span>
            <CountDownTime className='color-primary' />
          </div>
          <div className='ta-c flex-1'>
            <span className='mr-10'>{formatMsg('lotteryDraw')}:</span>
          </div>
        </div>
      </div>
      <div className='flex-1 o-y'>
        {isArray(forecastRank?.ExpertList) &&
          forecastRank.ExpertList.map((info, i) => (
            <div
              key={info?.wRankID || i}
              className='br-20 mx-50 mt-15 mb-30 o-none'
            >
              <div className='d-f ai-c jc-sb bg-gdt-top px-30 py-10'>
                <div className='color-white wds-con'>
                  {formatMsg('expert')}
                  {info?.ExpertInfo?.wExpertID?.value}
                  {formatMsg('mark')}
                </div>
                <div className='d-f ai-c jc-end'>
                  <div className='br-10 py-10 px-15 d-f ai-c jc-sb bg-body h-66'>
                    <div className='mr-30'>
                      {formatMsg('winRate')}
                      {`${info?.ExpertInfo?.dwWinRate?.value / 100}`.toFixedEx(
                        2
                      )}
                      %
                    </div>
                    <div>
                      {formatMsg('profitLoss')}
                      <span className='color-red ml-10'>
                        {`${info?.ExpertInfo?.lWinScore?.value}`.toFixedEx(2)}
                      </span>
                    </div>
                  </div>
                  <Icon name='right' className='h-24 w-50 color-white' />
                </div>
              </div>
              <div className='bg-body pt-30'>
                <div className='d-f ai-c mx-30'>
                  <div className='w-540 mr-10'>
                    <span className='mr-10'>{formatMsg('games')}:</span>
                    {gameInfo?.KindName}
                    {pc28.includes(gameInfo?.KindId) &&
                      `-${fieldInfo?.FieldName}`}
                  </div>
                  <div>
                    <span className='mr-10'>{formatMsg('planType')}:</span>
                    {common.planTypes.find((it) => it.value === plan)?.name}
                  </div>
                </div>
                <div className='d-f ai-c mt-20 mx-30'>
                  <div className='w-540 mr-10'>
                    <span className='mr-10'>{formatMsg('QIUHAO')}:</span>
                    {common.areaTypes.find((it) => it.value === area)?.text}
                  </div>
                  <div>
                    <span className='mr-10'>{formatMsg('longDragon')}:</span>{' '}
                    {info?.ExpertInfo?.wSeriesWinCount?.value}
                    {formatMsg('qi')}
                  </div>
                </div>
                <div className='mt-30 mx-30'>
                  <div>
                    <span className='mr-10'>{formatMsg('predict')}:</span>
                  </div>
                </div>
                <div className='d-f ai-c jc-sb b-t-1 bc-split mt-30 h-100 o-none'>
                  <Button
                    type='link'
                    className='flex-1 b-r-1 bc-split br-0 wds-con h-100'
                  >
                    {formatMsg('followingTou')}
                  </Button>
                  <Button
                    type='link'
                    className='flex-1 b-r-1 bc-split br-0 wds-con h-100'
                  >
                    {formatMsg('counterinvestment')}
                  </Button>
                  <Button type='link' className='flex-1 wds-con h-100'>
                    {formatMsg('AutoFollow')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExpertRank;
