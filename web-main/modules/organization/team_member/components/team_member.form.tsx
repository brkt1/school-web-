"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker, UploadFile, Upload } from "antd";
import {TeamMember } from "../team_member.model";
import "@ant-design/v5-patch-for-react-19";
import useTeamMemberService from "../team_member.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import { UploadOutlined } from "@ant-design/icons";
import './team_member.form.css'


interface TeamMemberFormProps extends Partial<TeamMember>, Navigations {}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<TeamMember>();
  const [data, setData] = useState<TeamMember>();
  const service = useTeamMemberService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();
   const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (id) {
      service.getTeamMember(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: TeamMember) => {
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
      service.updateTeamMember(id, formData)
        .then(() => router.push(props.detail_navigation || `/admin/organization/team_members/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addTeamMember(formData)
        .then(() => router.push(props.list_navigation || `/admin/organization/team_members`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">TeamMember Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/organization/team_members/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/organization/team_members`} type="text">Cancel</Button>
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
      <Form.Item className="row-span-2" name="profile" label="Profile" rules={[]}>
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
            

            {!props.full_name && (
      <Form.Item name="full_name" label="Full Name" rules={[{ required: true, message: "Full Name is required" }]}>
        <Input />
      </Form.Item>)}

      {!props.position && (
      <Form.Item name="position" label="Position" rules={[{ required: true, message: "Position is required" }]}>
        <Input />
      </Form.Item>)}

            {!props.facebook_link && (
      <Form.Item name="facebook_link" label="Facebook Link" rules={[]}>
        <Input />
      </Form.Item>)}

            {!props.twitter_link && (
      <Form.Item name="twitter_link" label="Twitter Link" rules={[]}>
        <Input />
      </Form.Item>)}

            {!props.linkedin_link && (
      <Form.Item name="linkedin_link" label="Linkedin Link" rules={[]}>
        <Input />
      </Form.Item>)}

            {!props.description && (
      <Form.Item className="col-span-2" name="description" label="Description" rules={[{ required: true, message: "Description is required" }]}>
        <Input.TextArea placeholder="Description" autoSize={{minRows: 3}} />
      </Form.Item>)}
      </div>
    </Form>
  );
};

export default TeamMemberForm;
