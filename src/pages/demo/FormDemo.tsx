import { useTranslation } from 'react-i18next';
import {
 FormDemo as Form, FormItem, Input, Picker, Button, toastText 
} from '@/components';

const defaultValueData1 = [1, 6];
const defaultValueData2 = [1];

const listData1 = [
  {
    value: 1,
    text: '北京',
    children: [
      { value: 1, text: '朝阳区' },
      { value: 2, text: '海淀区' },
      { value: 3, text: '大兴区' },
      { value: 4, text: '东城区' },
      { value: 5, text: '西城区' },
      { value: 6, text: '丰台区' },
    ],
  },
  {
    value: 2,
    text: '上海',
    children: [
      { value: 1, text: '黄浦区' },
      { value: 2, text: '长宁区' },
      { value: 3, text: '普陀区' },
      { value: 4, text: '杨浦区' },
      { value: 5, text: '浦东新区' },
    ],
  },
];
const listData2 = [
  { value: 1, text: '苹果' },
  { value: 2, text: '香蕉' },
  { value: 3, text: '西梅' },
  { value: 4, text: '冬枣' },
  { value: 5, text: '虾仁' },
  { value: 6, text: '芒果' },
];
function FormDemo() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  // 触发提交的按钮点击事件
  const handleRegister = () => {
    form
      .validate()
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
        toastText(err[0]?.message);
      });
  };

  return (
    <div>
      <Form className='bg-body' form={form}>
        <FormItem type='card' rules={[{ required: true, message: `${t('nameCannotBlank')}` }]} name='name' label={t('name')}>
          <Input placeholder={t('enterName')} />
        </FormItem>
        <FormItem type='card' name='psd' label={t('password')}>
          <Input placeholder={t('enterPassworded')} type='password' />
        </FormItem>
        <FormItem type='card' initialValue={defaultValueData1} name='adress' label={t('address')}>
          <Picker listData={listData1} placeholder={t('selectAddress')} />
        </FormItem>
        <FormItem type='card' initialValue={defaultValueData2} name='fuite' label={t('entity')}>
          <Picker listData={listData2} placeholder={t('pleaseSelect')} />
        </FormItem>
      </Form>
      <Button onClick={handleRegister}>{t('Submit')}</Button>
    </div>
  );
}

export default FormDemo;
