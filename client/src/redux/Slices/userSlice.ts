import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  uni: string[];
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  uni: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.uni = action.payload.uni;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.uni = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
