import { create } from 'zustand';
import axios from 'axios';

import type { PostType } from './types';

type Store = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  mode: 'counter' | 'test';
  posts: PostType[];
  fetchPosts: () => void;
};

const useStore = create<Store>((set) => ({
  count: 0,
  mode: 'counter',
  increment: () => set((state: Store) => ({ count: state.count + 1 })),
  decrement: () => set((state: Store) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  posts: [],
  fetchPosts: async () => {
    try {
      const response = await axios.get<PostType[]>('https://jsonplaceholder.typicode.com/posts');
      set({ posts: response.data });
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  },
}));

export default useStore;
