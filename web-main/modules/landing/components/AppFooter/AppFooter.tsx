import {
    ArrowUpOutlined
} from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../assets/footer/footer-logo.png";
import SocialIcons from "./SocialIcons";

export const AppFooter = () => {
  const quickLinks = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'about', label: 'About Us', href: '/about' },
    { key: 'pricing', label: 'Pricing', href: '/pricing' },
    { key: 'contact', label: 'Contact', href: '/contact' },
  ];

  const resources = [
    { key: 'news', label: 'Latest News', href: '/#news' },
    { key: 'blog', label: 'Blog', href: '/blog' },
    { key: 'testimonials', label: 'Testimonials', href: '/testimonials' },
    { key: 'registeration', label: 'Registration', href: '/#registeration' },
  ];

  const account = [
    { key: 'login', label: 'Login', href: '/login' },
    { key: 'register-student', label: 'Register as Student', href: '/register/student' },
  ];

  return (
    <Footer className="app-footer-modern">
      <div className="app-footer__container">
        {/* Main Footer Content */}
        <div className="app-footer__main">
          {/* Brand Section */}
          <div className="app-footer__brand">
            <Image
              src={logo}
              alt="Take The Stage Logo"
              width={180}
              height={60}
              className="app-footer__logo"
              style={{ width: "auto" }}
            />
            <p className="app-footer__tagline">SPEAK LIKE A LEADER</p>
            <p className="app-footer__description">
              Empowering individuals to communicate with confidence and lead with impact.
            </p>
            <div className="app-footer__social">
              <SocialIcons />
            </div>
          </div>

          {/* Quick Links */}
          <div className="app-footer__column">
            <h3 className="app-footer__column-title">Quick Links</h3>
            <ul className="app-footer__links">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="app-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="app-footer__column">
            <h3 className="app-footer__column-title">Resources</h3>
            <ul className="app-footer__links">
              {resources.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="app-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="app-footer__column">
            <h3 className="app-footer__column-title">Account</h3>
            <ul className="app-footer__links">
              {account.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="app-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="app-footer__bottom">
          <div className="app-footer__copyright">
            <p>© {new Date().getFullYear()} Take the Stage PLC. All rights reserved.</p>
          </div>
          <a
            href="#top"
            className="app-footer__back-to-top"
            aria-label="Back to top"
          >
            <ArrowUpOutlined className="app-footer__back-to-top-icon" />
          </a>
        </div>
      </div>
    </Footer>
  );
};
