import {combineReducers, configureStore} from "@reduxjs/toolkit";
import playerReducer from "./reducers/PlayerSlice"
import timerReducer from "./reducers/TimerSlice"

const rootReducer = combineReducers({
  playerReducer,
  timerReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']