"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useFeePackageService from "../fee_package.service";
import { FeePackage } from "../fee_package.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { PaymentPurpose } from "../fee_package.enum";

const FeePackageDetail: React.FC<{ id: string }> = ({ id }) => {
  const [feepackage, setFeePackage] = useState<FeePackage>();
  const feepackageService = useFeePackageService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    feepackageService
      .getFeePackage(id)
      .then((res) => {
        setFeePackage(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    feepackageService
      .deleteFeePackage(id)
      .then(() => {
        router.push("/admin/finance/fee_packages");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: feepackage?.id,
    },

        {
      key: "name",
      label: "Name",
      children: feepackage?.name,
    },

    {
      key: "fee",
      label: "Fee",
      children: feepackage?.fee,
    },

    {
      key: "payment_purpose",
      label: "Payment Purpose",
      children: getEnumName( PaymentPurpose,
        feepackage?.payment_purpose),
    },

    {
      key: "level",
      label: "Level",
      children: feepackage?.level_detail?.name,
    },
    {
      key: "package",
      label: "Package",
      children: feepackage?.package_detail?.name,
    },

    {
      key: "description",
      label: "Description",
      children: feepackage?.description,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(feepackage?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(feepackage?.update_date),
    },

    {
      key: "created_by",
      label: "Created By",
      children: feepackage?.created_by_detail?.full_name || feepackage?.created_by,
    },

    {
      key: "updated_by",
      label: "Updated By",
      children: feepackage?.updated_by_detail?.full_name || feepackage?.updated_by,
    },
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="FeePackage Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/finance/fee_packages/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this feepackage?"
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

export default FeePackageDetail;
