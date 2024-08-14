import { CSSProperties, memo } from 'react';

type StyleProps = { style?: CSSProperties };
type ClassNameProps = { className?: string };
type UnknownProps = Record<string, unknown>;
type DefProps = StyleProps & ClassNameProps & UnknownProps;

type SettingType = {
  fractionDigits?: number;
};

type DataType = {
  num: number|string;
};

export const ThousandsNumberSpan = memo((props: DefProps & SettingType & DataType) => {
  const { num, ...rest } = props;
  // const res = useMemo(() => {
  //   const decimal = num.toFixed(fractionDigits).split('.').pop();
  //   const integerList = [...num.toFixed(fractionDigits).split('.').shift()];

  //   let index = integerList.length;
  //   const newIntegerList = [];
  //   while (index > 0) {
  //     newIntegerList.push(integerList.slice(index - 3 > 0 ? index - 3 : 0, index).join(''));
  //     index -= 3;
  //   }

  //   const r = `${newIntegerList.reverse().join(',')}.${decimal}`;
  //   return r;
  // }, [num, fractionDigits]);

  return <span {...rest}>{num}</span>;
});
