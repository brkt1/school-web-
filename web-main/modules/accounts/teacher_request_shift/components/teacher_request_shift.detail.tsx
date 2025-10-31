"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useTeacherRequestShiftService from "../teacher_request_shift.service";
import { TeacherRequestShift } from "../teacher_request_shift.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Days } from "../../student/student.enum";

const TeacherRequestShiftDetail: React.FC<{ id: string }> = ({ id }) => {
  const [teacherrequestshift, setTeacherRequestShift] = useState<TeacherRequestShift>();
  const teacherrequestshiftService = useTeacherRequestShiftService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    teacherrequestshiftService
      .getTeacherRequestShift(id)
      .then((res) => {
        setTeacherRequestShift(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    teacherrequestshiftService
      .deleteTeacherRequestShift(id)
      .then(() => {
        router.push("/admin/accounts/teacher_request_shifts");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: teacherrequestshift?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(teacherrequestshift?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(teacherrequestshift?.update_date),
    },

    {
      key: "created_by",
      label: "Created By",
      children: teacherrequestshift?.created_by_detail?.full_name || teacherrequestshift?.created_by,
    },

    {
      key: "updated_by",
      label: "Updated By",
      children: teacherrequestshift?.updated_by_detail?.full_name || teacherrequestshift?.updated_by,
    },

    {
      key: "teacher",
      label: "Teacher",
      children: teacherrequestshift?.teacher_detail?.user_detail?.full_name || teacherrequestshift?.teacher,
    },

    {
      key: "institution",
      label: "Institution",
      children: teacherrequestshift?.institution_detail?.name || teacherrequestshift?.institution,
    },

    {
      key: "fee_package",
      label: "Fee Package",
      children: teacherrequestshift?.fee_package_detail?.name || teacherrequestshift?.fee_package,
    },

    {
      key: "shift_days",
      label: "Shift Days",
      children: getEnumName(Days, teacherrequestshift?.shift_days),
    },

    {
      key: "shift_times",
      label: "Shift Times",
      children: teacherrequestshift?.shift_times_detail?.name || teacherrequestshift?.shift_times,
    },

    {
      key: "start_time",
      label: "Start Time",
      children: teacherrequestshift?.start_time,
    },

    {
      key: "end_time",
      label: "End Time",
      children: teacherrequestshift?.end_time,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="TeacherRequestShift Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/accounts/teacher_request_shifts/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this teacherrequestshift?"
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

export default TeacherRequestShiftDetail;
