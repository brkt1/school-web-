"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useCityService from "../city.service";
import { City } from "../city.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const CityDetail: React.FC<{ id: string }> = ({ id }) => {
  const [city, setCity] = useState<City>();
  const cityService = useCityService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    cityService
      .getCity(id)
      .then((res) => {
        setCity(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    cityService
      .deleteCity(id)
      .then(() => {
        router.push("/admin/organization/citys");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "name",
      label: "Name",
      children: city?.name,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(city?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(city?.update_date),
    },

    {
      key: "region",
      label: "Region",
      children: city?.region_detail?.name || city?.region,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="City Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/organization/citys/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this city?"
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

export default CityDetail;
