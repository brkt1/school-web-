import { 
  ApartmentOutlined, 
  DollarOutlined, 
  ProjectOutlined, 
  ScheduleOutlined 
} from "@ant-design/icons";
import Link from "next/link";

export const LookupMenu = {
  key: "/admin/lookup",
  icon: <ProjectOutlined />,
  label: "Lookup",
  children: [
    {
      key: "/admin/lookup/levels",
      icon: <ApartmentOutlined />,
      label: <Link href="/admin/lookup/levels">Level</Link>,
    },
    {
      key: "/admin/lookup/packages",
      icon: <DollarOutlined />,
      label: <Link href="/admin/lookup/packages">Package</Link>,
    },
    {
      key: "/admin/lookup/class_types",
      icon: <ProjectOutlined />,
      label: <Link href="/admin/lookup/class_types">Class Type</Link>,
    },
    {
      key: "/admin/lookup/shifts",
      icon: <ScheduleOutlined />,
      label: <Link href="/admin/lookup/shifts">Shift</Link>,
    },
  ],
};
