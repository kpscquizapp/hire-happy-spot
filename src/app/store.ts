import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/userAuth";
import {loginApi} from "./queries/loginApi";
import { jobApi } from "./queries/jobApi";



const store = configureStore({
  reducer: {
    user: userAuth,
    [loginApi.reducerPath]: loginApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      jobApi.middleware
   
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
