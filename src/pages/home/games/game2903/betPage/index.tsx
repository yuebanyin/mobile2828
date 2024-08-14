import {
  forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState
} from 'react';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import styles from '../index.module.scss';
import { DWORD } from '@/engine/base/basetype';
import { isArray } from '@/utils/tools';
import { getMultipleData } from '../rules';

// 赔率节点
export const MutileItem = memo((props: { mutile: Array<DWORD>, multType }) => (
  <div className='m-t-20 wds-sm-con color-red font-w-bolder'>
    {props.mutile[props.multType].value / (common.GOLD_RATIO * 1.0)}
  </div>
));

// 赔率节点
export const MutileItemEx = memo((props: { dwNormalMultiple, dwSpecialMultiple?}) => {
  const { dwNormalMultiple, dwSpecialMultiple } = props;

  const tempVal = useMemo(() => {
    if (dwSpecialMultiple) {
      return `${dwNormalMultiple / (common.GOLD_RATIO * 1.0)}/${dwSpecialMultiple / (common.GOLD_RATIO * 1.0)}`;
    }
    return `${dwNormalMultiple / (common.GOLD_RATIO * 1.0)}`;
  }, [dwNormalMultiple, dwSpecialMultiple]);


  return (
    <div className='m-t-20 wds-sm-con color-red font-w-bolder'>
      {tempVal}
    </div>
  );
});


// 带描述赔率节点
export const MutileItemDesc = memo((props: { desc, mutile: Array<DWORD>, multType?, isShowMultType?, isShowSymbol?: boolean }) => (
  <div className='m-t-20 wds-sm-con font-w-bolder'>
    <div className='df-aic-jcc'>
      <div className='color-primary-text'>
        {props.desc}
      </div>
      <div className='color-red m-l-20'>
        <span>
          {props.isShowMultType && props.isShowSymbol ? '@' : ''}
          {props.isShowMultType ? props.mutile[props.multType].value / (common.GOLD_RATIO * 1.0) : ''}
        </span>
      </div>
    </div>
  </div>
));

export const MutileItemDescEx = memo((props: { desc, dwNormalMultiple, isShowMultType?, isShowSymbol?: boolean }) => {
  const {
    desc, dwNormalMultiple, isShowMultType, isShowSymbol = false
  } = props;
  return (
    <div className='m-t-20 wds-sm-con font-w-bolder'>
      <div className='df-aic-jcc'>
        <div className='color-primary-text'>
          {desc}
        </div>
        <div className='color-red m-l-20'>
          <span>
            {isShowMultType && isShowSymbol ? '@' : ''}
            {isShowMultType ? dwNormalMultiple / (common.GOLD_RATIO * 1.0) : ''}
          </span>
        </div>
      </div>
    </div>
  );
});

// 数字按钮页面
export const NumberWay = memo((props: { title, numlist, mutile: Array<DWORD>, multType, onChange?, data?}) => {
  const {
    title, numlist, mutile, multType, onChange, data
  } = props;

  return (
    <>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        {title}
      </div>
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        {numlist.map((item, i) => (
          <NumberButton
            index={i}
            key={i || item}
            isActive={item.active}
            className='m-l-20 m-t-30'
            title={item.value || item}
            bottomTitle={<MutileItem mutile={mutile} multType={multType} />}
            onChange={onChange}
            data={data}
          />
        ))}
      </div>
    </>
  );
});

// 半波
export const ColorWay = memo((props: { index, title?, desc, numlist, mutile: Array<DWORD>, multType, onChange?, data?}) => {
  const {
    index, title, desc, numlist, mutile, multType, onChange, data
  } = props;
  return (
    <>
      {title ? (
        <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
          {title}
        </div>
      ) : ''}
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        <NumberButton
          index={index}
          size='large'
          className='m-0-20 m-t-30'
          title={numlist.value}
          isActive={numlist.active}
          bottomTitle={<MutileItemDesc desc={desc} mutile={mutile} multType={multType} isShowMultType isShowSymbol />}
          onChange={onChange}
          data={data}
        />
      </div>
    </>
  );
});


//生肖数值
const animalsArrayNum = [
  [1, 13, 25, 37, 49],
  [12, 24, 36, 48],
  [11, 23, 35, 47],
  [10, 22, 34, 46],
  [9, 21, 33, 45],
  [8, 20, 32, 44],
  [7, 19, 31, 43],
  [6, 18, 30, 42],
  [5, 17, 29, 41],
  [4, 16, 28, 40],
  [3, 15, 27, 39],
  [2, 14, 26, 38],
];


