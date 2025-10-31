import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utils/array";
import { User } from "@/modules/auth/user/user.model";

const initialState = {} as User;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      getUser: (state: User, action: PayloadAction<User>) => {
        action.payload.converted_user_permission = arrayToObject(action.payload.user_permission, 'content_type__model')
          state = action.payload;
          return state;
      },
      removeUser: (state: User) => {
          state = {} as User;
          return state;
      },
      setSize: (state: User, action: PayloadAction<boolean>) => {
        state.isMobile = action.payload
        return state;
      }
  },
});

export default userSlice.reducer;
export const { getUser, removeUser, setSize } = userSlice.actions;