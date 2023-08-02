import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { postProducts } from '../../api/product';
import { ACCESS_TOKEN } from '../../constants/login';
import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';

import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';
import UploadPhoto from '../../components/UploadPhoto';
import UploadTitle from '../../components/UploadTitle';
import UploadPrice from '../../components/UploadPrice';
import UploadComment from '../../components/UploadComment';
import UploadLocation from '../../components/UploadLocation';

const SalesMyItemPage = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const navigation = useNavigate();

  const initialPostObject: PostObjectType = {
    title: null,
    price: null,
    content: null,
    categoryId: null,
    locationId: null,
    files: null,
  };
  const [postObject, setPostObject] = useState(initialPostObject);

  const handleUploadComplete = async () => {
    console.log('check');
    const formData = new FormData();

    formData.append('title', postObject.title ?? '');
    if (postObject.price != null) {
      formData.append('price', String(postObject.price));
    }
    formData.append('content', postObject.content ?? '');
    formData.append('categoryId', String(postObject.categoryId) ?? '');
    formData.append('locationId', String(postObject.locationId) ?? '');

    if (postObject.files) {
      postObject.files.forEach((file) => {
        file.forEach((value, name) => {
          formData.append(name, value);
        });
      });
    }

    await postProducts(formData, accessToken);
    navigation(-1);
  };

  const isAllValuesNotNullExceptPrice = (object: PostObjectType) => {
    const { price, ...rest } = object;
    return Object.values(rest).every((value) => value !== null);
  };

  const handleBackIconClick = () => {
    navigation(-1);
  };

  console.log(postObject);

  return (
    <>
      <postSalesItemContext.Provider value={{ postObject, setPostObject }}>
        <S.Main>
          <NavBarTitle
            prevTitle="닫기"
            type="high"
            preTitleClick={handleBackIconClick}
            rightTitleClick={
              isAllValuesNotNullExceptPrice(postObject)
                ? handleUploadComplete
                : undefined
            }
            centerTitle="내 물건 팔기"
            rightTitle="완료"
          />
          <UploadPhoto />
          <UploadTitle />
          <UploadPrice />
          <UploadComment />
        </S.Main>
        <UploadLocation />
      </postSalesItemContext.Provider>
    </>
  );
};

export default SalesMyItemPage;
