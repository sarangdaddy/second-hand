import { useParams, useNavigate } from 'react-router-dom';

import NavBarTitle from '../../components/NavBarTitle';
import DetailSliderPhotos from '../../components/DetailSliderPhotos';
import DetailItem from '../../components/DetailItem';
import DetailTapBar from '../../components/DetailTapBar';
import * as S from './styles';
import useAsync from '../../hooks/useAsync';
import { ACCESS_TOKEN } from '../../constants/login';
import { getProductDetail } from '../../api/product';

interface Item {
  productId: number;
  createAt: string;
  title: string;
  contents: string;
  salesStatus: '판매중' | '예약중' | '판매완료';
  updatedAt: string;
  price: number | null;
  location: string;
  chatRoomCount: number;
  watchlistCount: number;
  isWatchlistChecked: boolean;
  imageList: string[];
  categoryTitle: string;
}

const ItemDetail = () => {
  const { productsId } = useParams();

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const { data } = useAsync(() => getProductDetail(productsId, accessToken));
  console.log(data);

  const navigation = useNavigate();

  const handleBackIconClick = () => {
    navigation(-1);
  };

  // Todo : 컴포넌트 제작을 위한 샘플 아이템 (추후 삭제)
  const sampleItem: Item = {
    productId: 1,
    title:
      '호눅스가 사용하던 게임기 팝니다. 두줄이 넘어가면 ... 으로 타이틀을 감추고 있어요',
    salesStatus: '판매중',
    contents: '빈 내용',
    createAt: '2023-06-13T00:02:07',
    updatedAt: '2023-06-13T00:02:07',
    price: 398000,
    categoryTitle: '디지털기기',
    location: '개포2동',
    chatRoomCount: 0,
    watchlistCount: 0,
    isWatchlistChecked: false,
    imageList: ['https://t1.daumcdn.net/cfile/tistory/1859421F4B9B66A92A'],
  };

  // Todo : 이미지 전체 파일 넘겨주기 해야함.

  return (
    <>
      <NavBarTitle
        backIcon
        moreIcon
        type="low"
        preTitleClick={handleBackIconClick}
      />
      <DetailSliderPhotos
        title={sampleItem.title}
        updatedAt={sampleItem.updatedAt}
        salesStatus={sampleItem.salesStatus}
        price={sampleItem.price}
        location={sampleItem.location}
        chatRoomCount={sampleItem.chatRoomCount}
        watchlistCount={sampleItem.watchlistCount}
        isWatchlistChecked={sampleItem.isWatchlistChecked}
        imageList={sampleItem.imageList[0]}
      />
      <S.Main>
        <div>현재 제품은 {productsId} 번 입니다.</div>
        <div className="DetaulSellerInfo">판매자 정보</div>
        <DetailItem
          title={sampleItem.title}
          updatedAt={sampleItem.updatedAt}
          salesStatus={sampleItem.salesStatus}
          price={sampleItem.price}
          location={sampleItem.location}
          chatRoomCount={sampleItem.chatRoomCount}
          watchlistCount={sampleItem.watchlistCount}
          isWatchlistChecked={sampleItem.isWatchlistChecked}
          imageList={sampleItem.imageList[0]}
          categoryTitle={sampleItem.categoryTitle}
          contents={sampleItem.contents}
        />
      </S.Main>
      <DetailTapBar price={sampleItem.price} />
    </>
  );
};

export default ItemDetail;
