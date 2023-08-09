import styled from 'styled-components';

export const DetailItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  ${({ theme }) => theme.typo.headline}
  ${({ theme }) => theme.color.neutralTextStrong}
  margin-bottom: 8px;
`;

export const SubTitle = styled.div`
  ${({ theme }) => theme.typo.footnote}
  ${({ theme }) => theme.color.neutralTextWeak}
  margin-bottom: 16px;
`;

export const Content = styled.div`
  ${({ theme }) => theme.typo.body}
  ${({ theme }) => theme.color.neutralText}
  margin-bottom: 16px;
`;

export const CountInfo = styled.div`
  ${({ theme }) => theme.typo.footnote}
  ${({ theme }) => theme.color.neutralTextWeak}
`;

export const ChatRoomCount = styled.span``;
export const WatchListCount = styled.span``;
export const LookUpCount = styled.span``;
