import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from '../../axios';
import { IOrderItems, IOrderResult } from '../../types/data';
import { AxiosResponse } from 'axios';


export const fetchOrder = createAsyncThunk<IOrderResult, IOrderItems>('orders/fetchOrder', async (params) => {
    const { data } = await axios.post<IOrderResult>('/order', { ...params, products: params.cartProducts });
    if (data) {
        await axios.post<AxiosResponse<string> | { error: any }, any>('/mail', { email: params.email, message: params.message });
    }
    return data;
});
// export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async () => {
//   const { data } = await axios.get('/orders');
//   return data;
// });

// export const fetchOrdersCount = createAsyncThunk('orders/fetchOrdersCount', async () => {
//   const { data } = await axios.get('/orders/count');
//   return data;
// });
export enum StatusFetch {
    loading = "LOADING",
    loaded = "LOADED",
    error = "ERROR",
}

interface IOrderSliceState {
    orders: IOrderResult[];
    ordersStatus: StatusFetch,
}

const initialState: IOrderSliceState = {
    orders: [],
    ordersStatus: StatusFetch.loading,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setDefaultOrderStatus: (state, action: PayloadAction<StatusFetch>) => {
            state.ordersStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        //create one order
        builder.addCase(fetchOrder.pending, (state) => {
            state.orders = [];
            state.ordersStatus = StatusFetch.loading;
        });

        builder.addCase(fetchOrder.fulfilled, (state, action: PayloadAction<IOrderResult>) => {
            state.orders = [...state.orders, action.payload];
            state.ordersStatus = StatusFetch.loaded;
        });

        builder.addCase(fetchOrder.rejected, (state) => {
            state.orders = [];
            state.ordersStatus = StatusFetch.error;
        });

        //get All orders
        // [fetchAllOrders.pending]: (state) => {
        //   state.orders = [];
        //   state.ordersStatus = 'loading';
        // },
        // [fetchAllOrders.fulfilled]: (state, action) => {
        //   state.orders = action.payload;
        //   state.ordersStatus = 'loaded';
        // },
        // [fetchAllOrders.rejected]: (state) => {
        //   state.orders = [];
        //   state.ordersStatus = 'error';
        // },
        //get count of orders
        // [fetchOrdersCount.pending]: (state) => {
        //   state.ordersStatus = 'loading';
        //   state.ordersCount = 0;
        // },
        // [fetchOrdersCount.fulfilled]: (state, action) => {
        //   state.ordersCount = action.payload;
        //   state.ordersStatus = 'loaded';
        // },
        // [fetchOrdersCount.rejected]: (state) => {
        //   state.ordersCount = 0;
        //   state.ordersStatus = 'error';
        // },
    },
});
export const selectOrderStatus = (state: RootState) => state.order.ordersStatus

export const { setDefaultOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
