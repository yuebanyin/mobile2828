import { memo, useEffect } from 'react';
import { useNavigation } from '@/hooks';

/**
 * 余额宝-明细
 * @returns
 */
const YuEBaoDetail = () => {
  console.log('🚀 ~ file: index.tsx:16 ~ YuEBaoDetail:');
  const navigate = useNavigation();
  useEffect(() => {
    navigate('/mine/fundingTransf/yueBaoDetail', { replace: true });
  }, [navigate]);
  return <></>;
};

export default memo(YuEBaoDetail);
