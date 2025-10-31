"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useInstitutionService from "../institution.service";
import { Institution } from "../institution.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const InstitutionDetail: React.FC<{ id: string }> = ({ id }) => {
  const [institution, setInstitution] = useState<Institution>();
  const institutionService = useInstitutionService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    institutionService
      .getInstitution(id)
      .then((res) => {
        setInstitution(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    institutionService
      .deleteInstitution(id)
      .then(() => {
        router.push("/admin/organization/institutions");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "name",
      label: "Name",
      children: institution?.name,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(institution?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(institution?.update_date),
    },

    {
      key: "level",
      label: "Level",
      children: institution?.level_detail?.map((l) => l.name).join(", ") || institution?.level,
    },

    {
      key: "region",
      label: "Region",
      children: institution?.region_detail?.name || institution?.region,
    },

    {
      key: "city",
      label: "City",
      children: institution?.city_detail?.name || institution?.city,
    },

    {
      key: "woreda",
      label: "Woreda",
      children: institution?.woreda,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Institution Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/organization/institutions/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this institution?"
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

export default InstitutionDetail;
