import Icon from '../Icon';
import * as S from './styles';

interface ChatInputBarProps {
  onClick: () => void;
}

const ChatInputBar = ({ onClick }: ChatInputBarProps) => {
  return (
    <>
      <S.ChatInputContainer>
        <S.Menu>
          <S.Left>
            <S.ChatInput placeholder="내용을 입력하세요." />
          </S.Left>
          <S.Right onClick={onClick}>
            <Icon name="arrowUp" fill="white" width="17" height="17" />
          </S.Right>
        </S.Menu>
      </S.ChatInputContainer>
    </>
  );
};

export default ChatInputBar;
