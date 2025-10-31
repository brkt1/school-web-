"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useResultService from "../result.service";
import { Result } from "../result.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ResultDetail: React.FC<{ id: string }> = ({ id }) => {
  const [result, setResult] = useState<Result>();
  const resultService = useResultService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    resultService
      .getResult(id)
      .then((res) => {
        setResult(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    resultService
      .deleteResult(id)
      .then(() => {
        router.push("/admin/assessment/results");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: result?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(result?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(result?.update_date),
    },

    {
      key: "student",
      label: "Student",
      children: result?.student_detail?.user_detail.full_name || result?.student,
    },

    {
      key: "exam_name",
      label: "Exam Name",
      children: result?.exam_name,
    },

    {
      key: "score",
      label: "Score",
      children: result?.score,
    },

    {
      key: "date",
      label: "Date",
      children: toDateAndTime(result?.date),
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Result Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/assessment/results/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this result?"
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

export default ResultDetail;
