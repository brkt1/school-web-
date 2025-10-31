import type { Metadata } from "next";
import '@ant-design/v5-patch-for-react-19';
import TeacherLayout from "./student.layout";
import AuthCheck from "@/modules/auth/authorize/components/auth.check";

export const metadata: Metadata = {
  title: "Take The Stage",
  description: "",
};

interface TeacherLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default async function Layout({
  children,
  locale,
}: TeacherLayoutProps) {
  return <div><AuthCheck><TeacherLayout>{children}</TeacherLayout></AuthCheck></div>;
}
