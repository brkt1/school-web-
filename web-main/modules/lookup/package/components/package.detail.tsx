"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import usePackageService from "../package.service";
import { Package } from "../package.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const PackageDetail: React.FC<{ id: string }> = ({ id }) => {
  const [pkg, setPackage] = useState<Package>();
  const packageService = usePackageService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    packageService
      .getPackage(id)
      .then((res) => {
        setPackage(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    packageService
      .deletePackage(id)
      .then(() => {
        router.push("/admin/lookup/packages");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: pkg?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(pkg?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(pkg?.update_date),
    },

    {
      key: "name",
      label: "Name",
      children: pkg?.name,
    },

    {
      key: "description",
      label: "Description",
      children: pkg?.description,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Package Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/lookup/packages/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this package?"
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

export default PackageDetail;
