import type { Metadata } from "next";
import '@ant-design/v5-patch-for-react-19';
import Sidebar from "./admin.layout";
import AdminLayout from "./admin.layout";

export const metadata: Metadata = {
  title: "Take The Stage",
  description: "",
};

interface AdminLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default async function Layout({
  children,
  locale,
}: AdminLayoutProps) {
  return <div><AdminLayout>{children}</AdminLayout></div>;
}
