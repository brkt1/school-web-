"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useUserService from "../user.service";
import { User } from "../user.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { UserType } from "../user.enum";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const UserDetail: React.FC<{ id: string }> = ({ id }) => {
  const [user, setUser] = useState<User>();
  const userService = useUserService();
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    userService
      .getUser(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true)
    userService.deleteUser(id).then((value) => {
      router.push("/admin/users")
    }).catch((e) => {})
      .finally(() => setLoading(false));
  }

  const items: DescriptionsProps["items"] = [
    {
      key: "username",
      label: "Username",
      children: user?.username,
    },
    {
      key: "first_name",
      label: "First Name",
      children: user?.first_name,
    },
    {
      key: "middle_name",
      label: "Middle Name",
      children: user?.middle_name,
    },
    {
      key: "last_name",
      label: "Last Name",
      children: user?.last_name,
    },
    {
      key: "email",
      label: "Email",
      children: user?.email,
    },
    {
      key: "date_joined",
      label: "Date Joined",
      children: toDateAndTime(user?.date_joined),
      span: 3,
    },
    {
      key: "last_login",
      label: "Last Login",
      children: toDateAndTime(user?.last_login),
    },
    {
      key: "user_type",
      label: "User Type",
      children: getEnumName(UserType, user?.user_type),
      span: 2,
    },
    {
      key: "is_staff",
      label: "Is Staff",
      children: user?.is_staff ? (
        <FaCheck color="green" />
      ) : (
        <FaTimes color="red" />
      ),
    },
    {
      key: "is_active",
      label: "Is Active",
      children: user?.is_active ? (
        <FaCheck color="green" />
      ) : (
        <FaTimes color="red" />
      ),
    },
    {
      key: "is_superuser",
      label: "Is Superuser",
      children: user?.is_superuser ? (
        <FaCheck color="green" />
      ) : (
        <FaTimes color="red" />
      ),
    },
  ];
  return (
    <>
      <Descriptions
        size="small"
        title="User Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/users/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete()}
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

export default UserDetail;
