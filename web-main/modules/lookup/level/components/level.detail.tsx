"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useLevelService from "../level.service";
import { Level } from "../level.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const LevelDetail: React.FC<{ id: string }> = ({ id }) => {
  const [level, setLevel] = useState<Level>();
  const levelService = useLevelService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    levelService
      .getLevel(id)
      .then((res) => {
        setLevel(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    levelService
      .deleteLevel(id)
      .then(() => {
        router.push("/admin/lookup/levels");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: level?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(level?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(level?.update_date),
    },

    {
      key: "name",
      label: "Name",
      children: level?.name,
    },

    {
      key: "description",
      label: "Description",
      children: level?.description,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Level Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/lookup/levels/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this level?"
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

export default LevelDetail;
