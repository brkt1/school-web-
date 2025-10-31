import { 
  EnvironmentOutlined, 
  BankOutlined, 
  ApartmentOutlined, 
  ProjectOutlined,
  UsergroupAddOutlined 
} from "@ant-design/icons";
import Link from "next/link";

export const OrganizationMenu = {
  key: "/admin/organization",
  icon: <ApartmentOutlined />,
  label: "Organization",
  children: [
    {
      key: "/admin/organization/regions",
      icon: <EnvironmentOutlined />,
      label: <Link href="/admin/organization/regions">Region</Link>,
    },
    {
      key: "/admin/organization/citys",
      icon: <EnvironmentOutlined />,
      label: <Link href="/admin/organization/citys">City</Link>,
    },
    {
      key: "/admin/organization/institutions",
      icon: <BankOutlined />,
      label: <Link href="/admin/organization/institutions">Institution</Link>,
    },
    {
      key: "/admin/organization/class_rooms",
      icon: <ProjectOutlined />,
      label: <Link href="/admin/organization/class_rooms">Class Room</Link>,
    },
    {
      key: "/admin/organization/class_room_shifts",
      icon: <ProjectOutlined />,
      label: <Link href="/admin/organization/class_room_shifts">Classroom Shift</Link>,
    },
    {
      key: "/admin/organization/team_members",
      icon: <UsergroupAddOutlined />,
      label: <Link href="/admin/organization/team_members">Team Member</Link>,
    },
  ],
};
