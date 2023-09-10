import { useState, useEffect } from 'react';

import useAsync from '../../hooks/useAsync';
import { ACCESS_TOKEN } from '../../constants/login';
import { getProductsDetail } from '../../api/product';
import { getChatDetails } from '../../api/chat';

import * as S from './styles';
import { ItemDetail } from '../../constants/types';
import { ChatHistoryProps } from '../../constants/types';

interface ChatRoomProps {
  roomId: string;
  productId: string | undefined;
  sellerNickName: string;
  sellerProfileUrl: string;
  onClick: () => void;
}

const ChatRoom = ({
  roomId,
  productId,
  sellerNickName,
  sellerProfileUrl,
  onClick,
}: ChatRoomProps) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const { data } = useAsync(() => getProductsDetail(productId, accessToken));
  const selectedItem: ItemDetail = data?.data;
  const [chatHistory, setChatHistory] = useState<ChatHistoryProps[] | null>(
    null,
  );
  const lastChatLength = chatHistory?.length;

  useEffect(() => {
    let ignore = false;

    const checkChatDetails = async () => {
      try {
        const chatDetails = await getChatDetails(accessToken, roomId);

        if (!ignore) {
          setChatHistory(chatDetails);
        }
      } catch (error) {
        console.error('채팅 내역 불러오기 에러:', error);
      }
    };
    checkChatDetails();

    return () => {
      ignore = true;
    };
  }, [accessToken, roomId]);

  return (
    <li>
      <S.ItemContainer onClick={onClick}>
        <S.SellerImg imageURI={sellerProfileUrl} />
        <S.ItemInfo>
          <S.ColumnTop>
            <span>{sellerNickName}</span>
          </S.ColumnTop>
          {chatHistory && typeof lastChatLength === 'number' ? (
            <S.ColumnBot>{chatHistory[lastChatLength - 1].message}</S.ColumnBot>
          ) : null}
        </S.ItemInfo>
        <S.ItemImage imageURI={selectedItem?.imageList[0]} />
      </S.ItemContainer>
    </li>
  );
};

export default ChatRoom;
