"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker, Upload, UploadFile } from "antd";
import {Gallery } from "../gallery.model";
import "@ant-design/v5-patch-for-react-19";
import useGalleryService from "../gallery.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import { formToJSON } from "axios";
import './gallery.form.css'
import { UploadOutlined } from "@ant-design/icons";

interface GalleryFormProps extends Partial<Gallery>, Navigations {}

const GalleryForm: React.FC<GalleryFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<Gallery>();
  const [data, setData] = useState<Gallery>();
  const service = useGalleryService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (id) {
      service.getGallery(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Gallery) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value);
      }
    });
    if (fileList?.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj as File);
    }
    if (id) {
      service.updateGallery(id, formData)
        .then(() => router.push(props.detail_navigation || `/admin/engagement/gallerys/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addGallery(formData)
        .then(() => router.push(props.list_navigation || `/admin/engagement/gallerys`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">Media Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/engagement/gallerys/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/engagement/gallerys`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">

            {!props.image && (
      <Form.Item name="image" label="Image" rules={[]}>
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
      </Form.Item>
    )}
                {!props.title && (
      <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
        <Input />
      </Form.Item>)}
      <Form.Item
        name="url"
        label="URL"
        rules={[
          { required: true, message: "URL is required" },
          { type: 'url', message: "Please enter a valid URL" },
        ]}
      >
        <Input placeholder="https://example.com/..." />
      </Form.Item>
      </div>
    </Form>
  );
};

export default GalleryForm;
