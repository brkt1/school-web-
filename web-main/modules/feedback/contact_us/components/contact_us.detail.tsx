"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useContactUsService from "../contact_us.service";
import { ContactUs } from "../contact_us.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ContactUsDetail: React.FC<{ id: string }> = ({ id }) => {
  const [contactus, setContactUs] = useState<ContactUs>();
  const contactusService = useContactUsService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    contactusService
      .getContactUs(id)
      .then((res) => {
        setContactUs(res?.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    contactusService
      .deleteContactUs(id)
      .then(() => {
        router.push("/admin/feedback/contact_uss");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: contactus?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(contactus?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(contactus?.update_date),
    },

    {
      key: "created_by",
      label: "Created By",
      children: contactus?.created_by_detail?.full_name || contactus?.created_by,
    },

    {
      key: "updated_by",
      label: "Updated By",
      children: contactus?.updated_by_detail?.full_name || contactus?.updated_by,
    },

    {
      key: "full_name",
      label: "Full Name",
      children: contactus?.full_name,
    },

    {
      key: "email",
      label: "Email",
      children: contactus?.email,
    },

    {
      key: "phone_number",
      label: "Phone_Number",
      children: contactus?.phone_number,
    },

    {
      key: "subject",
      label: "Subject",
      children: contactus?.subject,
    },

    {
      key: "message",
      label: "Message",
      children: contactus?.message,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="ContactUs Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/feedback/contact_uss/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this contactus?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary" color="red" icon={<FaTrash />}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        }
        items={items}
      />
    </>
  );
};

export default ContactUsDetail;
