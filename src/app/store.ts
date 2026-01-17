import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/userAuth";
import { loginApi } from "./queries/loginApi";
import { profileApi } from "./queries/profileApi";

const store = configureStore({
  reducer: {
    user: userAuth,
    [loginApi.reducerPath]: loginApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([loginApi.middleware, profileApi.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
