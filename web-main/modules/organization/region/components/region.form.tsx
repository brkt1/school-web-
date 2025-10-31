"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {Region } from "../region.model";
import "@ant-design/v5-patch-for-react-19";
import useRegionService from "../region.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";

const RegionForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<Region>();
  const service = useRegionService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getRegion(id)
        .then(res => {
          form.setFieldsValue(res.data);
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Region) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service.updateRegion(id, values)
        .then(() => router.push(`/admin/organization/regions/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addRegion(values)
        .then(() => router.push(`/admin/organization/regions`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-end gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={`/admin/organization/regions/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={`/admin/organization/regions`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        
      

      

      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
        <Input/>
      </Form.Item>
      </div>
    </Form>
  );
};

export default RegionForm;