const sxlist = [
  {
    id: 0,
    name: '鼠',
    numlist: [],
    active: false,
  },
  {
    id: 1,
    name: '牛',
    numlist: [],
    active: false,
  },
  {
    id: 2,
    name: '虎',
    numlist: [],
    active: false,
  },
  {
    id: 3,
    name: '兔',
    numlist: [],
    active: false,
  },
  {
    id: 4,
    name: '龙',
    numlist: [],
    active: false,
  },
  {
    id: 5,
    name: '蛇',
    numlist: [],
    active: false,
  },
  {
    id: 6,
    name: '马',
    numlist: [],
    active: false,
  },
  {
    id: 7,
    name: '羊',
    numlist: [],
    active: false,
  },
  {
    id: 8,
    name: '猴',
    numlist: [],
    active: false,
  },
  {
    id: 9,
    name: '鸡',
    numlist: [],
    active: false,
  },
  {
    id: 10,
    name: '狗',
    numlist: [],
    active: false,
  },
  {
    id: 11,
    name: '猪',
    numlist: [],
    active: false,
  },
];


const getAnimalsBlockType = (id: any, currentRadioId?: number, currentRadioIdEx?: number, curXiao?: number) => {
  if (currentRadioId === 0) { ///中
    if (currentRadioIdEx === 0) { //二连肖
      if (id === curXiao) {
        return CMD_2903.emMultipleType.MT_SXL_ZHONG_2_BEN;
      }
      return CMD_2903.emMultipleType.MT_SXL_ZHONG_2;
    } if (currentRadioIdEx === 1) { //三连肖
      if (id === curXiao) {
        return CMD_2903.emMultipleType.MT_SXL_ZHONG_3_BEN;
      }
      return CMD_2903.emMultipleType.MT_SXL_ZHONG_3;
    } if (currentRadioIdEx === 2) {
      if (id === curXiao) {
        return CMD_2903.emMultipleType.MT_SXL_ZHONG_4_BEN;
      }
      return CMD_2903.emMultipleType.MT_SXL_ZHONG_4;
    } if (currentRadioIdEx === 3) {
      if (id === curXiao) {
        return CMD_2903.emMultipleType.MT_SXL_ZHONG_5_BEN;
      }
      return CMD_2903.emMultipleType.MT_SXL_ZHONG_5;
    }
  } else if (currentRadioId === 1) { //buzhong
    if (currentRadioIdEx === 0) { //二连肖
      if (id === curXiao) {
        return CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_2_BEN;
      }
      return CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_2;
    } if (currentRadioIdEx === 1) { //三连肖
      if (id === curXiao) {
        return CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_3_BEN;
      }
      return CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_3;
    } if (currentRadioIdEx === 2) {
      if (id === curXiao) {
        return CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_4_BEN;
      }
      return CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_4;
    } if (currentRadioIdEx === 3) {
      if (id === curXiao) {
        return CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_5_BEN;
      }
      return CMD_2903.emMultipleType.MT_SXL_BU_ZHONG_5;
    }
  }
  return CMD_2903.emMultipleType.MT_INVALID;
};

const getAnimalsMultype = (id: any, cbBetMainType: CMD_2903.emBetMainType, currentRadioId?: number, currentRadioIdEx?: number, curXiao?: number) => {
  switch (id) {
    case 0:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_SHU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_SHU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 1:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_NIU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_NIU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 2:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_HU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_HU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 3:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_TU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_TU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 4:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_LONG;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_LONG;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 5:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_SHE;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_SHE;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 6:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_MA;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_MA;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 7:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_YANG;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_YANG;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 8:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_HOU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_HOU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 9:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_ZI;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_ZI;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 10:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_GOU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_GOU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    case 11:
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
        return CMD_2903.emMultipleType.MT_TX_ZHU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
        return CMD_2903.emMultipleType.MT_YX_ZHU;
      }
      if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { ///生肖连
        return getAnimalsBlockType(id, currentRadioId, currentRadioIdEx, curXiao);
      }
      return CMD_2903.emMultipleType.MT_INVALID;
    default:
      return CMD_2903.emMultipleType.MT_INVALID;
  }
};

const getAnimalsData = (id: any, cbBetMainType: CMD_2903.emBetMainType) => {
  if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) {
    return {
      cbBetMainType, id,
    };
  }
  switch (id) {
    case 0:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_SHU, id };
    case 1:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_NIU, id };
    case 2:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_HU, id };
    case 3:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_TU, id };
    case 4:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_LONG, id };
    case 5:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_SHE, id };
    case 6:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_MA, id };
    case 7:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_YANG, id };
    case 8:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_HOU, id };
    case 9:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_JI, id };
    case 10:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_GOU, id };
    case 11:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_ZHU, id };
    default:
      return { cbBetMainType, cbBetSubType: CMD_2903.emXiaoType.XT_INVALID, id };
  }
};


