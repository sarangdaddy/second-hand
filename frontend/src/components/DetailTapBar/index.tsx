import formatNumber from '../../utils/formatNumber';
import Button from '../Button';
import Icon from '../Icon';
import * as S from './styles';

interface DetailTapBarProps {
  price: number | null;
  productsId: string | undefined;
}

const DetailTapBar = ({ price, productsId }: DetailTapBarProps) => {
  const handleChatClick = () => {
    // 채팅하기 버튼을 클릭했을 때 실행되는 함수
    // productId를 사용하여 채팅방 생성하는 로직을 구현합니다.
    // 여기서는 예시로 console.log로 productId를 출력하는 것으로 대체합니다.
    console.log('채팅방 생성 - productId:', productsId);
  };

  return (
    <>
      <S.DetailTapBarContainer>
        <S.Menu>
          <div>
            <S.Left>
              <Icon name="heart" width="27" height="28" />
              {price !== null && <S.Price>{formatNumber(price)}원</S.Price>}
            </S.Left>
          </div>
          <S.Right>
            <Button active onClick={handleChatClick}>
              채팅하기
            </Button>
          </S.Right>
        </S.Menu>
      </S.DetailTapBarContainer>
    </>
  );
};

export default DetailTapBar;
