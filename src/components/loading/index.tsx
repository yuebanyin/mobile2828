import { observer } from 'mobx-react-lite';
import { Img } from '../img';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

// 全局loading组件
export const Loading = () => {
  const { formatMsg } = useLanguage();

  return (
    <div className='zi-large d-f ai-c jc-c full-screen-center'>
      <div className='bg-mask p-30-50 br-20'>
        <Img
          className='w-220 h-220 m-0-auto'
          src='/common/loading.gif'
          isImgLayzed
        />
        <div className='m-t-10 ta-c color-white'>{formatMsg('loading')}...</div>
      </div>
    </div>
  );
};

// 全局页面中的loading
export const CommonLoading = observer(() => {
  const { isLoading } = useGlobalStore();

  if (isLoading) {
    return <Loading />;
  }

  return <></>;
});
