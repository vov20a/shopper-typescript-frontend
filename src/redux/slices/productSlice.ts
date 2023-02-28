import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState } from '../store';
import { Category } from '../../types/data';

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
    count?: number;
}

export const fetchProductsCount = createAsyncThunk<number, { categoryId: string | undefined }>(
    'products/fetchProductsCount',
    async ({ categoryId }) => {
        //all_id='63ce9a9e790857857298139f'
        if (categoryId === '63ce9a9e790857857298139f') {
            const { data } = await axios.get<number>(`/products/count/`);
            return data;
        } else {
            const { data } = await axios.get<number>(
                `/products/count/?categoryId=${categoryId}`,
            );
            return data;
        }
    },
);

export const fetchProducts = createAsyncThunk<Product[], { categoryId: string | undefined, limit: number, startProduct: number, sort: string }>(
    'products/fetchProducts',
    async (
        { categoryId, limit, startProduct, sort }
    ) => {
        //all_id='63ce9a9e790857857298139f'
        if (categoryId === '63ce9a9e790857857298139f') {
            const { data } = await axios.get<Product[]>(`/products/?startProduct=${startProduct}&limit=${limit}&sort=${sort}`);
            return data;
        } else {
            const { data } = await axios.get<Product[]>(
                `/products/categories/${categoryId}/?startProduct=${startProduct}&limit=${limit}&sort=${sort}`,
            );
            return data;
        }
    },
);


interface ProductSliceState {
    products: Product[];
    productsStatus: string;
    productsCount: number;
    currentPage: number;
}

const initialState: ProductSliceState = {
    products: [],
    productsStatus: 'loading',
    productsCount: 0,
    currentPage: 1,
};
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setProductsCount: (state, action: PayloadAction<number>) => {
            state.productsCount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.products = [];
            state.productsStatus = 'loading';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.productsStatus = 'loaded';
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.products = [];
            state.productsStatus = 'error';

        });

        //count
        builder.addCase(fetchProductsCount.pending, (state) => {
            state.productsStatus = 'loading';
            state.productsCount = 0;
        });
        builder.addCase(fetchProductsCount.fulfilled, (state, action: PayloadAction<number>) => {
            state.productsCount = action.payload;
            state.productsStatus = 'loaded';
        });
        builder.addCase(fetchProductsCount.rejected, (state) => {
            state.productsCount = 0;
            state.productsStatus = 'error';
        });
    },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectStatus = (state: RootState) => state.product.productsStatus;
export const selectProductsCount = (state: RootState) => state.product.productsCount;
export const selectCurrentPage = (state: RootState) => state.product.currentPage;

export const { setCurrentPage } = productSlice.actions
export const { setProductsCount } = productSlice.actions

export default productSlice.reducer;