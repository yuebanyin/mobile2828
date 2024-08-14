import UserInfo from './UserInfo';
import UserScore from './UserScore';

type DataType = {
  isVerfied: boolean;
};

function MineTop(props: DataType) {
  const { isVerfied } = props;
  return (
    <div className='d-f fd-c br-b-l-30 br-b-r-30 p-r'>
      <UserInfo />
      <UserScore isVerfied={isVerfied} />
    </div>
  );
}

export default MineTop;
