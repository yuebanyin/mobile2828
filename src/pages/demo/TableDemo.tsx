import { Table, TableColumnProps } from '@/components';

const columns: TableColumnProps[] = [
  {
    title: '姓名',
    key: 'name',
    align: 'c',
    sorter: true,
    tbClassName: 'w-330',
  },
  {
    title: '性别',
    key: 'sex',
  },
  {
    title: '学历',
    key: 'record',
  },
  {
    title: '年龄',
    key: 'age',
    sorter: (row1: any, row2: any) => row1.age - row2.age,
  },
];

const data = [
  {
    name: '2022-04-24',
    sex: '男',
    record: '小学',
    age: 10,
  },
  {
    name: 'Lucy',
    sex: '女',
    record: '本科',
    age: 30,
  },
  {
    name: 'Jack',
    sex: '男',
    record: '高中',
    age: 4,
  },
];

const TableDemo = () => (
  <>
    <div className='bg-main' style={{ margin: '20px 0' }}>
      <Table columns={columns} data={data} isBodyTopBordered />
    </div>
    <div className='bg-main' style={{ margin: '20px 0' }}>
      <Table columns={columns} data={data} isBodyBordered />
    </div>
    <div className='bg-main' style={{ margin: '20px 0' }}>
      <Table columns={columns} data={data} isBodyTopBordered isHeaderBordered />
    </div>
    <div className='bg-main' style={{ margin: '20px 0' }}>
      <Table columns={columns} data={[]} isBodyTopBordered isHeaderBordered />
    </div>
  </>
);

export default TableDemo;
