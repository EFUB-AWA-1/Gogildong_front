import axiosInstance from '@/common/api/axiosInstance';
import { useCharacterStore } from '@/Gildong/stores/useCharacterStore';

type updateMyCharacterRequest = {
  itemId: number;
};

export const getMyCharacterInfo = async () => {
  const { data } = await axiosInstance.get('/characters/me');
  useCharacterStore.getState().setEquippedItems(data.equippedItem);
};

export const updateMyCharacter = async (payload: updateMyCharacterRequest) => {
  await axiosInstance.post('/characters/me', payload);
};

export const getMyClothes = async () => {
  const { data } = await axiosInstance.get('/items/me');
  return data;
};
