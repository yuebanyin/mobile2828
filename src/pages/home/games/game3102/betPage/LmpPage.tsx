import {
 forwardRef, useCallback, useImperativeHandle, useState 
} from 'react';
import { RadioGroupRef, RadioGroupWarp } from '@/pages/gameComponents/radioGroup';
import styles from '../index.module.scss';
import {
 ButtonDataType, ContentProps, ItemLayoutProps, lmButton 
} from '../rules';
import { useRefs } from '@/hooks';

const ItemLayout = forwardRef<RadioGroupRef, ItemLayoutProps>((props, ref) => {
  const {
 data, gameMultiple, dyMultiple, onChange 
} = props;
  const { name, children } = data;
  // FIXME 2023-06-16 15:37:54 两面盘都是总数4时按3折行,总数6时按3折行
  const onItemClass = useCallback(() => `${styles['h-item-box']} ${styles[`w-pr-${children.length > 5 ? '3' : '4'}`]}`, [children]);
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
 * 幸运飞艇-两面盘
 */
export const LmpPage = forwardRef<RadioGroupRef, ContentProps>((props, ref) => {
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
    for (let index = 0; index < lmButton.length; index += 1) {
      refs[index]?.onReset();
    }
  }
  useImperativeHandle<any, any>(ref, () => ({
    onReset: cleanSelectIds,
  }));

  return (
    <div className='o-y h-full'>
      {lmButton.map((r, i) => (
        <ItemLayout ref={setRefs(i)} key={r.name} data={r} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={(res) => onChooseBet(r, res)} />
      ))}
      <div className='h-220 bg-main' />
    </div>
  );
});
