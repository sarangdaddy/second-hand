import styled from 'styled-components';

export const Main = styled.main`
  margin-top: 16px;
  margin-bottom: 80px;
  padding: 0 16px;
  width: 100%;
`;

export const SellerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 54px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fafafa;
  border-radius: 12px;

  & > div:first-child {
    ${({ theme }) => theme.typo.subhead}
    ${({ theme }) => theme.color.neutralText}
  }

  & > div:last-child {
    ${({ theme }) => theme.typo.subhead}
    ${({ theme }) => theme.color.neutralTextStrong}
  }
`;

export const ModalDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px;
  white-space: pre-line;
  text-align: center;
  width: 95%;
  bottom: 8px;

  :first-child {
    background-color: #f5f5f5b2;
  }

  :last-child {
    margin-top: 8px;
  }
`;

export const ModalBtns = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalBtn = styled.button`
  display: flex;
  -webkit-box-align: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-top: 1px solid rgba(179, 179, 179, 0.39);

  span {
    font-size: 24px;
  }

  :first-child {
    border-right: 1px solid rgba(179, 179, 179, 0.39);
    color: #007aff;
  }

  :nth-child(2) {
    color: red;
  }
`;

export const AlertModalDim = styled.div`
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

export const AlertModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  white-space: pre-line;
  text-align: center;

  p {
    padding: 20px;
  }
`;

export const AlertModalBtns = styled.div`
  display: flex;
`;

export const AlertModalBtn = styled.button`
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
