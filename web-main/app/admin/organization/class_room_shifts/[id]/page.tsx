'use client'
import StudentClassShiftList from "@/modules/accounts/student_class_shift/components/student_class_shift.list";
import { StudentShiftStatus } from "@/modules/accounts/student_class_shift/student_class_shift.enum";
import TeacherClassShiftList from "@/modules/accounts/teacher_class_shift/components/teacher_class_shift.list";
import ClassRoomShiftDetail from "@/modules/organization/class_room_shift/components/class_room_shift.detail";
import { useParams } from "next/navigation";

export default function ClassRoomShift(){
    const params = useParams()
    const id = params.id as string

    return <div className="flex flex-col gap-4">
        <ClassRoomShiftDetail id={id} />
        <TeacherClassShiftList class_room_shift={id} has_action={false} />
        <StudentClassShiftList class_room_shift={id} status={StudentShiftStatus.ACTIVE} has_action={false} />
        </div>
}