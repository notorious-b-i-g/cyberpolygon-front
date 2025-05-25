import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';
import { VMState, VM } from '@/types';

const initialState: VMState = {
  vms: [],
  currentVM: null,
  isLoading: false,
  error: null,
};

export const createVM = createAsyncThunk('vms/createVM', async (taskId: string) => {
  const response = await api.createVM(taskId);
  return response;
});

export const fetchVM = createAsyncThunk('vms/fetchVM', async (id: string) => {
  const response = await api.getVM(id);
  return response;
});

export const stopVM = createAsyncThunk('vms/stopVM', async (id: string) => {
  await api.stopVM(id);
  return id;
});

export const deleteVM = createAsyncThunk('vms/deleteVM', async (id: string) => {
  await api.deleteVM(id);
  return id;
});

const vmSlice = createSlice({
  name: 'vms',
  initialState,
  reducers: {
    setCurrentVM: (state, action) => {
      state.currentVM = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create VM
      .addCase(createVM.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createVM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vms.push(action.payload);
        state.currentVM = action.payload;
      })
      .addCase(createVM.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка создания VM';
      })
      // Fetch VM
      .addCase(fetchVM.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentVM = action.payload;
      })
      .addCase(fetchVM.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки VM';
      })
      // Stop VM
      .addCase(stopVM.fulfilled, (state, action) => {
        const vm = state.vms.find((v) => v.id === action.payload);
        if (vm) {
          vm.status = 'stopped';
        }
        if (state.currentVM?.id === action.payload) {
          state.currentVM.status = 'stopped';
        }
      })
      // Delete VM
      .addCase(deleteVM.fulfilled, (state, action) => {
        state.vms = state.vms.filter((v) => v.id !== action.payload);
        if (state.currentVM?.id === action.payload) {
          state.currentVM = null;
        }
      });
  },
});

export const { setCurrentVM, clearError } = vmSlice.actions;
export default vmSlice.reducer; 