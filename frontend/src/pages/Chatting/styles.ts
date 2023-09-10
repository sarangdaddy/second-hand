import styled from 'styled-components';

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
    ${({ theme }) => theme.color.systemBackgroundWeak}
  }

  :last-child {
    margin-top: 8px;
  }
`;

export const ModalBtn = styled.button<{ btnType?: 'delete' }>`
  display: flex;
  -webkit-box-align: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-top: 1px solid rgba(179, 179, 179, 0.39);

  span {
    ${({ theme }) => theme.typo.title2}
    ${({ theme }) => theme.color.systemDefault}
  }

  ${({ btnType, theme }) =>
    btnType === 'delete' && `span {${theme.color.systemWarning}}`}
`;

export const ModalBtns = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:only-child) ${ModalBtn}:last-child span {
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
