import * as S from './styles';
import elapsedTime from '../../utils/elapsedTime';

interface DetailItemProps {
  title: string;
  categoryTitle: string;
  updatedAt: string;
  contents: string;
  chatRoomCount: number;
  watchListCount: number;
  lookupCount: number;
}

const DetailItem = ({
  title,
  categoryTitle,
  updatedAt,
  contents,
  chatRoomCount,
  watchListCount,
  lookupCount,
}: DetailItemProps) => {
  return (
    <>
      <S.DetailItemContainer>
        <S.Title>{title}</S.Title>
        <S.SubTitle>
          {categoryTitle} ﹒ {elapsedTime(updatedAt)}
        </S.SubTitle>
        <S.Content>{contents}</S.Content>
        <S.CountInfo>
          <S.ChatRoomCount>채팅 {chatRoomCount} </S.ChatRoomCount>
          <S.WatchListCount>관심 {watchListCount} </S.WatchListCount>
          <S.LookUpCount>조회 {lookupCount} </S.LookUpCount>
        </S.CountInfo>
      </S.DetailItemContainer>
    </>
  );
};

export default DetailItem;
