import { 
  ReadOutlined, 
  FileTextOutlined, 
  MessageOutlined, 
  PictureOutlined, 
  MailOutlined 
} from "@ant-design/icons";
import Link from "next/link";

export const EngagementMenu = {
  key: "/admin/engagement",
  icon: <ReadOutlined />,
  label: "Engagement",
  children: [
    {
      key: "/admin/engagement/newss",
      icon: <ReadOutlined />,
      label: <Link href="/admin/engagement/newss">News</Link>,
    },
    {
      key: "/admin/engagement/blogs",
      icon: <FileTextOutlined />,
      label: <Link href="/admin/engagement/blogs">Blog</Link>,
    },
    {
      key: "/admin/engagement/testimonials",
      icon: <MessageOutlined />,
      label: <Link href="/admin/engagement/testimonials">Testimonial</Link>,
    },
    {
      key: "/admin/engagement/gallerys",
      icon: <PictureOutlined />,
      label: <Link href="/admin/engagement/gallerys">Media</Link>,
    },
    {
      key: "/admin/engagement/contact_us",
      icon: <MailOutlined />,
      label: <Link href="/admin/engagement/contact_us">Contact Us</Link>,
    },
  ],
};
