import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';
import NavBarTitle from '../../components/NavBarTitle';
import UploadPhoto from '../../components/UploadPhoto';
import * as S from './styles';
import UploadTitle from '../../components/UploadTitle';

const SalesItemPage = () => {
  const navigation = useNavigate();

  const handleBackIconClick = () => {
    navigation(-1);
  };

  const initialPostObject: PostObjectType = {
    title: null,
    price: null,
    content: null,
    categoryId: null,
    locationId: null,
    memberId: null,
    productImageUrls: [],
  };
  const [postObject, setPostObject] = useState(initialPostObject);

  console.log('POST 보낼 데이터 내용', postObject);

  //TODO: POST API완성되면 수정
  const handleUploadComplete = () => {
    console.log('POST 요청을 보냅니다.', postObject);
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
      </postSalesItemContext.Provider>
    </S.Main>
  );
};

export default SalesItemPage;
