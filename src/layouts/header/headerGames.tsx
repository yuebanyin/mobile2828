/**
 *  Header 导航
 * @param iconType icon类型 rect-left,close,triangle-down,triangle-up
 * @param className 组件类型
 * @param title 组件展示标题
 * @param houseText 组件展示标题游戏房间b
 * @param children 组件传入子节点
 * @param type header的类型
 */
import { memo, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuickNavigation from '@/pages/quickNavigation';
import { Icon } from '@/components';
import HeadGameMenu from './headGameMenu';
import styles from '../index.module.scss';
import { useLanguage } from '@/hooks';

interface HeaderProps {
  iconType?: string;
  className?: string;
  title?: string;
  houseText?: string;
  type?: 'close' | 'noSpot' | 'hSpot';
  autoClose?: Function;
}
interface RightNodeProps {
  onClick?: Function;
  type?: 'close' | 'noSpot' | 'hSpot';
}

export const RightNode = (props: RightNodeProps) => {
  const { type = 'hSpot' } = props;

  let rightNode = null;
  if (type === 'close' || type === 'noSpot') {
    rightNode = <div className='h-2 w-70' />;
  } else if (type === 'hSpot') {
    rightNode = (
      <div>
        <QuickNavigation spotColor='bg-body' />
      </div>
    );
  }
  return rightNode;
};

export const HeaderGames = memo((props: HeaderProps) => {
  const { formatMsg } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const {
    iconType = 'rect-left',
    className,
    title,
    houseText,
    type = 'hSpot',
    autoClose,
  } = props;

  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  // 经典彩游戏 路由名
  const classicPath = ['gameOption', 'classic', 'markSix'];
  const pathnames = pathname.split('/');
  const fatherPath = pathnames[pathnames.length - 1];
  console.log('fatherPath', fatherPath);

  // 合并样式
  const mergeClassName = useMemo(() => {
    const clnObj = {
      boxCln: `headerBox h-150 d-f ai-c jc-sb zi-large w-full ${styles['header-box']}`,
      textColor: '',
    };
    if (type) {
      clnObj.boxCln = `${clnObj.boxCln} bg-gdt-top p-0-40`;
      clnObj.textColor = `color-white ${styles['icon-color']}`;
    }
    if (className) {
      return `h-150 d-f ai-c jc-sb zi-large w-full p-0-40 ${className}`;
    }
    return clnObj;
  }, [className, type]);

  // 点击返回上一页箭头 // /home/gameOption?gameId=pc01
  const handleBackStep = () => {
    if (autoClose) {
      autoClose();
    } else if (classicPath.includes(fatherPath)) {
      // 经典彩游戏需要返回首页
      navigate('/home');
    } else if (fatherPath === 'pc28') {
      // pc28游戏需要返回房间选择页
      navigate(`/home/gameOption${search.split('&')[0]}`, { replace: true });
    } else {
      // 其他情况返回上一页
      navigate(-1);
    }
  };

  // 点击展示游戏选项的icon
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className={mergeClassName['boxCln'] || mergeClassName}>
        <div className='h-150 df-aic-jcc'>
          <Icon
            name={iconType}
            className={`${mergeClassName['textColor']} w-80 ${
              iconType === 'close' ? 't-40' : 't-h2'
            }`}
            onClick={handleBackStep}
          />
          <div className='t-39 color-white'>
            {iconType === 'close' ? formatMsg('onClose') : ''}
          </div>
        </div>
        <div className={`${mergeClassName['textColor']} ta-c`}>
          <div className='t-h1'>
            {title}
            <Icon
              className={`color-white va-b ${styles['icon-color']}`}
              name={`${showMenu ? 'triangle-up' : 'triangle-down'}`}
              onClick={handleShowMenu}
            />
          </div>
          <div className='t-small'>{houseText}</div>
        </div>
        <RightNode type={type} />
      </div>
      <HeadGameMenu
        className={`${showMenu ? 'd-b' : 'd-n'}`}
        handleChose={handleShowMenu}
      />
    </>
  );
});

