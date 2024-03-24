import { FetchState } from '@/enums/Fetch';
import { fetchCreateEmployee, fetchDetailEmployee, fetchEmployees, fetchUpdateEmployee } from '@/networks/employee';
import type { AppState } from '@/redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Employee, EmployeeParams } from '@/types/employee';
import type { APIResponse } from '@/types/response';

export interface EmployeeState {
  status: FetchState;
  employee?: Employee;
  employees?: Employee[];
}

const initialState: EmployeeState = {
  status: FetchState.IDLE,
};

export const createEmployee = createAsyncThunk('employee/create', async (data: EmployeeParams, { rejectWithValue }) => {
  const token = localStorage.getItem('custom-auth-token');
  try {
    const response: APIResponse<Employee> = await fetchCreateEmployee({ data, token });
    if (response.code !== 200) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    if (!error.response) throw error;
    return rejectWithValue(error.response);
  }
});

export const updateEmployee = createAsyncThunk('employee/update', async (data: EmployeeParams, { rejectWithValue }) => {
  const token = localStorage.getItem('custom-auth-token');
  try {
    const response: APIResponse<Employee> = await fetchUpdateEmployee({ data, token });
    if (response.code !== 200) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    if (!error.response) throw error;
    return rejectWithValue(error.response);
  }
});

export const detailEmployee = createAsyncThunk('employee/detail', async (data: number, { rejectWithValue }) => {
  const token = localStorage.getItem('custom-auth-token');
  try {
    const response: APIResponse<Employee> = await fetchDetailEmployee({ data, token });
    if (response.code !== 200) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    if (!error.response) throw error;
    return rejectWithValue(error.response);
  }
});

export const getEmployees = createAsyncThunk('employee/employees-list', async (_, { rejectWithValue, signal }) => {
  const token = localStorage.getItem('custom-auth-token');
  try {
    const response: APIResponse<Employee[]> = await fetchEmployees({ token }, signal);
    if (response.code !== 200) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    if (!error.response) throw error;

    return rejectWithValue(error.response);
  }
});

export const EmployeeSlice = createSlice({
  name: 'Employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.status = FetchState.IDLE;
      })
      .addCase(createEmployee.rejected, (state) => {
        state.status = FetchState.FAILED;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.status = FetchState.IDLE;
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.status = FetchState.FAILED;
      })
      .addCase(detailEmployee.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(detailEmployee.fulfilled, (state, action) => {
        state.status = FetchState.IDLE;
        state.employee = action.payload.data;
      })
      .addCase(detailEmployee.rejected, (state) => {
        state.status = FetchState.FAILED;
      })
      .addCase(getEmployees.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = FetchState.IDLE;
        state.employees = action.payload.data;
      })
      .addCase(getEmployees.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const selectEmployee = (state: AppState) => state.employee;

export default EmployeeSlice.reducer;
