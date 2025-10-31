"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {TeacherRequestShift } from "../teacher_request_shift.model";
import "@ant-design/v5-patch-for-react-19";
import useTeacherRequestShiftService from "../teacher_request_shift.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import PackageSearchInput from "@/modules/lookup/package/components/package.search";
import { enumToLabelValueArray } from "@/utils/object";
import ShiftSearchInput from "@/modules/lookup/shift/components/shift.search";
import { Days } from "../../student/student.enum";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import TeacherSearchInput from "../../teacher/components/teacher.search";

interface TeacherRequestShiftFormProps extends Partial<TeacherRequestShift>, Navigations {}

const TeacherRequestShiftForm: React.FC<TeacherRequestShiftFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<TeacherRequestShift>();
  const [data, setData] = useState<TeacherRequestShift>();
  const service = useTeacherRequestShiftService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getTeacherRequestShift(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: TeacherRequestShift) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updateTeacherRequestShift(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/accounts/teacher_request_shifts/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addTeacherRequestShift([values])
        .then(() => router.push(props.list_navigation || `/admin/accounts/teacher_request_shifts`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">TeacherRequestShift Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/accounts/teacher_request_shifts/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/accounts/teacher_request_shifts`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">


            {!props.teacher && (
        <Form.Item name="teacher" label="Teacher" rules={[{ required: true, message: "Teacher is required" }]}>
            <TeacherSearchInput detail={data?.teacher_detail} />
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
        <Form.Item name="shift_times" label="Shift Times" rules={[{ required: true, message: "Shift Times is required" }]}>
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

export default TeacherRequestShiftForm;
