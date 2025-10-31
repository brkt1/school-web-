"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker, Upload, UploadFile, Image } from "antd";
import {News } from "../news.model";
import "@ant-design/v5-patch-for-react-19";
import useNewsService from "../news.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { UploadOutlined } from "@ant-design/icons";
import './news.form.css'
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import('@/components/Commons/RichTextEditor'), {
  ssr: false,
});

const NewsForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<News>();
  const service = useNewsService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (id) {
      service.getNews(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setFileList([{
            name: res.data.title,
            uid: res.data.id,
            url: res.data.image,
            status: "done",
          }])
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: News) => {
    // You can add phone number or date formatting here if needed
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
      service.updateNews(id, formData)
        .then(() => router.push(`/admin/engagement/newss/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addNews(formData)
        .then(() => router.push(`/admin/engagement/newss`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div className="flex justify-end gap-4 mb-4">
        {id ? (
          <Button
            loading={loading}
            href={`/admin/engagement/newss/${id}`}
            type="text"
          >
            Cancel
          </Button>
        ) : (
          <Button
            loading={loading}
            href={`/admin/engagement/newss`}
            type="text"
          >
            Cancel
          </Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      <div className="">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
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
        <Form.Item
          name="short_description"
          label="Short Description"
          rules={[{ required: true, message: "Short Description is required" }]}
        >
          <Input.TextArea autoSize={{minRows: 2}} />
        </Form.Item>
        <Form.Item
          name="main_content"
          label="Main Content"
          rules={[{ required: true, message: "Main Content is required" }]}
        >
          <RichTextEditor />
        </Form.Item>
      </div>
    </Form>
  );
};

export default NewsForm;
