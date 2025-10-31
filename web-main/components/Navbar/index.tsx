"use client";
import React, { useEffect, useState } from "react";
import { Button, Menu, SelectProps } from "antd";
import "./index.css";
import { FaFlag } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FloatSelect } from "../Commons/FloatLabel";
import { socialMediaIcons } from "../Commons/SocialMedia/icons";
import useAuthorization from "@/utils/authorization";
import useUserService from "@/modules/auth/user/user.service";
import { useLocale } from "antd/es/locale";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

  const menuItems = [
    {
      key: 'home',
      label: <Link className="app-header__menu-item" href="/#home">Home</Link>,
    },
    {
      key: 'about',
      label: <Link className="app-header__menu-item" href="/#about">About</Link>,
    },
    {
      key: 'news',
      label: <Link className="app-header__menu-item" href="/#news">News</Link>,
    },
    // {
    //   key: 'services',
    //   label: <Link className="app-header__menu-item" href="/#services">Services</Link>,
    // },
    // Uncomment and add these if you want them back
    // {
    //   key: 'showcase',
    //   label: <Link className="app-header__menu-item" href="#showcase">Showcase</Link>,
    // },
    // {
    //   key: 'pricing',
    //   label: <Link className="app-header__menu-item" href="#pricing">Pricing</Link>,
    // },
    {
      key: 'team',
      label: <Link className="app-header__menu-item" href="/#team">Team</Link>,
    },
    {
      key: 'blog',
      label: <Link className="app-header__menu-item" href="/#blog">Blog</Link>,
    },
    {
      key: 'contact',
      label: <Link className="app-header__menu-item" href="/#contact">Contact</Link>,
    },
    {
      key: 'registeration',
      label: <Link className="app-header__menu-item" href="/#registeration">Registeration</Link>,
    },
    {
      key: 'login',
      label: <Link className="app-header__menu-item" href="/login">Login</Link>,
    },
  ];

const Navbar = () => {
  const [current, setCurrent] = useState("/");
  const pathname = usePathname();
  
  const language = useSelector((state: any) => state?.language);
  const user = useSelector((state: any) => state?.user)
  const [languagesOptions, setLanguageOptions] = useState<SelectProps["options"]>([]);
  const dispatch = useDispatch();
  const router = useRouter();


  const authorization = useAuthorization()

  useEffect(() => {
    console.log("NAVBAR")
    authorization.authorizeUser()
  }, [])
  
  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);


  return (
    <div className="w-full hidden sm:flex bg-slate-200 !text-white bg-primary-gradient">

      <div className="container mx-auto bg-transparent flex justify-between items-center">
        <Menu
          selectedKeys={[current]}
          mode="horizontal"
          items={menuItems}
          className=" bg-transparent flex-1 top-main-nav"
        />
        <div className="flex gap-2">
        </div>
        
      </div>

    </div>

  );
};

export default Navbar;
