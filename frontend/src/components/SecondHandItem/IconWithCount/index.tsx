import * as S from './styles';

import Icon from '../../Icon';
import iconfiles from '../../../assets/icons';

type IconName = keyof typeof iconfiles;

interface IconWithCountProps {
  name: IconName;
  count: number;
  fill?: string;
}

const IconWithCount = ({ name, count, fill }: IconWithCountProps) => {
  return (
    <>
      {count > 0 && (
        <S.IconWithCountStyle>
          <Icon name={name} width={'20'} height={'16'} fill={fill} />
          <span>{count}</span>
        </S.IconWithCountStyle>
      )}
    </>
  );
};

export default IconWithCount;
