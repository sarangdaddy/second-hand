import { useState } from 'react';

import * as S from './styles';

import Icon from '../Icon';
import SelectPanel from './SelectPanel';

interface selectSalesStatusProps {
  salesStatus: '판매중' | '예약중' | '판매완료' | undefined;
  onChange: (value: string) => void;
}

const SelectSalesStatus = ({
  salesStatus,
  onChange,
}: selectSalesStatusProps) => {
  const options = ['판매중', '예약중', '판매완료'];
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      {isOpen === true && <S.Wrapper onClick={toggleDropdown} />}
      <S.Container>
        <S.Header onClick={toggleDropdown}>
          <S.SelectedOption>{salesStatus}</S.SelectedOption>
          <Icon name={'chevronDown'} width="14" />
        </S.Header>
        {isOpen && (
          <S.PanelContainer isReverse={false}>
            {options.map((option, index) => (
              <SelectPanel
                key={index}
                option={option}
                onClickOption={onChange}
                setIsOpen={setIsOpen}
              />
            ))}
          </S.PanelContainer>
        )}
      </S.Container>
    </>
  );
};

export default SelectSalesStatus;
