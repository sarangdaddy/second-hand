import * as S from './styles';

interface DropdownPanelProps {
  option: string;
  onClickNonOption?: () => Promise<void> | undefined;
  onClickOption?: () => void | undefined;
  isLastPanel?: boolean;
}

const DropdownPanel = ({
  option,
  onClickNonOption,
  onClickOption,
  isLastPanel,
}: DropdownPanelProps) => {
  const handleClick = () => {
    if (onClickNonOption) {
      onClickNonOption();
    } else if (onClickOption) {
      onClickOption();
    }
  };

  return (
    <S.DropdownPanel onClick={handleClick} isLastPanel={isLastPanel}>
      <S.OptionTitle isLastPanel={isLastPanel}>{option}</S.OptionTitle>
    </S.DropdownPanel>
  );
};

export default DropdownPanel;
