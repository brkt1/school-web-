"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker, Upload, UploadFile } from "antd";
import {Testimonial } from "../testimonial.model";
import "@ant-design/v5-patch-for-react-19";
import useTestimonialService from "../testimonial.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import { UploadOutlined } from "@ant-design/icons";
import './testimonial.form.css'

interface TestimonialFormProps extends Partial<Testimonial>, Navigations {}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<Testimonial>();
  const [data, setData] = useState<Testimonial>();
  const service = useTestimonialService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (id) {
      service.getTestimonial(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Testimonial) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "profile") {
        formData.append(key, value);
      }
    });
    if (fileList?.length > 0 && fileList[0].originFileObj) {
      formData.append("profile", fileList[0].originFileObj as File);
    }

    if (id) {
      service.updateTestimonial(id, formData)
        .then(() => router.push(props.detail_navigation || `/admin/engagement/testimonials/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addTestimonial(formData)
        .then(() => router.push(props.list_navigation || `/admin/engagement/testimonials`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">Testimonial Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/engagement/testimonials/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/engagement/testimonials`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        


                      {!props.profile && (
      <Form.Item name="profile" label="Profile" rules={[]}>
        <Upload
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            listType="picture-card"
            className="min-h-60"
            multiple={false}
            showUploadList={{
              showDownloadIcon: false,
            }}
            onRemove={(file) => {
              setFileList([]);
            }}
            beforeUpload={(file) => {
              setFileList([file]);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>
      </Form.Item>)}  

            {!props.name && (
      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
        <Input />
      </Form.Item>)}

            {!props.job && (
      <Form.Item name="job" label="Job" rules={[{ required: true, message: "Job is required" }]}>
        <Input />
      </Form.Item>)}

            {!props.review && (
      <Form.Item name="review" label="Review" rules={[{ required: true, message: "Review is required" }]}>
        <Input.TextArea placeholder="Review" autoSize={{minRows: 3}} />
      </Form.Item>)}
      </div>
    </Form>
  );
};

export default TestimonialForm;
