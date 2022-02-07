import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
let initialState = {
  users: "",
};
if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  const newData = JSON.parse(localStorage.getItem("user"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState = newData;
    console.log(initialState);
  }
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, { payload }) => {
      state.users = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    login: (state, { payload }) => {
      state.users = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },

    resetUser: (state) => {
      state.users = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { register, resetUser, login, changePassword } = userSlice.actions;
export default userSlice.reducer;
