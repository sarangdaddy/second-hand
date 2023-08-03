import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import useAsync from '../../hooks/useAsync';
import { getCategory } from '../../api/category';
import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';

import * as S from './styles';
import Icon from '../Icon';
import { CATEGORY_SET } from '../../constants/routeUrl';

interface Category {
  categoryId: number;
  title: string;
  categoryImgUrl: string;
}

const UploadTitle = () => {
  const navigate = useNavigate();
  const { data } = useAsync(getCategory);
  const categoryList: Category[] = data?.data;

  const { postObject, setPostObject } = useContext(postSalesItemContext);

  const [randomCategories, setRandomCategories] = useState<Category[]>([]);
  const [hasInputValue, setHasInputValue] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (hasInputValue !== null && categoryList !== null) {
      const chosenCategory = categoryList?.find(
        (category) => category.categoryId === selectedCategoryId,
      );
      const otherCategories = categoryList?.filter(
        (category) => category.categoryId !== selectedCategoryId,
      );
      const shuffledCategories = otherCategories?.sort(
        () => 0.5 - Math.random(),
      );
      const randomCategories = shuffledCategories?.slice(0, 3);
      if (chosenCategory) {
        setRandomCategories([chosenCategory, ...randomCategories]);
      } else {
        setRandomCategories(randomCategories);
      }
    } else {
      setPostObject((prevPostObject: PostObjectType) => ({
        ...prevPostObject,
        title: null,
        categoryId: null,
      }));
    }
  }, [hasInputValue, categoryList]);

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const hasValue = inputValue !== '';

    if (hasValue) {
      setHasInputValue(inputValue);
    } else {
      setHasInputValue('');
      setRandomCategories([]);
      setSelectedCategoryId(null);
    }

    setPostObject((prevPostObject: PostObjectType) => ({
      ...prevPostObject,
      title: inputValue,
    }));
  };

  const handleCategoryChoice = (categoryId: number) => {
    setSelectedCategoryId(categoryId);

    setPostObject((prevPostObject: PostObjectType) => ({
      ...prevPostObject,
      categoryId: categoryId,
    }));
  };

  const handleAddClick = () => {
    navigate(CATEGORY_SET);
  };

  useEffect(() => {
    if (postObject.title) {
      setHasInputValue(postObject.title);
    }
    if (postObject.categoryId) {
      setSelectedCategoryId(postObject.categoryId);
    }
  }, [postObject]);

  return (
    <>
      <S.UploadTitle>
        <S.Title>
          <S.inputTitle
            placeholder="글제목"
            type="text"
            onChange={handleTitleInput}
            maxLength={30}
            value={hasInputValue}
          />
        </S.Title>
        {hasInputValue && (
          <S.Contents>
            <S.Categories>
              {randomCategories?.map((category) => (
                <S.Category
                  key={category.categoryId}
                  onClick={() => handleCategoryChoice(category.categoryId)}
                  isActive={selectedCategoryId === category.categoryId}
                >
                  {category.title}
                </S.Category>
              ))}
            </S.Categories>
            <S.MoreIcon onClick={handleAddClick}>
              <Icon name="chevronRight" height="11" width="22" />
            </S.MoreIcon>
          </S.Contents>
        )}
      </S.UploadTitle>
    </>
  );
};

export default UploadTitle;
