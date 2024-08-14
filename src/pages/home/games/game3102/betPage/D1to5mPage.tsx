import {
 forwardRef, useCallback, useImperativeHandle, useState 
} from 'react';
import { RadioGroupRef, RadioGroupWarp } from '@/pages/gameComponents/radioGroup';
import styles from '../index.module.scss';
import {
 d1to5Button, ButtonDataType, ContentProps, ItemLayoutProps 
} from '../rules';
import { useRefs } from '@/hooks';

const ItemLayout = forwardRef<RadioGroupRef, ItemLayoutProps>((props, ref) => {
  const {
 data, gameMultiple, dyMultiple, onChange 
} = props;
  const { name, children } = data;

  // FIXME 2023-06-16 15:44:28 前六项一行3份，后续都为一行5份。
  const onItemClass = useCallback((index: number) => `${styles['h-item-box']} ${styles[`w-pr-${index < 6 ? '3' : '5'}`]}`, []);

  return (
    <>
      <div className='w-full p-30 bg-gray p-r d-f'>{name}</div>
      <RadioGroupWarp
        className='p-l-30'
        multiple
        ref={ref}
        data={children}
        onItemClass={onItemClass}
        gameMultiple={gameMultiple}
        dyMultiple={dyMultiple}
        onChange={(i) => {
          const selectItems = [i].flat().map((i) => children[i]);
          if (onChange) onChange(selectItems);
        }}
      />
    </>
  );
});

/**
 * 幸运飞艇-1~5名
 */
export const D1to5mPage = forwardRef<RadioGroupRef, ContentProps>((props, ref) => {
  const { gameMultiple, dyMultiple, onChange } = props;
  const [mapList] = useState<Record<string, ButtonDataType[]>>({});
  const [refs, setRefs] = useRefs();
  const onChooseBet = useCallback(
    (r: ButtonDataType, list: ButtonDataType[]) => {
      console.log('🚀 ~ file: index.tsx:265 ~ onChooseBet:', r.name, list);
      mapList[r.name] = list;
      if (onChange) onChange([...Object.values(mapList)].flat());
    },
    [mapList, onChange]
  );
  function cleanSelectIds() {
    for (let index = 0; index < d1to5Button.length; index += 1) {
      refs[index]?.onReset();
    }
  }
  useImperativeHandle<any, any>(ref, () => ({
    onReset: cleanSelectIds,
  }));

  return (
    <div className='o-y h-full'>
      {d1to5Button.map((r, i) => (
        <ItemLayout ref={setRefs(i)} key={r.name} data={r} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={(res) => onChooseBet(r, res)} />
      ))}
      <div className='h-220 bg-main' />
    </div>
  );
});
