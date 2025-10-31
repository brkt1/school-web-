"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useTeacherClassShiftService from "../teacher_class_shift.service";
import { TeacherClassShift } from "../teacher_class_shift.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const TeacherClassShiftDetail: React.FC<{ id: string }> = ({ id }) => {
  const [teacherclassshift, setTeacherClassShift] = useState<TeacherClassShift>();
  const teacherclassshiftService = useTeacherClassShiftService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    teacherclassshiftService
      .getTeacherClassShift(id)
      .then((res) => {
        setTeacherClassShift(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    teacherclassshiftService
      .deleteTeacherClassShift(id)
      .then(() => {
        router.push("/admin/accounts/teacher_class_shifts");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: teacherclassshift?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(teacherclassshift?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(teacherclassshift?.update_date),
    },

    {
      key: "teacher",
      label: "Teacher",
      children: teacherclassshift?.teacher_detail?.user_detail.full_name || teacherclassshift?.teacher,
    },

    {
      key: "institution",
      label: "Institution",
      children: teacherclassshift?.institution_detail?.name || teacherclassshift?.institution,
    },

    {
      key: "class_room",
      label: "Class Room",
      children: teacherclassshift?.class_room_detail?.name || teacherclassshift?.class_room,
    },

    {
      key: "class_room_shift",
      label: "Class Room Shift",
      children: teacherclassshift?.class_room_shift_detail?.package_detail.name || teacherclassshift?.class_room_shift,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="TeacherClassShift Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/accounts/teacher_class_shifts/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this teacherclassshift?"
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

export default TeacherClassShiftDetail;
