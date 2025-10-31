"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useStudentClassShiftService from "../student_class_shift.service";
import { StudentClassShift } from "../student_class_shift.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const StudentClassShiftDetail: React.FC<{ id: string }> = ({ id }) => {
  const [studentclassshift, setStudentClassShift] = useState<StudentClassShift>();
  const studentclassshiftService = useStudentClassShiftService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    studentclassshiftService
      .getStudentClassShift(id)
      .then((res) => {
        setStudentClassShift(res?.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    studentclassshiftService
      .deleteStudentClassShift(id)
      .then(() => {
        router.push("/admin/accounts/student_class_shifts");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: studentclassshift?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(studentclassshift?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(studentclassshift?.update_date),
    },

    {
      key: "created_by",
      label: "Created By",
      children: studentclassshift?.created_by_detail?.full_name || studentclassshift?.created_by,
    },

    {
      key: "updated_by",
      label: "Updated By",
      children: studentclassshift?.updated_by_detail?.full_name || studentclassshift?.updated_by,
    },

    {
      key: "student",
      label: "Student",
      children: studentclassshift?.student_detail?.user_detail.full_name || studentclassshift?.student,
    },

    {
      key: "institution",
      label: "Institution",
      children: studentclassshift?.institution_detail?.name || studentclassshift?.institution,
    },

    {
      key: "class_room",
      label: "Class Room",
      children: studentclassshift?.class_room_detail?.name || studentclassshift?.class_room,
    },

    {
      key: "class_room_shift",
      label: "Class Room Shift",
      children: studentclassshift?.class_room_shift_detail?.class_room_detail.name || studentclassshift?.class_room_shift,
    },
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="StudentClassShift Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/accounts/student_class_shifts/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this studentclassshift?"
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

export default StudentClassShiftDetail;
