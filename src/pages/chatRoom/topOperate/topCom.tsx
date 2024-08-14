import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const TopCom = (props: any) => {
  const { perNum } = props;
  const { t } = useTranslation();
  const newPerNum = useMemo(() => {
    const perLength = perNum?.length;
    if (perLength <= 8) {
      return perNum;
    }
    if (perLength > 8) {
      return perNum.slice(perLength - 8, perLength);
    }
    return perNum;
  }, [perNum]);
  return (
    <div className='m-r-20'>
      <span>{t('di')}</span>
      <span className='color-red'>{newPerNum}</span>
      <span>{t('qi')}</span>
    </div>
  );
};

export default memo(TopCom);
