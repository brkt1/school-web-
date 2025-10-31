"use client";
import { AppState } from "@/store/store";
import { useSelector } from "react-redux";
import TeacherRequestShiftList from "@/modules/accounts/teacher_request_shift/components/teacher_request_shift.list";

export default function RequestShiftPage() {
  const teacher = useSelector((state: AppState) => state.teacher);

  return (
    <>
      <h2 className="text-lg font-bold mt-8 mb-3">Request Shifts</h2>
      <TeacherRequestShiftList teacher={teacher.id} has_action={false} />
    </>
  );
}
