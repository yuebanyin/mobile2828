/**
 * Dialog 弹窗
 * @param sourceNode 触发弹窗打开的节点
 * @param children 弹窗展示的主题内容
 * @param onClose 关闭弹窗（其他的自定义事件，不支持异步）默认无
 * @param onOk 点击确认的事件 默认无
 * @param okText 按钮的文字 默认 ‘确认’
 * @param okBtnIsPromise 默认的确认按钮是否是异步事件 默认false
 * @param title 弹窗的标题，目前仅支持字符串默认空
 * @param autoFooter 支持自定义底部 默认空
 * @param isShowOkBtn 控制是否展示默认的确认按钮 默认true
 * @param defaultVisible 默认展示还是隐藏
 * @param bodyClassname 弹窗主体样式
 * @param btnName 权限控制使用
 */
import {
 ReactNode, useCallback, useMemo, useState, useImperativeHandle, forwardRef, memo, useEffect, FC 
} from 'react';
import { Icon } from '../icon';
import { Button } from '../button';
import confirm, { ConfirmProps } from './Confirm';
import { useLimitDialog, useLanguage } from '@/hooks';
import './index.scss';

export interface DialogProps {
  children: ReactNode;
  sourceNode?: ReactNode;
  isTitle?: boolean;
  onClose?: Function;
  onOk?: Function;
  okText?: string;
  okBtnIsPromise?: boolean;
  title?: ReactNode;
  autoFooter?: ReactNode;
  isFooter?: boolean;
  isShowOkBtn?: boolean;
  onlyConfirm?: boolean;
  defaultVisible?: boolean;
  visible?: boolean;
  bodyClassname?: string;
  ref?: any;
  openCB?: Function;
  contentCls?: string;
  btnName?: string;
  navigation?: Function;
  isMask?: boolean;
}

type FooterBtnProps = Pick<DialogProps, 'autoFooter' | 'okBtnIsPromise' | 'okText' | 'onClose' | 'isShowOkBtn' | 'onlyConfirm' | 'isFooter'> & { handleOk: Function };

const FooterBtn = memo((props: FooterBtnProps) => {
  const {
 autoFooter, okBtnIsPromise, okText, onClose, handleOk, isShowOkBtn, onlyConfirm, isFooter 
} = props;

const { formatMsg } = useLanguage();

  if (!isFooter) return <></>;

  // 自定义底部
  if (autoFooter) {
    return <>{autoFooter}</>;
  }

  if (isShowOkBtn) {
    // 只展示确认按钮
    if (onlyConfirm) {
      return (
        <div className='bx-dialog-footer d-f ai-c m-30-0'>
          <Button className='bx-dialog-confirm' isPromise={okBtnIsPromise} onClick={handleOk}>
            {okText}
          </Button>
        </div>
      );
    }
    return (
      <div className='d-f ai-c jc-sb flex-1 b-t-1 bc-split'>
        <Button onClick={onClose} className='color-con-ass b-r-1 bc-split br-b-l-30 br-0' size='middle' type='link'>
          {formatMsg('cancel')}
        </Button>
        <Button type='link' size='middle' className='bx-dialog-confirm br-0 br-b-r-30' isPromise={okBtnIsPromise} onClick={handleOk}>
          {okText}
        </Button>
      </div>
    );
  }
  return <></>;
});

export const Dialog = forwardRef((props: DialogProps, ref) => {
  const { formatMsg } = useLanguage();
  const {
    sourceNode,
    title,
    children,
    onClose,
    onOk,
    autoFooter,
    okText = `${formatMsg('confirm')}`,
    okBtnIsPromise,
    isShowOkBtn = true,
    defaultVisible,
    bodyClassname,
    isTitle = true,
    onlyConfirm = true,
    visible,
    isFooter = true,
    openCB,
    contentCls,
    btnName,
    isMask = true,
  } = props;
  const [innerVisible, setInnerVisible] = useState(defaultVisible);

  const { limitDialogFn } = useLimitDialog();

  useEffect(() => {
    if (typeof visible === 'boolean') {
      // 处理弹窗静态方法弹出的权限控制
      limitDialogFn(() => {
        setInnerVisible(visible);
      }, btnName);
    }
  }, [btnName, limitDialogFn, visible]);

  // 打开弹窗
  const handleOpen = () => {
    // 处理弹窗组件方式弹出的权限控制
    limitDialogFn(() => {
      setInnerVisible(true);
      setTimeout(() => {
        if (typeof openCB === 'function') {
          openCB();
        }
      }, 10);
    }, btnName);
  };

  // 关闭弹窗（不考虑异步）
  const handleClose = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
    }
    setInnerVisible(false);
  }, [onClose]);

  // 关闭弹窗（不考虑异步）
  const handleOk = useCallback(
    (_, rs, rj) => {
      if (okBtnIsPromise) {
        if (typeof onOk === 'function') {
          onOk(() => {
            if (typeof rs === 'function') rs();
            setInnerVisible(false);
          }, rj);
        }
      } else {
        if (typeof onOk === 'function') onOk(rs, rj);
        setInnerVisible(false);
      }
    },
    [onOk, okBtnIsPromise]
  );

  // 点击关闭弹窗
  const handleWrapClick = useCallback(() => {
    if (!isMask) return;
    if (typeof onClose === 'function') {
      onClose();
    }
    setInnerVisible(false);
  }, [onClose, isMask]);

  useImperativeHandle(
    ref,
    () => ({
      onClose: handleClose,
    }),
    [handleClose]
  );

  // 阻止默认事件
  const handleBodyClick = useCallback((e) => {
    e?.stopPropagation();
    e?.preventDefault();
  }, []);

  const mergeBodyClassname = useMemo(() => {
    let cs = 'bg-body m-0-50 br-30';
    if (bodyClassname) {
      cs = `${bodyClassname} m-0-50`;
    }
    return cs;
  }, [bodyClassname]);

  return (
    <>
      {innerVisible && (
        <div onClick={handleWrapClick} className='ani-opacity full-screen-center df-fdc flex-1 jc-c bg-mask zi-large'>
          <div onClick={handleBodyClick} className={mergeBodyClassname}>
            {isTitle && (
              <div className='bx-dialog-title wds-h1 d-f ai-c bg-gdt-popup br-t-l-30 br-t-r-30 jc-sb'>
                <div />
                <div className='d-f ai-c jc-c'>{title}</div>
                <Icon className='bx-dialog-title-close-icon' name='close' onClick={handleClose} />
              </div>
            )}
            <div className={`bx-dialog-content d-f fd-c ${contentCls}`}>{children}</div>
            <FooterBtn
              autoFooter={autoFooter}
              okBtnIsPromise={okBtnIsPromise}
              okText={okText}
              onClose={handleClose}
              handleOk={handleOk}
              isShowOkBtn={isShowOkBtn}
              onlyConfirm={onlyConfirm}
              isFooter={isFooter}
            />
          </div>
        </div>
      )}
      <span onClick={handleOpen}>{sourceNode}</span>
    </>
  );
}) as unknown as FC<DialogProps> & {
  confirm: typeof confirm;
};

Dialog.confirm = (props: ConfirmProps) => confirm(props);
// ['alert'].forEach((type) => {
//   (Dialog as any)[type] = (props: ConfirmProps) => {
//     return confirm({
//       ...props,
//       isNotice: false,
//       noticeType: type,
//     });
//   };
// });
