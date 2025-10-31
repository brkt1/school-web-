"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useStudentService from "../student.service";
import { Student } from "../student.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { StudentType, PaymentStatus, ClassLevel, Shift } from "../student.enum";

const StudentDetail: React.FC<{ id: string }> = ({ id }) => {
  const [student, setStudent] = useState<Student>();
  const studentService = useStudentService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    studentService
      .getStudent(id)
      .then((res) => {
        setStudent(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    studentService
      .deleteStudent(id)
      .then(() => {
        router.push("/admin/accounts/students");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: student?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(student?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(student?.update_date),
    },

    {
      key: "user",
      label: "User",
      children: student?.user_detail?.full_name || student?.user,
    },

    {
      key: "grade",
      label: "Grade",
      children: student?.grade,
    },

    {
      key: "region",
      label: "Region",
      children: student?.region_detail?.name || student?.region,
    },

    {
      key: "city",
      label: "City",
      children: student?.city_detail?.name || student?.city,
    },

    {
      key: "woreda",
      label: "Woreda",
      children: student?.woreda,
    },

    {
      key: "parents_phonenumber",
      label: "Parents Phonenumber",
      children: student?.parents_phonenumber,
    },

    {
      key: "student_type",
      label: "Student Type",
      children: getEnumName(StudentType, student?.student_type),
    },

    {
      key: "institution",
      label: "Institution",
      children: student?.institution_detail?.name || student?.institution,
    },

    {
      key: "date",
      label: "Date",
      children: toDateAndTime(student?.date),
    },

    {
      key: "shift1",
      label: "Shift1",
      children: getEnumName(Shift, student?.shift1),
    },

    {
      key: "shift2",
      label: "Shift2",
      children: getEnumName(Shift, student?.shift2),
    },

    {
      key: "payment_status",
      label: "Payment Status",
      children: getEnumName(PaymentStatus, student?.payment_status),
    },

    {
      key: "class_level",
      label: "Class Level",
      children: student?.class_level_detail?.name,
    },

    {
      key: "class_room_1",
      label: "Class Room 1",
      children: student?.class_room_1_detail?.name || student?.class_room_1,
    },

    {
      key: "class_room_2",
      label: "Class Room 2",
      children: student?.class_room_2_detail?.name || student?.class_room_2,
    },

    {
      key: "date_1",
      label: "Date 1",
      children: toDateAndTime(student?.date_1),
    },

    {
      key: "date_2",
      label: "Date 2",
      children: toDateAndTime(student?.date_2),
    },

    {
      key: "day_1",
      label: "Day 1",
      children: getEnumName(Shift, student?.day_1),
    },

    {
      key: "day_2",
      label: "Day 2",
      children: getEnumName(Shift, student?.day_2),
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Student Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/accounts/students/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this student?"
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

export default StudentDetail;
