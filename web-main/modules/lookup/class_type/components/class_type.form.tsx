"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {ClassType } from "../class_type.model";
import "@ant-design/v5-patch-for-react-19";
import useClassTypeService from "../class_type.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";

const ClassTypeForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<ClassType>();
  const [data, setData] = useState<ClassType>();
  const service = useClassTypeService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getClassType(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: ClassType) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service.updateClassType(id, values)
        .then(() => router.push(`/admin/lookup/class_types/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addClassType(values)
        .then(() => router.push(`/admin/lookup/class_types`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">ClassType Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={`/admin/lookup/class_types/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={`/admin/lookup/class_types`} type="text">Cancel</Button>
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

export default ClassTypeForm;
