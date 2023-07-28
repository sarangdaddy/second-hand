import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/Auth';
import * as S from './styles';

import NavBarHome from '../../components/NavBarHome';
import SecondHandItem from '../../components/SecondHandItem';
import ErrorPage from '../Error';
import { CATEGORY, ITEM_DETAIL, SALES_ITEM } from '../../constants/routeUrl';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { getProducts } from '../../api/product';
import { defaultLocation } from '../../constants/defaultValues';

interface Location {
  locationId: number;
  locationDetails: string;
  locationShortening: string;
  mainLocationState: boolean;
}

interface Item {
  productId: number;
  createAt: string;
  title: string;
  salesStatus: '판매중' | '예약중' | '판매완료';
  updatedAt: string;
  price: number | null;
  location: string;
  chatRoomCount: number;
  watchlistCount: number;
  isWatchlistChecked: boolean;
  productMainImgUrl: string;
  isSetEditOption?: boolean;
}

// TODO : 무한 스크롤 구현하기
// TODO : useMemo로 최적화 하기

const HomePage = () => {
  const navigate = useNavigate();
  const userData = useAuthContext();
  const isLoggedIn = userData.isLoggedIn;
  const [curLocationData, setCurLocationData] = useState<Location[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]);

  // 사용자 정보에서 location 가져오기
  const fetchUserData = () => {
    const userLocationData =
      isLoggedIn === true ? userData.userInfo.locationDatas : defaultLocation;

    setCurLocationData(userLocationData);
  };

  // location정보에서 locationID로 물품 리스트 가져오기
  const fetchProductsData = async () => {
    const curLoactionId =
      curLocationData.find((locationInfo) => locationInfo.mainLocationState)
        ?.locationId || undefined;

    const { data: productsData } = await getProducts(curLoactionId);
    setItemList(productsData?.data);
  };

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  useEffect(() => {
    fetchProductsData();
  }, [curLocationData]);

  // TODO : 로딩페이지 만들기
  const isResultEmpty: boolean = itemList?.length === 0;

  const handleIconClick = () => {
    navigate(CATEGORY);
  };

  const handleFABClick = () => {
    navigate(SALES_ITEM);
  };

  const handleItemClick = (productId: number) => {
    navigate(`${ITEM_DETAIL}/${productId}`);
  };

  return (
    <>
      <NavBarHome
        type="medium"
        iconOnClick={handleIconClick}
        userLocationDatas={curLocationData}
        isLoggedIn={isLoggedIn}
        // fetchUserData={fetchUserData}
      />
      {!isResultEmpty ? (
        <div>
          {itemList?.map((item: Item) => {
            return (
              <li
                key={item.productId}
                onClick={() => handleItemClick(item.productId)}
              >
                <SecondHandItem
                  title={item.title}
                  updatedAt={item.updatedAt}
                  salesStatus={item.salesStatus}
                  price={item.price}
                  location={item.location}
                  chatRoomCount={item.chatRoomCount}
                  watchlistCount={item.watchlistCount}
                  isWatchlistChecked={item.isWatchlistChecked}
                  productMainImgUrl={item.productMainImgUrl}
                  isSetEditOption={false}
                />
              </li>
            );
          })}
        </div>
      ) : (
        <ErrorPage />
      )}
      <S.ButtonPosition>
        <Button circle active onClick={handleFABClick}>
          <Icon name="symbol" width="18" height="20" fill="white" />
        </Button>
      </S.ButtonPosition>
    </>
  );
};

export default HomePage;
