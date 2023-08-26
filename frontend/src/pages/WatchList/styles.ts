import styled from 'styled-components';

export const ItemsContainer = styled.div`
  margin-top: 96px;
  padding-bottom: 80px; /* TabBar의 높이만큼 조정 */
`;

export const Empty = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100%;
  ${({ theme }) => theme.color.neutralTextWeak}
`;

export const Categories = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-bottom: 8px;
  width: 100%;
  padding: 0 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Category = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  flex-shrink: 0;
  border: 1px solid rgba(179, 179, 179, 0.39);
  border-radius: 50px;
  margin-right: 4px;

  background: #ffffff;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  background: ${({ isActive }) => (isActive ? '#FF9500' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#000000')};
`;
