"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useApplicationService from "../application.service";
import { Application } from "../application.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ApplicationStatus, Shift } from "@/modules/accounts/student/student.enum";

const ApplicationDetail: React.FC<{ id: string }> = ({ id }) => {
  const [application, setApplication] = useState<Application>();
  const applicationService = useApplicationService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    applicationService
      .getApplication(id)
      .then((res) => {
        setApplication(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    applicationService
      .deleteApplication(id)
      .then(() => {
        router.push("/admin/assessment/applications");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: application?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(application?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(application?.update_date),
    },

    {
      key: "teacher",
      label: "Teacher",
      children: application?.teacher_detail?.user_detail.username || application?.teacher,
    },

    {
      key: "status",
      label: "Status",
      children: getEnumName(ApplicationStatus, application?.status),
    },

    {
      key: "submission_date",
      label: "Submission Date",
      children: toDateAndTime(application?.submission_date),
    },

    {
      key: "application_letter",
      label: "Application Letter",
      children: application?.application_letter,
    },

    {
      key: "institution",
      label: "Institution",
      children: application?.institution_detail?.name || application?.institution,
    },

    {
      key: "shift",
      label: "Shift",
      children: getEnumName(Shift, application?.shift),
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Application Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/assessment/applications/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this application?"
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

export default ApplicationDetail;
