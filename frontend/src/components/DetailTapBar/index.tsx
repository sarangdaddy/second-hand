import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN } from '../../constants/login';
import { getRoomsList, postNewChatRoom } from '../../api/chat';

import * as S from './styles';
import { CHAT, CHATROOM } from '../../constants/routeUrl';
import { formatNumber } from '../../utils/formatNumber';
import Button from '../Button';
import Icon from '../Icon';

// TODO : 함수를 실행하는 부모 컴포넌트 하나가 존재한다면 패치 컴포넌트? 에러 처리가 쉬워진다. (숙제)

interface DetailTapBarProps {
  price: number | null;
  curProductsId: string | undefined;
  isMyProduct: boolean | undefined;
  chatRoomCount: number;
  isWatchListChecked: boolean;
  onWatchListCheck: () => void;
}

interface Room {
  roomId: string;
  productId: string;
  sellerId: number;
  buyerId: number;
}

const DetailTapBar = ({
  price,
  curProductsId,
  isMyProduct,
  chatRoomCount,
  isWatchListChecked,
  onWatchListCheck,
}: DetailTapBarProps) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleChatClick = async () => {
    if (curProductsId) {
      try {
        // 방 생성 전에 있는 전체방 리스트 확인하기
        const roomsList = await getRoomsList(accessToken);
        // 현재 제품 ID와 일치하는 방이 있는지 확인
        const matchedRoom = roomsList.find(
          (room: Room) => String(room.productId) === curProductsId,
        );

        if (matchedRoom) {
          // 일치하는 방으로 이동
          enterChatRoom(matchedRoom.roomId);
        } else {
          // 일치하는 방이 없으면 새로운 방 생성
          await createChatRoom(curProductsId);
        }
      } catch (error) {
        console.error('방 생성 에러:', error);
      }
    }
  };

  // 방이 없다면 curProductsId와 accessToken으로 방 생성
  const createChatRoom = async (curProductsId: string) => {
    try {
      const createdRoomId = await postNewChatRoom(accessToken, curProductsId);
      // 생성된 방으로 이동
      enterChatRoom(createdRoomId);
    } catch (error) {
      console.error('방 생성 에러:', error);
    }
  };

  // 방으로 이동
  const enterChatRoom = (roomId: string) => {
    sessionStorage.setItem('curRoomId', roomId);
    if (curProductsId) sessionStorage.setItem('curProductsId', curProductsId);
    navigate(`${CHATROOM}/${roomId}`);
  };

  const handleJoinChatRoom = () => {
    if (chatRoomCount === 0) {
      setModalOpen(true);
    } else {
      navigate(CHAT);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <S.DetailTapBarContainer>
        <S.Menu>
          <div>
            <S.Left>
              {isWatchListChecked ? (
                <Icon
                  onClick={onWatchListCheck}
                  name="heartFill"
                  width="28px"
                  height="28px"
                  fill="red"
                />
              ) : (
                <Icon
                  onClick={onWatchListCheck}
                  name="heart"
                  width="28px"
                  height="28px"
                  fill="red"
                />
              )}
              {price !== null ? (
                <S.Price>{formatNumber(price)}원</S.Price>
              ) : (
                <S.Price>가격미정</S.Price>
              )}
            </S.Left>
          </div>
          <S.Right>
            {isMyProduct ? (
              <Button active={!!curProductsId} onClick={handleJoinChatRoom}>
                대화 중인 채팅방 ({chatRoomCount})
              </Button>
            ) : (
              <Button active={!!curProductsId} onClick={handleChatClick}>
                채팅하기
              </Button>
            )}
          </S.Right>
        </S.Menu>
      </S.DetailTapBarContainer>
      {isModalOpen && (
        <S.ModalDim>
          <S.ModalContainer>
            <p>채팅한 이웃이 없습니다.</p>
            <S.ModalBtns>
              <S.ModalBtn onClick={handleCloseModal}>
                <span>닫기</span>
              </S.ModalBtn>
            </S.ModalBtns>
          </S.ModalContainer>
        </S.ModalDim>
      )}
    </>
  );
};

export default DetailTapBar;
