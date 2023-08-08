import { useState, ChangeEvent, useRef, useContext, useEffect } from 'react';
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
  fileName: string;
  fileSize: number;
}

const UploadPhoto = () => {
  const maxImageCount = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { postObject, setPostObject } = useContext(postSalesItemContext);
  const [uploadedImages, setUploadedImages] = useState<UploadedImageType[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const uploadedCount = uploadedImages.length;

  const handleDeleteBtnClick = (id: string) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id),
    );

    setPostObject((prevPostObject: PostObjectType) => {
      const updatedFiles = prevPostObject.files
        ? prevPostObject.files.filter(
            (_, index) =>
              index !== uploadedImages.findIndex((image) => image.id === id),
          )
        : null;

      return {
        ...prevPostObject,
        files: updatedFiles && updatedFiles.length === 0 ? null : updatedFiles,
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
      const id = uuidv4();
      const fileName = file.name;
      const fileSize = file.size;

      const isDuplicate = uploadedImages.some(
        (image) => image.fileName === file.name && image.fileSize === file.size,
      );

      if (!isDuplicate) {
        const newUploadedImage: UploadedImageType = {
          id,
          imageUrl,
          fileName,
          fileSize,
        };

        setUploadedImages((prevImages) => [...prevImages, newUploadedImage]);

        setPostObject((prevPostObject: PostObjectType) => ({
          ...prevPostObject,
          files: [
            ...(prevPostObject.files || []),
            JSON.stringify(newUploadedImage),
          ],
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

  useEffect(() => {
    if (postObject.files) {
      const images: UploadedImageType[] = [];
      for (const fileItem of postObject.files) {
        const fileData = JSON.parse(fileItem);
        images.push(fileData);
      }
      setUploadedImages(images);
    }
  }, [postObject]);

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
          {uploadedImages.map((image, index) => (
            <S.PhotoElement key={image.id}>
              {index === 0 ? <S.MainPhoto>대표 사진</S.MainPhoto> : null}
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
