import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/Auth';
import { ACCESS_TOKEN } from '../../constants/login';
import { getProductsDetail } from '../../api/product';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';
import DetailSliderPhotos from '../../components/DetailSliderPhotos';
import DetailItem from '../../components/DetailItem';
import DetailTapBar from '../../components/DetailTapBar';
import SelectSalesStatus from '../../components/SelectSalesStatus';

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
  memberId: number;
  memberNickName: string;
  lookupCount: number;
}

// TODO : 나의 판매 상품인지 확인하기
// TODO : 이미지 크기 조절하기, 이미지 슬라이딩 구현하기
// TODO : 판매상품 수정하기 기능 추가 (moreIcon)

const ItemDetail = () => {
  const navigation = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const userData = useAuthContext();

  const { productsId } = useParams();
  const curProductsId: string | undefined = productsId;
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // const { data } = useAsync(() => getProductsDetail(productsId, accessToken));
  // const selectedItem: Item = data?.data;

  // 상품 상세 업데이트 요청 API
  const handleSalesStatus = (selectedOption: string) => {
    console.log(selectedOption);
    // const updatedItemDetail = await updateItemDetail();
    // setSelectedItem(updatedItemDetail);
  };

  const handleBackIconClick = () => {
    navigation(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductsDetail(productsId, accessToken);
      setSelectedItem(response.data.data);
    };

    fetchData();
  }, [productsId, accessToken]);

  return (
    <>
      <NavBarTitle
        backIcon
        moreIcon
        type="low"
        preTitleClick={handleBackIconClick}
      />
      {selectedItem && (
        <DetailSliderPhotos imageList={selectedItem.imageList[0]} />
      )}
      <S.Main>
        <S.SellerInfo>
          <div>{'판매자 정보'}</div>
          <div>{selectedItem?.memberNickName}</div>
        </S.SellerInfo>
        <SelectSalesStatus
          salesStatus={selectedItem?.salesStatus}
          onChange={handleSalesStatus}
        />
        {selectedItem && (
          <DetailItem
            title={selectedItem.title}
            categoryTitle={selectedItem.categoryTitle}
            updatedAt={selectedItem.updatedAt}
            contents={selectedItem.contents}
            chatRoomCount={selectedItem.chatRoomCount}
            watchlistCount={selectedItem.watchlistCount}
            lookupCount={selectedItem.lookupCount}
          />
        )}
      </S.Main>
      {/* TODO : 내가 관심 체크 했는지 정보도 전달하기*/}
      {selectedItem && (
        <DetailTapBar
          curProductsId={curProductsId}
          price={selectedItem.price}
        />
      )}
    </>
  );
};

export default ItemDetail;
