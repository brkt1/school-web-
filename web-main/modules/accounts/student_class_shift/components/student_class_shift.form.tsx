"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {StudentClassShift } from "../student_class_shift.model";
import "@ant-design/v5-patch-for-react-19";
import useStudentClassShiftService from "../student_class_shift.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import StudentSearchInput from "../../student/components/student.search";
import ClassRoomSearchInput from "@/modules/organization/class_room/components/class_room.search";
import ClassRoomShiftSearchInput from "@/modules/organization/class_room_shift/components/class_room_shift.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import { enumToLabelValueArray } from "@/utils/object";

interface StudentClassShiftFormProps extends Partial<StudentClassShift>, Navigations {}

const StudentClassShiftForm: React.FC<StudentClassShiftFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<StudentClassShift>();
  const [data, setData] = useState<StudentClassShift>();
  const service = useStudentClassShiftService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getStudentClassShift(id)
        .then(res => {
          form.setFieldsValue(res?.data);
          setData(res?.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: StudentClassShift) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updateStudentClassShift(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/accounts/student_class_shifts/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addStudentClassShift(values)
        .then(() => router.push(props.list_navigation || `/admin/accounts/student_class_shifts`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">StudentClassShift Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/accounts/student_class_shifts/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/accounts/student_class_shifts`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
            {!props.student && (
        <Form.Item name="student" label="Student" rules={[{ required: true, message: "Student is required" }]}>
            <StudentSearchInput detail={data?.student_detail} />
        </Form.Item>)}

            {!props.institution && (
        <Form.Item name="institution" label="Institution" rules={[{ required: true, message: "Institution is required" }]}>
            <InstitutionSearchInput detail={data?.institution_detail} />
        </Form.Item>)}

            {!props.class_room && (
        <Form.Item name="class_room" label="Class Room" rules={[]}>
            <ClassRoomSearchInput detail={data?.class_room_detail} />
        </Form.Item>)}

            {!props.class_room_shift && (
        <Form.Item name="class_room_shift" label="Class Room Shift" rules={[{ required: true, message: "Class Room Shift is required" }]}>
            <ClassRoomShiftSearchInput detail={data?.class_room_shift_detail} />
        </Form.Item>)}
      </div>
    </Form>
  );
};

export default StudentClassShiftForm;
