import styled from 'styled-components';

interface SecondHandItemProps {
  imageURI: string;
}

export const ItemContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #b3b3b3;
  align-items: center;
  background-color: white;
  width: 100%;
  justify-content: space-between;
`;

export const SellerImg = styled.div<SecondHandItemProps>`
  width: 48px;
  height: 48px;
  background-image: url(${(props) => props.imageURI});
  background-size: contain;
  margin-right: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
  background-size: cover;
  border-radius: 50%;
`;

export const ItemImage = styled.div<SecondHandItemProps>`
  width: 48px;
  height: 48px;
  background-image: url(${(props) => props.imageURI});
  background-size: contain;
  margin-bottom: 16px;
  margin-top: 16px;
  background-size: cover;
  border-radius: 15px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(70%);
`;

export const ColumnTop = styled.div`
  margin-bottom: 4px;
  ${({ theme }) => theme.typo.subhead}
  ${({ theme }) => theme.color.neutralText}
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ColumnBot = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typo.footnote}
  ${({ theme }) => theme.color.neutralText}
`;

export const Price = styled.span`
  ${({ theme }) => theme.typo.headline}
`;
