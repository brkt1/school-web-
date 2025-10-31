"use client";
import { AppState } from "@/store/store";
import { useSelector } from "react-redux";
import TeacherClassShiftList from "@/modules/accounts/teacher_class_shift/components/teacher_class_shift.list";

export default function ApprovedShiftPage() {
  const teacher = useSelector((state: AppState) => state.teacher);

  return (
    <>
      <h2 className="text-lg font-bold mt-8 mb-3">Approved Shifts</h2>
      <TeacherClassShiftList teacher={teacher.id} has_action={false} />
    </>
  );
}
