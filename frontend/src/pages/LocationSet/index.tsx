import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import * as S from './styles';

import NavBarTitle from '../../components/NavBarTitle';
import { LOCATION } from '../../constants/routeUrl';
import { getLocation } from '../../api/location';
import useAsync from '../../hooks/useAsync';

interface Location {
  locationId: string;
  locationDetails: string;
  locationShortening: string;
  isMainLocation: boolean;
}

export const LocationSetPage = () => {
  const navigate = useNavigate();

  const { data } = useAsync(getLocation);
  const locationList = data?.data;
  console.log(locationList);

  const handelBackClick = () => {
    navigate(LOCATION);
  };

  return (
    <>
      <NavBarTitle
        type="high"
        prevTitle="닫기"
        preTitleClick={handelBackClick}
      />
      <S.Main>
        <ul>
          {locationList?.map((location: Location) => (
            <li key={location.locationId}>
              <span>{location.locationDetails}</span>
            </li>
          ))}
        </ul>
      </S.Main>
    </>
  );
};
