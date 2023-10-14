import * as S from './styles';

interface SelectPanelProps {
  option: string;
  onClickOption?: (value: string) => void | undefined;
  setIsOpen: (value: boolean) => void;
}

const SelectPanel = ({
  option,
  onClickOption,
  setIsOpen,
}: SelectPanelProps) => {
  const handleClick = (selectedOption: string) => {
    if (onClickOption) {
      onClickOption(selectedOption);
    }
    setIsOpen(false);
  };

  return (
    <S.DropdownPanel onClick={() => handleClick(option)}>
      <S.OptionTitle>{option}</S.OptionTitle>
    </S.DropdownPanel>
  );
};

export default SelectPanel;
