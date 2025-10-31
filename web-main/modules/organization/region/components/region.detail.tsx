"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useRegionService from "../region.service";
import { Region } from "../region.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const RegionDetail: React.FC<{ id: string }> = ({ id }) => {
  const [region, setRegion] = useState<Region>();
  const regionService = useRegionService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    regionService
      .getRegion(id)
      .then((res) => {
        setRegion(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    regionService
      .deleteRegion(id)
      .then(() => {
        router.push("/admin/organization/regions");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "name",
      label: "Name",
      children: region?.name,
    },
    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(region?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(region?.update_date),
    },
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Region Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/organization/regions/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this region?"
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

export default RegionDetail;
