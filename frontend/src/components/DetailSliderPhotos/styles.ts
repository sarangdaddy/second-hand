import styled from 'styled-components';

export const SliderContainer = styled.div`
  display: flex;
  position: relative;
  height: 491px;
  width: 100%;
`;

// export const ImageContainer = styled.div<{ translateX: number }>`
//   transform: translateX(${(props) => props.translateX}%);
//   transition: transform 0.5s ease-in-out; // 트랜지션 효과 적용
// `;

export const SliderTack = styled.div`
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
`;

export const SliderImage = styled.img`
  width: 100%;
  object-fit: cover;
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
