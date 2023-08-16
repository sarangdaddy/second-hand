import styled from 'styled-components';

export const TapContainer = styled.div`
  display: flex;
  width: 240px;
  height: 32px;
  border-radius: 8px;
  padding: 2px;
  ${({ theme }) => theme.color.neutralBackgroundBold}
`;

export const TapButton = styled.button<{ selected: boolean }>`
  display: flex;
  width: 118px;
  height: 28px;
  border-radius: 7px;
  border: 1px;

  ${({ selected, theme }) =>
    selected ? theme.color.neutralBackground : theme.color.neutralNone};

  box-shadow: ${({ selected }) =>
    selected ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};

  cursor: pointer;
  justify-content: center;
  align-items: center;
`;
