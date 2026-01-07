import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type UserState = {
  token: string | null;
  refreshToken: string | null;
  menus: any[];
  userDetails: {
    id?: string;
    email?: string;
    role?: string;
    customer_id?: string;
    [key: string]: any;
  } | null;
};

const initialState: UserState = {
  token: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo") || "{}").token || null
    : null,
  refreshToken: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo") || "{}").refreshToken || null
    : null,
  menus: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo") || "{}").menus ||[]:[],
  userDetails: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo") || "{}").userDetails || null
    : null,
};




export const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, refreshToken, userDetails , menus} = action.payload;
      const payloadToStore = { token, refreshToken, userDetails , menus };
      Cookies.set("userInfo", JSON.stringify(payloadToStore), { expires: 15 });
      state.token = token;
      state.refreshToken = refreshToken;
      state.userDetails = userDetails;
      state.menus = menus
    },
    removeUser: () => {
      Cookies.remove("userInfo");
      window.location.reload();
    },
    setNewAccessToken: (state, action) => {
      Cookies.set("userInfo", JSON.stringify({ ...state, token: action.payload }), { expires: 15 });
    },
  },
});

export const { setUser, removeUser,setNewAccessToken } = userAuth.actions;

export default userAuth.reducer;