import { useNavigate } from 'react-router-dom';

import * as S from './styles';

import { useAuthContext } from '../../context/Auth';
import NavBarTitle from '../../components/NavBarTitle';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { patchMainLocation, patchMembersLocation } from '../../api/member';
import { ACCESS_TOKEN } from '../../constants/login';
import { HOME } from '../../constants/routeUrl';

interface Location {
  locationId: number;
  locationDetails: string;
  locationShortening: string;
  mainLocationState: boolean;
}

export const LocationPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const loggedInUserData = useAuthContext();
  const curLocationData = loggedInUserData.userInfo.locationDatas;

  console.log(loggedInUserData);

  const handleMainLocation = async (index: number) => {
    console.log('메인 동네 변경');
    /*
    1. 선택한 동네를 메인으로 한다 (메인으로 바꾸는 로직 & API 필요)
    2. 메인으로 바뀌면 홈화면으로 돌아간다.
    */

    // 유저 동네 메인 정보 변경 요청
    await patchMainLocation(accessToken, index);
  };

  const handleDeleteLocation = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('동네 삭제');
    /*
    1. X 버튼을 클릭하면 정말로 삭제 하는지 물어본다.
    2. 삭제를 클릭하면 유저 정보에서 동네가 삭제된다.
    3. 삭제된 유저 정보로 Location 페이지가 재 렌더링 된다.
    (동네 삭제하는 로직 & API 필요 - 동네가 1개만 있으면 삭제 불가 안내)
    */
  };

  const handleAddLocation = async () => {
    console.log('동네 추가');
    /*
    1. 동네 추가를 누르면 동네 선택 페이지로 넘어간다.
    2. 선택된 동네를 가져와서 고객 정보 변경 요청을 보낸다.
    */

    // 동네 리스트 변경 요청 로직
    const locationIdList = [6, 1];
    const mainLocationIndex = 1;
    await patchMembersLocation(accessToken, locationIdList, mainLocationIndex);
  };

  const handelBackClick = () => {
    navigate(HOME);
  };

  return (
    <>
      <NavBarTitle
        type="high"
        prevTitle="닫기"
        preTitleClick={handelBackClick}
        centerTitle="동네 설정"
      />
      <S.Main>
        <S.LocationContainer>
          <S.Signboard>
            <span>지역은 최소 1개,</span>
            <span>최대 2개까지 설정 가능해요.</span>
          </S.Signboard>
          <S.BtnContainer>
            {curLocationData.map((location, index) => (
              <Button
                key={location.locationId}
                spaceBetween
                fullWidth
                active={location.mainLocationState}
                onClick={() => handleMainLocation(index)}
              >
                <span>{location.locationShortening}</span>
                <S.deleteButton onClick={handleDeleteLocation}>
                  <Icon
                    name="x"
                    width="30"
                    height="20"
                    fill={location.mainLocationState ? 'white' : 'black'}
                  />
                </S.deleteButton>
              </Button>
            ))}
            {curLocationData.length === 1 && (
              <Button onClick={handleAddLocation} fullWidth>
                <Icon name="symbol" width="13" height="20" fill="black" />
                <span>동네 추가</span>
              </Button>
            )}
          </S.BtnContainer>
        </S.LocationContainer>
        <button onClick={handleAddLocation}>동네 변경 요청</button>
      </S.Main>
    </>
  );
};
