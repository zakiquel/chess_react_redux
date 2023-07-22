import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Time {
  whiteMinutes: number;
  whiteSeconds: number;
  blackMinutes: number;
  blackSeconds: number;
}

const initialState: Time = {
  whiteMinutes: 30,
  whiteSeconds: 0,
  blackMinutes: 30,
  blackSeconds: 0,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setWhiteTimer(state, action: PayloadAction<{min: number, sec: number}>) {
      state.whiteMinutes = action.payload.min;
      state.whiteSeconds = action.payload.sec;
    },
    setBlackTimer(state, action: PayloadAction<{min: number, sec: number}>) {
      state.blackMinutes = action.payload.min;
      state.blackSeconds = action.payload.sec;
    },
    setWhiteSeconds(state, action: PayloadAction<number>) {
      state.whiteSeconds = action.payload;
    },
    setWhiteMinutes(state, action: PayloadAction<number>) {
      state.whiteMinutes = action.payload;
    },
    setBlackSeconds(state, action: PayloadAction<number>) {
      state.blackSeconds = action.payload;
    },
    setBlackMinutes(state, action: PayloadAction<number>) {
      state.blackMinutes = action.payload;
    }
  }
})

export default timerSlice.reducer;