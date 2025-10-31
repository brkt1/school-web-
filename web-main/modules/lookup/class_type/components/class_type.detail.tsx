"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useClassTypeService from "../class_type.service";
import { ClassType } from "../class_type.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ClassTypeDetail: React.FC<{ id: string }> = ({ id }) => {
  const [classtype, setClassType] = useState<ClassType>();
  const classtypeService = useClassTypeService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    classtypeService
      .getClassType(id)
      .then((res) => {
        setClassType(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    classtypeService
      .deleteClassType(id)
      .then(() => {
        router.push("/admin/lookup/class_types");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: classtype?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(classtype?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(classtype?.update_date),
    },

    {
      key: "name",
      label: "Name",
      children: classtype?.name,
    },

    {
      key: "description",
      label: "Description",
      children: classtype?.description,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="ClassType Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/lookup/class_types/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this classtype?"
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

export default ClassTypeDetail;
