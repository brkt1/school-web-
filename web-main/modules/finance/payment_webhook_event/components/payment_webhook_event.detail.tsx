"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import usePaymentWebhookEventService from "../payment_webhook_event.service";
import { PaymentWebhookEvent } from "../payment_webhook_event.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const PaymentWebhookEventDetail: React.FC<{ id: string }> = ({ id }) => {
  const [paymentwebhookevent, setPaymentWebhookEvent] = useState<PaymentWebhookEvent>();
  const paymentwebhookeventService = usePaymentWebhookEventService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    paymentwebhookeventService
      .getPaymentWebhookEvent(id)
      .then((res) => {
        setPaymentWebhookEvent(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    paymentwebhookeventService
      .deletePaymentWebhookEvent(id)
      .then(() => {
        router.push("/admin/finance/payment_webhook_events");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: paymentwebhookevent?.id,
    },

    {
      key: "payment",
      label: "Payment",
      children: paymentwebhookevent?.payment_detail?.ref_number || paymentwebhookevent?.payment,
    },

    {
      key: "event_type",
      label: "Event Type",
      children: paymentwebhookevent?.event_type,
    },

    {
      key: "status",
      label: "Status",
      children: paymentwebhookevent?.status,
    },

    {
      key: "payload",
      label: "Payload",
      children: paymentwebhookevent?.payload,
    },

    {
      key: "received_at",
      label: "Received At",
      children: toDateAndTime(paymentwebhookevent?.received_at),
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="PaymentWebhookEvent Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/finance/payment_webhook_events/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this paymentwebhookevent?"
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

export default PaymentWebhookEventDetail;
