import { Category, FoundMenu } from "../types/data";

export const categoriesLS = (): Category[] => {
  const data = localStorage.getItem('categories');
  const items: Category[] = data ? JSON.parse(data) : [];

  return items;
};
export const itemsLS = (): FoundMenu => {
  const data = localStorage.getItem('items');
  const items: FoundMenu = data ? JSON.parse(data) : { nodes: [] };

  return items;
};
