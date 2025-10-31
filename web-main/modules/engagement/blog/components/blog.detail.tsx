"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Image, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useBlogService from "../blog.service";
import { Blog } from "../blog.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import('@/components/Commons/RichTextEditor'), {
  ssr: false,
});

const BlogDetail: React.FC<{ id: string }> = ({ id }) => {
  const [blog, setBlog] = useState<Blog>();
  const blogService = useBlogService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    blogService
      .getBlog(id)
      .then((res) => {
        setBlog(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    blogService
      .deleteBlog(id)
      .then(() => {
        router.push("/admin/engagement/blogs");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(blog?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(blog?.update_date),
    },

    {
      key: "title",
      label: "Title",
      children: blog?.title,
      span: 5
    },

    {
      key: "short_description",
      label: "Short Description",
      children: blog?.short_description,
      span: 5
    },

        {
      key: "image",
      label: "Image",
      children: <Image preview={false} src={blog?.thumbnail}/>,
      span: 5
    },

    {
      key: "main_content",
      label: "Main Content",
      children: <RichTextEditor readonly value={blog?.main_content} />,
      span: 3
    },
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Blog Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/engagement/blogs/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this blog?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary" color="red" icon={<FaTrash />}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        }
        items={items}
      />
    </>
  );
};

export default BlogDetail;
