import { axiosInstanceWithoutBearer } from './axios';

export const postLogin = async (code: string | null) => {
  if (!code) throw new Error("Code couldn't be null");

  const res = await axios.post(`${BASE_URL}/api/oauth2/login`, {
    code: code,
    // TODO (시저) : github 상수로 빼기
    platform: 'github',
  });

  return res;
};
