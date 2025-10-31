"use client";
import TeacherDetail from "@/modules/accounts/teacher/components/teacher.detail";
import { Teacher } from "@/modules/accounts/teacher/teacher.model";
import useTeacherService from "@/modules/accounts/teacher/teacher.service";
import { UserType } from "@/modules/auth/user/user.enum";
import { AppState } from "@/store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TeacherRequestShift from "../admin/accounts/teacher_request_shifts/[teacher_request_shift_id]/page";
import TeacherRequestShiftList from "@/modules/accounts/teacher_request_shift/components/teacher_request_shift.list";
import TeacherClassShift from "../admin/accounts/teacher_class_shifts/[id]/page";
import TeacherClassShiftList from "@/modules/accounts/teacher_class_shift/components/teacher_class_shift.list";

export default function Home() {
  const user = useSelector((state: AppState) => state.user);
  const teacherService = useTeacherService();
  const [teacherData, setTeacherData] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user.id) {
      teacherService
        .getTeachers({ user: user.id })
        .then((response) => {
          if (response.data.count > 0) {
            setTeacherData(response.data.results[0]); // Assuming first match is valid
          }
        })
        .catch((error) => {
          console.error("Error fetching teachers:", error);
          setError("Failed to fetch teacher data.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user.id]);

  if (user.user_type !== UserType.TEACHER) {
    return (
      <div className="text-red-500">
        {user.user_type} You are not authorized to view this page.
      </div>
    );
  }

  if (loading) {
    return <div className="text-gray-500">Loading teacher data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!teacherData) {
    return (
      <div className="text-yellow-500">
        No teacher data found for this user.
      </div>
    );
  }
  return (
    <>
      <TeacherDetail id={teacherData.id} has_action={false} />
      <h2 className="text-lg font-bold mt-8 mb-3">Request Shifts</h2>
      <TeacherRequestShiftList teacher={teacherData.id} has_action={false} />
        <h2 className="text-lg font-bold mt-8 mb-3">Approved Class Shift</h2>
      <TeacherClassShiftList teacher={teacherData.id} has_action={false} />
    </>
  );
}
