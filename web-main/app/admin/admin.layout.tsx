"use client";
import React, { ReactNode } from "react";
import { Image, Layout, Menu, theme, Tooltip } from "antd";
import { items as rawItems } from "./admin.menu";
import { usePathname } from "next/navigation";
import AdminHeader from "./admin.header";
import AuthCheck from "@/modules/auth/authorize/components/auth.check";

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

// Custom CSS for multi-line ellipsis
const menuItemStyle: React.CSSProperties = {
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2, // max 2 lines
  WebkitBoxOrient: "vertical",
  lineHeight: "1.4em",
  maxHeight: "2.8em", // 2 lines * line-height
};

// Helper to wrap menu labels in Tooltip
const wrapLabelWithTooltip = (item: any) => {
  const newItem = {
    ...item,
    label: <span style={menuItemStyle}>{item.label}</span>,
  };
  if (item.children) {
    newItem.children = item.children.map(wrapLabelWithTooltip);
  }
  return newItem;
};

const AdminLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();

  // Wrap all menu items with Tooltip
  const items = rawItems.map(wrapLabelWithTooltip);

  return (
    <AuthCheck>
      <Layout className="h-screen w-screen m-0 p-0">
        <Sider
          style={siderStyle}
          breakpoint="lg"
          collapsible
          trigger={null}
          width={220}
        >
          <div className="demo-logo-vertical p-2">
            <Image preview={false} src="/images/logo.jpg" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "rgb(0 21 41)" }} className="flex items-center">
            <AdminHeader />
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
    </AuthCheck>
  );
};

export default AdminLayout;
