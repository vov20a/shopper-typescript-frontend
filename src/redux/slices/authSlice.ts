import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from '../../axios';
import { StatusFetch } from './orderSlice';



export type FetchAuthParams = {
    userId: string;
    fullName: string;
    password: string;
    email: string;
    avatarUrl: string;
    token: string;
};
export type LoginParams = {
    password: string;
    email: string;
};
export type RegisterParams = {
    fullName: string;
    password: string;
    email: string;
    avatarUrl?: string;
};


export const fetchAuth = createAsyncThunk<FetchAuthParams, LoginParams>('auth/fetchAuth', async (params) => {
    const { data } = await axios.post<FetchAuthParams>('/auth/login', params);
    return data;
});
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get<FetchAuthParams>('/auth/getMe');
    return data;
});
export const fetchRegister = createAsyncThunk<FetchAuthParams, RegisterParams>('auth/fetchRegister', async (params) => {
    const { data } = await axios.post<FetchAuthParams>('/auth/register', params);
    return data;
});



export type AuthSliceState = {
    data: FetchAuthParams;
    status: StatusFetch;
};
const defaultValue = {
    userId: '',
    fullName: '',
    password: '',
    email: '',
    avatarUrl: '',
    token: ''
}
const initialState: AuthSliceState = {
    data: defaultValue,
    status: StatusFetch.loading,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = defaultValue;
        },
        setDefaultAuthStatus: (state, action: PayloadAction<StatusFetch>) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(fetchAuth.pending, (state) => {
            state.data = defaultValue;
            state.status = StatusFetch.loading;
        });
        builder.addCase(fetchAuth.fulfilled, (state, action: PayloadAction<FetchAuthParams>) => {
            state.status = StatusFetch.loaded;
            state.data = action.payload;
            window.localStorage.setItem('token', state.data.token || "");
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.data = defaultValue;
            state.status = StatusFetch.error;
        });
        //register
        builder.addCase(fetchRegister.pending, (state) => {
            state.data = defaultValue;
            state.status = StatusFetch.loading;
        });
        builder.addCase(fetchRegister.fulfilled, (state, action: PayloadAction<FetchAuthParams>) => {
            state.status = StatusFetch.loaded;
            state.data = action.payload;
            window.localStorage.setItem('token', state.data.token || "");
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.data = defaultValue;
            state.status = StatusFetch.error;
        });
        //autoLogin
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = defaultValue;
            state.status = StatusFetch.loading;
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<FetchAuthParams>) => {
            state.status = StatusFetch.loaded;
            state.data = action.payload;
            state.data.token = window.localStorage.getItem('token') || '';
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = defaultValue;
            state.status = StatusFetch.error;
        });
    }
});


export const selectIsAuth = (state: RootState) => Boolean(state.auth.data.token);
export const selectStatus = (state: RootState) => state.auth.status;
export const selectUser = (state: RootState) => state.auth.data || defaultValue;
export const { logout, setDefaultAuthStatus } = authSlice.actions;
export default authSlice.reducer;