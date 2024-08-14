import i18n from 'i18next';

export const useI18n = () => {
  const onChangeLanguage = (currLanguage?) => {
    if (currLanguage) {
      i18n.changeLanguage(currLanguage);
    } else if (i18n.language === 'zh-CN') {
      i18n.changeLanguage('zh-TW');
    } else {
      i18n.changeLanguage('zh-CN');
    }
  };

  return { onChangeLanguage };
};
