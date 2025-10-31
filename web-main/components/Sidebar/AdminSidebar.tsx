'use client'
import {
  Avatar,
  theme,
  Drawer,
  Layout,
  Menu,
  MenuProps,
} from "antd";
import menuService from "./AdminMenu";
import { useContext, useEffect, useState } from "react";
import { AppState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import useScreenSize from "@/hooks/useScreenSize";
import { MdMenu } from "react-icons/md";
import { Key } from "@/utils/enums";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { Sider } = Layout;
  const { isMobile } = useScreenSize();
  const menus = menuService();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(isMobile)

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
    isMobile && handleToggle()
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const menu = (
    <div className="flex-1 flex">
      <Menu
        onClick={onClick}
        mode="inline"
        theme="dark"
        className="menu"
        defaultOpenKeys={[
          "hr",
          "inventory",
          'financials',
          'engineering',
          "purchases",
          "adjustment",
        ]}
        defaultSelectedKeys={['hr']}
        items={menus}
      />
    </div>
  );

  const logo = (
    <div className="flex flex-col gap-1 items-center pt-2">
      <Avatar size={120} src={''} alt="Company Logo" />
      <h3 className="text-white text-xl font-bold italic">
        Take The Stage
      </h3>
    </div>
  );

  return (
    <>
      <div onClick={handleToggle}
      style={{
        alignItems:"center",
        height:60,
        zIndex:20
      }}
      className="flex fixed top-0 ml-3 "><MdMenu size={24}  /></div>

      <Sider
        style={{
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
        }}
        className="hidden sm:block pl-3"
        breakpoint="sm"
        width={250}
        collapsed={false}
        collapsedWidth="0"
      >
        {logo}
        {menu}
    </Sider>
    <Drawer
      placement="left"
      classNames={{body: 'flex', header: 'border-b-0'}}
      className="main-sidbar md:hidden"
      width={250}
      open={open}
      closable={false}
      onClose={handleToggle}
      title={logo}
    >
      {menu}
      </Drawer>
    </>
  );
}
