import { useState, useContext, useEffect } from 'react';

import * as S from './styles';

import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';
import { formatString } from '../../utils/formatNumber';

const UploadPrice = () => {
  const { postObject, setPostObject } = useContext(postSalesItemContext);
  const [inputPrice, setInputPrice] = useState<string>('');
  const [formattedPrice, setFormattedPrice] = useState<string>('');

  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.currentTarget.value.replace(/[^0-9]/g, '');
    inputValue = inputValue.slice(0, 10);

    const formattedValue = formatString(inputValue);
    setInputPrice(inputValue);
    setFormattedPrice(formatString(formattedValue));
  };

  useEffect(() => {
    setPostObject((prevPostObject: PostObjectType) => ({
      ...prevPostObject,
      price: inputPrice !== '' ? Number(inputPrice) : null,
    }));
    setFormattedPrice(inputPrice);
  }, [inputPrice]);

  useEffect(() => {
    if (postObject.price) {
      const localStoragePrice = postObject.price.toString();
      setInputPrice(localStoragePrice);
    }
  }, [postObject]);

  return (
    <>
      <S.UploadPrice>
        <S.Title>
          <S.InputPrice
            placeholder="₩ 가격 (선택사항)"
            type="text"
            pattern="^[0-9]*$"
            onChange={handlePriceInput}
            value={inputPrice}
          />
          {inputPrice !== '' && (
            <S.FormattedPrice>₩ {formattedPrice} 원</S.FormattedPrice>
          )}
        </S.Title>
      </S.UploadPrice>
    </>
  );
};

export default UploadPrice;
