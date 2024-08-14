import { Img } from '@/components';
import styles from './index.module.scss';

export type PreferentialCardDto = {
  Id: number;
  Title: string;
  ImgUrl: string;
  Version: string;
};

export type UnknownKeyValue = Record<string, unknown>;
export type MixProps<T> = { [P in keyof T]?: T[P] };

export type PreferentialCardType = UnknownKeyValue & { data: PreferentialCardDto };

export const PreferentialCard = (props: PreferentialCardType) => {
  const { data, ...rest } = props;
  const { Id, Title, ImgUrl } = data;
  return (
    <div className={styles['preferential-card']} {...rest}>
      <div className={styles['preferential-card-title']}>{Title}</div>
      <Img className={styles['preferential-card-ad']} src={ImgUrl} alt={`ad${Id}`} isNoTheme isDefaultBg />
    </div>
  );
};

