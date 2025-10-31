"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useAttendanceService from "../attendance.service";
import { Attendance } from "../attendance.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const AttendanceDetail: React.FC<{ id: string }> = ({ id }) => {
  const [attendance, setAttendance] = useState<Attendance>();
  const attendanceService = useAttendanceService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    attendanceService
      .getAttendance(id)
      .then((res) => {
        setAttendance(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    attendanceService
      .deleteAttendance(id)
      .then(() => {
        router.push("/admin/assessment/attendances");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: attendance?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(attendance?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(attendance?.update_date),
    },

    {
      key: "student",
      label: "Student",
      children: attendance?.student_detail?.user_detail.username || attendance?.student,
    },

    {
      key: "present",
      label: "Present",
      children: attendance?.present ? (
        <FaCheck color="green" />
      ) : (
        <FaTimes color="red" />
      ),
    },

    {
      key: "date",
      label: "Date",
      children: toDateAndTime(attendance?.date),
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Attendance Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/assessment/attendances/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this attendance?"
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

export default AttendanceDetail;
