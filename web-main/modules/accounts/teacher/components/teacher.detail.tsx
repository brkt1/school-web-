"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Image, Popconfirm, Upload } from "antd";
import type { DescriptionsProps } from "antd";
import useTeacherService from "../teacher.service";
import { Teacher } from "../teacher.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ClassLevel, PaymentStatus, TeacherType } from "../../student/student.enum";
import Link from "next/link";
import { TeacherRequestStatus } from "../teacher.enum";
import { GenderType } from "@/modules/auth/user/user.enum";

const TeacherDetail: React.FC<{ id: string, has_action?: boolean }> = ({ id, has_action = true }) => {
  const [teacher, setTeacher] = useState<Teacher>();
  const teacherService = useTeacherService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    teacherService
      .getTeacher(id)
      .then((res) => {
        setTeacher(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    teacherService
      .deleteTeacher(id)
      .then(() => {
        router.push("/admin/accounts/teachers");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    // {
    //   key: "create_date",
    //   label: "Create Date",
    //   children: toDateAndTime(teacher?.create_date),
    // },

    // {
    //   key: "update_date",
    //   label: "Update Date",
    //   children: toDateAndTime(teacher?.update_date),
    // },

    {
      key: "user",
      label: "User",
      children: teacher?.user_detail?.full_name || teacher?.user,
    },
    {
      key: "gender",
      label: "Gender",
      children: getEnumName(GenderType, teacher?.user_detail?.gender),
    },
    {
      key: "phone_number",
      label: "Phone Number",
      children: teacher?.user_detail?.phone_number,
    },

    // {
    //   key: "institution",
    //   label: "Institution",
    //   children: teacher?.institution_detail?.name || teacher?.institution,
    // },

    {
      key: "level_of_teaching",
      label: "Level of Teaching",
      children: teacher?.level_of_teaching_detail?.name,
    },

    {
      key: "region",
      label: "Region",
      children: teacher?.region_detail?.name || teacher?.region,
    },

    {
      key: "city",
      label: "City",
      children: teacher?.city_detail?.name || teacher?.city,
    },

    // {
    //   key: "woreda",
    //   label: "Woreda",
    //   children: teacher?.woreda,
    // },

    {
      key: "cv",
      label: "Cv",
      children: teacher?.cv && <Link target="_blank" href={teacher?.cv}>CV</Link>,
    },

    // {
    //   key: "teacher_type",
    //   label: "Teacher Type",
    //   children: getEnumName(TeacherType, teacher?.teacher_type),
    // },

    // {
    //   key: "campus",
    //   label: "Campus",
    //   children: teacher?.campus,
    // },

    // {
    //   key: "date",
    //   label: "Date",
    //   children: toDateAndTime(teacher?.date),
    // },
    {
      key: 'request_status',
      label: 'Request Status',
      children: getEnumName(TeacherRequestStatus,teacher?.request_status),
    },
    {
      key: 'application_fee',
      label: 'Application Fee',
      children: getEnumName(PaymentStatus,teacher?.application_fee_detail?.status),
    },
    {
      key: "created_date",
      label: "Created Date",
      children: toDateAndTime(teacher?.create_date),
    },
    {
      key: "updated_date",
      label: "Updated Date",
      children: toDateAndTime(teacher?.update_date),
    },

    // {
    //   key: "tx_ref",
    //   label: "Tx Ref",
    //   children: teacher?.tx_ref,
    // },

    // {
    //   key: "paid",
    //   label: "Paid",
    //   children: teacher?.paid ? (
    //     <FaCheck color="green" />
    //   ) : (
    //     <FaTimes color="red" />
    //   ),
    // }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Teacher Information"
        bordered
        extra={
          has_action &&
          <div className="gap-2 flex">
            <Button
              href={`/admin/accounts/teachers/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this teacher?"
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

export default TeacherDetail;
