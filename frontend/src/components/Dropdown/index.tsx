import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';

import DropdownPanel from './DropdownPanel';
import Icon from '../Icon';
import { ACCESS_TOKEN } from '../../constants/login';
import { patchMainLocation } from '../../api/member';
import { LOCATION } from '../../constants/routeUrl';

interface Location {
  locationId: string;
  locationDetails: string;
  locationShortening: string;
  isMainLocation: boolean;
}

interface DropdownProps {
  options: Location[];
  isSetLocationOption: boolean;
  isReverse: boolean;
  fetchUserData?: () => Promise<void> | undefined;
}

const Dropdown = ({
  options,
  isSetLocationOption,
  isReverse,
  fetchUserData,
}: DropdownProps) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  console.log(options);

  const mainLocation =
    options.find((locationIndo) => locationIndo.isMainLocation)
      ?.locationShortening || undefined;

  // TODO : 다른 곳 클릭하면 드롭다운 닫기 옵션 추가하기
  const [isOpen, setIsOpen] = useState(false);

  const handleFetchUserData = async (index: number) => {
    console.log(index);

    // TODO : 유저 정보 변경하는 API 필요
    await patchMainLocation(accessToken, index);

    if (fetchUserData) {
      fetchUserData();
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // TODO(sarang_daddy) : "내 동네 변경하기" 기능 추후 추가 필요
  const handleChangeOptionClick = () => {
    setIsOpen(false);
    navigate(LOCATION);
  };

  return (
    <S.DropdownContainer>
      <S.DropdownWrapper />
      <S.DropdownHeader onClick={toggleDropdown}>
        <S.SelectedOption>{mainLocation}</S.SelectedOption>
        {isReverse === false && <Icon name={'chevronDown'} width="17" />}
      </S.DropdownHeader>
      {isOpen && (
        <S.PanelContainer isReverse={isReverse}>
          {options.map((option, index) => (
            <DropdownPanel
              key={index}
              option={option.locationShortening}
              onClickNonOption={
                options.length === 1
                  ? undefined
                  : () => handleFetchUserData(index)
              }
            />
          ))}
          {isSetLocationOption && (
            <DropdownPanel
              key={2}
              option={'내 동네 변경하기'}
              onClickOption={handleChangeOptionClick}
              isLastPanel={true}
            />
          )}
        </S.PanelContainer>
      )}
    </S.DropdownContainer>
  );
};

export default Dropdown;
