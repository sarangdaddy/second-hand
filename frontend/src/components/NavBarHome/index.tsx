import * as S from './styles';

import Dropdown from '../Dropdown';
import Icon from '../Icon';

interface Location {
  locationId: string;
  locationDetails: string;
  locationShortening: string;
  isMainLocation: boolean;
}

interface NavBarHomeProps {
  type: string;
  iconOnClick?: () => void;
  userLocationDatas: Location[];
  isLoggedIn: boolean;
  fetchUserData: () => void;
}

const NavBarHome = ({
  type,
  iconOnClick,
  userLocationDatas,
  isLoggedIn,
  fetchUserData,
}: NavBarHomeProps) => {
  return (
    <S.NavBarContainer type={type}>
      <S.NavBarBody>
        <S.ClinkElement>
          <Dropdown
            options={userLocationDatas}
            isSetLocationOption={isLoggedIn}
            isReverse={false}
            fetchUserData={fetchUserData}
          />
        </S.ClinkElement>
        <S.ClinkElement>
          <Icon onClick={iconOnClick} name={'label'} />
        </S.ClinkElement>
      </S.NavBarBody>
    </S.NavBarContainer>
  );
};

export default NavBarHome;
