import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN } from '../../constants/login';
import useAsync from '../../hooks/useAsync';
import { getCategory } from '../../api/category';

import * as S from './styles';
import { Category, Item } from '../../constants/types';
import { getWatchProducts } from '../../api/product';
import { ITEM_DETAIL } from '../../constants/routeUrl';
import NavBarTitle from '../../components/NavBarTitle';
import SecondHandItem from '../../components/SecondHandItem';

const WatchListPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const [myWatchList, setMyWatchList] = useState<Item[]>();
  const isResultEmpty: boolean = myWatchList?.length === 0;
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const { data } = useAsync(getCategory);
  const categoryList: Category[] = data?.data;
  const myWatchListCategories = [
    {
      categoryId: 0,
      title: '전체',
    },
    ...(categoryList?.filter((category) =>
      myWatchList?.some((item) => item.categoryTitle === category.title),
    ) || []),
  ];

  const handleCategoryChoice = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

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
      <NavBarTitle type="high" centerTitle="관심 목록">
        <S.Categories>
          {myWatchListCategories?.map((category) => (
            <S.Category
              key={category.categoryId}
              onClick={() => handleCategoryChoice(category.categoryId)}
              isActive={selectedCategoryId === category.categoryId}
            >
              {category.title}
            </S.Category>
          ))}
        </S.Categories>
      </NavBarTitle>
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
    </>
  );
};

export default WatchListPage;
