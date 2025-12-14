import axiosInstance from '@/common/api/axiosInstance';

type BuyItemRequest = {
    itemId: number;
};

export const getAllItem = async (type: string) => {
  const { data } = await axiosInstance.get(`/items?type=${type}`);
  return data.items;
};

export const buyItem = async (payload: BuyItemRequest) => {
    await axiosInstance.post("/items/me", payload);
}