import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CHATROOM } from '../../constants/routeUrl';
import { ACCESS_TOKEN } from '../../constants/login';
import { getRoomsList } from '../../api/chat';
import { Room } from '../../constants/types';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';
import ChatRoom from '../../components/ChatRoom/intex';

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
            <ChatRoom
              key={room.roomId}
              roomId={room.roomId}
              productId={room.productId}
              sellerNickName={room.sellerNickName}
              onClick={() => enterChatRoom(room.roomId, room.productId)}
              sellerProfileUrl={room.sellerProfileUrl}
            />
          ))}
        </S.ItemsContainer>
      ) : (
        <S.Empty>채팅 내역이 없습니다.</S.Empty>
      )}
    </>
  );
};

export default ChatPage;
