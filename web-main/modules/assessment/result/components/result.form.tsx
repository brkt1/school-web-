"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {Result } from "../result.model";
import "@ant-design/v5-patch-for-react-19";
import useResultService from "../result.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import StudentSearchInput from "@/modules/accounts/student/components/student.search";

const ResultForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<Result>();
  const [data, setData] = useState<Result>()
  const service = useResultService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getResult(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data);
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Result) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service.updateResult(id, values)
        .then(() => router.push(`/admin/assessment/results/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addResult(values)
        .then(() => router.push(`/admin/assessment/results`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-end gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={`/admin/assessment/results/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={`/admin/assessment/results`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        
      

      

        <Form.Item name="student" label="Student" rules={[{ required: true, message: "Student is required" }]}>
            <StudentSearchInput detail={data?.student_detail} />
        </Form.Item>

      <Form.Item name="exam_name" label="Exam Name" rules={[{ required: true, message: "Exam Name is required" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="score" label="Score" rules={[{ required: true, message: "Score is required" }]}>
        <Input placeholder="Score" />
      </Form.Item>

      <Form.Item name="date" label="Date" rules={[{ required: true, message: "Date is required" }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      </div>
    </Form>
  );
};

export default ResultForm;
