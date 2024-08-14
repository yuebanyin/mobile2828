import { CTransition, Popup, Dialog } from '@/components';

export default function FadeTransition() {
  const a = () => {
    Dialog.confirm({ isTitle: false, onlyConfirm: false });
  };
  return (
    <>
      <CTransition>
        <div onClick={a} style={{ background: 'pink' }}>
          测试dialog
        </div>
      </CTransition>
      <Popup sourceNode='侧边弹窗'>测试动画效果</Popup>
      <Popup direction='bottom' sourceNode='底部弹窗'>
        <div onClick={a} style={{ background: 'pink' }}>
          测试dialog
        </div>
      </Popup>
    </>
  );
}
