import { useState, ChangeEvent, useRef, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';

import * as S from './styles';
import Icon from '../Icon';

interface UploadedImageType {
  id: string;
  imageUrl: string;
  file: File;
}

const UploadPhoto = () => {
  const maxImageCount = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setPostObject } = useContext(postSalesItemContext);
  const [uploadedCount, setUploadedCount] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<UploadedImageType[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteBtnClick = (id: string) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id),
    );
    setUploadedCount((prevCount) => prevCount - 1);

    setPostObject((prevPostObject: PostObjectType) => {
      const updatedFiles = prevPostObject.files
        ? prevPostObject.files.filter(
            (_, index) =>
              index !== uploadedImages.findIndex((image) => image.id === id),
          )
        : null;

      return {
        ...prevPostObject,
        files: updatedFiles,
      };
    });
  };

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (uploadedImages.length + files.length > maxImageCount) {
      setModalOpen(true);
      return;
    }

    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      const isDuplicate = uploadedImages.some(
        (image) =>
          image.file.name === file.name && image.file.size === file.size,
      );

      if (!isDuplicate) {
        const newUploadedImage: UploadedImageType = {
          id: uuidv4(),
          imageUrl,
          file,
        };

        setUploadedImages((prevImages) => [...prevImages, newUploadedImage]);
        setUploadedCount((prevCount) => prevCount + 1);

        const formData = new FormData();
        formData.append('productImageUrls', file);

        setPostObject((prevPostObject: PostObjectType) => ({
          ...prevPostObject,
          files: [...(prevPostObject.files || []), formData],
        }));
      }
    });
    event.target.value = '';
  };

  const handleUploadIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
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
            multiple
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
      {isModalOpen && (
        <S.ModalDim>
          <S.ModalContainer>
            <p>사진은 최대 10장까지 등록 가능합니다.</p>
            <S.ModalBtns>
              <S.ModalBtn onClick={handleCloseModal}>
                <span>닫기</span>
              </S.ModalBtn>
            </S.ModalBtns>
          </S.ModalContainer>
        </S.ModalDim>
      )}
    </>
  );
};

export default UploadPhoto;
