import styled from 'styled-components';

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
