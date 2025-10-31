import { 
  DollarOutlined, 
  FileTextOutlined, 
  CreditCardOutlined 
} from "@ant-design/icons";
import Link from "next/link";

export const FinanceMenu = {
  key: "/admin/finance",
  icon: <DollarOutlined />,
  label: "Finance",
  children: [
    {
      key: "/admin/finance/payments",
      icon: <CreditCardOutlined />,
      label: <Link href="/admin/finance/payments">Payment</Link>,
    },
    {
      key: "/admin/finance/payment_webhook_events",
      icon: <FileTextOutlined />,
      label: <Link href="/admin/finance/payment_webhook_events">Payment Webhook Event</Link>,
    },
    {
      key: "/admin/finance/fee_packages",
      icon: <DollarOutlined />,
      label: <Link href="/admin/finance/fee_packages">Fee Package</Link>,
    },
  ],
};
