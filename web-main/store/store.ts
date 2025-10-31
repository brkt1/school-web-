import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import studentReducer from "./slices/studentSlices";
import teacherReducer from "./slices/teacherSlices";
import loadingReducer from "./slices/loadingSlices";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      loading: loadingReducer,
      student: studentReducer,
      teacher: teacherReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

