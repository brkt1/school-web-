import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "@/modules/accounts/student/student.model";

const initialState = {} as Student;

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
      getStudent: (state: Student, action: PayloadAction<Student>) => {
          state = action.payload;
          return state;
      },
      removeStudent: (state: Student) => {
          state = {} as Student;
          return state;
      },
  },
});

export default studentSlice.reducer;
export const { getStudent, removeStudent } = studentSlice.actions;