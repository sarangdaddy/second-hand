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
