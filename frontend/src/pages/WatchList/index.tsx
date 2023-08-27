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
  const { data } = useAsync(getCategory);
  const allCategoryList: Category[] = data?.data;
  const [myWatchList, setMyWatchList] = useState<Item[]>();
  const [filteredMyWatchList, setFilteredMyWatchList] = useState<Item[]>();
  const isResultEmpty: boolean = myWatchList?.length === 0;
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  // 첫 렌더링에서 내가 관심 등록한 물품들의 카테고리 리스트를 가져온다.
  const myWatchListCategories = [
    {
      categoryId: 0,
      title: '전체',
      categoryListAll: '',
    },
    ...(allCategoryList?.filter((category) =>
      myWatchList?.some((item) => item.categoryTitle === category.title),
    ) || []),
  ];

  // 특정 카테고리를 선택하면 해당 카테고리 관련 아이템으로 필터링 한다.
  const handleCategoryChoice = (categoryId: number, title: string) => {
    if (categoryId === 0) {
      setFilteredMyWatchList(myWatchList);
      setSelectedCategoryId(categoryId);
      return;
    }

    const chosenCategoryItems = myWatchList?.filter(
      (item) => item.categoryTitle === title,
    );

    setFilteredMyWatchList(chosenCategoryItems);
    setSelectedCategoryId(categoryId);
  };

  const handleItemClick = (productId: number) => {
    navigate(`${ITEM_DETAIL}/${productId}`);
  };

  // 첫 렌더링에서 내가 관심 등록한 상품 리스트를 불러온다.
  const fetchWatchListData = async () => {
    const { data: myWatchList } = await getWatchProducts(accessToken);
    setMyWatchList(myWatchList.data);
    setFilteredMyWatchList(myWatchList.data);
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
              onClick={() =>
                handleCategoryChoice(category.categoryId, category.title)
              }
              isActive={selectedCategoryId === category.categoryId}
            >
              {category.title}
            </S.Category>
          ))}
        </S.Categories>
      </NavBarTitle>
      {!isResultEmpty ? (
        <S.ItemsContainer>
          {filteredMyWatchList?.map((item: Item) => {
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
        <S.Empty>관심 상품이 없습니다.</S.Empty>
      )}
    </>
  );
};

export default WatchListPage;
