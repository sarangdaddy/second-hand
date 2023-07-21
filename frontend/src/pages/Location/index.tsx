import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/Auth';
import * as S from './styles';

import NavBarTitle from '../../components/NavBarTitle';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

interface Location {
  locationId: string;
  locationDetails: string;
  locationShortening: string;
  isMainLocation: boolean;
}

export const Location = () => {
  const navigate = useNavigate();

  const loggedInUserData = useAuthContext();
  const curLocationData = loggedInUserData.userInfo.locationDatas;

  // API 추가되면 삭제해야함.
  const defaultLocation = [
    {
      locationId: '18',
      locationDetails: '서울특별시 강남구 역삼1동',
      locationShortening: '역삼1동',
      isMainLocation: true,
    },
    {
      locationId: '12',
      locationDetails: '서울특별시 강남구 삼성1동',
      locationShortening: '삼성1동',
      isMainLocation: false,
    },
  ];

  const handelBackClick = () => {
    navigate(-1);
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
            {defaultLocation.map((location) => (
              <Button
                key={location.locationId}
                spaceBetween
                fullWidth
                active={location.isMainLocation}
              >
                <span>{location.locationShortening}</span>
                <S.deleteButton>
                  <Icon
                    name="x"
                    width="18"
                    height="20"
                    fill={location.isMainLocation ? 'white' : 'black'}
                  />
                </S.deleteButton>
              </Button>
            ))}
            {defaultLocation.length === 1 && (
              <Button fullWidth>
                <Icon name="symbol" width="13" height="20" fill="black" />
                <span>동네 추가</span>
              </Button>
            )}
          </S.BtnContainer>
        </S.LocationContainer>
      </S.Main>
    </>
  );
};
