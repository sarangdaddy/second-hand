import { useState } from 'react';

import * as S from './styles';

interface SecondHandItemProps {
  imageList: string[];
}

const IMAGE_TRANSLATE_RATIO = 100;

const DetailSliderPhotos = ({ imageList }: SecondHandItemProps) => {
  const [imgIndex, setImgIndex] = useState<number>(0);
  const hasNext = imgIndex < imageList.length - 1;
  const hasPrev = imgIndex > 0;
  const translateX = -imgIndex * IMAGE_TRANSLATE_RATIO;

  const handleImgNext = () => {
    hasNext ? setImgIndex(imgIndex + 1) : null;
  };

  const handleImgPrev = () => {
    hasPrev ? setImgIndex(imgIndex - 1) : null;
  };

  return (
    <>
      <S.SliderContainer>
        <S.GradientOverlay />
        <S.ImageTrack translateX={translateX} imageCount={imageList.length}>
          {imageList.map((image, index) => (
            <S.SliderImage key={index} src={image} />
          ))}
        </S.ImageTrack>
        {imageList.length > 1 && (
          <S.SliderTrack>
            <S.Button onClick={handleImgPrev}>＜</S.Button>
            <S.ImgNavigate>
              {imageList.map((_, index) => (
                <S.Dot key={index} isActive={index === imgIndex}>
                  ●
                </S.Dot>
              ))}
            </S.ImgNavigate>
            <S.Button onClick={handleImgNext}>＞</S.Button>
          </S.SliderTrack>
        )}
      </S.SliderContainer>
    </>
  );
};

export default DetailSliderPhotos;
