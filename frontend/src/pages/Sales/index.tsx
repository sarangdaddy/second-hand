import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMyProducts } from '../../api/product';
import { ACCESS_TOKEN } from '../../constants/login';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';
import { MyItemTap } from '../../components/MyItemsTap';
import { Item } from '../../context/types';
import SecondHandItem from '../../components/SecondHandItem';
import { ITEM_DETAIL } from '../../constants/routeUrl';

const SalesPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const [myItemList, setMyItemList] = useState<Item[]>([]);
  const [selected, setSelected] = useState('판매중');

  const isResultEmpty: boolean = myItemList?.length === 0;

  const fetchProductsData = async () => {
    const { data: myProductsData } = await getMyProducts(accessToken);
    const curMyItemList = myProductsData?.data.filter((item: Item) => {
      return selected === '판매중'
        ? item.salesStatus === '판매중' || item.salesStatus === '예약중'
        : item.salesStatus === selected;
    });

    setMyItemList(curMyItemList);
  };

  const handleSelectBtn = (status: string) => {
    setSelected(status);
  };

  const handleItemClick = (productId: number) => {
    navigate(`${ITEM_DETAIL}/${productId}`);
  };

  useEffect(() => {
    fetchProductsData();
  }, [selected]);

  return (
    <>
      <NavBarTitle type="high" centerTitle="판매 내역">
        <MyItemTap status={selected} onChange={handleSelectBtn} />
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
        <S.Empty>판매 내역이 없습니다.</S.Empty>
      )}
    </>
  );
};

export default SalesPage;
