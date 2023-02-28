import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { cartItemsLS, totalPriceLS } from '../../utils/cartLocalStorage';
import { CartProduct } from '../../types/data';

interface CartSliceState {
    totalPrice: number;
    items: CartProduct[];
    countItem: number;
}

const products: CartProduct[] = cartItemsLS();
const total = totalPriceLS(products);

const initialState: CartSliceState = {
    totalPrice: total ? total : 0,
    items: products ? products : [],
    //при добавлении кол-ва товара > 1
    countItem: 1
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCountItem(state, action: PayloadAction<number>) {
            state.countItem = action.payload;
        },
        addItem(state, action: PayloadAction<CartProduct>) {
            const findItem = state.items.find((item) => item._id === action.payload._id &&
                item.color === action.payload.color &&
                item.size === action.payload.size
            );
            if (findItem?.count) {
                findItem.count += state.countItem;
                state.countItem = 1;
            } else {
                state.items.push({ ...action.payload, count: state.countItem });
                state.countItem = 1;
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                if (item.count) {
                    return item.price * item.count + sum;
                }
                return 0;
            }, 0);
            window.localStorage.setItem('cart', JSON.stringify(state.items))
        },
        minusItem(state, action: PayloadAction<CartProduct>) {
            const findItem = state.items.find((item) => item._id === action.payload._id &&
                item.color === action.payload.color &&
                item.size === action.payload.size
            );
            if (findItem?.count) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                if (item?.count) {
                    return item.price * item.count + sum;
                }
                return 0;
            }, 0);
            window.localStorage.setItem('cart', JSON.stringify(state.items))
        },
        removeItem(state, action: PayloadAction<CartProduct>) {
            state.items = state.items.filter((item) => item._id !== action.payload._id ||
                item.color !== action.payload.color ||
                item.size !== action.payload.size
            );
            state.totalPrice = state.items.reduce((sum, item) => {
                if (item?.count) {
                    return item.price * item.count + sum;
                }
                return 0;
            }, 0);
            window.localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            window.localStorage.removeItem('cart');
        },
    },
});

export const selectCartProducts = (state: RootState) => state.cart.items;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((item) => item._id === id);

export const { addItem, removeItem, clearItems, minusItem, setCountItem } = cartSlice.actions;
export default cartSlice.reducer;