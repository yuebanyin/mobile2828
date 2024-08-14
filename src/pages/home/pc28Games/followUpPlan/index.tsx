import { useOutletContext } from 'react-router-dom';
import { Tabs, TabPane } from '@/components';
import ExpertRank from './ExpertRank';
import { useLanguage } from '@/hooks';

const FollowUpPlan = () => {
  const { formatMsg } = useLanguage();
  const props: any = useOutletContext();
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

  return (
    <Tabs
      type='tabs'
      className='flex-1 o-none d-f fd-c'
      childreClassName='flex-1 o-none'
    >
      <TabPane className='h-full' paneKey='1' title={formatMsg('expertRanking')}>
        <ExpertRank
          lastPeriod={lastPeriod}
          gameWs={gameWs}
          forecastRank={forecastRank}
        />
      </TabPane>
      <TabPane paneKey='2' title={formatMsg('followedExpert')}>
        <div>{formatMsg('followedExpert')}</div>
      </TabPane>
    </Tabs>
  );
};

export default FollowUpPlan;
