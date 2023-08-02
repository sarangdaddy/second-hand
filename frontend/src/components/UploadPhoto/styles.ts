import styled from 'styled-components';

export const UploadPhotoContainer = styled.div`
  margin-top: 66px;
  display: flex;
  border-bottom: solid 1px rgba(179, 179, 179, 0.39);
  padding-bottom: 16px;
`;

export const UploadInput = styled.input`
  display: none;
  margin-top: 16px;
`;

export const UploadIcon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-right: 16px;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 12px;
  margin-top: 5px;
  ${({ theme }) => theme.color.neutralBorder}

  span {
    margin-top: 10px;
  }
`;

export const Photos = styled.div`
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PhotoElement = styled.div`
  position: relative;
  margin-top: 5px;
`;

export const Photo = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  border-radius: 12px;

  ${({ theme }) => theme.color.neutralBorder}
`;

export const DeleteBtn = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -5px;
  right: 10px;
`;

export const MainPhoto = styled.div`
  position: absolute;
  bottom: 5px;
  width: 80px;
  height: 24px;
  margin-right: 16px;
  border-radius: 0 0 12px 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.color.neutralOveray};
  ${({ theme }) => theme.color.accentText};
  ${({ theme }) => theme.typo.caption2};
`;

export const ModalDim = styled.div`
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

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  white-space: pre-line;
  text-align: center;

  p {
    padding: 20px;
  }
`;

export const ModalBtns = styled.div`
  display: flex;
`;

export const ModalBtn = styled.button`
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
