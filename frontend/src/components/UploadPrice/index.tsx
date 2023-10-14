import { useState, useContext } from 'react';

import * as S from './styles';

import {
  postSalesItemContext,
  PostObjectType,
} from '../../context/SalesItem/useContext';
import { formatString } from '../../utils/formatNumber';

const UploadPrice = () => {
  const { postObject, setPostObject } = useContext(postSalesItemContext);

  const [inputPrice, setInputPrice] = useState<string>(
    postObject.price ? postObject.price.toString() : '',
  );
  const [formattedPrice, setFormattedPrice] = useState<string>(
    formatString(inputPrice),
  );

  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.currentTarget.value.replace(/[^0-9]/g, '');
    inputValue = inputValue.slice(0, 10);

    const formattedValue = formatString(inputValue);
    setInputPrice(inputValue);
    setPostObject((prevPostObject: PostObjectType) => ({
      ...prevPostObject,
      price: inputValue !== '' ? Number(inputValue) : null,
    }));

    setFormattedPrice(formattedValue);
  };

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
