import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export const items: ItemType<MenuItemType>[] = [
  {
    key: "/student",
    icon: <HomeOutlined />,
    label: <Link href="/student">Home</Link>,
  },
  {
    key: "/student/users",
    icon: <UserOutlined />,
    label: <Link href="/student/users">Users</Link>,
  },
];
