import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/config';

export const loginUser = createAsyncThunk(
  'admin/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${config?.baseURL}/admin/login`, userData);
      console.log(response, 'response');
      localStorage.setItem('token', response.data.token); // Store the JWT token in localStorage
      return {
        ...response.data,
        message: response?.data?.message || 'Login Successful',
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error.response?.data?.error?.message || error?.message || 'Login failed',
        status: error.response?.statusCode,
      });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    success: null,
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.success = null; // clear success message
      state.error = null; // clear error message if any
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages, logoutUser } = authSlice.actions;
export default authSlice.reducer;
