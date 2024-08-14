import {
 forwardRef, useCallback, useImperativeHandle, useState 
} from 'react';
import { ButtonDataType, ContentProps, ItemLayoutProps } from '../rules';
import { CMD_3202 } from '@/engine/game/pc/3202/CMD_3202';
import { Icon } from '@/components';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { CirRankBox } from './CirRankBox';
import { RadioGroup, RadioGroupRef } from '@/pages/gameComponents/radioGroup';
import { useRefs } from '@/hooks';

const ItemLayout = forwardRef<RadioGroupRef, ItemLayoutProps>((props, ref) => {
  const {
 data, gameMultiple, dyMultiple, onChange 
} = props;
  const { name, children } = data;
  const [show, setShow] = useState(true);

  const buildRadioItem = useCallback(
    (index: number) => {
      const {
 name, oddsKey, mainType, subType, number 
} = children[index];
      const dyOddsInfo = dyMultiple.find(({ AreaInfo }) => {
        const equalMainType = AreaInfo.cbBetMainType.value === mainType;
        const equalSubType = AreaInfo.cbBetSubType.value === subType;
        const numberList = AreaInfo.cbNumber.map((r) => r.value).filter((r) => r !== 255);
        if (numberList.length === 0) return equalMainType && equalSubType;
        const equalNumber = `${numberList}` === `${number}`;
        return equalMainType && equalSubType && equalNumber;
      });
      const odds = ((dyOddsInfo?.dwMultiple?.value || gameMultiple[oddsKey].value) * 1.0) / common.GOLD_RATIO;
      if (children.length === 14 && subType === CMD_3202.emSubBetTypeDingWei.SBTD_NUM) {
        // 数字球的可选项目为10，并且子下注类目是SBTD_NUM
        return (
          <div className='w-full h-102 d-f ai-c jc-c'>
            <CirRankBox className='m-r-30' num={name} />
            <span className='w-140 color-red'>{odds}</span>
          </div>
        );
      }
      return (
        <div className='w-full h-102 d-f ai-c jc-c'>
          <span className='w-140 m-r-15 ta-c'>{name}</span>
          <span className='w-140 color-red'>{odds}</span>
        </div>
      );
    },
    [gameMultiple, dyMultiple, children]
  );
  return (
    <>
      <div className='w-full p-20 bg-gray p-r d-f fd-r ai-c'>
        <div className='w-full ta-c'>{name}</div>
        <div className='p-a right-28' onClick={() => setShow(!show)}>
          {show ? <Icon className='t-h2' name='rect-up' /> : <Icon className='t-h2' name='rect-down' />}
        </div>
      </div>
      {show ? (
        <RadioGroup
          multiple
          ref={ref}
          length={children.length}
          onBuild={buildRadioItem}
          onChange={(i) => {
            const selectItems = [i].flat().map((i) => children[i]);
            if (onChange) onChange(selectItems);
          }}
        />
      ) : (
        <div className='h-24 bg-body'> </div>
      )}
    </>
  );
});

/**
 * 斯洛伐克幸运5-第一球/第二球/第三球/第四球/第五球
 */
export const BallPage = forwardRef<RadioGroupRef, ContentProps & { ball: ButtonDataType }>((props, ref) => {
  const {
 gameMultiple, dyMultiple, onChange, ball 
} = props;
  const { children } = ball;
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
    for (let index = 0; index < children.length; index += 1) {
      refs[index]?.onReset();
    }
  }
  useImperativeHandle<any, any>(ref, () => ({
    onReset: cleanSelectIds,
  }));
  return (
    <div className='o-y h-full'>
      {children.map((r, i) => (
        <ItemLayout ref={setRefs(i)} key={r.name} data={r} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={(res) => onChooseBet(r, res)} />
      ))}
      <div className='h-220' />
    </div>
  );
});
