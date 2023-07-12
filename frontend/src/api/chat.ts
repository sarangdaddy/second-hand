import { axiosInstanceWithBearer } from './axios';

export const getRoomsList = async (token: string | null) => {
  try {
    const res = await axiosInstanceWithBearer.get(`/chat/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error('방 생성 에러:', error);
  }
};

export const postNewChatRoom = async (
  token: string | null,
  productId: string,
) => {
  try {
    const res = await axiosInstanceWithBearer.post(
      `/chat/room/create`,
      {
        productId: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data.data.roomId;
  } catch (error) {
    console.error('방 생성 에러:', error);
  }
};
