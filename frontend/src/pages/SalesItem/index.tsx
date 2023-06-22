import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';
import * as S from './styles';
import NavBarTitle from '../../components/NavBarTitle';
import UploadPhoto from '../../components/UploadPhoto';
import UploadTitle from '../../components/UploadTitle';
import UploadPrice from '../../components/UploadPrice';

const SalesItemPage = () => {
  const navigation = useNavigate();

  const handleBackIconClick = () => {
    navigation(-1);
  };

  const initialPostObject: PostObjectType = {
    title: null,
    price: null,
    content: '',
    categoryId: null,
    locationId: 18,
    productImageUrls: [],
    formData: null,
  };
  const [postObject, setPostObject] = useState(initialPostObject);

  const handleUploadComplete = async () => {
    const formData = new FormData();

    formData.append('title', postObject.title ?? '');
    formData.append('price', String(postObject.price) ?? '');
    formData.append('content', postObject.content ?? '');
    formData.append('categoryId', String(postObject.categoryId) ?? '');
    formData.append('locationId', String(postObject.locationId) ?? '');

    postObject.formData?.forEach((file) => {
      formData.append('productImageUrls', file);
    });

    console.log(Array.from(formData.entries()));

    try {
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg3MTAyMjc1LCJleHAiOjE2ODg5MDIyNzV9.AhaCUeK_M_Ph3dVTf4VCceB-Wk2AWp1ukYdP5G4VpCU';

      const response = await axios.post(
        'http://52.79.159.39:8080/api/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        console.log('POST 요청이 성공적으로 완료되었습니다.');
      } else {
        console.log('POST 요청이 실패하였습니다.');
      }
    } catch (error) {
      console.log('POST 요청 중 오류가 발생하였습니다.', error);
    }
  };

  return (
    <S.Main>
      <postSalesItemContext.Provider value={{ postObject, setPostObject }}>
        <NavBarTitle
          prevTitle="닫기"
          type="low"
          preTitleClick={handleBackIconClick}
          rightTitleClick={handleUploadComplete}
          centerTitle="내 물건 팔기"
          rightTitle="완료"
        />
        <UploadPhoto />
        <UploadTitle />
        <UploadPrice />
      </postSalesItemContext.Provider>
    </S.Main>
  );
};

export default SalesItemPage;
