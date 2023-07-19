import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';

import NavBarHome from '../../components/NavBarHome';
import SecondHandItem from '../../components/SecondHandItem';
import ErrorPage from '../Error';
import { CATEGORY, ITEM_DETAIL, SALES_ITEM } from '../../constants/routeUrl';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { getProducts } from '../../api/product';
import { ACCESS_TOKEN } from '../../constants/login';
import { getMembers } from '../../api/member';
import { defaultLocation } from '../../constants/defaultValues';

interface Location {
  locationId: string;
  locationDetails: string;
  locationShortening: string;
  isMainLocation: boolean;
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
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const [curLocationDatas, setCurLocationDatas] = useState<Location[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [isUserLogin, setIsUserLogin] = useState<boolean>(true);

  // 사용자 정보에서 location 가져오기
  const fetchUserDataRef = useRef<() => Promise<void> | undefined>(async () => {
    const { data: userData } = await getMembers(accessToken);
    const userLocationDatas = userData?.data?.locationDatas || defaultLocation;

    userLocationDatas === defaultLocation
      ? setIsUserLogin(false)
      : setIsUserLogin(true);

    setCurLocationDatas(userLocationDatas);
  });

  const fetchUserData = fetchUserDataRef.current;

  // location정보에서 locationID로 물품 리스트 가져오기
  const fetchProductsData = async () => {
    console.log(curLocationDatas);
    const curLoactionId =
      curLocationDatas.find((locationInfo) => locationInfo.isMainLocation)
        ?.locationId || undefined;

    console.log(curLoactionId);
    const { data: productsData } = await getProducts(curLoactionId);
    setItemList(productsData?.data);
  };

  useEffect(() => {
    fetchUserData();
  }, [accessToken]);

  useEffect(() => {
    fetchProductsData();
  }, [curLocationDatas]);

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
        userLocationDatas={curLocationDatas}
        isUserLogin={isUserLogin}
        fetchUserData={fetchUserData}
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
          <Icon name="symbol" width="18" height="20" />
        </Button>
      </S.ButtonPosition>
    </>
  );
};

export default HomePage;
