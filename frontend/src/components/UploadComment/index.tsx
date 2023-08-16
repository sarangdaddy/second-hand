import { useContext, useState } from 'react';

import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';

import * as S from './styles';

const COMMENT_PLACEHOLDER =
  '등록하실 게시물 내용을 작성해주세요. (판매금지 물품은 게시가 제한될 수 있어요.)';

const COMMENT_MAX_LENGTH = 500;

// TODO : 엔터치면 무한이 늘어나는 텍스트에어리아 높이 제한 주기
// https://bydawn25.tistory.com/44

const UploadComment = () => {
  const { postObject, setPostObject } = useContext(postSalesItemContext);
  const [inputComment, setInputComment] = useState<string | null>(
    postObject.content ? postObject.content : null,
  );
  const [textareaHeight, setTextareaHeight] = useState(110);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const inputValue = event.target.value;
    // const rowCount = inputValue.split(/\r\n|\r|\n/).length;
    const newHeight = event.target.scrollHeight;

    setInputComment(inputValue === '' ? null : inputValue);

    if (inputComment !== null && inputComment.length > inputValue.length) {
      setTextareaHeight(newHeight - 22);
    } else {
      setTextareaHeight(newHeight);
    }

    setPostObject((prevPostObject: PostObjectType) => ({
      ...prevPostObject,
      content: inputComment,
    }));
  };

  return (
    <>
      <S.CommentContainer>
        <S.testDiv>
          <S.CommentTextarea
            placeholder={COMMENT_PLACEHOLDER}
            value={inputComment || ''}
            onChange={handleTextareaChange}
            maxLength={COMMENT_MAX_LENGTH}
            height={textareaHeight}
          />
        </S.testDiv>
        <S.CommentLengthNotify>
          {inputComment ? inputComment.length : 0} / {COMMENT_MAX_LENGTH}
        </S.CommentLengthNotify>
      </S.CommentContainer>
    </>
  );
};

export default UploadComment;
