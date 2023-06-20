import { axiosInstanceWithoutBearer } from './axios';

export const getProducts = async () => {
  const res = await axiosInstanceWithoutBearer.get(`/api/products?`);

  return res;
};
