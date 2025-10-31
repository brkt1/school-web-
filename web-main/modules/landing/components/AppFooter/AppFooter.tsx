import React from "react";
import { Footer } from "antd/lib/layout/layout";
import {
  YoutubeOutlined,
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import logo from "../../../../assets/footer/footer-logo.png";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa6";
import SocialIcons from "./SocialIcons";

export const AppFooter = () => {
  const menuItems = [
    {
      key: 'home',
      label: <Link className="app-header__menu-item" href="/#home">Home</Link>,
    },
    {
      key: 'about',
      label: <Link className="app-header__menu-item" href="/#about">About US</Link>,
    },
    {
      key: 'news',
      label: <Link className="app-header__menu-item" href="/#news">LATEST News</Link>,
    },
    {
      key: 'team',
      label: <Link className="app-header__menu-item" href="/#team">Team mEMBERS</Link>,
    },
    {
      key: 'blog',
      label: <Link className="app-header__menu-item" href="/#blog">Blog</Link>,
    },
    {
      key: 'contact',
      label: <Link className="app-header__menu-item" href="/#contact">Contact US</Link>,
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

  return (
    <Footer className="bg-[#001838] text-white px-6 pt-8 pb-6 relative">
      {/* Row 1: Social Icons */}
      <div className="container mx-auto flex gap-4 py-10">
      <div>
        <div className="flex justify-center mb-4">
          <Image
            src={logo}
            alt="Take The Stage Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>
      </div>
      <div className="w-full">
        {/* <div className="flex justify-center items-center gap-10 text-[#6ccff6] text-4xl flex-wrap mb-8">
          <YoutubeOutlined className="cursor-pointer"  />
          <FaTelegram className="cursor-pointer" href="https://t.me/takethestageplc" />
          <InstagramOutlined className="cursor-pointer"  /> */}
          {/* X / Twitter */}
          {/* <svg  className="w-8 h-8 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.67 2H3.33A1.33 1.33 0 0 0 2 3.33v17.34A1.33 1.33 0 0 0 3.33 22h17.34A1.33 1.33 0 0 0 22 20.67V3.33A1.33 1.33 0 0 0 20.67 2zM16.56 16h-1.76l-2.27-3.25L10.34 16H8.58l2.92-4.1-2.79-3.9h1.74l2.12 2.97 2.12-2.97h1.74l-2.79 3.9L16.56 16z" />
          </svg>
          <FacebookOutlined className="cursor-pointer" href="https://www.facebook.com/profile.php?id=61576772545264" />
          <LinkedinOutlined className="cursor-pointer"  /> */}
          {/* TikTok */}
          {/* <svg href="https://tiktok.com/@takethestageplc" className="w-8 h-8 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 3a5 5 0 0 0 5 5v2a7 7 0 0 1-5-2v7.5a5.5 5.5 0 1 1-5.5-5.5H13v2h-1.5a3.5 3.5 0 1 0 3.5 3.5V3h2z" />
          </svg>
        </div> */}
        <SocialIcons />


        {/* Row 2: Navigation Bar */}
        <div className="flex flex-wrap w-full justify-evenly gap-x-6 gap-y-2 text-sm font-semibold text-white text-center uppercase mb-6">
          {menuItems.map((link) => (
            <div key={link.key}>
              {link.label}
            </div>
          ))}
        </div>

        {/* Row 3: Back to the top */}
        <div className="text-right">
          <a
            href="#top"
            className="text-white text-sm font-semibold hover:underline inline-flex items-center gap-1"
          >
            Back to the top <ArrowUpOutlined className="text-xs" />
          </a>
        </div>
      </div>
      </div>
               <p className="text-center text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} Take the Stage PLC. All rights reserved.
        </p>
    </Footer>
  );
};
