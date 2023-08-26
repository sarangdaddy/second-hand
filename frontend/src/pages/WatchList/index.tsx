import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN } from '../../constants/login';
import useAsync from '../../hooks/useAsync';
import { getCategory } from '../../api/category';

import * as S from './styles';
import { Category, Item } from '../../context/types';
import { getWatchProducts } from '../../api/product';
import { ITEM_DETAIL } from '../../constants/routeUrl';
import NavBarTitle from '../../components/NavBarTitle';
import SecondHandItem from '../../components/SecondHandItem';

const WatchListPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const { data } = useAsync(getCategory);
  const categoryList = data?.data;
  const [myWatchList, setMyWatchList] = useState<Item[]>();
  const isResultEmpty: boolean = myWatchList?.length === 0;

  const fetchWatchListData = async () => {
    const { data: myWatchList } = await getWatchProducts(accessToken);
    setMyWatchList(myWatchList.data);
  };

  const handleItemClick = (productId: number) => {
    navigate(`${ITEM_DETAIL}/${productId}`);
  };

  useEffect(() => {
    fetchWatchListData();
  }, []);

  return (
    <>
      <NavBarTitle type="high" centerTitle="관심 목록" />
      <div className="MyWatchListContainer">
        <div className="CategoryFilter" />
        {!isResultEmpty ? (
          <S.ItemsContainer>
            {myWatchList?.map((item: Item) => {
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
          <S.Empty>관심 내역이 없습니다.</S.Empty>
        )}
      </div>
    </>
  );
};

export default WatchListPage;
