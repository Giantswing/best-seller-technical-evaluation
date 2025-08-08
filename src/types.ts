export type PostType = {
  id: number;
  title: string;
  body: string;
  userId: number;
  category: string;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const postCategories = ['all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
