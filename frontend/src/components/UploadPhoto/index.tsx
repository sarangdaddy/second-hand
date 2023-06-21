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
  const maxImageCount = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { postObject, setPostObject } = useContext(postSalesItemContext);
  const [uploadedCount, setUploadedCount] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<UploadedImageType[]>([]);

  const handleDeleteBtnClick = (id: string) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id),
    );
    setUploadedCount((prevCount) => prevCount - 1);

    const deletedImageUrls = uploadedImages
      .filter((image) => image.id !== id)
      .map((image) => image.imageUrl);

    setPostObject((prevPostObject: PostObjectType) => ({
      ...prevPostObject,
      productImageUrls: deletedImageUrls,
    }));
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

      const uploadedImageUrls = [
        ...(postObject?.productImageUrls || []),
        imageUrl,
      ];
      setPostObject((prevPostObject: PostObjectType) => ({
        ...prevPostObject,
        productImageUrls: uploadedImageUrls,
      }));
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
