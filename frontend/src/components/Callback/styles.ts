import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50%;
`;

export const loadingImg = styled.img`
  width: 100%;
`;

export const loadingText = styled.span`
  ${({ theme }) => theme.typo.title2}
  ${({ theme }) => theme.color.neutralTextWeak}
`;
