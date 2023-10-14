import { useState } from 'react';

import * as S from './styles';

import Icon from '../Icon';
interface ChatInputBarProps {
  onChange: (value: string) => void;
  sendHandler: (value: string) => void;
}

const ChatInputBar = ({ onChange, sendHandler }: ChatInputBarProps) => {
  const [isComposing, setIsComposing] = useState(false);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && !isComposing) {
      const inputElement = event.currentTarget;
      const inputValue = inputElement.value.trim();
      if (inputValue) {
        sendHandler(inputValue);
        onChange('');
        inputElement.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    const inputElement = document.getElementById(
      'chatInput',
    ) as HTMLInputElement;
    const inputValue = inputElement.value;
    if (inputValue) {
      sendHandler(inputValue);
      onChange('');
      inputElement.value = '';
    }
  };

  return (
    <>
      <S.ChatInputContainer>
        <S.Menu>
          <S.Left>
            <S.ChatInput
              id="chatInput"
              placeholder="내용을 입력하세요."
              onKeyDown={handleInputKeyPress}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
          </S.Left>
          <S.Right onClick={handleButtonClick}>
            <Icon name="arrowUp" fill="white" width="17" height="17" />
          </S.Right>
        </S.Menu>
      </S.ChatInputContainer>
    </>
  );
};

export default ChatInputBar;
