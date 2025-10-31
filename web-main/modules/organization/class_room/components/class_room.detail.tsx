"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useClassRoomService from "../class_room.service";
import { ClassRoom } from "../class_room.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ClassRoomDetail: React.FC<{ id: string }> = ({ id }) => {
  const [classroom, setClassRoom] = useState<ClassRoom>();
  const classroomService = useClassRoomService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    classroomService
      .getClassRoom(id)
      .then((res) => {
        setClassRoom(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    classroomService
      .deleteClassRoom(id)
      .then(() => {
        router.push("/admin/organization/class_rooms");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "name",
      label: "Name",
      children: classroom?.name,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(classroom?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(classroom?.update_date),
    },

    {
      key: "institution",
      label: "Institution",
      children: classroom?.institution_detail?.name || classroom?.institution,
    },

    {
      key: "class_type",
      label: "Class Type",
      children: classroom?.class_type_detail?.name,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="ClassRoom Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/organization/class_rooms/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this classroom?"
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

export default ClassRoomDetail;
