import styled from 'styled-components';

export const ItemsContainer = styled.ul`
  padding-bottom: 80px; /* TabBar의 높이만큼 조정 */
  padding-top: 4px;
`;

export const Empty = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100%;
  ${({ theme }) => theme.color.neutralTextWeak}
`;
