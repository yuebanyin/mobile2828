import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  memo,
} from 'react';
import { Popup } from '../popup';
import PickerBody from './PickerBody';
import { useLanguage, useRefs } from '@/hooks';

export interface PickerOption {
  text: string | number;
  value: string | number;
  disabled?: string;
  children?: PickerOption[];
  className?: string | number;
}
export interface PickerProps {
  listData: (PickerOption | PickerOption[])[];
  sourceNode?: ReactNode | Function;
  visible?: boolean;
  title?: string;
  defaultValueData?: (number | string)[];
  className?: '';
  style?: React.CSSProperties;
  threeDimensional?: boolean;
  swipeDuration?: number | string;
  onConfirm?: Function;
  onClose?: Function;
  onCloseUpdate?: Function;
  onChange?: Function;
  sourceNodeCls?: string;
  // onConfirm?: (selectedValue: (string | number)[], selectedOptions: PickerOption[]) => void;
  // onClose?: (selectedValue: (string | number)[], selectedOptions: PickerOption[]) => void;
  // onCloseUpdate?: (selectedValue: (string | number)[], list: PickerOption[], pickerRef: RefObject<HTMLDivElement>) => void;
  // onChange?: (index: number, value: (string | number)[], selectedOptions: PickerOption[]) => void;
}

// 级联数据格式化
const formatCascade = (
  columns: PickerOption[],
  defaultValues: (number | string)[]
) => {
  const formatted: PickerOption[][] = [];
  let cursor: PickerOption = {
    text: '',
    value: '',
    children: columns,
  };

  let columnIndex = 0;

  while (cursor && cursor.children) {
    const options: PickerOption[] = cursor.children;
    const value = defaultValues[columnIndex];
    let index = options.findIndex((columnItem) => columnItem.value === value);
    if (index === -1) index = 0;
    cursor = cursor.children[index];

    columnIndex += 1;
    formatted.push(options);
  }

  return formatted;
};

// 每一列的类型
const columnsType = (data = []) => {
  const firstColumn: PickerOption | PickerOption[] = data[0];
  if (firstColumn) {
    if (Array.isArray(firstColumn)) {
      return 'multiple';
    }
    if ('children' in firstColumn) {
      return 'cascade';
    }
  }
  return 'single';
};

