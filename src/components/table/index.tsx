/**
 * TableProps
 * @param isHeaderBordered 是否展示表格头部边框
 * @param isBodyBordered 是否展示表格主体内容边框 （不展示两边边框）
 * @param isBodyBothBorder 是否展示表格主体内容边框 （展示两边边框）
 * @param isBodyTopBordered 是否展示表格主体内容边框
 * @param columns 表格列头数组
 * @param data 表格数据
 * @param showHeader 是否展示表格头部
 * @param showFooter 是否展示表格底部
 *
 * TableColumnProps
 * @param key 列的唯一标识
 * @param title 表格列头
 * @param align 表格对齐展示方式
 * @param sorter 表格数据排序
 * @param render 自定义单元格内容，优先级高
 */
import { ReactNode, memo, useCallback, useEffect, useState } from 'react';
import { BaseReactHtml, Obj } from '@/constants';
import { Empty } from '../empty';
import './index.scss';

export interface TableColumnProps {
  key: string;
  title: ReactNode;
  align?: 'l' | 'c' | 'r';
  sorter?: Function | boolean;
  render?: Function;
  tbClassName?: string;
  fixed?: boolean;
  titleKey?: string;
}

export interface FooterTableColumnProps {
  key?: string;
  title?: ReactNode;
  align?: 'l' | 'c' | 'r';
  sorter?: Function | boolean;
  tbClassName?: string;
  fixed?: boolean;
}

interface TableProps extends BaseReactHtml {
  columns: TableColumnProps[];
  footerColumns?: FooterTableColumnProps[];
  headerClassName?: string;
  footerClassName?: string;
  tbodyClassName?: string;
  data: Obj[];
  footerData?: [];
  isHeaderBordered?: boolean;
  isBodyTopBordered?: boolean;
  isBodyBordered?: boolean;
  isBodyBothBorder?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  onTrClick?: Function;
  showEmpty?: boolean;
  footer?: ReactNode;
}

export const Table = memo((props: TableProps) => {
  const {
    showHeader = true,
    data = [],
    columns = [],
    footerColumns = [],
    className,
    headerClassName,
    tbodyClassName,
    showEmpty = true,
    footerClassName,
    footerData = [],
    isHeaderBordered,
    isBodyBordered,
    isBodyBothBorder,
    isBodyTopBordered,
    showFooter,
    onTrClick,
    footer,
  } = props;
  const [curData, setCurData] = useState<Obj[]>(data);
  const [fData, setFData] = useState<[]>(footerData);

  // 如果外部传递过来的数据和当前的数据不一致，更新数据
  useEffect(() => {
    if (data && String(data) !== String(curData)) {
      setCurData(data);
    }
    if (showFooter) {
      if (footerData && String(footerData) !== String(fData)) {
        setFData(footerData);
      }
    }
  }, [curData, data, footerData, fData, showFooter]);

  // 表格头部的单元格样式
  const tdHeaderClassName = useCallback(
    (textAlign, tbClassName, fixed) => {
      let cs = `bx-table-td${isBodyBothBorder ? '-bd' : ''} oe ${
        fixed ? 'bx-table-td-fixed' : ''
      }`;
      if (isHeaderBordered) {
        cs = `${cs} b-1 bc-split`;
      }
      cs = `${cs} ${textAlign ? `ta-${textAlign}` : 'ta-c'}`;
      if (tbClassName) {
        cs = `${cs} ${tbClassName}`;
      }
      cs = `${cs} ${headerClassName || ''}`;
      return cs;
    },
    [headerClassName, isBodyBothBorder, isHeaderBordered]
  );

  // 表格底部的单元格样式
  const tdFooterClassName = useCallback(
    (textAlign, tbClassName, fixed) => {
      let cs = `bx-table-td${isBodyBothBorder ? '-bd' : ''} oe ${
        fixed ? 'bx-table-td-fixed' : ''
      }`;
      if (isHeaderBordered) {
        cs = `${cs} b-1 bc-split`;
      }
      cs = `${cs} ${textAlign ? `ta-${textAlign}` : 'ta-c'}`;
      if (tbClassName) {
        cs = `${cs} ${tbClassName}`;
      }
      cs = `${cs} ${footerClassName || ''}`;
      return cs;
    },
    [footerClassName, isBodyBothBorder, isHeaderBordered]
  );

  // 表格主体内容的单元格样式
  const tdBodyClassName = useCallback(
    (textAlign, tbClassName, fixed) => {
      let cs = `bx-table-td${isBodyBothBorder ? '-bd' : ''} ${
        fixed ? 'bx-table-td-fixed' : ''
      }`;
      if (isBodyBordered) {
        cs = `${cs} b-1 bc-split`;
      } else if (isBodyTopBordered) {
        cs = `${cs} b-t-1 bc-split`;
      }
      cs = `${cs} ${textAlign ? `ta-${textAlign}` : 'ta-c'}`;
      if (tbClassName) {
        cs = `${cs} ${tbClassName}`;
      }
      return cs;
    },
    [isBodyBothBorder, isBodyBordered, isBodyTopBordered]
  );

  // 表格头部
  const renderHeadCells = () =>
    columns.map((item) => (
      <span
        className={tdHeaderClassName(
          item?.align,
          item?.tbClassName,
          item?.fixed
        )}
        key={item.key}
        onClick={() => {}}
      >
        {item.title}
      </span>
    ));

  // 表格底部
  const renderFooterCells = () =>
    footerColumns.map((item, i) => (
      <span
        className={tdFooterClassName(
          item?.align,
          item?.tbClassName,
          item?.fixed
        )}
        key={i || item.key}
        onClick={() => {}}
      >
        <>{footerData ? footerData[i] : item.title}</>
      </span>
    ));

  // 渲染数据
  const renderBodyTds = (item: any) =>
    columns.map(({ key, render, align, tbClassName, fixed }) => (
      <span className={tdBodyClassName(align, tbClassName, fixed)} key={key}>
        {typeof item[key] === 'function' || typeof render === 'function' ? (
          <>{render ? render(item) : item[key](item)}</>
        ) : (
          item[key]
        )}
      </span>
    ));

  // 渲染数据 外层循环
  const renderBoyTrs = () => {
    if (Array.isArray(curData) && curData.length > 0) {
      return (
        <div className={`bx-table-body ${tbodyClassName}`}>
          {curData.map((item, index) => (
            <div
              onClick={() => {
                onTrClick && onTrClick(item, index);
              }}
              className='bx-table-tr'
              key={item.id || index}
            >
              {renderBodyTds(item)}
            </div>
          ))}
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      <div className={`bx-table ${className || ''}`}>
        {showHeader && (
          <div className='bx-table-header'>
            <div className='bx-table-tr '>{renderHeadCells()}</div>
          </div>
        )}
        {renderBoyTrs()}
        {showFooter && (
          <div className='bx-table-footer'>
            {footer || <div className='bx-table-tr'>{renderFooterCells()}</div>}
          </div>
        )}
      </div>
      {showEmpty ? <>{!curData || (curData.length === 0 && <Empty />)}</> : ''}
    </>
  );
});
