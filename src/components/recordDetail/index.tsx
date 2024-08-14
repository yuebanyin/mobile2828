import { ReactNode } from 'react';
import './index.scss';

// type ClassNameProps = { className?: string };
// type UnknownProps = Record<string, unknown>;
// type ChildrenProps = { children?: ReactNode };
// type DefProps = ClassNameProps & UnknownProps & ChildrenProps;

// type SettingType = {
//   isHeader?: boolean;
//   divider?: boolean;
//   striped?: boolean;
// };

// type DataType<T> = {
//   data: T;
//   dataKeys?: (keyof T)[];
//   dataRowFlex?: number[];
// };

type RecordDetailProps<T> = {
  className?: string;
  isHeader?: boolean;
  divider?: boolean;
  striped?: boolean;
  data: T;
  dataKeys: (keyof T)[];
  dataRowFlex?: number[];
  children?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onItemClass?: (index, key) => string;
  // eslint-disable-next-line no-unused-vars
  onBuildItem?: (index, key, data) => ReactNode | string | number;
};

export const RecordDetail = (props: RecordDetailProps<Record<string, unknown>>) => {
  const {
 className, children, isHeader = false, striped = false, divider = false, 
 data, dataKeys = ['DateTime', 'Title', 'ChangeScore', 'Score'], dataRowFlex = [5, 4, 4, 5], onItemClass, onBuildItem, ...rest 
} = props;
  const res = dataKeys.map((el, i) => ({
    index: i,
    text: `${data[el]}`,
    flex: dataRowFlex[i],
    csn: onItemClass ? onItemClass(i, el) : '',
    view: onBuildItem ? onBuildItem(i, el, data) : `${data[el]}`,
  }));
  // 合并class样式
  const mergeClassName = () => {
    let csn = 'record-detail';
    if (className) csn += ` ${className}`;
    if (striped) csn += ' record-detail-striped';
    if (divider) csn += ' record-detail-divider';
    if (isHeader) csn += ' record-detail-header';
    return csn;
  };

  return (
    <div className={mergeClassName()} {...rest}>
      {res.map((r, i) => (
        <div key={`${i}` || r.text} className={`flex-${r.flex} ta-c`}>
          {r.view || r.text}
        </div>
      ))}
      {children}
    </div>
  );
};

export type RecordDetailCustomProps<T> = {
  className?: string;
  isHeader?: boolean;
  divider?: boolean;
  striped?: boolean;
  data: T;
  dataKeys: (keyof T)[];
  dataRowFlex?: number[];
  // eslint-disable-next-line no-unused-vars
  onItemClass?: (index: number, key: keyof T) => string;
  // eslint-disable-next-line no-unused-vars
  onBuildItem?: (index: number, key: keyof T, data: T) => ReactNode | string;
};


// export const RecordDetailCustom = <T extends Record<string, unknown>>(props: RecordDetailCustomProps<T>) => {
export const RecordDetailCustom = (props: RecordDetailCustomProps<Record<string, unknown>>) => {
  const {
 className, isHeader = false, striped = false, divider = false, data, dataKeys = ['DateTime', 'Title', 'ChangeScore', 'Score'], dataRowFlex = [5, 4, 4, 5], onItemClass, onBuildItem 
} = props;
  const res = dataKeys.map((el, i) => ({
    index: i,
    text: `${data[el]}`,
    flex: dataRowFlex[i],
    csn: onItemClass ? onItemClass(i, el) : '',
    view: onBuildItem(i, el, data) || `${data[el]}`,
  }));

  // 合并class样式
  const mergeClassName = () => {
    let csn = 'record-detail flex-n';
    if (className) csn += ` ${className}`;
    if (striped) csn += ' record-detail-striped';
    if (divider) csn += ' record-detail-divider';
    if (isHeader) csn += ' record-detail-header';
    return csn;
  };

  return (
    <div className={mergeClassName()}>
      {res.map((r, i) => (
        <div key={`${i}` || r.index} className={`ta-c flex-${r.flex} ${r.csn}`}>
          {r.view}
        </div>
      ))}
    </div>
  );
};
