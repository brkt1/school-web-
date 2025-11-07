"use client";

import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import "@ant-design/v5-patch-for-react-19";
import { Input as AntInput, Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ContactUs } from "../contact_us.model";
import useContactUsService from "../contact_us.service";

const { TextArea } = AntInput;

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
    <Form form={form} onFinish={onFinish} layout="vertical" className="modern-form">
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">Contact Us Form</h2>
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
      <div className="grid sm:grid-cols-2 gap-6">

            {!props.full_name && (
      <Form.Item 
        name="full_name" 
        label={
          <span>
            Full Name <span className="text-red-500">*</span>
          </span>
        }
        className="modern-form-item"
        rules={[{ required: true, message: "Full Name is required" }]}
      >
        <Input placeholder="Enter your full name" size="large" />
      </Form.Item>)}

            {!props.email && (
      <Form.Item 
        name="email" 
        label={
          <span>
            Email <span className="text-red-500">*</span>
          </span>
        }
        className="modern-form-item"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Please enter a valid email address" }
        ]}
      >
        <Input type="email" placeholder="your.email@example.com" size="large" />
      </Form.Item>)}

            {!props.phone_number && (
      <Form.Item 
        name="phone_number" 
        label={
          <span>
            Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
          </span>
        }
        className="modern-form-item"
      >
        <Input placeholder="Enter your phone number" size="large" />
      </Form.Item>)}

            {!props.subject && (
      <Form.Item 
        name="subject" 
        label={
          <span>
            Subject <span className="text-red-500">*</span>
          </span>
        }
        className="modern-form-item sm:col-span-2"
        rules={[{ required: true, message: "Subject is required" }]}
      >
        <Input placeholder="Enter message subject" size="large" />
      </Form.Item>)}

            {!props.message && (
      <Form.Item 
        name="message" 
        label={
          <span>
            Message <span className="text-red-500">*</span>
          </span>
        }
        className="modern-form-item sm:col-span-2"
        rules={[{ required: true, message: "Message is required" }]}
      >
        <TextArea 
          rows={6} 
          placeholder="Enter your message here..." 
          size="large"
          showCount
          maxLength={1000}
        />
      </Form.Item>)}
      </div>
    </Form>
  );
};

export default ContactUsForm;
