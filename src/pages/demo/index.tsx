import { useTranslation } from 'react-i18next';
// import { Picker } from '@nutui/nutui-react';
import MobxDemo from './MobxDemo';
import MobxConfirm from './MobxConfirm';
import {
 Img, Badge, Button, Empty, Select, Option, GroupItem, CellGroup 
} from '@/components';
import TabsDemo from './TabsDemo';
import FormDemo from './FormDemo';
import CollapseDemo from './CollapseDemo';
import TableDemo from './TableDemo';
import {
 alibtnGroup, dateOptions, rechargeData, styleOptions, typeOptions 
} from '@/constants';
import TransitionGroup from './TransitionGroup';
import { useNavigation } from '@/hooks';
import { ColorfulBall, MajiangBall, SingleColorBall } from '../gameComponents';
import { TwentyBallLine } from '@/pages/gameComponents';
import ScratchDemo from './ScratchDemo';
import { HeaderGames } from '@/layouts/header/headerGames';
import { IconButton } from '../gameComponents/iconButton';
import { ClassicsTop } from '../gameComponents/classicsTop';
import { BYTE } from '@/engine/base/basetype';
import LottieDemo2 from './lottieDemo2';
import LottieDemo3 from './lottieDemo3';
import LottieDemo4 from './lottieDemo4';

const aa = [];
const a2901 = [];
const a2905t = [];
const a2905 = [];
function test() {
  a2901.push(new BYTE(20));
  a2901.push(new BYTE(2));
  a2901.push(new BYTE(9));
  a2901.push(new BYTE(9));

  a2905.push(new BYTE(9));
  a2905.push(new BYTE(1));
  a2905.push(new BYTE(1));
  a2905.push(new BYTE(4));
  a2905.push(new BYTE(6));

  a2905t.push(new BYTE(0));
  a2905t.push(new BYTE(0));
  a2905t.push(new BYTE(0));
  a2905t.push(new BYTE(0));
  a2905t.push(new BYTE(1));
  a2905t.push(new BYTE(2));
  a2905t.push(new BYTE(4));
  a2905t.push(new BYTE(0));
  a2905t.push(new BYTE(1));
  a2905t.push(new BYTE(1));
  a2905t.push(new BYTE(1));
  a2905t.push(new BYTE(0));
  a2905t.push(new BYTE(2));
  a2905t.push(new BYTE(2));
  a2905t.push(new BYTE(2));
  a2905t.push(new BYTE(3));
  a2905t.push(new BYTE(3));
  a2905t.push(new BYTE(11));
  a2905t.push(new BYTE(11));
  a2905t.push(new BYTE(7));

  for (let i = 0; i < 10; i += 1) {
    const d = new BYTE(i + 1);
    aa.push(d);
  }
  console.log(aa);
}
test();
// 多语言使用
const LangDemo = () => {
  const { t, i18n } = useTranslation();
  const nav = useNavigation();

  return (
    <div className='animation-big-title flex-1 '>
      {t('afreshLogin')}
      <Button
        onClick={() => {
          i18n.changeLanguage('en');
          nav('/home');
        }}
      >
        {t('afreshLogin')}
      </Button>
    </div>
  );
};

// 多语言使用
const ButtonDemo = () => {
  const { t } = useTranslation();
  return (
    <div className=''>
      <Button type='hollow' size='h-nano'>
        {t('button')}
      </Button>
      <Button type='link-dark' size='nano'>
        {t('button')}
      </Button>
      <Button type='link' size='nano'>
        {t('button')}
      </Button>
    </div>
  );
};

const gameList = ['1', '2', '7', '8', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'];

const Demo = () => {
  const { t } = useTranslation();
  const handleClick = (item) => {
    console.log('222222', item);
  };
  return (
    <div>
      <h1>{t('componentUseCase')}</h1>
      <TwentyBallLine GameResult={gameList} />
      <LottieDemo2 />
      <LottieDemo3 />
      <LottieDemo4 />
      <hr style={{ margin: '20px 0' }} />
      <h2>{t('scratch')}</h2>
      <ScratchDemo />
      <hr style={{ margin: '20px 0' }} />
      <h2>TransitionGroup </h2>
      <TransitionGroup />
      <hr style={{ margin: '20px 0' }} />
      <h2>{t('moreLanuage')}</h2>

      <MajiangBall text='1' />
      <MajiangBall text={9} />
      <ColorfulBall type='wordColorful' text='3' className='bc-white' />
      <ColorfulBall text={3} type='borderColorful' isTwoDigits />
      <ColorfulBall text={1} type='borderColorful' isTwoDigits />
      <ColorfulBall text='3' type='wordBorder' />

      <ColorfulBall text='0' type='bgColorful' />
      <ColorfulBall text='1' type='bgColorful' />
      <ColorfulBall text='3' type='bgColorful' />
      <ColorfulBall text='0' type='bgGrey' />
      <ColorfulBall text='1' type='bgGrey' />
      <ColorfulBall text='3' type='bgGrey' />
      <ClassicsTop gameType={2904} curPeriodNumber='2023' />
      <ClassicsTop gameType={2901} curPeriodNumber='2023' />

      <ClassicsTop gameType={2905} curPeriodNumber='2023' />
      <SingleColorBall text='7' />
      <SingleColorBall text='8' bgColor='singGold' />
      <GroupItem
        isActive
        type='img-text'
        data={alibtnGroup}
        onItemClick={handleClick}
      />
      <div className='bg-body'>
        <GroupItem
          defaultActiveId={-1}
          isActive={false}
          classNameBox='jc-sb'
          type='number'
          data={alibtnGroup}
          onItemClick={handleClick}
        />
      </div>
      <Select titleList={rechargeData}>
        <Option
          options={styleOptions}
          blockTitle={t('selectType')}
          showNum='0'
          type='btn'
          onClick={handleClick}
        />
        <Option options={typeOptions} showNum='1' />
        <Option options={dateOptions} showNum='2' />
      </Select>
      <LangDemo />
      <hr style={{ margin: '20px 0' }} />
      <h2>Button {t('button')}</h2>
      <ButtonDemo />
      <hr style={{ margin: '20px 0' }} />
      <h2>Mobx {t('allStatus')}</h2>
      <MobxDemo />
      <div style={{ margin: '20px 0' }} />
      <MobxConfirm />
      <hr style={{ margin: '20px 0' }} />
      <h2>Badge {t('micromark')}</h2>
      <Badge value='100'>
        <Img className='img-t' src='/mine/icon_geren_004.png' />
      </Badge>
      <hr style={{ margin: '20px 0' }} />
      <h2>Empty {t('emptyDisplay')}</h2>
      <Empty />
      <hr style={{ margin: '20px 0' }} />
      <h2>tabs</h2>
      <TabsDemo />
      <hr style={{ margin: '20px 0' }} />
      <h2>form {t('form')}</h2>
      <FormDemo />
      <hr style={{ margin: '20px 0' }} />
      <h2>Collapse {t('collapse')}</h2>
      <CollapseDemo />
      <hr style={{ margin: '20px 0' }} />
      <h2>table {t('table')}</h2>
      <TableDemo />
      <HeaderGames />
      <CellGroup>
        <div className='m-l-50'>
          <IconButton title={t('history')} icon='/home/GameField/mp.png' />
        </div>
      </CellGroup>
    </div>
  );
};

export default Demo;

