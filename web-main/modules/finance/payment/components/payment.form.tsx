"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {Payment } from "../payment.model";
import "@ant-design/v5-patch-for-react-19";
import usePaymentService from "../payment.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import StudentSearchInput from "@/modules/accounts/student/components/student.search";
import TeacherSearchInput from "@/modules/accounts/teacher/components/teacher.search";
import { enumToLabelValueArray } from "@/utils/object";
import { PaymentStatus } from "@/modules/accounts/student/student.enum";

interface PaymentFormProps extends Partial<Payment>, Navigations {}

const PaymentForm: React.FC<PaymentFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<Payment>();
  const [data, setData] = useState<Payment>();
  const service = usePaymentService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getPayment(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Payment) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updatePayment(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/finance/payments/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addPayment(values)
        .then((data) => router.push(data.data.redirect_url))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">Payment Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/finance/payments/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/finance/payments`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">

            {!props.student && (
        <Form.Item name="student" label="Student" rules={[]}>
            <StudentSearchInput detail={data?.student_detail} />
        </Form.Item>)}

            {!props.teacher && (
        <Form.Item name="teacher" label="Teacher" rules={[]}>
            <TeacherSearchInput detail={data?.teacher_detail} />
        </Form.Item>)}

            {!props.amount && (
      <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Amount is required" }]}>
        <Input placeholder="Amount" />
      </Form.Item>)}

            {!props.date && (
      <Form.Item name="date" label="Date" rules={[{ required: true, message: "Date is required" }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>)}

            {!props.receipt && (
      <Form.Item name="receipt" label="Receipt">
        <Input placeholder="Receipt" />
      </Form.Item>)}

            {!props.ref_number && (
      <Form.Item name="ref_number" label="Ref Number" rules={[{ required: true, message: "Ref Number is required" }]}>
        <Input />
      </Form.Item>)}

            {!props.status && (
      <Form.Item name="status" label="Payment Status" rules={[{ required: true, message: "Payment Status is required" }]}>
        <Select placeholder="Payment Status"  optionFilterProp="label"
                    options={enumToLabelValueArray(PaymentStatus)} />
      </Form.Item>)}
      </div>
    </Form>
  );
};

export default PaymentForm;
