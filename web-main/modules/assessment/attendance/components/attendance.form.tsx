"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {Attendance } from "../attendance.model";
import "@ant-design/v5-patch-for-react-19";
import useAttendanceService from "../attendance.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import StudentSearchInput from "@/modules/accounts/student/components/student.search";

const AttendanceForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<Attendance>();
  const [data, setData] = useState<Attendance>()
  const service = useAttendanceService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getAttendance(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data);
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Attendance) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service.updateAttendance(id, values)
        .then(() => router.push(`/admin/assessment/attendances/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addAttendance(values)
        .then(() => router.push(`/admin/assessment/attendances`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-end gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={`/admin/assessment/attendances/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={`/admin/assessment/attendances`} type="text">Cancel</Button>
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

      <Form.Item name="present" label="Present" valuePropName="checked" rules={[{ required: true, message: "Present is required" }]}>
        <Checkbox />
      </Form.Item>

      <Form.Item name="date" label="Date" rules={[{ required: true, message: "Date is required" }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      </div>
    </Form>
  );
};

export default AttendanceForm;
