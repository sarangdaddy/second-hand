import styled from 'styled-components';

export const ItemsContainer = styled.div`
  margin-top: 95px;
  padding-bottom: 80px; /* TabBar의 높이만큼 조정 */
`;

export const Empty = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100%;
  ${({ theme }) => theme.color.neutralTextWeak}
`;
