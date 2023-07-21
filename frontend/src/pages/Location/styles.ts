import styled from 'styled-components';

export const Main = styled.main`
  margin-top: 50px;
  margin-bottom: 80px;
  padding: 0 16px;
  width: 100%;
`;

export const LocationContainer = styled.div``;

export const Signboard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 48px;

  span {
    ${({ theme }) => theme.typo.footnote}
    ${({ theme }) => theme.color.neutralTextStrong}
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const deleteButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
