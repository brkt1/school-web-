// components/SocialIcons.tsx

import {
    FaFacebook,
    FaTelegram,
    FaTiktok
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://t.me/takethestageplc",
    label: "Telegram",
    icon: <FaTelegram size={28} />,
    className: "text-blue-500 hover:text-blue-700",
  },
  // {
  //   href: "https://twitter.com/takethestageplc",
  //   label: "Twitter",
  //   icon: <FaTwitter size={28} />,
  //   className: "text-sky-500 hover:text-sky-700",
  // },
  {
    href: "https://www.facebook.com/profile.php?id=61576772545264",
    label: "Facebook",
    icon: <FaFacebook size={28} />,
    className: "text-blue-600 hover:text-blue-800",
  },
  // {
  //   href: "https://linkedin.com/company/takethestageplc",
  //   label: "LinkedIn",
  //   icon: <FaLinkedin size={28} />,
  //   className: "text-blue-700 hover:text-blue-900",
  // },
  // {
  //   href: "https://instagram.com/takethestageplc",
  //   label: "Instagram",
  //   icon: <FaInstagram size={28} />,
  //   className: "text-pink-500 hover:text-pink-700",
  // },
  // {
  //   href: "https://youtube.com/@takethestageplc",
  //   label: "YouTube",
  //   icon: <FaYoutube size={28} />,
  //   className: "text-red-600 hover:text-red-800",
  // },
  {
    href: "https://tiktok.com/@takethestageplc",
    label: "TikTok",
    icon: <FaTiktok size={28} />,
    className: "text-black hover:text-gray-800",
  },
  // {
  //   href: "https://github.com/takethestageplc",
  //   label: "GitHub",
  //   icon: <FaGithub size={28} />,
  //   className: "text-gray-800 hover:text-black",
  // },
];

export default function SocialIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {socialLinks.map(({ href, label, icon, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit us on ${label}`}
          className={`social-icon-link ${className}`}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
