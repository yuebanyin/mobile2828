/**
 *  Header 导航
 * @param iconType icon类型
 * @param className 组件类型
 * @param title 组件展示标题
 * @param children 组件传入子节点
 * @param type header的类型
 */
import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickNavigation from '@/pages/quickNavigation';
import { Icon } from '../icon';

import './index.scss';
import { Img } from '../img';
import { OutLink } from '../outLink';
import { useLanguage } from '@/hooks';
import { LanguageChange } from '../languageChange';

interface HeaderProps {
  iconType?: string;
  className?: string;
  iconClassName?: string;
  title?: string;
  titleKey?: string;
  type?: 'login' | 'register' | 'forgetPsw' | 'findPsw' | 'noSpot' | 'hSpot';
  autoClose?: Function;
}

interface RightNodeProps {
  onClick?: Function;
  type?: 'login' | 'register' | 'forgetPsw' | 'findPsw' | 'noSpot' | 'hSpot';
}

export const RightNode = (props: RightNodeProps) => {
  const { type } = props;

  let rightNode = null;
  if (type === 'noSpot') {
    rightNode = <div className='h-2 w-70 flex-1' />;
  } else if (type === 'register') {
    rightNode = (
      <div className='d-f ai-c flex-1 jc-end'>
        {/* <div>
          <Img src='/login/language.png' alt='' className='w-94 h-100' />
        </div> */}
        <LanguageChange />
      </div>
    );
  } else if (type === 'login' || type === 'forgetPsw' || type === 'findPsw') {
    rightNode = (
      <div className='d-f ai-c flex-1 jc-end'>
        <OutLink href='/serbusiness' className='m-r-30'>
          <Img src='/cuService/business.png' alt='' className='w-94 h-100' />
        </OutLink>
        <OutLink href='/serCenter'>
          <Img
            src='/cuService/service.png'
            alt=''
            className='w-94 h-100 m-r-30'
          />
        </OutLink>
        <LanguageChange />
      </div>
    );
  } else if (type === 'hSpot') {
    rightNode = <QuickNavigation />;
  }
  return rightNode;
};

export const Header = memo((props: HeaderProps) => {
  const {
    iconType = 'rect-left',
    className,
    iconClassName,
    type = 'noSpot',
    autoClose,
    titleKey,
    title,
  } = props;
  const { formatMsg } = useLanguage();
  const navigate = useNavigate();

  // 合并样式
  const mergeClassName = useMemo(() => {
    const clnObj = {
      boxCln: 'headerBox h-150 d-f ai-c jc-sb zi-large w-full',
      textColor: '',
    };
    if (
      type === 'login' ||
      type === 'register' ||
      type === 'forgetPsw' ||
      type === 'findPsw'
    ) {
      clnObj.boxCln = `${clnObj.boxCln} bg-body p-0-30`;
    } else {
      clnObj.boxCln = `${clnObj.boxCln} bg-gdt-top p-0-40`;
      clnObj.textColor = 'gaback-icon';
    }
    if (className) {
      return `h-150 d-f ai-c jc-sb zi-large w-full p-0-40 ${className}`;
    }
    return clnObj;
  }, [className, type]);

  // 点击返回上一页箭头
  const handleBackStep = () => {
    if (type === 'login') {
      navigate('/');
    } else if (autoClose) {
      autoClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={mergeClassName['boxCln'] || mergeClassName}>
      <div className='h-150 d-f ai-c flex-1'>
        <Icon
          name={iconType}
          className={`${mergeClassName['textColor']} w-80 t-h2 ${iconClassName}`}
          onClick={handleBackStep}
        />
      </div>
      <div className={`${mergeClassName['textColor']} t-h1 flex-1 ta-c`}>
        {formatMsg(titleKey) || title}
      </div>
      <RightNode type={type} />
    </div>
  );
});
