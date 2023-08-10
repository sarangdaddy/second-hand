import { useState } from 'react';
import * as S from './styles';

interface SecondHandItemProps {
  imageList: string[];
}

const DetailSliderPhotos = ({ imageList }: SecondHandItemProps) => {
  const [imgIndex, setImgIndex] = useState<number>(0);
  const hasNext = imgIndex < imageList.length - 1;
  // const translateX = -imgIndex * 100; // 이미지의 위치 계산

  const handleImgNext = () => {
    hasNext ? setImgIndex(imgIndex + 1) : setImgIndex(0);
  };

  const handleImgPrev = () => {
    imgIndex > 0
      ? setImgIndex(imgIndex - 1)
      : setImgIndex(imageList.length - 1);
  };

  return (
    <>
      <S.SliderContainer>
        {/* <S.ImageContainer translateX={translateX}> */}
        <S.SliderImage src={imageList[imgIndex]} />
        {/* </S.ImageContainer> */}
        <S.SliderTack>
          <S.Button onClick={handleImgPrev}>＜</S.Button>
          <S.ImgNavigate>
            {imageList.map((_, index) => (
              <S.Dot key={index} isActive={index === imgIndex}>
                ●
              </S.Dot>
            ))}
          </S.ImgNavigate>
          <S.Button onClick={handleImgNext}>＞</S.Button>
        </S.SliderTack>
      </S.SliderContainer>
    </>
  );
};

export default DetailSliderPhotos;
