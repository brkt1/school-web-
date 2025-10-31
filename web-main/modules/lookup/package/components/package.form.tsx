"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {Package } from "../package.model";
import "@ant-design/v5-patch-for-react-19";
import usePackageService from "../package.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";

const PackageForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<Package>();
  const [data, setData] = useState<Package>();
  const service = usePackageService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getPackage(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Package) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service.updatePackage(id, values)
        .then(() => router.push(`/admin/lookup/packages/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addPackage(values)
        .then(() => router.push(`/admin/lookup/packages`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">Package Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={`/admin/lookup/packages/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={`/admin/lookup/packages`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        
      

      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true, message: "Description is required" }]}>
        <Input.TextArea autoSize={{minRows: 3}} />
      </Form.Item>
      </div>
    </Form>
  );
};

export default PackageForm;
