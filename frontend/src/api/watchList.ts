import { axiosInstanceWithBearer } from './axios';

export const postWatchList = async (
  token: string | null,
  productId: string | undefined,
) => {
  const res = await axiosInstanceWithBearer.post(
    `/api/watchlist`,
    {
      productId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const deleteWatchList = async (
  token: string | null,
  productId: string | undefined,
) => {
  const res = await axiosInstanceWithBearer.delete(`/api/watchlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      productId,
    },
  });
  return res;
};
