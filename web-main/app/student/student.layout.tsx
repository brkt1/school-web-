"use client";
import React, { ReactNode } from "react";
import { Image, Layout, Menu, theme } from "antd";
import { items } from "./student.menu";
import { usePathname } from "next/navigation";
import StudentHeader from "./student.header";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};


const StudentLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();

  return (
    <Layout className="h-screen w-screen m-0 p-0">
      <Sider
       style={siderStyle}
        breakpoint="lg"
        // collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
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
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex items-center">
          <StudentHeader />
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
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
        </div>
      </Layout>
    </Layout>
  );
};

export default StudentLayout;
