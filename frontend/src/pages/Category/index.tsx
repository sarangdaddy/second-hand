import { useNavigate } from 'react-router-dom';

import useAsync from '../../hooks/useAsync';
import { getCategory } from '../../api/category';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';
import { Category } from '../../constants/types';

const CategoryPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const { data } = useAsync(getCategory);
  const categoryList = data?.data;

  return (
    <>
      <NavBarTitle
        prevTitle="닫기"
        type="high"
        backIcon
        preTitleClick={handleBackClick}
        centerTitle="카테고리"
      />
      <S.Categories>
        {categoryList?.map((category: Category) => {
          return (
            <S.Category
              key={category.categoryId}
              onClick={() => navigate(`/${category.categoryId}`)}
            >
              <img src={category.categoryImgUrl} width="44" height="44" />
              <span>{category.title}</span>
            </S.Category>
          );
        })}
      </S.Categories>
    </>
  );
};

export default CategoryPage;
