"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useTestimonialService from "../testimonial.service";
import { Testimonial } from "../testimonial.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const TestimonialDetail: React.FC<{ id: string }> = ({ id }) => {
  const [testimonial, setTestimonial] = useState<Testimonial>();
  const testimonialService = useTestimonialService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    testimonialService
      .getTestimonial(id)
      .then((res) => {
        setTestimonial(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    testimonialService
      .deleteTestimonial(id)
      .then(() => {
        router.push("/admin/engagement/testimonials");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "id",
      label: "Id",
      children: testimonial?.id,
    },

    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(testimonial?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(testimonial?.update_date),
    },

    {
      key: "created_by",
      label: "Created By",
      children: testimonial?.created_by_detail?.full_name || testimonial?.created_by,
    },

    {
      key: "updated_by",
      label: "Updated By",
      children: testimonial?.updated_by_detail?.full_name || testimonial?.updated_by,
    },

    {
      key: "name",
      label: "Name",
      children: testimonial?.name,
    },

    {
      key: "profile",
      label: "Profile",
      children: testimonial?.profile,
    },

    {
      key: "job",
      label: "Job",
      children: testimonial?.job,
    },

    {
      key: "review",
      label: "Review",
      children: testimonial?.review,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="Testimonial Information"
        bordered
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/engagement/testimonials/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this testimonial?"
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

export default TestimonialDetail;
