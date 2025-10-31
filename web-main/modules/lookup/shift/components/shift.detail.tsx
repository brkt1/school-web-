"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useShiftService from "../shift.service";
import { Shift } from "../shift.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ShiftDetail: React.FC<{ id: string }> = ({ id }) => {
  const [shift, setShift] = useState<Shift>();
  const shiftService = useShiftService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    shiftService
      .getShift(id)
      .then((res) => {
        setShift(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    shiftService
      .deleteShift(id)
      .then(() => {
        router.push("/admin/lookup/shifts");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: shift?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(shift?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(shift?.update_date),
    },

    {
      key: "name",
      label: "Name",
      children: shift?.name,
    },

    {
      key: "description",
      label: "Description",
      children: shift?.description,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Shift Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/lookup/shifts/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this shift?"
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

export default ShiftDetail;
