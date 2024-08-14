import { memo, useCallback } from 'react';
import i18n from 'i18next';
import { Select, Option } from '@/components';
import { isArray } from '@/utils/tools';

interface ChannelProps {
  titleList: Array<any>;
  channelValue: number;
  channelList: Array<any>;
  choseChannel?: Function;
}

export const aliTitle = [{ id: '0', text: '选择转账方式' }];

const Channel = (props: ChannelProps) => {
  const {
 titleList, channelValue, channelList, choseChannel 
} = props;

  const handleChose = useCallback(
    (item) => {
      choseChannel && choseChannel(item);
    },
    [choseChannel]
  );

  return (
    <div className='d-f ai-c p-l-50 m-10-0 bg-body'>
      <div className='color-con-ass wds-con'>{i18n.t('currentChannel')}:</div>
      <Select titleList={isArray(titleList) ? titleList : aliTitle} isArrow={false} className='p-0' titleClassName='p-r-50 p-l-30 h-100'>
        <Option
          defaultId={`${channelValue}`}
          options={isArray(channelList) ? channelList : []}
          blockTitle={`${i18n.t('selectChannel')}`}
          showNum='0'
          btnClass='w-auto bg-body color-con-ass b-2 bc-split br-20 p-20 m-b-30 m-r-40'
          type='btn'
          onClick={handleChose}
        />
      </Select>
    </div>
  );
};

export default memo(Channel);
