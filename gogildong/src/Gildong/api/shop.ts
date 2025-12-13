import axiosInstance from '@/common/api/axiosInstance';

type BuyItemRequest = {
    itemId: number;
};

export const getAllItem = async (type: string) => {
  const { data } = await axiosInstance.get(`/itmes?type=${type}`);
  return data;
};

export const buyItem = async (payload: BuyItemRequest) => {
    await axiosInstance.post("/items/me", payload);
}