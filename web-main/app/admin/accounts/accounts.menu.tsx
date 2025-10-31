import { 
  UserOutlined, 
  TeamOutlined, 
  ScheduleOutlined, 
  FileTextOutlined, 
  FileDoneOutlined 
} from "@ant-design/icons";
import Link from "next/link";

export const AccountsMenu = {
  key: "/admin/accounts",
  icon: <UserOutlined />,
  label: "Accounts",
  children: [
    {
      key: "/admin/accounts/students",
      icon: <TeamOutlined />,
      label: <Link href="/admin/accounts/students">Student</Link>,
    },
    {
      key: "/admin/accounts/teachers",
      icon: <UserOutlined />,
      label: <Link href="/admin/accounts/teachers">Teacher</Link>,
    },
    {
      key: "/admin/accounts/teacher_class_shifts",
      icon: <ScheduleOutlined />,
      label: <Link href="/admin/accounts/teacher_class_shifts">Teacher Class Shift</Link>,
    },
    {
      key: "/admin/accounts/teacher_request_shifts",
      icon: <FileTextOutlined />,
      label: <Link href="/admin/accounts/teacher_request_shifts">Teacher Request Shift</Link>,
    },
    {
      key: "/admin/accounts/student_request_shifts",
      icon: <FileTextOutlined />,
      label: <Link href="/admin/accounts/student_request_shifts">Student Request Shift</Link>,
    },
    {
      key: "/admin/accounts/student_class_shifts",
      icon: <ScheduleOutlined />,
      label: <Link href="/admin/accounts/student_class_shifts">Student Class Shift</Link>,
    },
  ],
};
