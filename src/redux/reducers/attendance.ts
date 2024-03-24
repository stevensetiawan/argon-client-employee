import { FetchState } from '@/enums/Fetch';
import { fetchAttendances } from '@/networks/attendance';
import type { AppState } from '@/redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Attendance } from '@/types/attendance';
import type { APIResponse } from '@/types/response';

export interface AttendanceState {
  status: FetchState;
  attendances?: Attendance[];
}

const initialState: AttendanceState = {
  status: FetchState.IDLE,
};

export const getAttendances = createAsyncThunk('attendace/attendances-list', async (_, { rejectWithValue, signal }) => {
  const token = localStorage.getItem('custom-auth-token');
  try {
    const response: APIResponse<Attendance[]> = await fetchAttendances({ token }, signal);
    if (response.code !== 200) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    if (!error.response) throw error;

    return rejectWithValue(error.response);
  }
});

export const AttendanceSlice = createSlice({
  name: 'Attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAttendances.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(getAttendances.fulfilled, (state, action) => {
        state.status = FetchState.IDLE;
        state.attendances = action.payload.data;
      })
      .addCase(getAttendances.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const selectAttendance = (state: AppState) => state.attendance;

export default AttendanceSlice.reducer;
