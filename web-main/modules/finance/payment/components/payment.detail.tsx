"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import usePaymentService from "../payment.service";
import { Payment } from "../payment.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const PaymentDetail: React.FC<{ id: string }> = ({ id }) => {
  const [payment, setPayment] = useState<Payment>();
  const paymentService = usePaymentService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    paymentService
      .getPayment(id)
      .then((res) => {
        setPayment(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    paymentService
      .deletePayment(id)
      .then(() => {
        router.push("/admin/finance/payments");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: payment?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(payment?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(payment?.update_date),
    },

    {
      key: "student",
      label: "Student",
      children: payment?.student_detail?.user_detail?.full_name || payment?.student,
    },

    {
      key: "teacher",
      label: "Teacher",
      children: payment?.teacher_detail?.user_detail?.full_name || payment?.teacher,
    },

    {
      key: "amount",
      label: "Amount",
      children: payment?.amount,
    },

    {
      key: "date",
      label: "Date",
      children: toDateAndTime(payment?.date),
    },

    {
      key: "receipt",
      label: "Receipt",
      children: payment?.receipt,
    },

    {
      key: "ref_number",
      label: "Ref Number",
      children: payment?.ref_number,
    },

    {
      key: "status",
      label: "[(100, 'Paid'), (101, 'Overdue'), (102, 'Pending'), (103, 'Rejected')]",
      children: payment?.status,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Payment Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/finance/payments/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this payment?"
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

export default PaymentDetail;
