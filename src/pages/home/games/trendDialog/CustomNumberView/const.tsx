import { ColorResultTypeNumber } from '@/pages/gameComponents/colorResultType';

export const numberTable3501 = [
  {
    tabTitle: '号码',
    columns: [
      {
        title: '期号',
        className: 'flex-none py-15 ta-c t-40 w-140',
        render: (r: any) => `${r.szPeriodNumber.value}`.slice(-4),
      },
      {
        title: '一至二十球',
        className: 'flex-1 py-15 ta-c t-40 w-full d-f fd-c ai-c',
        render: (r: any) => {
          const a = r.cbTableCard.map((r: any) => parseInt(`${r.value}`));
          return (
            <>
              <div className='d-f'>
                {[...new Array(10).keys()].map((r) => (
                  <span className='p-5 w-80 font-w-bold' key={`${r}`}>
                    {a.at(r)}
                  </span>
                ))}
              </div>
              <div className='d-f'>
                {[...new Array(10).keys()].map((r) => (
                  <span className='p-5 w-80 font-w-bold' key={`${r}`}>
                    {a.at(r + 10)}
                  </span>
                ))}
              </div>
            </>
          );
        },
      },
    ],
  },
  {
    tabTitle: '总和',
    columns: [
      {
        title: '期号',
        className: 'flex-none py-15 ta-c t-40 w-140',
        render: (r: any) => `${r.szPeriodNumber.value}`.slice(-4),
      },
      {
        title: '和值',
        className: 'flex-1 py-15 ta-c t-40',
        render: (r: any) => <span className='font-w-bold'>{r.cbTableCard.map((r: any) => parseInt(`${r.value}`)).reduce((p: number, r: number) => p + r, 0)}</span>,
      },
      {
        title: '大小',
        className: 'flex-1 py-15 ta-c t-40',
        render: (r: any) => {
          const v = r.cbResultType.map((r: any) => parseInt(`${r.value}`)).at(0);
          return <ColorResultTypeNumber className='font-w-bold' value={v} />;
        },
      },
      {
        title: '单双',
        className: 'flex-1 py-15 ta-c t-40',
        render: (r: any) => {
          const v = r.cbResultType.map((r: any) => parseInt(`${r.value}`)).at(1);
          return <ColorResultTypeNumber className='font-w-bold' value={v} />;
        },
      },
      {
        title: '五行',
        className: 'flex-1 py-15 ta-c t-40',
        render: (r: any) => {
          const v = r.cbResultType.map((r: any) => parseInt(`${r.value}`)).at(2);
          return <ColorResultTypeNumber className='font-w-bold' value={v} />;
        },
      },
    ],
  },
  {
    tabTitle: '号码分布',
    columns: [
      {
        title: '期号',
        className: 'flex-none py-15 ta-c t-40 w-140',
        render: (r: any) => `${r.szPeriodNumber.value}`.slice(-4),
      },
      {
        title: '奇偶和',
        className: 'flex-1 py-15 ta-c t-40',
        render: (r: any) => {
          const v = r.cbResultType.map((r: any) => parseInt(`${r.value}`)).at(3);
          return <ColorResultTypeNumber className='font-w-bold' value={v} />;
        },
      },
      {
        title: '上中下',
        className: 'flex-1 py-15 ta-c t-40',
        render: (r: any) => {
          const v = r.cbResultType.map((r: any) => parseInt(`${r.value}`)).at(4);
          return <ColorResultTypeNumber className='font-w-bold' value={v} />;
        },
      },
    ],
  },
];