const getIsShowMultType = (id: any, cbBetMainType: CMD_2903.emBetMainType, currentRadioId?: number, currentRadioIdEx?: number, curXiao?: number) => {
  const tempVal = getAnimalsMultype(id, cbBetMainType, currentRadioId, currentRadioIdEx, curXiao);
  if (tempVal === CMD_2903.emMultipleType.MT_INVALID) {
    return false;
  }
  return true;
};

// 生肖列表
export const SxList = forwardRef((props: { title?, mutile: Array<DWORD>, onChange?, cbBetMainType, curXiao, currentRadioId?, currentRadioIdEx?, hxAreaIndex?, dynamicList: Array<any> }, ref) => {
  const {
    title, mutile, onChange, cbBetMainType, curXiao, currentRadioId, currentRadioIdEx, hxAreaIndex, dynamicList
  } = props;

  const selectNumIndex = useRef([]);
  const [numlistEx, setNumlistEx] = useState<Array<any>>(sxlist);
  const numEx = useRef(sxlist);

  const onResetData = () => {
    for (let i = 0; i < selectNumIndex.current.length; i += 1) {
      numEx.current[selectNumIndex.current[i]].active = false;
    }
    setNumlistEx([...numEx.current]);
    selectNumIndex.current = [];
  };

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));

  const setHxAreaIndex = useCallback(() => {
    console.log(22222, hxAreaIndex);
    if (isArray(hxAreaIndex) && hxAreaIndex.length > 0) {
      console.log('🚀 ~ file: index.tsx:449 ~ useEffect ~ hxAreaIndex:', hxAreaIndex);
      onResetData();
      for (let i = 0; i < hxAreaIndex.length; i += 1) {
        for (let index = 0; index < numEx.current.length; index += 1) {
          if (numEx.current[index].id === hxAreaIndex[i]) {
            numEx.current[index].active = true;
            const item = getAnimalsData(numEx.current[index].id, cbBetMainType);
            console.log(22222, item);
            selectNumIndex.current.push(index);
            // onChange(true, '', '', item);
          }
        }
      }
      setNumlistEx([...numEx.current]);
    }
  }, [hxAreaIndex, cbBetMainType]);

  useEffect(() => {
    if (numEx.current.length === 0) {
      numEx.current = sxlist;
      setNumlistEx([...numEx.current]);
    }
    setHxAreaIndex();
  }, [setHxAreaIndex]);


  const getAnimalsNum = () => {
    for (let i = 0; i < sxlist.length; i += 1) {
      let nIndex = i - curXiao;
      if (nIndex < 0) nIndex = sxlist.length + nIndex;
      sxlist[i]['numlist'] = animalsArrayNum[nIndex];
    }
    return sxlist;
  };
  getAnimalsNum();


  const onNumBtnHandleClick = useCallback((isActive, _title, _bottomTitle, data, index) => {
    if (isActive) {
      selectNumIndex.current.push(index);
      numEx.current[index].active = true;
      setNumlistEx([...numEx.current]);
    }
    onChange(isActive, _title, _bottomTitle, data);
    return true;
  }, [onChange]);


  return (
    <div className='o-y h-full'>
      {title ? (
        <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
          {title}
        </div>
      ) : ''}
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        {numlistEx.map((item, i) => {
          let itemValue = { dwNormalMultiple: 0, dwSpecialMultiple: 0, value: item['id'] };
          if (cbBetMainType !== CMD_2903.emBetMainType.BTM_HE_XIAO) {
            itemValue = getMultipleData(item['id'], getAnimalsMultype(item.id, cbBetMainType, currentRadioId, currentRadioIdEx, curXiao), false,
            cbBetMainType, getAnimalsData(item.id, cbBetMainType).cbBetSubType, mutile, dynamicList, curXiao);
          }
          
          return (
            <NumberButton
              index={i}
              key={item.id || i}
              size='middle'
              className='m-l-20 m-t-30'
              title={item.numlist}
              isActive={item.active}
              bottomTitle={(
                <MutileItemDescEx
                  desc={item.name}
                  dwNormalMultiple={itemValue.dwNormalMultiple}
                  isShowMultType={getIsShowMultType(item.id, cbBetMainType, currentRadioId, currentRadioIdEx, curXiao)}
                  isShowSymbol
                />
              )}
              onChange={onNumBtnHandleClick}
              // data={getAnimalsData(item.id, cbBetMainType)}
              data={{ cbBetMainType, cbBetSubType: getAnimalsData(item.id, cbBetMainType).cbBetSubType, value: itemValue }}
            />
          );
        })}
      </div>
    </div>
  );
});


