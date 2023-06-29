import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ACCESS_TOKEN } from '../../constants/login';
import { CHATROOM } from '../../constants/routeUrl';
import formatNumber from '../../utils/formatNumber';
import Button from '../Button';
import Icon from '../Icon';
import * as S from './styles';

import useAsync from '../../hooks/useAsync';
import { getMembers } from '../../api/product';
interface DetailTapBarProps {
  price: number | null;
  curProductsId: string | undefined;
}

const DetailTapBar = ({ price, curProductsId }: DetailTapBarProps) => {
  const navigate = useNavigate();
  const handleChatClick = () => {
    if (curProductsId) {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);

      // 1. productsId와 accessToken으로 방 생성
      const createChatRoom = async () => {
        try {
          const response = await axios.post(
            `http://52.79.159.39:8080/chat/room/create`,
            {
              productId: curProductsId,
            },
            {
              headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
              },
            },
          );
          const roomId = response.data.data.roomId;
          sessionStorage.setItem('curRoomId', roomId);
          sessionStorage.setItem('curProductsId', curProductsId);
          console.log('방 생성 완료 - roomId:', roomId);
          console.log('제품번호 - roomId:', curProductsId);

          // 2. 해당 방으로 이동
          enterChatRoom(roomId);
        } catch (error) {
          console.error('방 생성 에러:', error);
        }
      };

      // 3. 들어간 방으로 이동
      const enterChatRoom = (roomId: string) => {
        navigate(`${CHATROOM}/${roomId}`);
      };

      createChatRoom();
    }

    // 채팅하기 버튼을 클릭했을 때 실행되는 함수
    // productId를 사용하여 채팅방 생성하는 로직을 구현합니다.
    // 여기서는 예시로 console.log로 productId를 출력하는 것으로 대체합니다.
    console.log('채팅방 생성 - productId:', curProductsId);
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
