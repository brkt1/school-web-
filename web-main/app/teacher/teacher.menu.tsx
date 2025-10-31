import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export const items: ItemType<MenuItemType>[] = [
  {
    key: "/teacher",
    icon: <HomeOutlined />,
    label: <Link href="/teacher">Home</Link>,
  },
  {
    key: "/teacher/request_shift",
    icon: <UserOutlined />,
    label: <Link href="/teacher/request_shift">Request Shift</Link>,
  },
  {
    key: "/teacher/approved_shift",
    icon: <UserOutlined />,
    label: <Link href="/teacher/approved_shift">Approved Shift</Link>,
  },
  {
    key: "/teacher/payment",
    icon: <UserOutlined />,
    label: <Link href="/teacher/payment">Payment</Link>,
  },
];
