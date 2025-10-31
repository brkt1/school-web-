import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AccountsMenu } from "./accounts/accounts.menu";
import { AssessmentMenu } from "./assessment/assessment.menu";
import { EngagementMenu } from "./engagement/engagement.menu";
import { FinanceMenu } from "./finance/finance.menu";
import { OrganizationMenu } from "./organization/organization.menu";
import { LookupMenu } from "./lookup/lookup.menu";

export const items: ItemType<MenuItemType>[] = [
  {
    key: "/admin",
    icon: <HomeOutlined />,
    label: <Link href="/admin">Home</Link>,
  },
  {
    key: "/admin/users",
    icon: <UserOutlined />,
    label: <Link href="/admin/users">Users</Link>,
  },
  AccountsMenu,
  AssessmentMenu,
  EngagementMenu,
  FinanceMenu,
  OrganizationMenu,
  LookupMenu,
];
