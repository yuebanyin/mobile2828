/**
 * ExpandMenu 下拉选项组件
 * @param text 选项项标题
 * @param children
 * @param className 需要修改样式可传其他样式来覆盖
 * @param onClick 点击事件
 * @param style 按钮的style样式 不建议使用
 */

import {
 memo, ReactNode, useEffect, useState 
} from 'react';
import { rechargeData, styleOptions } from '@/constants';
import { Icon } from '../icon';
import './index.scss';

interface ExpandMenuProps {
  dataList?: any[];
  children?: ReactNode;
  className?: string;
  onClick?: Function;
  prefix?: ReactNode;
  style?: Record<string, string>;
}

export const ExpandMenu = memo((props: ExpandMenuProps) => {
  const { dataList = rechargeData } = props;
  const [optionList, setOptionList] = useState([]);

  const handlePick = (item) => {
    console.log(item);
  };
  useEffect(() => {
    setOptionList(styleOptions);
  }, []);

  return (
    <>
      <div className='titleBox'>
        {dataList.map((item) => (
          <div className='titleItem' onClick={(item) => handlePick(item)}>
            {item.text}
            <Icon className='arrowIcon' name='rect-down' />
          </div>
        ))}
      </div>
      <div className='expandBox'>
        {optionList.map((it) => (
          <div className='item wds-sm-title'>
            {it.text}
            <Icon className='pickIcon' name='checklist' />
          </div>
        ))}
      </div>
    </>
  );
});
