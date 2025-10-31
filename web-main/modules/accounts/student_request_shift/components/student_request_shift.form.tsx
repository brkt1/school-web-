"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {StudentRequestShift } from "../student_request_shift.model";
import "@ant-design/v5-patch-for-react-19";
import useStudentRequestShiftService from "../student_request_shift.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import PackageSearchInput from "@/modules/lookup/package/components/package.search";
import ShiftSearchInput from "@/modules/lookup/shift/components/shift.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import { enumToLabelValueArray } from "@/utils/object";
import StudentSearchInput from "../../student/components/student.search";
import { Days } from "../../student/student.enum";

interface StudentRequestShiftFormProps extends Partial<StudentRequestShift>, Navigations {}

const StudentRequestShiftForm: React.FC<StudentRequestShiftFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<StudentRequestShift>();
  const [data, setData] = useState<StudentRequestShift>();
  const service = useStudentRequestShiftService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getStudentRequestShift(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: StudentRequestShift) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updateStudentRequestShift(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/accounts/student_request_shifts/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addStudentRequestShift(values)
        .then(() => router.push(props.list_navigation || `/admin/accounts/student_request_shifts`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">StudentRequestShift Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/accounts/student_request_shifts/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/accounts/student_request_shifts`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">

            {!props.create_date && (
      <Form.Item name="create_date" label="Create Date" rules={[]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>)}

            {!props.update_date && (
      <Form.Item name="update_date" label="Update Date" rules={[]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>)}

            {!props.student && (
        <Form.Item name="student" label="Student" rules={[{ required: true, message: "Student is required" }]}>
            <StudentSearchInput detail={data?.student_detail} />
        </Form.Item>)}

            {!props.institution && (
        <Form.Item name="institution" label="Institution" rules={[{ required: true, message: "Institution is required" }]}>
            <InstitutionSearchInput detail={data?.institution_detail} />
        </Form.Item>)}

            {!props.fee_package && (
        <Form.Item name="fee_package" label="Fee Package" rules={[{ required: true, message: "Fee Package is required" }]}>
            <PackageSearchInput detail={data?.fee_package_detail} />
        </Form.Item>)}

            {!props.shift_days && (
      <Form.Item name="shift_days" label="Shift Days" rules={[{ required: true, message: "Shift Days is required" }]}>
        <Select
          optionFilterProp="label"
          options={enumToLabelValueArray(Days)}
          placeholder="Shift Days"
        />
      </Form.Item>)}

            {!props.shift_times && (
        <Form.Item name="shift_times" label="Shift Times" rules={[]}>
            <ShiftSearchInput detail={data?.shift_times_detail} />
        </Form.Item>)}

            {!props.start_time && (
      <Form.Item name="start_time" label="Start Time" rules={[{ required: true, message: "Start Time is required" }]}>
        <Input placeholder="Start Time" />
      </Form.Item>)}

            {!props.end_time && (
      <Form.Item name="end_time" label="End Time" rules={[{ required: true, message: "End Time is required" }]}>
        <Input placeholder="End Time" />
      </Form.Item>)}
      </div>
    </Form>
  );
};

export default StudentRequestShiftForm;
