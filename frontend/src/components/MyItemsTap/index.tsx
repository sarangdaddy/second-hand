import * as S from './styles';

interface MyItemsTap {
  status: string;
  onChange: (value: string) => void;
}

export const MyItemTap = ({ status, onChange }: MyItemsTap) => {
  return (
    <>
      <S.TapContainer>
        <S.TapButton
          selected={status === '판매중'}
          onClick={() => onChange('판매중')}
        >
          판매중
        </S.TapButton>
        <S.TapButton
          selected={status === '판매완료'}
          onClick={() => onChange('판매완료')}
        >
          판매완료
        </S.TapButton>
      </S.TapContainer>
    </>
  );
};
