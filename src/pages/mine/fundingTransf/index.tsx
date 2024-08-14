import { Cell } from '@/components/cell';
import { CellGroup } from '@/components/cellgroup';
import { useLanguage } from '@/hooks';

const fundlist = [
  {
    id: 1,
    title: 'rechargeSheet',
    icon: '/mine/fundingTransf/icon_1.png',
    href: '/mine/fundingTransf/rechargeDetail',
  },
  {
    id: 2,
    title: 'embodyDetails',
    icon: '/mine/fundingTransf/icon_2.png',
    href: '/mine/fundingTransf/withdrawDetail',
  },
  {
    id: 3,
    title: 'yuerbaoDetail',
    icon: '/mine/fundingTransf/icon_3.png',
    href: '/mine/fundingTransf/yueBaoDetail',
  },
  {
    id: 4,
    title: 'transformDetail',
    icon: '/mine/fundingTransf/icon_4.png',
    href: '/mine/fundingTransf/quotaConvertDetail',
  },
  {
    id: 5,
    title: 'transactionDetail',
    icon: '/mine/fundingTransf/icon_5.png',
    href: '/mine/fundingTransf/tradeDetail',
  },
  {
    id: 6,
    title: 'redpacketsDetail',
    icon: '/mine/fundingTransf/icon_6.png',
    href: '/mine/fundingTransf/envelopeDetail',
  },
];

function FundingTransf() {
  const { formatMsg } = useLanguage();
  return (
    <>
      <CellGroup className='m-t-30'>
        {fundlist.map((item, i) => (
          <Cell key={item.id || i} title={formatMsg(item.title)} icon={item.icon} href={item.href} isShowRight isDivider={i !== fundlist.length - 1} />
        ))}
      </CellGroup>
    </>
  );
}

export default FundingTransf;
