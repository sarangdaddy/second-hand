import { useNavigate } from 'react-router-dom';

import * as S from './styles';

import { useAuthContext } from '../../context/Auth';
import NavBarTitle from '../../components/NavBarTitle';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { patchMembersLocation } from '../../api/member';
import { ACCESS_TOKEN } from '../../constants/login';
import { HOME } from '../../constants/routeUrl';
import { useState } from 'react';

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
  const curLocationsData = loggedInUserData.userInfo.locationDatas;
  const { handleUpdateUserInfo } = useAuthContext();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleFetchUserData = async (index: number) => {
    const mainLocationIndex = curLocationsData.findIndex(
      (location) => location.mainLocationState === true,
    );
    const locationIdList = curLocationsData.map(
      (location) => location.locationId,
    );
    if (mainLocationIndex !== index) locationIdList.reverse();
    await patchMembersLocation(accessToken, locationIdList);
    handleUpdateUserInfo();
    navigate(HOME);
  };

  const handleDelLocation = () => {
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
    // await patchMembersLocation(accessToken, locationIdList, mainLocationIndex);
  };

  const handleOpenModal = (event: React.MouseEvent, location: Location) => {
    event.stopPropagation();
    setSelectedLocation(location.locationShortening);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLocation(null);
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
            {curLocationsData.map((location, index) => (
              <Button
                key={location.locationId}
                spaceBetween
                fullWidth
                active={location.mainLocationState}
                onClick={() => handleFetchUserData(index)}
              >
                <span>{location.locationShortening}</span>
                <S.DeleteButton
                  onClick={(event) => handleOpenModal(event, location)}
                >
                  <Icon
                    name="x"
                    width="30"
                    height="20"
                    fill={location.mainLocationState ? 'white' : 'black'}
                  />
                </S.DeleteButton>
              </Button>
            ))}
            {curLocationsData.length === 1 && (
              <Button onClick={handleAddLocation} fullWidth>
                <Icon name="symbol" width="13" height="20" fill="black" />
                <span>동네 추가</span>
              </Button>
            )}
          </S.BtnContainer>
        </S.LocationContainer>
        <button onClick={handleAddLocation}>동네 변경 요청</button>
        {isModalOpen && (
          <S.ModalDim>
            <S.ModalContainer>
              <p>
                정말로 &apos;{selectedLocation}&apos;을(를) 삭제하시겠습니까?
              </p>
              <S.ModalBtns>
                <S.ModalBtn onClick={handleCloseModal}>
                  <span>취소</span>
                </S.ModalBtn>
                <S.ModalBtn onClick={handleDelLocation}>
                  <span>삭제</span>
                </S.ModalBtn>
              </S.ModalBtns>
            </S.ModalContainer>
          </S.ModalDim>
        )}
      </S.Main>
    </>
  );
};
