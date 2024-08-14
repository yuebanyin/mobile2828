import { Children, ReactNode, cloneElement } from 'react';
import { Dialog, DialogProps } from './index';
import { render as reactRender, unmount } from '@/utils/render';

export interface ConfirmProps extends Omit<DialogProps, 'children'> {
  children?: ReactNode;
  isNotice?: boolean;
  noticeType?: string;
  onCancel?: Function;
}

// 确定弹窗的函数
function ConfirmDialog(props: ConfirmProps) {
  const { children } = props;
  return <Dialog {...props}>{Children.toArray(children).map((dom: any) => cloneElement(dom, { ...props }))}</Dialog>;
}

// const destroyList = [];

// 如果是消息提示型弹出框，那么只有确认按钮
// export const normalizeConfig = (config: ConfirmProps): ConfirmProps => {
//   if (config.isNotice) {
//     let { icon } = config;
//     if (!icon && icon !== null) {
//       switch (config.noticeType) {
//         case 'confirm':
//           icon = '';
//           break;
//         default:
//           break;
//       }
//     }
//     // config.hideCancelButton = true;
//   }
//   return config;
// };

// eslint-disable-next-line no-unused-vars
const confirm = (config: ConfirmProps, renderFunc?: (props: ConfirmProps) => void) => {
  // 创建一个div
  const div = document.createElement('div');
  // 挂在dody内（root元素的兄弟节点，主要解决全屏弹窗会受到transform样式的影响）
  document.body.appendChild(div);
  // 定义props配置默认visible 为false
  const dialogConfig: ConfirmProps = {
    ...config,
    visible: false,
  };

  // 销毁函数（销毁新增的节点）
  const destroy = () => {
    unmount(div);
    if (div?.parentNode) {
      div.parentNode.removeChild(div);
    }
    // for (let i = 0, len = destroyList.length; i < len; i + 1) {
    // const fn = destroyList[i];
    // if (fn === close) {
    //   destroyList.splice(i, 1);
    //   break;
    // }
    // }
  };

  // 定义渲染函数主要将函数内部节点挂载到新增的div节点上
  const render = (props: ConfirmProps, callback?: () => any) => {
    reactRender(
      <ConfirmDialog
        {...props}
        onCancel={() => {
          !confirm && config.onClose && config.onClose();
          dialogConfig.visible = false;
          dialogConfig.onClose = () => {
            config.onClose && config.onClose();
          };
          render(dialogConfig, destroy);
        }}
      />,
      div
    );
    callback && callback();
  };
  // 获取渲染函数
  const renderFunction = renderFunc || render;

  // 关闭函数（弹窗的关闭）
  const onClose = (confirm?: boolean) => {
    !confirm && config.onClose && config.onClose();
    dialogConfig.visible = false;
    dialogConfig.onClose = () => {
      config.onClose && config.onClose();
    };
    renderFunction(dialogConfig, destroy);
  };
  // 确认函数（处理确认按钮绑定的事件）
  const onOk = () => {
    const _onOk = config.onOk || config.onOk;
    const ret = _onOk?.();
    if (ret && ret.then) {
      renderFunction(dialogConfig);
      ret.then(
        () => {
          onClose(true);
        },
        (e: Error) => {
          console.error(e);
          renderFunction(dialogConfig);
        }
      );
    }
    if (!ret) {
      onClose(true);
    }
  };
  // 如果是promise，那么处理loading和加载完成关闭
  dialogConfig.onOk = onOk;
  // dialogConfig = normalizeConfig(dialogConfig);
  dialogConfig.visible = true;
  renderFunction(dialogConfig);

  // const update = (newConfig: ConfirmProps) => {
  //   dialogConfig = {
  //     ...dialogConfig,
  //     title: config.title, // 避免 newConfig 未传递 title 时，icon 出现多个的问题
  //     ...newConfig,
  //   };

  //   // dialogConfig = normalizeConfig(dialogConfig);
  //   renderFunction(dialogConfig);
  // };

  // const close = () => {
  //   dialogConfig.visible = false;
  //   dialogConfig.onClose = () => {
  //     config.onClose && config.onClose();
  //     destroy();
  //   };
  //   renderFunction(dialogConfig);
  // };

  // destroyList.push(close);

  // return {
  //   close,
  //   update,
  // };
};

export default confirm;
