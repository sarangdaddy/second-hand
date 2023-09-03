import * as S from './styles';

import Icon from '../Icon';
import elapsedTime from '../../utils/elapsedTime';
import { formatNumber } from '../../utils/formatNumber';
import IconWithCount from './IconWithCount';

interface SecondHandItemProps {
  title: string;
  salesStatus: '판매중' | '예약중' | '판매완료';
  updatedAt: string;
  price: number | null;
  location: string;
  chatRoomCount: number;
  watchListCount: number;
  isWatchListChecked: boolean;
  productMainImgUrl: string;
  isSetEditOption?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const SecondHandItem = ({
  title,
  updatedAt,
  salesStatus,
  price,
  location,
  chatRoomCount,
  watchListCount,
  productMainImgUrl,
  isSetEditOption,
  onClick,
}: SecondHandItemProps) => {
  return (
    <S.ItemContainer>
      <S.ItemImage imageURI={productMainImgUrl} />
      <S.ItemInfo>
        <S.ItemContents>
          <S.Content>
            <S.ColumnTop>{title}</S.ColumnTop>
            <S.ColumnMid>
              {location} ・ {elapsedTime(updatedAt)}
            </S.ColumnMid>
            <S.ColumnBot>
              {salesStatus !== '판매중' && (
                <S.StatusLabel round={true} status={salesStatus}>
                  {salesStatus}
                </S.StatusLabel>
              )}
              {price !== null && <S.Price>{formatNumber(price)}원</S.Price>}
            </S.ColumnBot>
          </S.Content>
          <S.Option>
            {isSetEditOption && (
              <button onClick={onClick}>
                <Icon name={'ellipsis'} width={'17'} height={'20'} />
              </button>
            )}
          </S.Option>
        </S.ItemContents>
        <S.ItemIssue>
          <IconWithCount name={'message'} count={chatRoomCount} />
          <S.HeartIconWithCount>
            <IconWithCount
              name={'heartFill'}
              count={watchListCount}
              fill={'red'}
            />
          </S.HeartIconWithCount>
        </S.ItemIssue>
      </S.ItemInfo>
    </S.ItemContainer>
  );
};

export default SecondHandItem;
