import { memo } from 'react';

interface DatePickerProps {
  value: string;
}

export const DatePicker = memo((props: DatePickerProps) => {
  const { value } = props;
  return <form>{value}</form>;
});
