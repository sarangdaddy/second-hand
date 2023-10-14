import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';
import { BASE_URL } from '../../constants/api';
import useAsync from '../../hooks/useAsync';
import { ACCESS_TOKEN } from '../../constants/login';
import { getSeller } from '../../api/member';
import { getChatDetails, deleteChatRoom } from '../../api/chat';

import * as S from './styles';
import ChatRoomContents from '../../components/ChatRoomContents';
import ChatRoomItem from '../../components/ChatRoomItem';
import ChatInputBar from '../../components/ChatInputBar';
import NavBarTitle from '../../components/NavBarTitle';
import { ChatHistoryProps } from '../../constants/types';

const ChattingPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  // Stomp의 CompatClient 객체를 참조하는 객체 (리렌더링에도 유지를 위해 useRef 사용)
  // Stomp라이브러리와 소켓 연결을 수행하는 cliet객체에 접근할 수 있게 해준다.
  const client = useRef<CompatClient | null>(null);
  const curRoomId = sessionStorage.getItem('curRoomId') || undefined;
  const curProductsId = sessionStorage.getItem('curProductsId') || undefined;
  const sellerData = useAsync(() => getSeller(accessToken, curRoomId));
  const sellerNickName = sellerData?.data?.data.sellerNickName;
  const [chatHistory, setChatHistory] = useState<ChatHistoryProps[] | null>(
    null,
  );
  const [inputValue, setInputValue] = useState('');
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // 채팅 내역 조회하고 불러오기
  const checkChatDetails = async () => {
    try {
      const chatDetails = await getChatDetails(accessToken, curRoomId);
      setChatHistory(chatDetails);
    } catch (error) {
      console.error('채팅 내역 불러오기 에러:', error);
    }
  };

  useEffect(() => {
    checkChatDetails();
  }, [accessToken, curRoomId]);

  // 소켓 연결
  const connectHandler = () => {
    // SockJS 클라이언트 객체를 생성하고, 웹 소켓을 연결한다.
    // ws-stomp는 서버의 Endpoint 경로로, 웹 소켓 통신을 위한 특정 경로를 의미한다.
    const socket = new SockJS(`${BASE_URL}/ws-stomp`);

    // SockJS 클라이언트 객체 socket를 STOMP 프로토콜로 오버랩하여 client.current에 할당
    client.current = Stomp.over(socket);
    // 클라이언트 객체를 서버와 연결
    client.current.connect(
      {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      () => {
        // 연결 성공 시 해당 방을 구독하면 서버로부터 새로운 매시지를 수신 한다.
        client.current?.subscribe(
          `/sub/chat/room/${curRoomId}`,
          (message) => {
            // 기존 대화 내역에 새로운 메시지 추가
            setChatHistory((prevHistory) => {
              return prevHistory
                ? [...prevHistory, JSON.parse(message.body)]
                : null;
            });
          },
          {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        );
      },
    );
  };

  useEffect(() => {
    connectHandler();
  }, [accessToken, curRoomId]);

  // 소켓을 통해 메시지를 전송
  const sendHandler = (inputValue: string) => {
    // client.current가 존재하고 연결되었다면 메시지 전송
    if (client.current && client.current.connected) {
      client.current.send(
        '/pub/chat/message',
        {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
        // JSON 형식으로 전송한다
        JSON.stringify({
          type: 'TALK',
          roomId: curRoomId,
          message: inputValue,
        }),
      );
    }
  };

  const handleBackIconClick = () => {
    sessionStorage.clear();
    navigate(-1);
  };

  const handleDeleteChatRoom = async () => {
    await deleteChatRoom(accessToken, curRoomId);
    sessionStorage.clear();
    navigate(-1);
  };

  const handleMoreIconClick = () => {
    setIsOptionOpen(true);
  };

  const handleCloseModal = () => {
    setIsOptionOpen(false);
  };

  const handleDeleteModal = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  return (
    <>
      <NavBarTitle
        type="high"
        backIcon
        prevTitle="뒤로"
        centerTitle={sellerNickName}
        moreIcon
        preTitleClick={handleBackIconClick}
        rightTitleClick={handleMoreIconClick}
      />
      <ChatRoomItem curProductsId={curProductsId} />
      <ChatRoomContents chatHistory={chatHistory} />
      <ChatInputBar onChange={setInputValue} sendHandler={sendHandler} />
      {isOptionOpen && (
        <S.ModalDim>
          <S.ModalContainer>
            <S.ModalBtns>
              <S.ModalBtn btnType="delete" onClick={handleDeleteModal}>
                <span>채팅방 나가기</span>
              </S.ModalBtn>
            </S.ModalBtns>
          </S.ModalContainer>
          <S.ModalContainer>
            <S.ModalBtns>
              <S.ModalBtn onClick={handleCloseModal}>
                <span>취소</span>
              </S.ModalBtn>
            </S.ModalBtns>
          </S.ModalContainer>
        </S.ModalDim>
      )}
      {/*TODO : Modal 컴포넌트 만들기*/}
      {isDeleteConfirmOpen && (
        <S.AlertModalDim>
          <S.AlertModalContainer>
            <p>
              채팅방을 나가면 내역이 삭제됩니다. <br /> 정말로 나가시겠습니까?
            </p>
            <S.AlertModalBtns>
              <S.AlertModalBtn onClick={handleDeleteChatRoom}>
                <span>확인</span>
              </S.AlertModalBtn>
              <S.AlertModalBtn onClick={handleCancelDelete}>
                <span>취소</span>
              </S.AlertModalBtn>
            </S.AlertModalBtns>
          </S.AlertModalContainer>
        </S.AlertModalDim>
      )}
    </>
  );
};

export default ChattingPage;
