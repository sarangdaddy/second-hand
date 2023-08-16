import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/Auth';
import { getMyProducts } from '../../api/product';
import { ACCESS_TOKEN } from '../../constants/login';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';
import { MyItemsTap } from '../../components/MyItemsTap';
import { Item } from '../../context/types';
import SecondHandItem from '../../components/SecondHandItem';
import { ITEM_DETAIL } from '../../constants/routeUrl';

const SalesPage = () => {
  const navigate = useNavigate();
  const userData = useAuthContext();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const [myItemList, setMyItemList] = useState<Item[]>([]);

  const isResultEmpty: boolean = myItemList?.length === 0;

  const fetchProductsData = async () => {
    const { data: myProductsData } = await getMyProducts(accessToken);
    setMyItemList(myProductsData?.data);
  };

  const handleItemClick = (productId: number) => {
    navigate(`${ITEM_DETAIL}/${productId}`);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <>
      <NavBarTitle type="high" centerTitle="판매 내역">
        <MyItemsTap />
      </NavBarTitle>
      {!isResultEmpty ? (
        <S.ItemsContainer>
          {myItemList?.map((item: Item) => {
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
                  isSetEditOption={true}
                />
              </li>
            );
          })}
        </S.ItemsContainer>
      ) : (
        <span>판매 내역이 없습니다.</span>
      )}
    </>
  );
};

export default SalesPage;
