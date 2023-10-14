import styled from 'styled-components';

export const SliderContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  z-index: 2;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
`;

export const ImageTrack = styled.div<{
  translateX: number;
  imageCount: number;
}>`
  display: flex;
  width: ${(props) => props.imageCount * 100}%;
  transform: translateX(${(props) => props.translateX}%);
  transition: transform 0.3s ease-in-out;
`;

export const SliderTrack = styled.div`
  position: absolute;
  bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px 0 16px;
  align-items: center;
  z-index: 2;
`;

export const SliderImage = styled.img`
  flex: 0 0 auto;
  width: 100%;
  height: 491px;
`;

export const Button = styled.button`
  width: 44px;
  height: 44px;
  font-size: 24px;
  ${({ theme }) => theme.color.neutralTextWeak}
`;

export const ImgNavigate = styled.div`
  width: 44px;
  height: 44px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.color.neutralTextWeak}
`;

export const Dot = styled.div<{ isActive: boolean }>`
  ${({ isActive, theme }) =>
    isActive
      ? `${theme.color.neutralTextStrong}`
      : `${theme.color.neutralTextWeak}`}
`;