const InternalPicker = (props: Partial<PickerProps> & { value?: any }) => {
  const {
    visible,
    title,
    listData = [],
    defaultValueData,
    onConfirm,
    onClose,
    onCloseUpdate,
    onChange,
    className,
    style,
    threeDimensional,
    swipeDuration,
    value,
    sourceNode,
    sourceNodeCls,
    ...rest
  } = props;
  const { formatMsg } = useLanguage();

  // 选择的数据的 value 值, 每一条数据的 value 值
  const [chooseValueData, setchooseValueData] = useState<
    Array<string | number>
  >([]);
  // 选中列
  const [columnIndex, setcolumnIndex] = useState<number>(0);
  const pickerRef = useRef<any>(null);
  const [refs, setRefs] = useRefs();
  // 格式化后每一列的数据
  const [columnsList, setColumnsList] = useState<PickerOption[][]>([]);

  const isConfirmEvent = useRef(false);
  const popupRef = useRef<any>(null);

  const selectedOptions = useCallback(() => {
    const optins: PickerOption[] = [];
    columnsList.map((column: PickerOption[], index: number) => {
      let currOptions = [];
      currOptions = column.filter(
        (item) => item.value === chooseValueData[index]
      );
      if (currOptions[0]) {
        optins.push(currOptions[0]);
      } else {
        column[0] && optins.push(column[0]);
      }

      return column;
    });

    return optins;
  }, [chooseValueData, columnsList]);

  // 传入的数据格式化
  const normalListData = useCallback(() => {
    const type = columnsType(listData);

    switch (type) {
      case 'multiple':
        return listData;
      case 'cascade':
        // 级联数据处理
        return formatCascade(listData as PickerOption[], chooseValueData);
      default:
        return [listData];
    }
  }, [listData, chooseValueData]);

  // 默认值修改
  useEffect(() => {
    if (defaultValueData && defaultValueData.length !== 0) {
      const data = [...defaultValueData];
      console.log({ data });
      setchooseValueData(data);
      // setColumnsList(normalListData() as PickerOption[][]);
    }
  }, [defaultValueData]);

  // form 表单直接修改值
  useEffect(() => {
    if (value && Array.isArray(value)) {
      const valueData = value
        .map((it) => {
          if (typeof it.value === 'number') {
            return it.value;
          }
          return null;
        })
        .filter((it) => it);
      if (valueData.length > 0) {
        setchooseValueData([...valueData]);
      }
    }
  }, [value]);

  // 选中值进行修改
  useEffect(() => {
    onChange && onChange(columnIndex, chooseValueData, selectedOptions());
    if (isConfirmEvent.current) {
      isConfirmEvent.current = false;
      onConfirm && onConfirm(chooseValueData, selectedOptions());
    }
  }, [chooseValueData, columnIndex, onChange, onConfirm, selectedOptions]);

  // 列表格式修改
  useEffect(() => {
    const data: (string | number)[] = [];

    const normalData: PickerOption[][] = normalListData() as PickerOption[][];

    setColumnsList(normalData);

    normalData.length > 0 &&
      normalData.map((item) => {
        item[0] && data.push(item[0].value);
        return item;
      });

    if (!defaultValueData && chooseValueData.length === 0) {
      setchooseValueData([...data]);
    }
  }, [chooseValueData.length, defaultValueData, listData, normalListData]);

  const closeActionSheet = () => {
    onClose && onClose(chooseValueData, selectedOptions());
    onCloseUpdate &&
      onCloseUpdate(chooseValueData, selectedOptions(), pickerRef);
  };

  // 点击确定
  const confirm = () => {
    let movings = false;
    refs.forEach((_ref: any) => {
      if (_ref.moving) movings = true;
      _ref.stopMomentum();
    });

    if (movings) {
      isConfirmEvent.current = true;
    } else {
      onConfirm && onConfirm(chooseValueData, selectedOptions());
    }

    onClose && onClose(chooseValueData, selectedOptions());
    popupRef?.current?.onClose();
    setTimeout(() => {
      isConfirmEvent.current = false;
    }, 0);
  };

  // 选择每一列的数据
  const chooseItem = (option: PickerOption, columnIndex: number) => {
    if (option && Object.keys(option).length) {
      // 是否移动后是否与之前有差异
      if (chooseValueData[columnIndex] !== option.value) {
        if (columnsType(listData) === 'cascade') {
          chooseValueData[columnIndex] = option.value ? option.value : '';
          setchooseValueData([...chooseValueData]);

          let index = columnIndex;
          let cursor = option;
          while (cursor && cursor.children && cursor.children[0]) {
            chooseValueData[index + 1] = cursor.children[0].value;
            setchooseValueData([...chooseValueData]);
            index += 1;
            const cc = cursor.children[0];
            cursor = cc;
          }
          // 当前改变列的下一列 children 值为空
          if (cursor && cursor.children) {
            chooseValueData[index + 1] = '';
            setchooseValueData([...chooseValueData]);
          }

          setColumnsList(normalListData() as PickerOption[][]);
        } else {
          setchooseValueData((data) => {
            const cdata = [...data];
            cdata[columnIndex] = Object.prototype.hasOwnProperty.call(
              option,
              'value'
            )
              ? option.value
              : '';
            return cdata;
          });
        }
        setcolumnIndex(columnIndex);
      }
    }
  };

  const handleClose = () => {
    popupRef?.current?.onClose();
    closeActionSheet();
  };

  const renderToolbar = () => (
    <div className='d-f ai-c jc-sb wds-sm-title'>
      <span className='p-50' onClick={handleClose}>
        {formatMsg('cancel')}
      </span>
      <div>{title || ''}</div>
      <span className='color-primary p-50' onClick={confirm}>
        {formatMsg('determine')}
      </span>
    </div>
  );

  return (
    <Popup
      isTitle={false}
      direction='bottom'
      sourceNode={sourceNode}
      sourceNodeCls={`d-f flex-1 o-none ${sourceNodeCls}`}
      ref={popupRef}
      isScroll={false}
      onClose={() => {
        closeActionSheet();
      }}
    >
      <div
        className={`${className || 'd-f fd-c h-full'}`}
        style={style}
        {...rest}
      >
        {renderToolbar()}
        <div className='flex-1 d-f ai-c p-0-100' ref={pickerRef}>
          {columnsList?.map((item, index) => (
            <PickerBody
              ref={setRefs(index)}
              defaultValue={chooseValueData?.[index]}
              listData={item}
              threeDimensional={threeDimensional}
              chooseItem={(value: PickerOption, index: number) =>
                chooseItem(value, index)
              }
              swipeDuration={swipeDuration}
              key={index || JSON.stringify(item)}
              keyIndex={index}
            />
          ))}
        </div>
      </div>
    </Popup>
  );
};

const Picker = memo(InternalPicker);
export default Picker;
