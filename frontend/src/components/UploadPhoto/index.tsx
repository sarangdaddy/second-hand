import { useState, ChangeEvent, useRef } from 'react';

import * as S from './styles';
import Icon from '../Icon';

interface UploadedImage {
  id: string;
  imageUrl: string;
}

const UploadPhoto = () => {
  const [uploadedCount, setUploadedCount] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteBtnClick = () => {
    console.log('이미지를 삭제합니다.');
  };

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newUploadedImage: UploadedImage = {
        id: Date.now().toString(),
        imageUrl,
      };
      setUploadedImages((prevImages) => [...prevImages, newUploadedImage]);
      setUploadedCount((prevCount) => prevCount + 1);
    }
  };

  const handleUploadIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <S.Main>
      <S.UploadPhotoContainer>
        <S.UploadIcon onClick={handleUploadIconClick}>
          <Icon name="camera" />
          <span>{uploadedCount} / 10</span>
          <S.UploadInput
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            ref={fileInputRef}
          />
        </S.UploadIcon>
        <S.Photos>
          {uploadedImages.map((image) => (
            <S.PhotoElement key={image.id}>
              <S.Photo src={image.imageUrl} />
              <S.DeleteBtn onClick={handleDeleteBtnClick}>
                <Icon name="x" width="20" height="20" fill="white" />
              </S.DeleteBtn>
            </S.PhotoElement>
          ))}
        </S.Photos>
      </S.UploadPhotoContainer>
    </S.Main>
  );
};

export default UploadPhoto;
