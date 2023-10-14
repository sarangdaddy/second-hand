import { useNavigate } from 'react-router-dom';

import useAsync from '../../hooks/useAsync';
import { getCategory } from '../../api/category';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';
import { PostObjectType } from '../../context/SalesItem/useContext';

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
    const targetElement = event.target as Element;
    const closestLiElement = targetElement.closest('li');

    if (closestLiElement) {
      const clickedCategoryId = Number(
        closestLiElement.getAttribute('data-key'),
      );

      const storedPostObject = localStorage.getItem('postObject');

      if (storedPostObject) {
        const parsedPostObject: PostObjectType = JSON.parse(storedPostObject);
        parsedPostObject.categoryId = clickedCategoryId; // 카테고리 ID만 업데이트
        localStorage.setItem('postObject', JSON.stringify(parsedPostObject)); // 로컬 스토리지에 저장
      }
    }

    navigate(-1);
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
