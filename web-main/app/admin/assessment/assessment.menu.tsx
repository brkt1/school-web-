import { 
  CheckSquareOutlined, 
  FileTextOutlined, 
  CalendarOutlined, 
  FileAddOutlined 
} from "@ant-design/icons";
import Link from "next/link";

export const AssessmentMenu = {
  key: "/admin/assessment",
  icon: <CheckSquareOutlined />,
  label: "Assessment",
  children: [
    {
      key: "/admin/assessment/attendances",
      icon: <CalendarOutlined />,
      label: <Link href="/admin/assessment/attendances">Attendance</Link>,
    },
    {
      key: "/admin/assessment/results",
      icon: <FileTextOutlined />,
      label: <Link href="/admin/assessment/results">Result</Link>,
    },
    {
      key: "/admin/assessment/teachershifts",
      icon: <CheckSquareOutlined />,
      label: <Link href="/admin/assessment/teachershifts">Teacher Shift</Link>,
    },
    {
      key: "/admin/assessment/applications",
      icon: <FileAddOutlined />,
      label: <Link href="/admin/assessment/applications">Application</Link>,
    },
  ],
};
