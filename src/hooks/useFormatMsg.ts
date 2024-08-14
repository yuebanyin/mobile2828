import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useFormatMsg = (isFormatMsg: boolean) => {
  const { t } = useTranslation();

  const formatMsg = useCallback(
    (text: string, isFormat: boolean = false) => {
      if (isFormatMsg || isFormat) {
        return t(text);
      }
      return text;
    },
    [t, isFormatMsg]
  );

  return { formatMsg };
};
