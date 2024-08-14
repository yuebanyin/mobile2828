import { useEffect, useState } from 'react';
import { useI18n, useLanguage } from '@/hooks';
import { Img } from '../img';
import { lsGetItem, lsSetItem } from '@/utils/localStorage';
import { useGlobalStore } from '@/mobx';

const languageList = [
  { key: 1, title: 'simpleChinese', content: 'zh-CN', active: false },
  { key: 2, title: 'traditionChinese', content: 'zh-TW', active: true },
];
export const LanguageChange = (props: any) => {
  const {
    className,
    boxCls = 'top-150',
    iconCls = 'w-94 h-100',
    src = '/login/language.png',
  } = props;
  const { formatMsg } = useLanguage();
  const { onChangeLanguage } = useI18n();
  const [showBox, setShowBox] = useState(false);
  const [langList, setLangList] = useState(languageList);
  const { changeState } = useGlobalStore();

  //
  useEffect(() => {
    const nowLanguage = lsGetItem('language');
    const newList = languageList.map((it) => {
      if (it.content === nowLanguage) {
        it.active = true;
        changeState('language', it?.content);
      } else {
        it.active = false;
      }
      return it;
    });
    setLangList(newList);
  }, [changeState]);

  const handleLanguage = (item) => {
    // console.log('000000', item);
    const newList = langList.map((it) => {
      if (it.key === item.key) {
        it.active = true;
        lsSetItem('language', it?.content);
        changeState('language', it?.content);
        onChangeLanguage(it?.content);
      } else {
        it.active = false;
      }
      return it;
    });
    setLangList(newList);
    setShowBox((pre) => !pre);
  };

  return (
    <div className={`p-r ${className}`}>
      <Img
        src={src || '/login/language.png'}
        alt=''
        className={iconCls}
        onClick={() => setShowBox((pre) => !pre)}
      />
      <div
        className={`p-0-20 p-a right-28 bs-primary bg-body ${boxCls} ${
          showBox ? '' : 'd-n'
        }`}
      >
        {langList.map((item, i) => (
          <div
            key={item.key}
            className={`p-30-20 t-40 ws-no ${
              i < langList.length - 1 ? 'b-b-1 bc-split' : ''
            } ${item.active ? 'color-primary' : 'color-squ-seven'}`}
            onClick={() => handleLanguage(item)}
          >
            {formatMsg(item.title)}
          </div>
        ))}
      </div>
    </div>
  );
};
