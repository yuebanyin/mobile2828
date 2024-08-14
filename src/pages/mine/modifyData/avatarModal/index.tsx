import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Tabs,
  Dialog,
  Img,
  TabPane,
  Icon,
  toastText,
  Avatar,
} from '@/components';
import avatar_1 from '@/assets/image/common/avatar/1.png';
import { avatarOptions, avatarOptions1 } from '@/constants';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { postUserEditFaceId } from '@/services';
import styles from './index.module.scss';
import { useLanguage } from '@/hooks';

const AvatarModal = () => {
  // const { eventSource } = props;
  const { faceId, setFaceId } = useUserInfoStore();
  const [id, setId] = useState(faceId);
  const [faceUrl, setFaceUrl] = useState(avatar_1);
  const idRef = useRef(faceId);
  const initRef = useRef(false);
  const [tapId, setTapId] = useState('0');
  const [avatar, setAvatar] = useState({ id: 1, url: avatar_1 });
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  const modiyFaceId = useCallback(
    (hide) => {
      if (idRef.current === id) {
        hide();
        return;
      }
      changeState('isLoading', true);
      postUserEditFaceId({ Id: id })
        .then((res: any) => {
          // toastText(res.Message);
          const msgObj = JSON.parse(res.Message);
          toastText(formatMsg(msgObj?.key, msgObj?.parm));
          setFaceId(id);
          idRef.current = id;
          avatar.id = id;
          avatar.url = faceUrl;
          initRef.current = false;
          setAvatar({ ...avatar });
          hide();
        })
        .catch(() => {
          hide();
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [avatar, changeState, faceUrl, id, setFaceId, formatMsg]
  );

  const chooseFaceId = useCallback((tapId, id, url) => {
    setId(id);
    setFaceUrl(url);
    setTapId(tapId);
  }, []);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      let it = avatarOptions.find((it) => it.id === faceId);
      if (!it) {
        it = avatarOptions1.find((it) => it.id === faceId);
      }
      setAvatar({ ...it });
    }
  }, [faceId, avatar]);

  return (
    <>
      <Dialog
        title={formatMsg('avatar')}
        okBtnIsPromise
        onOk={modiyFaceId}
        sourceNode={
          <div>
            <Avatar className='h-140 w-140 f-r m-t-50 m-b-40 m-r-50' />
            <div className='p-a top-180 right-100'>
              <Img src='/mine/tx_c.png' className='h-40 w-40' />
            </div>
          </div>
        }
      >
        <Tabs type='tabs' activeId={tapId} isCapsule titleClassName='m-44'>
          <TabPane title={formatMsg('casualAvatar')} paneKey='0'>
            <div
              className={`${styles['avar-box']} d-f flex-w p-t-8 p-l-60 m-b-30`}
            >
              {avatarOptions.map((item, i) => (
                <div
                  key={`${i}` || item.id}
                  className={`m-t-30 ${id === item.id ? 'm-r-6' : 'm-r-40'}`}
                >
                  <Img
                    isNoTheme
                    className='avatar-cg d-it'
                    src={item.url}
                    alt=''
                    onClick={() => chooseFaceId('0', item.id, item.url)}
                  />
                  <Icon
                    className={`${
                      styles['avar-box-item']
                    } top-100 right-40 br-half bg-green color-white ${
                      id === item.id ? 'd-ib' : 'd-n'
                    }`}
                    name='success'
                  />
                </div>
              ))}
            </div>
          </TabPane>
          <TabPane title={formatMsg('officialAvatar')} paneKey='1'>
            <div className={`d-f flex-w p-t-8 p-l-60 ${styles['avar-box']}`}>
              {avatarOptions1.map((item) => (
                <div
                  key={item.id}
                  className={`m-t-30 ${id === item.id ? 'm-r-6' : 'm-r-40'}`}
                >
                  <Img
                    isNoTheme
                    className='avatar-cg d-it'
                    src={item.url}
                    alt=''
                    onClick={() => chooseFaceId('1', item.id, item.url)}
                  />
                  <Icon
                    className={`${
                      styles['avar-box-item']
                    } top-100 right-40 br-half bg-green color-white ${
                      id === item.id ? 'd-ib' : 'd-n'
                    }`}
                    name='success'
                  />
                </div>
              ))}
            </div>
          </TabPane>
        </Tabs>
      </Dialog>
    </>
  );
};
export default AvatarModal;
