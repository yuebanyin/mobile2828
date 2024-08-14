/**
 * OutLink 跳转外部链接
 * @param href 要跳转的链接
 * @param children 子节点
 * @param type 跳转类型 -2 路由直接跳转 -1 外跳游戏页 3 活动页 2 其他外部连接 1 内跳（注意：后端给的不是路由，而是id) 默认是-2 路由直接跳转
 * @param target 跳转方式（是否打开新页签）
 * @param className 样式修改（优先使用这种方式)
 * @param style 行内样式修改
 * @param onClick 点击事件
 * @param id 主要用于游戏id接收
 */
import { ReactNode, useCallback } from 'react';
// import { useNavigate, NavigateOptions } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { NavigateOptions } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { linkType, noSignAceRouter, ykIceR } from '@/constants';
import { getActiveDetail, getPlatformGameUrl } from '@/services';
import { useUserInfoStore } from '@/mobx';
import { toastText } from '../toast';
import { useNavigation } from '@/hooks';

export interface OutLinkProps {
  href: string;
  children: ReactNode;
  routeOptions?: NavigateOptions;
  type?: 1 | 2 | 3 | -1 | -2 | number;
  className?: string;
  style?: Record<string, any>;
  onClick?: Function;
  id?: number | string;
  target?: '_self' | '_top' | '_blank' | '_parent' | '';
  onTouchStart?: any;
}

export const OutLink = observer((props: OutLinkProps) => {
  const {
    href,
    type = -2,
    id,
    target = '_blank',
    children,
    className = '',
    onClick,
    routeOptions,
    ...rest
  } = props;
  const { token, isVisitor } = useUserInfoStore();
  const navigate = useNavigation();
  const { t } = useTranslation();
  // 外跳
  const outlint = useCallback(
    (type) => {
      if (type === linkType.out) {
        if (target === '_self') {
          window.location.href = href;
        } else {
          const w = window.open(`about:${target}`);
          if (w) w.location.href = href;
        }
        // 如果外部传入了点击事件，放在最后执行
        if (typeof onClick === 'function') {
          onClick();
        }
      } else if (type === linkType.act) {
        getActiveDetail({ id })
          .then((res: any) => {
            if (res?.Data?.Url) {
              if (target === '_self') {
                window.location.href = res?.Data?.Url;
              } else {
                const w = window.open(`about:${target}`);
                if (w) w.location.href = res?.Data?.Url;
              }
              // 如果外部传入了点击事件，放在最后执行
              if (typeof onClick === 'function') {
                onClick();
              }
            }
          })
          .catch((error) => console.log(error));
      } else {
        getPlatformGameUrl({ platformId: id })
          .then((res: any) => {
            if (res?.Data?.Url) {
              if (target === '_self') {
                window.location.href = res?.Data?.Url;
              } else {
                const w = window.open(`about:${target}`);
                if (w) w.location.href = res?.Data?.Url;
              }
              // 如果外部传入了点击事件，放在最后执行
              if (typeof onClick === 'function') {
                onClick();
              }
            }
          })
          .catch((error) => console.log(error));
      }
    },
    [href, id, target, onClick]
  );

  // 内跳路由
  const innerlint = useCallback(() => {
    navigate(href, routeOptions);
    // 如果外部传入了点击事件，放在最后执行
    if (typeof onClick === 'function') {
      onClick();
    }
  }, [href, navigate, onClick, routeOptions]);

  // 内跳：根据后端api返回数据，进行项目内链跳转
  const innerApiLint = useCallback(
    (linkType?) => {
      if (linkType === 1) {
        // linkType 1 时的跳转
        switch (id) {
          case 1:
            navigate('/chatroom');
            break;
          case 2:
            break;
          case 3:
            navigate('/recharge');
            break;
          case 4:
            navigate('/mine/yueBao');
            break;
          case 5:
            navigate('/mine/earnMoney');
            break;
          default:
            break;
        }
      } else if (linkType === 3) {
        // 优惠活动详情页
        navigate(`/preferential/detail?id=${id}`);
      }
    },
    [id, navigate]
  );

  // 点击事件
  const handleClick = useCallback(
    (e) => {
      if (!href && !id) return;
      if (!token && !noSignAceRouter.test(href)) {
        // 未登录的路由权限
        navigate('/login', routeOptions);
        return;
      }
      if (isVisitor && ykIceR.test(href)) {
        // 试玩登录
        // toastText(ykNRTip);
        toastText(`${t('officialLogin')}`);
        return;
      }
      // 阻止默认事件
      e?.preventDefault();
      //阻止时间冒泡
      e?.stopPropagation();
      switch (type) {
        case linkType.out:
          // 直接外跳
          outlint(linkType.out);
          break;
        case linkType.inner:
          // 内跳（根据id判断跳哪里）
          innerApiLint(linkType.inner);
          break;
        case linkType.act:
          // 优惠活动页
          innerApiLint(linkType.act);
          break;
        case linkType.game:
          // 游戏类跳转
          outlint(linkType.game);
          break;
        case linkType.route:
          // 内部路由直跳
          innerlint();
          break;
        default:
          break;
      }
    },
    [
      href,
      id,
      token,
      type,
      navigate,
      routeOptions,
      outlint,
      innerlint,
      isVisitor,
      innerApiLint,
      t,
    ]
  );

  return (
    <div className={`${className}`} onClick={handleClick} {...rest}>
      {children}
    </div>
  );
});
