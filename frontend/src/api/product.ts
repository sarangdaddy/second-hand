import { axiosInstanceWithoutBearer, axiosInstanceWithBearer } from './axios';

// http://localhost:8080/api/products?locationId=1&categoryId=1&page=20 물품 데이터 요청 예시

export const getProductsNoLogin = async (
  locationId: number | undefined,
  categoryId: string | undefined,
) => {
  let url = `/api/products?`;

  if (locationId !== undefined) {
    url += `locationId=${locationId}`;
    if (categoryId !== undefined) {
      url += '&';
    }
  }
  if (categoryId !== undefined) {
    url += `categoryId=${categoryId}`;
  }

  const res = await axiosInstanceWithoutBearer.get(url);
  return res;
};

export const getProducts = async (
  token: string | null,
  locationId?: number,
  categoryId?: string,
) => {
  const params = [];

  if (locationId !== undefined) {
    params.push(`locationId=${locationId}`);
  }
  if (categoryId !== undefined) {
    params.push(`categoryId=${categoryId}`);
  }

  const url = `/api/products?${params.join('&')}`;

  const res = await axiosInstanceWithBearer.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const postProducts = async (
  formData: FormData,
  token: string | null,
) => {
  try {
    const res = await axiosInstanceWithBearer.post(`/api/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      console.log('POST 요청이 성공적으로 완료되었습니다.');
    } else {
      console.log('POST 요청이 실패하였습니다.');
    }
  } catch (error) {
    console.log('POST 요청 중 오류가 발생하였습니다.', error);
  }
};

export const getProductsDetail = async (
  productsId: string | undefined,
  token: string | null,
) => {
  if (!productsId) {
    throw new Error('productsId is undefined');
  }

  const res = await axiosInstanceWithBearer.get(`/api/products/${productsId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getMyProducts = async (token: string | null) => {
  const res = await axiosInstanceWithBearer.get(`/api/products/myProducts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getWatchProducts = async (token: string | null) => {
  const res = await axiosInstanceWithBearer.get(
    `/api/products/myWatchProducts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const patchProductsStatus = async (
  token: string | null,
  selectedOption: string,
  productsId: string | undefined,
) => {
  const encodedSelectedOption = encodeURIComponent(selectedOption);
  const res = await axiosInstanceWithBearer.patch(
    `/api/products/${productsId}/${encodedSelectedOption}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res;
};

export const deleteProducts = async (
  token: string | null,
  productsId: string | undefined,
) => {
  const res = await axiosInstanceWithBearer.delete(
    `/api/products/${productsId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res;
};
