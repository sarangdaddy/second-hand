import styled from 'styled-components';

export const DetailTapBarContainer = styled.div`
  ${({ theme }) => theme.color.neutralBackgroundWeak}
  ${({ theme }) => theme.color.neutralBorder}
  display: flex;
  position: fixed;
  bottom: 0px;
  height: 80px;
  justify-content: space-between;
  width: 100%;
  padding: 7px 16px 0 16px;
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  ${({ theme }) => theme.typo.footnote}
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const svgDiv = styled.div`
  display: flex;
`;

export const Price = styled.span`
  ${({ theme }) => theme.typo.footnote}
`;

export const Right = styled.div``;

export const ModalDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  white-space: pre-line;
  text-align: center;

  p {
    padding: 20px;
  }
`;

export const ModalBtns = styled.div`
  display: flex;
`;

export const ModalBtn = styled.button`
  display: flex;
  -webkit-box-align: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-top: 1px solid rgba(179, 179, 179, 0.39);

  span {
    font-size: 16px;
  }

  :first-child {
    border-right: 1px solid rgba(179, 179, 179, 0.39);
  }
`;
