import { useNavigate } from 'react-router-dom';

import NavBarTitle from '../../components/NavBarTitle';
import UploadPhoto from '../../components/UploadPhoto';

const SalesItemPage = () => {
  const navigation = useNavigate();

  const handleBackIconClick = () => {
    navigation(-1);
  };
  const checkTheMoreClick = () => {
    console.log('완료 버튼을 클릭했습니다.');
  };

  return (
    <>
      <NavBarTitle
        prevTitle="닫기"
        type="low"
        preTitleClick={handleBackIconClick}
        rightTitleClick={checkTheMoreClick}
        centerTitle="내 물건 팔기"
        rightTitle="완료"
      />
      <UploadPhoto />
    </>
  );
};

export default SalesItemPage;
