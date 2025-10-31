"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useGalleryService from "../gallery.service";
import { Gallery } from "../gallery.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const GalleryDetail: React.FC<{ id: string }> = ({ id }) => {
  const [gallery, setGallery] = useState<Gallery>();
  const galleryService = useGalleryService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    galleryService
      .getGallery(id)
      .then((res) => {
        setGallery(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    galleryService
      .deleteGallery(id)
      .then(() => {
        router.push("/admin/engagement/gallerys");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: gallery?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(gallery?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(gallery?.update_date),
    },

    {
      key: "created_by",
      label: "Created By",
      children: gallery?.created_by_detail?.full_name || gallery?.created_by,
    },

    {
      key: "updated_by",
      label: "Updated By",
      children: gallery?.updated_by_detail?.full_name || gallery?.updated_by,
    },

    {
      key: "title",
      label: "Title",
      children: gallery?.title,
    },

    {
      key: "image",
      label: "Image",
      children: gallery?.image,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Media Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/engagement/gallerys/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this gallery?"
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

export default GalleryDetail;
