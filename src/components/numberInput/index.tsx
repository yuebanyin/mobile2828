import { memo } from 'react';

interface NumberInputProps {
  value: string;
}

export const NumberInput = memo((props: NumberInputProps) => {
  const { value } = props;
  return <input value={value} />;
});
