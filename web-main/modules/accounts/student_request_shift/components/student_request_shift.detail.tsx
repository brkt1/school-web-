"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useStudentRequestShiftService from "../student_request_shift.service";
import { StudentRequestShift } from "../student_request_shift.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Days } from "../../student/student.enum";

const StudentRequestShiftDetail: React.FC<{ id: string }> = ({ id }) => {
  const [studentrequestshift, setStudentRequestShift] = useState<StudentRequestShift>();
  const studentrequestshiftService = useStudentRequestShiftService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    studentrequestshiftService
      .getStudentRequestShift(id)
      .then((res) => {
        setStudentRequestShift(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    studentrequestshiftService
      .deleteStudentRequestShift(id)
      .then(() => {
        router.push("/admin/accounts/student_request_shifts");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: studentrequestshift?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(studentrequestshift?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(studentrequestshift?.update_date),
    },

    {
      key: "created_by",
      label: "Created By",
      children: studentrequestshift?.created_by_detail?.full_name || studentrequestshift?.created_by,
    },

    {
      key: "updated_by",
      label: "Updated By",
      children: studentrequestshift?.updated_by_detail?.full_name || studentrequestshift?.updated_by,
    },

    {
      key: "student",
      label: "Student",
      children: studentrequestshift?.student_detail?.user_detail.full_name || studentrequestshift?.student,
    },

    {
      key: "institution",
      label: "Institution",
      children: studentrequestshift?.institution_detail?.name || studentrequestshift?.institution,
    },

    {
      key: "fee_package",
      label: "Fee Package",
      children: studentrequestshift?.fee_package_detail?.name || studentrequestshift?.fee_package,
    },

    {
      key: "shift_days",
      label: "Shift Days",
      children: getEnumName(Days, studentrequestshift?.shift_days),
    },

    {
      key: "start_time",
      label: "Start Time",
      children: studentrequestshift?.start_time,
    },

    {
      key: "end_time",
      label: "End Time",
      children: studentrequestshift?.end_time,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="StudentRequestShift Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/accounts/student_request_shifts/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this studentrequestshift?"
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

export default StudentRequestShiftDetail;
