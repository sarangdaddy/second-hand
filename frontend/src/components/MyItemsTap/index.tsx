import { useState } from 'react';
import * as S from './styles';

export const MyItemsTap = () => {
  const [selected, setSelected] = useState('판매중');

  const handleSelectBtn = (status: string) => {
    setSelected(status);
  };

  return (
    <>
      <S.TapContainer>
        <S.TapButton
          selected={selected === '판매중'}
          onClick={() => handleSelectBtn('판매중')}
        >
          판매중
        </S.TapButton>
        <S.TapButton
          selected={selected === '판매완료'}
          onClick={() => handleSelectBtn('판매완료')}
        >
          판매완료
        </S.TapButton>
      </S.TapContainer>
    </>
  );
};
