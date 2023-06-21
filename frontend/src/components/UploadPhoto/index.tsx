import { useState, ChangeEvent, useRef, useContext } from 'react';

import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';
import * as S from './styles';
import Icon from '../Icon';

interface UploadedImageType {
  id: string;
  imageUrl: string;
}

const UploadPhoto = () => {
  const [uploadedCount, setUploadedCount] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<UploadedImageType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxImageCount = 10;
  const { postObject, setPostObject } = useContext(postSalesItemContext);

  const handleDeleteBtnClick = (id: string) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id),
    );
    setUploadedCount((prevCount) => prevCount - 1);
  };

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newUploadedImage: UploadedImageType = {
        id: Date.now().toString(),
        imageUrl,
      };
      setUploadedImages((prevImages) => [...prevImages, newUploadedImage]);
      setUploadedCount((prevCount) => prevCount + 1);

      // TODO(sarang_daddy) : 부모 SalesItem에게 업로드된 이미지 url 전달하기
      setPostObject((prevPostObject: PostObjectType) => {
        return {
          ...prevPostObject,
          productImageUrls: [
            ...(prevPostObject?.productImageUrls || []),
            imageUrl,
          ],
        };
      });
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
          <span>
            {uploadedCount} / {maxImageCount}
          </span>
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
              <S.DeleteBtn onClick={() => handleDeleteBtnClick(image.id)}>
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
