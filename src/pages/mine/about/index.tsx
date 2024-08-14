import { useCallback, useEffect, useState } from 'react';
import { CellGroup } from '@/components/cellgroup';
import { Cell } from '@/components/cell';
import { getAboutTypes } from '@/services';
import { useNavigation } from '@/hooks';
import { useGlobalStore } from '@/mobx';
import { themesMap } from '@/constants';

export type AboutTypeDto = {
  Id: number;
  Name: string;
  Version: string;
};

function About() {
  const [aboutList, setAboutList] = useState<AboutTypeDto[]>([]);
  const { theme, changeState } = useGlobalStore();
  const navigate = useNavigation();

  // 点击单个跳转
  const clickItem = useCallback(
    (item) => {
      navigate(`/mine/about/detail?title=${item.Name}`, {
        state: { id: item.Id, name: item.Name, Version: themesMap[theme].key },
      });
    },
    [navigate, theme]
  );

  useEffect(() => {
    changeState('isLoading', true);
    getAboutTypes()
      .then((res: any) => {
        if (res.Code === 210 && res.Data) {
          setAboutList(res.Data);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  // 筛选当前版本的数据
  // const getCurList = (v) => themesMap[theme].name === v;

  return (
    <CellGroup className='m-t-30'>
      {aboutList
        // .filter((it) => getCurList(it.Version)) // 接口去版本号
        .map((item, index) => (
          <Cell
            key={`${index}` || item.Id}
            title={item.Name}
            isDivider={index !== aboutList.length - 1}
            onClick={() => clickItem(item)}
          />
        ))}
    </CellGroup>
  );
}

export default About;
