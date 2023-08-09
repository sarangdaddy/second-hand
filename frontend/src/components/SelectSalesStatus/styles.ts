import styled from 'styled-components';

interface PanelContainerProps {
  isReverse: boolean;
}

export const Container = styled.div`
  position: relative;
  z-index: 3;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: transparent;
  z-index: 2;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px 0 16px;
  width: 106px;
  height: 32px;
  border-radius: 8px;

  ${({ theme }) => theme.color.neutralBorder}
  justify-content: space-around;
`;

export const SelectedOption = styled.div`
  ${({ theme }) => theme.typo.caption1}
`;

export const PanelContainer = styled.div<PanelContainerProps>`
  position: absolute;
  width: 106px;
  ${({ theme }) => theme.color.neutralBackground}
  ${({ theme }) => theme.color.neutralBorderStrong}
  border-radius: 12px;
  margin-top: 4px;

  bottom: ${({ isReverse }) => (isReverse ? '80px' : 'none')};
`;
