interface ChatContentsProps {
  clientId: number;
  clientNickName: string;
  clientImgUrl: string;
  updatedAtTime: string;
  lastChat: string;
  unreadChatCount: number;
}

const ChatContents = ({
  clientId,
  clientNickName,
  clientImgUrl,
  updatedAtTime,
  lastChat,
  unreadChatCount,
}: ChatContentsProps) => {
  return <></>;
};

export default ChatContents;
