import { Tabs, TabPane } from '@/components';
import { useLanguage } from '@/hooks';

const FollowUpPlanDetail = () => {
  console.log('跟单计划');
  const { formatMsg } = useLanguage();
  return (
    <Tabs type='tabs'>
      <div>{formatMsg('followedDetail')}</div>
      <TabPane paneKey='1' title={formatMsg('expertRanking')}>
        <div>{formatMsg('expertRanking')}</div>
      </TabPane>
      <TabPane paneKey='2' title={formatMsg('followedExpert')}>
        <div>{formatMsg('followedExpert')}</div>
      </TabPane>
    </Tabs>
  );
};

export default FollowUpPlanDetail;
