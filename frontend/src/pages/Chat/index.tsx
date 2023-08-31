import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CHATROOM } from '../../constants/routeUrl';
import { ACCESS_TOKEN } from '../../constants/login';
import { getRoomsList } from '../../api/chat';
import { Room } from '../../constants/types';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';

// TODO : 채팅 페이지 꾸미기
// TODO : 채팅방 목록 받아오기에서 판매자 이름도 필요함

const ChatPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const [myChatRoomList, setMyChatRoomList] = useState<Room[]>([]);
  const isResultEmpty: boolean = myChatRoomList?.length === 0;

  const checkChatRooms = async () => {
    const roomsList = await getRoomsList(accessToken);
    setMyChatRoomList(roomsList);
  };

  const enterChatRoom = (roomId: string, productId: string) => {
    sessionStorage.setItem('curRoomId', roomId);
    sessionStorage.setItem('curProductsId', productId);
    navigate(`${CHATROOM}/${roomId}`);
  };

  useEffect(() => {
    checkChatRooms();
  }, []);

  return (
    <>
      <NavBarTitle type="high" centerTitle="채팅" />
      {!isResultEmpty ? (
        <S.ItemsContainer>
          {myChatRoomList.map((room) => (
            <li
              key={room.roomId}
              onClick={() => enterChatRoom(room.roomId, room.productId)}
            >
              제품 아이디 : {room.productId} 방 번호 : {room.roomId}
            </li>
          ))}
        </S.ItemsContainer>
      ) : (
        <S.Empty>관심 상품이 없습니다.</S.Empty>
      )}
    </>
  );
};

export default ChatPage;
