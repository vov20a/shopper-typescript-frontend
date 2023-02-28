import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { categoriesLS, itemsLS } from '../../utils/categoriesLS';
import { RootState } from '../store';
import { createItems } from '../../utils/createItems';
import { Category, FoundMenu, } from '../../types/data';




export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const { data } = await axios.get<Category[]>('/categories');
  return data;
});


export type CategorySliceState = {
  categories: Category[];
  categoriesStatus: string;
  items: FoundMenu;
  activeClass?: string;
}

const initialState: CategorySliceState = {
  categories: categoriesLS(),
  categoriesStatus: 'loading',
  items: itemsLS(),
  activeClass: '',
};
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setActiveClass: (state, action: PayloadAction<string>) => {
      state.activeClass = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesStatus = 'loading';
      window.localStorage.setItem('categories', '');
      state.categories = [];
      window.localStorage.setItem('items', '');
      state.items = { nodes: [] };
    });
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.categoriesStatus = 'loaded';
      window.localStorage.setItem('categories', JSON.stringify(state.categories));
      state.items = createItems(state.categories)
      window.localStorage.setItem('items', JSON.stringify(state.items));
    });

    builder.addCase(fetchCategories.rejected, (state) => {
      window.localStorage.setItem('categories', '');
      window.localStorage.setItem('items', '');
      state.categories = [];
      state.items = { nodes: [] };
      state.categoriesStatus = 'error';
    });
  }
});

export const selectCategories = (state: RootState) => state.category.categories;
export const selectStatus = (state: RootState) => state.category.categoriesStatus;
export const selectItems = (state: RootState) => state.category.items;
export const selectActiveClass = (state: RootState) => state.category.activeClass;

export const { setActiveClass } = categorySlice.actions;

export default categorySlice.reducer;
