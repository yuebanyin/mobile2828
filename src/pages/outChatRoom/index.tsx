import { useNavigate, useSearchParams } from 'react-router-dom';
import { Iframe } from '@/components';

const OutChatRoom = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className='w-full h-full o-none p-r'>
      <div
        className='h-164 p-a zi-large left-0 top-0 bottom-0 w-150'
        onClick={handleClick}
      />
      <Iframe className='w-full h-full' src={url} />
    </div>
  );
};

export default OutChatRoom;
