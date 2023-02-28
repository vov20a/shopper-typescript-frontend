import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState } from '../store';
import { Category } from '../../types/data';
import { setProductsCount } from './productSlice';

export enum SortItemEnum {
    RATING = "rating",
    TITLE = "title",
    PRICE = "price"
}
export type Sort = {
    name: string;
    sortProperty: SortItemEnum | string;
}

export type Product = {
    _id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    productUrl: string;
    categoryId: Category;
    category?: Category[];
    sizes?: number[];
    colors?: string[];
}

export const fetchSearchProductsCount = createAsyncThunk<number, { search: string }>(
    'products/fetchProductsCount',
    async ({ search }, thunkAPI) => {
        const { data } = await axios.get<number>(`/products/count/?search=${search}`);
        thunkAPI.dispatch(setProductsCount(data));
        return data;
    },
);

export const fetchSearchProducts = createAsyncThunk<Product[], { search: string | undefined, limit: number, startProduct: number, sort: string }>(
    'products/fetchProducts',
    async (
        { search, limit, startProduct, sort }, thunkAPI
    ) => {
        const { data } = await axios.get<Product[]>(`/products/?search=${search}&startProduct=${startProduct}&limit=${limit}&sort=${sort}`);
        return data;
    },
);


interface FilterSliceState {
    products: Product[];
    productsStatus: string;
    search: string;
    sort: Sort;
}

const initialState: FilterSliceState = {
    products: [],
    productsStatus: 'loading',
    search: '',
    sort: {
        name: '',
        sortProperty: '',
    }
};
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSort: (state, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchProducts.pending, (state) => {
            state.products = [];
            state.productsStatus = 'loading';
        });
        builder.addCase(fetchSearchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.productsStatus = 'loaded';
        });
        builder.addCase(fetchSearchProducts.rejected, (state) => {
            state.products = [];
            state.productsStatus = 'error';
        });
    },
});

export const selectSearchProducts = (state: RootState) => state.filter.products;
export const selectSearchStatus = (state: RootState) => state.filter.productsStatus;
export const selectSearch = (state: RootState) => state.filter.search
export const selectSort = (state: RootState) => state.filter.sort

export const { setSearch } = filterSlice.actions
export const { setSort } = filterSlice.actions

export default filterSlice.reducer;