"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Image, Layout, Menu, theme } from "antd";
import { items } from "./teacher.menu";
import { usePathname } from "next/navigation";
import TeacherHeader from "./teacher.header";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store/store";
import useTeacherService from "@/modules/accounts/teacher/teacher.service";
import { UserType } from "@/modules/auth/user/user.enum";
import { getTeacher } from "@/store/slices/teacherSlices";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const TeacherLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();

  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const teacherService = useTeacherService();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user.user_type === UserType.TEACHER && user.id) {
      teacherService
        .getTeachers({ user: user.id })
        .then((response) => {
          if (response.data.count > 0) {
            dispatch(getTeacher(response.data.results[0]));
          }
        })
        .catch((error) => {
          console.error("Error fetching teacher:", error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user.id, user.user_type, dispatch]);

  if (user.user_type !== UserType.TEACHER) {
    return (
      <div className="text-red-500 p-4">
        You are not authorized to view this page.
      </div>
    );
  }

  if (loading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  return (
    <Layout className="h-screen w-screen m-0 p-0">
      <Sider
        style={siderStyle}
        breakpoint="lg"
        collapsible
        trigger={null}
      >
        <div className="demo-logo-vertical p-2">
          <Image preview={false} src="/images/logo.jpg" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: "rgb(0 21 41)" }}
          className="flex items-center"
        >
          <TeacherHeader/>
        </Header>
        <div className="overflow-auto">
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default TeacherLayout;
