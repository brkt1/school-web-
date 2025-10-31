"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker, Upload, UploadFile } from "antd";
import {Blog } from "../blog.model";
import "@ant-design/v5-patch-for-react-19";
import useBlogService from "../blog.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import { UploadOutlined } from "@ant-design/icons";
import './blog.form.css'
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import('@/components/Commons/RichTextEditor'), { ssr: false });

interface BlogFormProps extends Partial<Blog>, Navigations {}

const BlogForm: React.FC<BlogFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<Blog>();
  const [data, setData] = useState<Blog>();
  const service = useBlogService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (id) {
      service.getBlog(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Blog) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "thumbnail") {
        formData.append(key, value);
      }
    });
    if (fileList?.length > 0 && fileList[0].originFileObj) {
      formData.append("thumbnail", fileList[0].originFileObj as File);
    }
    if (id) {
      service.updateBlog(id, formData)
        .then(() => router.push(props.detail_navigation || `/admin/engagement/blogs/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addBlog(formData)
        .then(() => router.push(props.list_navigation || `/admin/engagement/blogs`))
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
        <Form.Item name="thumbnail" label="Thumbnail" rules={[]}>
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

export default BlogForm;
