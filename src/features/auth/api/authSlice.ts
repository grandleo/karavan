import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance from "@/store/axiosInstance";
import {removeToken, setToken} from "@/features/auth/utils/tokenUtil";
import {RootState} from "@/store/store";

interface User {
    id: number;
    name: string;
    role: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: Error | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
}

// Асинхронное действие для входа
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, pin }: { email: string; pin: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/login', { email, pin });
            const { access_token, expires_in } = response.data;
            await setToken(access_token, expires_in);
            const userResponse = await axiosInstance.get('/user');
            return userResponse.data as User;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при входе');
        }
    }
);

// Асинхронное действие для получения текущего пользователя
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get('/user');
        return response.data as User;
    } catch (error: any) {
        return thunkAPI.rejectWithValue('Не удалось получить данные пользователя');
    }
});

// Асинхронное действие для выхода
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axiosInstance.post('/logout');
        removeToken();
        return;
    } catch (error: any) {
        return thunkAPI.rejectWithValue('Ошибка при выходе');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Редюсер для установки пользователя при инициализации приложения
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Обработка login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Обработка fetchUser
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state) => {
            state.user = null;
        });

        // Обработка logout
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
        });
    },
});

export const { setUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;