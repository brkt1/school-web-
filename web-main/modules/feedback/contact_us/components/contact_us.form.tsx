"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {ContactUs } from "../contact_us.model";
import "@ant-design/v5-patch-for-react-19";
import useContactUsService from "../contact_us.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";

interface ContactUsFormProps extends Partial<ContactUs>, Navigations {}

const ContactUsForm: React.FC<ContactUsFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<ContactUs>();
  const [data, setData] = useState<ContactUs>();
  const service = useContactUsService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getContactUs(id)
        .then(res => {
          form.setFieldsValue(res?.data);
          setData(res?.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: ContactUs) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updateContactUs(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/feedback/contact_uss/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addContactUs(values)
        .then(() => router.push(props.list_navigation || `/admin/feedback/contact_uss`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">ContactUs Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/feedback/contact_uss/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/feedback/contact_uss`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">

            {!props.full_name && (
      <Form.Item name="full_name" label="Full Name" rules={[{ required: true, message: "Full Name is required" }]}>
        <Input placeholder="Full Name" />
      </Form.Item>)}

            {!props.email && (
      <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email is required" }]}>
        <Input placeholder="Email" />
      </Form.Item>)}

            {!props.phone_number && (
      <Form.Item name="phone_number" label="Phone_Number" rules={[]}>
        <Input />
      </Form.Item>)}

            {!props.subject && (
      <Form.Item name="subject" label="Subject" rules={[{ required: true, message: "Subject is required" }]}>
        <Input />
      </Form.Item>)}

            {!props.message && (
      <Form.Item name="message" label="Message" rules={[{ required: true, message: "Message is required" }]}>
        <Input />
      </Form.Item>)}
      </div>
    </Form>
  );
};

export default ContactUsForm;
