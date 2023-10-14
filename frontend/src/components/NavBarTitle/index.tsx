import * as S from './styles';

import Icon from '../Icon';

interface NavBarTitleProps {
  prevTitle?: string;
  centerTitle?: string;
  rightTitle?: string;
  backIcon?: boolean;
  moreIcon?: boolean;
  type: string;
  preTitleClick?: () => void;
  rightTitleClick?: () => void;
  children?: React.ReactNode;
}

const NavBarTitle = ({
  prevTitle,
  centerTitle,
  rightTitle,
  backIcon = false,
  moreIcon = false,
  type,
  preTitleClick,
  rightTitleClick,
  children,
}: NavBarTitleProps) => {
  return (
    <S.NavBarContainer type={type}>
      <S.NavBarBody>
        <S.PrevTitle>
          <S.PrevTitleContents onClick={preTitleClick}>
            {backIcon && <Icon name={'chevronLeft'} />}
            {prevTitle && <span>{prevTitle}</span>}
          </S.PrevTitleContents>
        </S.PrevTitle>
        <S.CenterTitle>
          {centerTitle && <span>{centerTitle}</span>}
        </S.CenterTitle>
        <S.RightTitle>
          <S.RightTitleContents
            onClick={rightTitleClick}
            disabled={!rightTitleClick}
          >
            {rightTitle && <span>{rightTitle}</span>}
            {moreIcon && <Icon name={'ellipsis'} />}
          </S.RightTitleContents>
        </S.RightTitle>
      </S.NavBarBody>
      {children}
    </S.NavBarContainer>
  );
};

export default NavBarTitle;
