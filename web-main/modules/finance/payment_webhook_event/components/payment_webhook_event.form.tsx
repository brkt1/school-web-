"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {PaymentWebhookEvent } from "../payment_webhook_event.model";
import "@ant-design/v5-patch-for-react-19";
import usePaymentWebhookEventService from "../payment_webhook_event.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import PaymentSearchInput from "../../payment/components/payment.search";

interface PaymentWebhookEventFormProps extends Partial<PaymentWebhookEvent>, Navigations {}

const PaymentWebhookEventForm: React.FC<PaymentWebhookEventFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<PaymentWebhookEvent>();
  const [data, setData] = useState<PaymentWebhookEvent>();
  const service = usePaymentWebhookEventService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getPaymentWebhookEvent(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: PaymentWebhookEvent) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updatePaymentWebhookEvent(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/finance/payment_webhook_events/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addPaymentWebhookEvent(values)
        .then(() => router.push(props.list_navigation || `/admin/finance/payment_webhook_events`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">PaymentWebhookEvent Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/finance/payment_webhook_events/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/finance/payment_webhook_events`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">

            {!props.payment && (
        <Form.Item name="payment" label="Payment" rules={[{ required: true, message: "Payment is required" }]}>
            <PaymentSearchInput detail={data?.payment_detail} />
        </Form.Item>)}

            {!props.event_type && (
      <Form.Item name="event_type" label="Event Type" rules={[{ required: true, message: "Event Type is required" }]}>
        <Input placeholder="Event Type" />
      </Form.Item>)}

            {!props.status && (
      <Form.Item name="status" label="Status" rules={[{ required: true, message: "Status is required" }]}>
        <Input placeholder="Status" />
      </Form.Item>)}

            {!props.payload && (
      <Form.Item name="payload" label="Payload" rules={[{ required: true, message: "Payload is required" }]}>
        <Input placeholder="Payload" />
      </Form.Item>)}

            {!props.received_at && (
      <Form.Item name="received_at" label="Received At" rules={[{ required: true, message: "Received At is required" }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>)}
      </div>
    </Form>
  );
};

export default PaymentWebhookEventForm;
