import { create } from 'zustand';
import { getMyCoin } from '../api/getMyCoin';

type CoinStore = {
  coin: number | null;
  isLoading: boolean;
  fetchCoin: () => Promise<void>;
};

export const useCoinStore = create<CoinStore>((set) => ({
  coin: null,
  isLoading: false,

  fetchCoin: async () => {
    set({ isLoading: true });
    try {
      const data = await getMyCoin();
      set({ coin: data.coin, isLoading: false });
    } catch (e) {
      console.error('Coin load error: ', e);
      set({ isLoading: false });
    }
  }
}));
