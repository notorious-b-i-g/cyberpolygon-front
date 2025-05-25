import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../types/task';
import api from '../../services/api';

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await api.get('/tasks');
    return response.data;
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  }
);

export const submitTaskSolution = createAsyncThunk(
  'tasks/submitSolution',
  async ({ taskId, solution }: { taskId: string; solution: string }) => {
    const response = await api.post(`/tasks/${taskId}/submit`, { solution });
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения заданий';
      })
      // Fetch Task By Id
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения задания';
      })
      // Submit Task Solution
      .addCase(submitTaskSolution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTaskSolution.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentTask) {
          state.currentTask.progress = action.payload.progress;
        }
        const taskIndex = state.tasks.findIndex(task => task.id === action.payload.taskId);
        if (taskIndex !== -1) {
          state.tasks[taskIndex].progress = action.payload.progress;
        }
      })
      .addCase(submitTaskSolution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка отправки решения';
      });
  },
});

export const { clearError, clearCurrentTask } = tasksSlice.actions;
export default tasksSlice.reducer; 