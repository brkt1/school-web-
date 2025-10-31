import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Teacher } from "@/modules/accounts/teacher/teacher.model";

const initialState = {} as Teacher;

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
      getTeacher: (state: Teacher, action: PayloadAction<Teacher>) => {
          state = action.payload;
          return state;
      },
      removeTeacher: (state: Teacher) => {
          state = {} as Teacher;
          return state;
      },
  },
});

export default teacherSlice.reducer;
export const { getTeacher, removeTeacher } = teacherSlice.actions;