"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {Application } from "../application.model";
import "@ant-design/v5-patch-for-react-19";
import useApplicationService from "../application.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { enumToLabelValueArray } from "@/utils/object";
import { ApplicationStatus } from "../application.enum";
import { Shift } from "@/modules/accounts/student/student.enum";
import TeacherSearchInput from "@/modules/accounts/teacher/components/teacher.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";

const ApplicationForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<Application>();
  const [data, setData] = useState<Application>()
  const service = useApplicationService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getApplication(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Application) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service.updateApplication(id, values)
        .then(() => router.push(`/admin/assessment/applications/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addApplication(values)
        .then(() => router.push(`/admin/assessment/applications`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-end gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={`/admin/assessment/applications/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={`/admin/assessment/applications`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        
      

      

        <Form.Item name="teacher" label="Teacher" rules={[{ required: true, message: "Teacher is required" }]}>
            <TeacherSearchInput detail={data?.teacher_detail} />
        </Form.Item>

      <Form.Item name="status" label="Status" rules={[{ required: true, message: "Status is required" }]}>
        <Select
          optionFilterProp="label"
          options={enumToLabelValueArray(ApplicationStatus)}
          placeholder="Status"
        />
      </Form.Item>

      <Form.Item name="submission_date" label="Submission Date" rules={[]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="application_letter" label="Application Letter" rules={[{ required: true, message: "Application Letter is required" }]}>
        <Input />
      </Form.Item>

        <Form.Item name="institution" label="Institution" rules={[{ required: true, message: "Institution is required" }]}>
            <InstitutionSearchInput detail={data?.institution_detail} />
        </Form.Item>

      <Form.Item name="shift" label="Shift" rules={[{ required: true, message: "Shift is required" }]}>
        <Select
          optionFilterProp="label"
          options={enumToLabelValueArray(Shift)}
          placeholder="Shift"
        />
      </Form.Item>
      </div>
    </Form>
  );
};

export default ApplicationForm;
