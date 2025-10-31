"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useTeacherShiftService from "../teachershift.service";
import { TeacherShift } from "../teachershift.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Days, Shift } from "@/modules/accounts/student/student.enum";

const TeacherShiftDetail: React.FC<{ id: string }> = ({ id }) => {
  const [teachershift, setTeacherShift] = useState<TeacherShift>();
  const teachershiftService = useTeacherShiftService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    teachershiftService
      .getTeacherShift(id)
      .then((res) => {
        setTeacherShift(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    teachershiftService
      .deleteTeacherShift(id)
      .then(() => {
        router.push("/admin/assessment/teachershifts");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: teachershift?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(teachershift?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(teachershift?.update_date),
    },

    {
      key: "teacher",
      label: "Teacher",
      children: teachershift?.teacher_detail?.user_detail.full_name || teachershift?.teacher,
    },

    {
      key: "day",
      label: "Day",
      children: getEnumName(Days, teachershift?.day),
    },

    {
      key: "shift",
      label: "Shift",
      children: getEnumName(Shift, teachershift?.shift),
    },

    {
      key: "class_room",
      label: "Class Room",
      children: teachershift?.class_room_detail?.name || teachershift?.class_room,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="TeacherShift Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/assessment/teachershifts/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this teachershift?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary" color="red" icon={<FaTrash />}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        }
        items={items}
      />
    </>
  );
};

export default TeacherShiftDetail;
