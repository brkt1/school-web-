"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Image, Popconfirm } from "antd";
import type { DescriptionsProps } from "antd";
import useTeamMemberService from "../team_member.service";
import { TeamMember } from "../team_member.model";
import "@ant-design/v5-patch-for-react-19";
import { toDateAndTime } from "@/utils/timeUtils";
import { getEnumName } from "@/utils/object";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const TeamMemberDetail: React.FC<{ id: string }> = ({ id }) => {
  const [teammember, setTeamMember] = useState<TeamMember>();
  const teammemberService = useTeamMemberService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    teammemberService
      .getTeamMember(id)
      .then((res) => {
        setTeamMember(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    teammemberService
      .deleteTeamMember(id)
      .then(() => {
        router.push("/admin/organization/team_members");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const items: DescriptionsProps["items"] = [
    
    {
      key: "create_date",
      label: "Create Date",
      children: toDateAndTime(teammember?.create_date),
    },

    {
      key: "update_date",
      label: "Update Date",
      children: toDateAndTime(teammember?.update_date),
    },

    {
      key: "created_by",
      label: "Created By",
      children: teammember?.created_by_detail?.full_name || teammember?.created_by,
    },

    {
      key: "updated_by",
      label: "Updated By",
      children: teammember?.updated_by_detail?.full_name || teammember?.updated_by,
    },

    {
      key: "full_name",
      label: "Full Name",
      children: teammember?.full_name,
    },

    {
      key: "facebook_link",
      label: "Facebook Link",
      children: teammember?.facebook_link,
    },

    {
      key: "twitter_link",
      label: "Twitter Link",
      children: teammember?.twitter_link,
    },

    {
      key: "linkedin_link",
      label: "Linkedin Link",
      children: teammember?.linkedin_link,
    },

    {
      key: "description",
      label: "Description",
      children: teammember?.description,
      span: 4
    },

    {
      key: "profile",
      label: "Profile",
      children: <Image preview={false} src={teammember?.profile}/>,
    }
  ];

  return (
    <>
      <Descriptions
        size="small"
        title="TeamMember Information"
        bordered
        column={4}
        extra={
          <div className="gap-2 flex">
            <Button
              href={`/admin/organization/team_members/${id}/edit`}
              type="primary"
              icon={<FaEdit />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this teammember?"
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

export default TeamMemberDetail;
