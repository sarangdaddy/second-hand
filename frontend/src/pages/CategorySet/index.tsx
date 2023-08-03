import { useNavigate } from 'react-router-dom';

import useAsync from '../../hooks/useAsync';
import { getCategory } from '../../api/category';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';

interface Category {
  categoryId: number;
  title: string;
  categoryImgUrl: string;
}

export const CategorySetPage = () => {
  const navigate = useNavigate();
  const { data } = useAsync(getCategory);
  const categoryList = data?.data;

  const handleAddCategory = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.target);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <NavBarTitle
        prevTitle="닫기"
        preTitleClick={handleBackClick}
        centerTitle="카테고리"
        type="high"
        backIcon
      />
      <S.Main>
        <ul onClick={(event) => handleAddCategory(event)}>
          {categoryList?.map((category: Category) => (
            <S.Category
              key={category.categoryId}
              data-key={category.categoryId}
            >
              <span>{category.title}</span>
            </S.Category>
          ))}
        </ul>
      </S.Main>
    </>
  );
};
