import styled from 'styled-components';

interface NavBarContainerProps {
  type: string;
}

interface RightTitleContentsProps {
  disabled: boolean;
}

export const NavBarContainer = styled.div<NavBarContainerProps>`
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0;
  background-color: ${({ type }) => {
    const opacityList: Record<string, string> = {
      low: 'rgba(255, 255, 255, 0)',
      medium: 'rgba(255, 255, 255, 0.8)',
      high: 'rgba(255, 255, 255, 1)',
    };
    return opacityList[type] || opacityList['high'];
  }};

  border-bottom: ${({ type }) => {
    const opacityList: Record<string, string> = {
      low: 'solid 1px transparent',
      medium: 'solid 1px #b3b3b3',
      high: 'solid 1px #b3b3b3',
    };
    return opacityList[type] || opacityList['high'];
  }};

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 3;
`;

export const NavBarBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 11px 16px 11px;
`;

export const PrevTitle = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typo.body}
  ${({ theme }) => theme.color.neutralTextStrong}
`;
export const CenterTitle = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typo.headline}
  ${({ theme }) => theme.color.neutralTextStrong}
`;
export const RightTitle = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${({ theme }) => theme.typo.body}
  ${({ theme }) => theme.color.neutralTextStrong}
`;

export const PrevTitleContents = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const RightTitleContents = styled.div<RightTitleContentsProps>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;
