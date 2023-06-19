import * as S from './styles';

import Icon from '../Icon';

const UploadPhoto = () => {
  const handleDeleteBtnClink = () => {
    console.log('이미지를 삭제합니다.');
  };

  return (
    <S.Main>
      <S.UploadPhotoContainer>
        <S.UploadIcon>
          <Icon name="camera" />
          <span>0 / 10</span>
        </S.UploadIcon>
        <S.Photos>
          <S.PhotoElement>
            <S.Photo src="https://dnvefa72aowie.cloudfront.net/origin/article/202306/c211c2306522eaa60a6dce97665df82b8e076590f2627dad6b05d6cee82c0d6f_0.webp?q=82&s=300x300&t=crop" />
            <S.DeleteBtn onClick={handleDeleteBtnClink}>
              <Icon name="x" width="20" height="20" fill="white" />
            </S.DeleteBtn>
          </S.PhotoElement>
          <S.PhotoElement>
            <S.Photo src="https://dnvefa72aowie.cloudfront.net/origin/article/202306/c211c2306522eaa60a6dce97665df82b8e076590f2627dad6b05d6cee82c0d6f_0.webp?q=82&s=300x300&t=crop" />
            <S.DeleteBtn onClick={handleDeleteBtnClink}>
              <Icon name="x" width="20" height="20" fill="white" />
            </S.DeleteBtn>
          </S.PhotoElement>
          <S.PhotoElement>
            <S.Photo src="https://dnvefa72aowie.cloudfront.net/origin/article/202306/c211c2306522eaa60a6dce97665df82b8e076590f2627dad6b05d6cee82c0d6f_0.webp?q=82&s=300x300&t=crop" />
            <S.DeleteBtn onClick={handleDeleteBtnClink}>
              <Icon name="x" width="20" height="20" fill="white" />
            </S.DeleteBtn>
          </S.PhotoElement>
          <S.PhotoElement>
            <S.Photo src="https://dnvefa72aowie.cloudfront.net/origin/article/202306/c211c2306522eaa60a6dce97665df82b8e076590f2627dad6b05d6cee82c0d6f_0.webp?q=82&s=300x300&t=crop" />
            <S.DeleteBtn onClick={handleDeleteBtnClink}>
              <Icon name="x" width="20" height="20" fill="white" />
            </S.DeleteBtn>
          </S.PhotoElement>
          <S.PhotoElement>
            <S.Photo src="https://dnvefa72aowie.cloudfront.net/origin/article/202306/c211c2306522eaa60a6dce97665df82b8e076590f2627dad6b05d6cee82c0d6f_0.webp?q=82&s=300x300&t=crop" />
            <S.DeleteBtn onClick={handleDeleteBtnClink}>
              <Icon name="x" width="20" height="20" fill="white" />
            </S.DeleteBtn>
          </S.PhotoElement>
          <S.PhotoElement>
            <S.Photo src="https://dnvefa72aowie.cloudfront.net/origin/article/202306/c211c2306522eaa60a6dce97665df82b8e076590f2627dad6b05d6cee82c0d6f_0.webp?q=82&s=300x300&t=crop" />
            <S.DeleteBtn onClick={handleDeleteBtnClink}>
              <Icon name="x" width="20" height="20" fill="white" />
            </S.DeleteBtn>
          </S.PhotoElement>
        </S.Photos>
      </S.UploadPhotoContainer>
    </S.Main>
  );
};

export default UploadPhoto;
