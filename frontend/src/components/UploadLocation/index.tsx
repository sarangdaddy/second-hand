import { useContext, useState, useEffect } from 'react';

import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';
import { useAuthContext } from '../../context/Auth';

import * as S from './styles';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
interface Location {
  locationId: number;
  locationDetails: string;
  locationShortening: string;
  mainLocationState: boolean;
}

const UploadLocation = () => {
  const userData = useAuthContext();
  const isLoggedIn = userData.isLoggedIn;
  const [curLocationData, setCurLocationData] = useState<Location[]>([]);
  const { setPostObject } = useContext(postSalesItemContext);

  const fetchUserData = () => {
    if (isLoggedIn) {
      const userLocationData = userData.userInfo.locationDatas;
      setCurLocationData(userLocationData);
    }
  };

  useEffect(() => {
    const curLocation = curLocationData.find(
      (locationInfo) => locationInfo.mainLocationState === true,
    );

    if (curLocation) {
      const curLocationId = curLocation.locationId;
      setPostObject((prevPostObject: PostObjectType) => ({
        ...prevPostObject,
        locationId: curLocationId,
      }));
    }
  }, [curLocationData]);

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  return (
    <>
      <S.UploadLocationContainer>
        <S.Menu>
          <S.Left>
            <Icon name="slider" width="20" height="18" />
            <Dropdown
              options={curLocationData}
              isSetLocationOption={isLoggedIn}
              isReverse={true}
            />
          </S.Left>
          <S.Right>
            <Icon name="keyboard" width="20" height="18" />
          </S.Right>
        </S.Menu>
      </S.UploadLocationContainer>
    </>
  );
};

export default UploadLocation;
