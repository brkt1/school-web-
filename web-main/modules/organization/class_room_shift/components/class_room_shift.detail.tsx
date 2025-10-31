"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useClassRoomShiftService from "../class_room_shift.service";
import { ClassRoomShift } from "../class_room_shift.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ClassRoomShiftDetail: React.FC<{ id: string }> = ({ id }) => {
  const [classroomshift, setClassRoomShift] = useState<ClassRoomShift>();
  const classroomshiftService = useClassRoomShiftService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    classroomshiftService
      .getClassRoomShift(id)
      .then((res) => {
        setClassRoomShift(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    classroomshiftService
      .deleteClassRoomShift(id)
      .then(() => {
        router.push("/admin/organization/class_room_shifts");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(classroomshift?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(classroomshift?.update_date),
    },

    {
      key: "class_room",
      label: "Class Room",
      children: classroomshift?.class_room_detail?.name || classroomshift?.class_room,
    },

    {
      key: "package",
      label: "Package",
      children: classroomshift?.package_detail?.name || classroomshift?.package,
    },

    {
      key: "shift_days",
      label: "Shift Days",
      children: classroomshift?.shift_times_detail?.name || classroomshift?.shift_times,
    },

    {
      key: "start_time",
      label: "Start Time",
      children: classroomshift?.start_time,
    },

    {
      key: "end_time",
      label: "End Time",
      children: classroomshift?.end_time,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="ClassRoomShift Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/organization/class_room_shifts/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this classroomshift?"
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

export default ClassRoomShiftDetail;
