import {
    ArrowUpOutlined
} from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../assets/footer/footer-logo.png";
import SocialIcons from "./SocialIcons";

export const AppFooter = () => {
  const menuItems = [
    {
      key: 'home',
      label: <Link className="app-header__menu-item" href="/">Home</Link>,
    },
    {
      key: 'about',
      label: <Link className="app-header__menu-item" href="/about">About US</Link>,
    },
    {
      key: 'news',
      label: <Link className="app-header__menu-item" href="/#news">LATEST News</Link>,
    },
    {
      key: 'pricing',
      label: <Link className="app-header__menu-item" href="/pricing">Pricing</Link>,
    },
    {
      key: 'testimonials',
      label: <Link className="app-header__menu-item" href="/testimonials">Testimonials</Link>,
    },
    {
      key: 'blog',
      label: <Link className="app-header__menu-item" href="/blog">Blog</Link>,
    },
    {
      key: 'contact',
      label: <Link className="app-header__menu-item" href="/contact">Contact US</Link>,
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
    <Footer className="app-footer-modern">
      <div className="app-footer__container">
        {/* Logo and Social Section */}
        <div className="app-footer__top">
          <div className="app-footer__logo-section">
            <Image
              src={logo}
              alt="Take The Stage Logo"
              width={180}
              height={60}
              className="app-footer__logo"
            />
            <p className="app-footer__tagline">SPEAK LIKE A LEADER</p>
          </div>
          <div className="app-footer__social">
            <SocialIcons />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="app-footer__nav">
          {menuItems.map((link) => (
            <div key={link.key} className="app-footer__nav-item">
              {link.label}
            </div>
          ))}
        </div>

        {/* Back to Top Button */}
        <div className="app-footer__back-to-top">
          <a
            href="#top"
            className="app-footer__back-to-top-link"
          >
            <ArrowUpOutlined className="app-footer__back-to-top-icon" />
            <span>Back to Top</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="app-footer__copyright">
          <p>© {new Date().getFullYear()} Take the Stage PLC. All rights reserved.</p>
        </div>
      </div>
    </Footer>
  );
};
