"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Image, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useNewsService from "../news.service";
import { News } from "../news.model";
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

const NewsDetail: React.FC<{ id: string }> = ({ id }) => {
  const [news, setNews] = useState<News>();
  const newsService = useNewsService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    newsService
      .getNews(id)
      .then((res) => {
        setNews(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    newsService
      .deleteNews(id)
      .then(() => {
        router.push("/admin/engagement/newss");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(news?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(news?.update_date),
    },

    {
      key: "title",
      label: "Title",
      children: news?.title,
      span: 5
    },

    {
      key: "short_description",
      label: "Short Description",
      children: news?.short_description,
      span: 5
    },

        {
      key: "image",
      label: "Image",
      children: <Image preview={false} src={news?.image}/>,
      span: 5
    },

    {
      key: "main_content",
      label: "Main Content",
      children: <RichTextEditor readonly value={news?.main_content} />,
      span: 3
    },
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="News Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/engagement/newss/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this news?"
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
        column={2}
        items={items}
      />
    </>
  );
};

export default NewsDetail;
