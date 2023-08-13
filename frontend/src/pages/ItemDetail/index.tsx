import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/Auth';
import { ACCESS_TOKEN } from '../../constants/login';
import { getProductsDetail } from '../../api/product';
import { deleteWatchList, postWatchList } from '../../api/watchList';

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

// TODO : 판매상품 수정하기 기능 추가 (moreIcon)

const ItemDetail = () => {
  const navigation = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const userData = useAuthContext();

  const { productsId } = useParams();
  const curProductsId: string | undefined = productsId;
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // 유저 ID로 수정해야함
  const isMyProduct =
    userData?.userInfo.nickname === selectedItem?.memberNickName;

  const fetchSelectedItemData = async () => {
    const response = await getProductsDetail(productsId, accessToken);
    setSelectedItem(response.data.data);
  };

  // 상품 상세 업데이트 요청 API
  const handleSalesStatus = (selectedOption: string) => {
    console.log(selectedOption);
    // const updatedItemDetail = await updateItemDetail();
    // setSelectedItem(updatedItemDetail);
  };

  const handleWatchlistChecked = async () => {
    if (selectedItem?.isWatchlistChecked === false) {
      await postWatchList(accessToken, curProductsId);
      fetchSelectedItemData();
    } else {
      await deleteWatchList(accessToken, curProductsId);
      fetchSelectedItemData();
    }
  };

  const handleBackIconClick = () => {
    navigation(-1);
  };

  const handleMoreIconClick = () => {
    setIsOptionOpen(true);
  };

  const handleCloseModal = () => {
    setIsOptionOpen(false);
  };

  const handleEditModal = () => {
    console.log('게시물을 수정합니다.');
    setIsOptionOpen(false);
  };

  const handleDeleteModal = () => {
    setIsDeleteConfirmOpen(true);
  };

  // 사용자가 삭제를 확인하면 게시물을 삭제하고 모달을 닫음
  const handleConfirmDelete = () => {
    console.log('게시물을 삭제합니다.');
    setIsOptionOpen(false);
    setIsDeleteConfirmOpen(false);
    // 실제 삭제 로직
  };

  // 사용자가 삭제를 취소하면 모달만 닫음
  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  useEffect(() => {
    fetchSelectedItemData();
  }, [productsId, accessToken]);

  return (
    <>
      <NavBarTitle
        backIcon
        moreIcon
        type="low"
        preTitleClick={handleBackIconClick}
        rightTitleClick={handleMoreIconClick}
      />
      {selectedItem && (
        <DetailSliderPhotos imageList={selectedItem.imageList} />
      )}
      <S.Main>
        <S.SellerInfo>
          <div>{'판매자 정보'}</div>
          <div>{selectedItem?.memberNickName}</div>
        </S.SellerInfo>
        {isMyProduct && (
          <SelectSalesStatus
            salesStatus={selectedItem?.salesStatus}
            onChange={handleSalesStatus}
          />
        )}
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
      {selectedItem && (
        <DetailTapBar
          curProductsId={curProductsId}
          price={selectedItem.price}
          isMyProduct={isMyProduct}
          chatRoomCount={selectedItem.chatRoomCount}
          isWatchlistChecked={selectedItem.isWatchlistChecked}
          onWatchListCheck={handleWatchlistChecked}
        />
      )}
      {isOptionOpen && (
        <S.ModalDim>
          <S.ModalContainer>
            <S.ModalBtns>
              <S.ModalBtn onClick={handleEditModal}>
                <span>게시글 수정</span>
              </S.ModalBtn>
              <S.ModalBtn onClick={handleDeleteModal}>
                <span>삭제</span>
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
            <p>정말로 삭제하겠습니까?</p>
            <S.AlertModalBtns>
              <S.AlertModalBtn onClick={handleConfirmDelete}>
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

export default ItemDetail;
