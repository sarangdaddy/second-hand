import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ACCESS_TOKEN } from '../../constants/login';
import { useAuthContext } from '../../context/Auth';
import { getProducts, getProductsNoLogin } from '../../api/product';

import * as S from './styles';
import NavBarHome from '../../components/NavBarHome';
import SecondHandItem from '../../components/SecondHandItem';
import ErrorPage from '../Error';
import { CATEGORY, ITEM_DETAIL, SALES_ITEM } from '../../constants/routeUrl';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { defaultLocation } from '../../constants/defaultValues';
import { Item, Location } from '../../context/types';

// TODO : 무한 스크롤 구현하기
// TODO : useMemo로 최적화 하기

const HomePage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const userData = useAuthContext();
  const isLoggedIn = userData.isLoggedIn;
  const [curLocationData, setCurLocationData] = useState<Location[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]);
  const params = useParams();
  const categoryId = params.categoryId;

  const fetchUserData = () => {
    const userLocationData =
      isLoggedIn === true ? userData.userInfo.locationDatas : defaultLocation;

    setCurLocationData(userLocationData);
  };

  const fetchProductsData = async () => {
    const curLocation = curLocationData.find(
      (locationInfo) => locationInfo.mainLocationState === true,
    );
    const curLocationId = curLocation?.locationId;

    if (isLoggedIn === true) {
      const { data: productsData } = await getProducts(
        accessToken,
        curLocationId,
        categoryId,
      );
      setItemList(productsData?.data);
    } else {
      const { data: productsData } = await getProductsNoLogin(
        curLocationId,
        categoryId,
      );
      setItemList(productsData?.data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  useEffect(() => {
    fetchProductsData();
  }, [curLocationData, categoryId]);

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
      />
      {!isResultEmpty ? (
        <S.ItemsContainer>
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
                  watchListCount={item.watchListCount}
                  isWatchlistChecked={item.isWatchlistChecked}
                  productMainImgUrl={item.productMainImgUrl}
                  isSetEditOption={false}
                />
              </li>
            );
          })}
        </S.ItemsContainer>
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
