import { create } from 'zustand';
import type { PostType, UserType } from './types';
import { postCategories } from './types';
import axios from 'axios';

type Store = {
  posts: PostType[];
  users: UserType[];
  textSearch: string;
  selectedCategory: string;
  loadingPosts: boolean;
  loadingUsers: boolean;
  currentPage: number;
  perPage: number;
  totalPages: number;
  fetchPostsAbortController: AbortController | null;
  fetchUsersAbortController: AbortController | null;
  fetchPosts: () => Promise<void>;
  fetchUsers: () => Promise<void>;
};

const useStore = create<Store>((set, get) => ({
  posts: [],
  users: [],
  textSearch: '',
  selectedCategory: 'all',
  loadingPosts: false,
  loadingUsers: false,
  currentPage: 1,
  perPage: 40,
  totalPages: 1,
  fetchPostsAbortController: null,
  fetchUsersAbortController: null,
  fetchPosts: async () => {
    try {
      // Abort previous request if any
      if (get().fetchPostsAbortController !== null) {
        get().fetchPostsAbortController?.abort('Operation canceled due to new request.');
      }

      const fetchPostsAbortController = new AbortController();
      set({ fetchPostsAbortController });

      const page = get().currentPage;
      const perPage = get().perPage;

      set({ loadingPosts: true });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.get<PostType[]>(
        `https://jsonplaceholder.typicode.com/posts?_limit=${perPage}&_page=${page}`,
        { signal: fetchPostsAbortController.signal }
      );

      const responsePosts = response.data;
      const totalPages = Math.ceil(Number(response.headers['x-total-count']) / perPage);
      set({ totalPages, posts: [] }); // Clear posts immediately for better UI feedback

      for (const post of responsePosts) {
        const randomCategory =
          postCategories[Math.floor(Math.random() * postCategories.length)];
        post.category = randomCategory;
      }

      set({ posts: responsePosts });
    } catch (error: any) {
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        console.log('Request canceled');
      } else {
        console.error('Error fetching posts:', error);
      }
    } finally {
      set({ loadingPosts: false, fetchPostsAbortController: null });
    }
  },
  fetchUsers: async () => {
    try {
      if (get().fetchUsersAbortController !== null) {
        get().fetchUsersAbortController?.abort('Operation canceled due to new request.');
      }

      const fetchUsersAbortController = new AbortController();
      set({ fetchUsersAbortController });

      const response = await axios.get<UserType[]>(`https://jsonplaceholder.typicode.com/users`, { signal: fetchUsersAbortController.signal });
      set({ users: response.data });
    } catch (error: any) {
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        console.log('Request canceled');
      } else {
        console.error('Error fetching users:', error);
      }
    } finally {
      set({ loadingUsers: false, fetchUsersAbortController: null });
    }
  },
}));

export default useStore;
