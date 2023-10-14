import * as S from './styles';

interface ModalStatusButtonsProps {
  status: '판매중' | '예약중' | '판매완료' | undefined;
  productId: number | null;
  handleChangeStatus: (
    newStatus: '판매중' | '예약중' | '판매완료',
    productId: number | null,
  ) => void;
}

export const ModalStatusButtons = ({
  status,
  productId,
  handleChangeStatus,
}: ModalStatusButtonsProps) => {
  switch (status) {
    case '판매중':
      return (
        <>
          <S.ModalBtn onClick={() => handleChangeStatus('예약중', productId)}>
            <span>예약중 상태로 전환</span>
          </S.ModalBtn>
          <S.ModalBtn onClick={() => handleChangeStatus('판매완료', productId)}>
            <span>판매 완료 상태로 전환</span>
          </S.ModalBtn>
        </>
      );
    case '예약중':
      return (
        <>
          <S.ModalBtn onClick={() => handleChangeStatus('판매중', productId)}>
            <span>판매중 상태로 전환</span>
          </S.ModalBtn>
          <S.ModalBtn onClick={() => handleChangeStatus('판매완료', productId)}>
            <span>판매 완료 상태로 전환</span>
          </S.ModalBtn>
        </>
      );
    case '판매완료':
      return (
        <>
          <S.ModalBtn onClick={() => handleChangeStatus('판매중', productId)}>
            <span>판매중 상태로 전환</span>
          </S.ModalBtn>
          <S.ModalBtn onClick={() => handleChangeStatus('예약중', productId)}>
            <span>예약중 상태로 전환</span>
          </S.ModalBtn>
        </>
      );
    default:
      return null;
  }
};
