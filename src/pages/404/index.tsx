import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const Mistake = () => {
  const { t } = useTranslation();
  return <div>{t('404Page')}</div>;
};
export default memo(Mistake);
