import { CSSProperties, ReactNode, } from 'react';
import './index.scss';

type StyleProps = { style?: CSSProperties };
type ClassNameProps = { className?: string };
type ChildrenProps = { children?: ReactNode };
type UnknownProps = Record<string, unknown>;
type DefProps = StyleProps & ClassNameProps & ChildrenProps & UnknownProps;

type SettingType = {};

type DataType = {
  title: string;
};

export type RecordDetailSubProps = DefProps & SettingType & DataType;

export const RecordDetailSub = (props: RecordDetailSubProps) => {
  const {
    title, children, className, ...rest
  } = props;
  return (
    <div className={`record-detail-sub ${className}`} {...rest}>
      <div className='flex-n p-0-52 wds-sm-title'>{title}</div>
      <div className='flex-1 p-0-52 flex flex-row flex-nowrap items-center justify-end'>{children}</div>
    </div>
  );
};
