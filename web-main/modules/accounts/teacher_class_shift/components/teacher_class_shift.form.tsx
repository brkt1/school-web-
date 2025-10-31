"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {TeacherClassShift } from "../teacher_class_shift.model";
import "@ant-design/v5-patch-for-react-19";
import useTeacherClassShiftService from "../teacher_class_shift.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import ClassRoomSearchInput from "@/modules/organization/class_room/components/class_room.search";
import ClassRoomShiftSearchInput from "@/modules/organization/class_room_shift/components/class_room_shift.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import TeacherSearchInput from "../../teacher/components/teacher.search";

const TeacherClassShiftForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<TeacherClassShift>();
  const institution = Form.useWatch('institution', form)
  const class_room = Form.useWatch('class_room', form)
  const [data, setData] = useState<TeacherClassShift>();
  const service = useTeacherClassShiftService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getTeacherClassShift(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: TeacherClassShift) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service.updateTeacherClassShift(id, values)
        .then(() => router.push(`/admin/accounts/teacher_class_shifts/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addTeacherClassShift(values)
        .then(() => router.push(`/admin/accounts/teacher_class_shifts`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">Teacher ClassShift Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={`/admin/accounts/teacher_class_shifts/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={`/admin/accounts/teacher_class_shifts`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        
      <Form.Item name="teacher" label="Teacher" rules={[{ required: true, message: "Teacher is required" }]}>
            <TeacherSearchInput detail={data?.teacher_detail} />
        </Form.Item>

        <Form.Item name="institution" label="Institution" rules={[{ required: true, message: "Institution is required" }]}>
            <InstitutionSearchInput detail={data?.institution_detail} />
        </Form.Item>

        <Form.Item name="class_room" label="Class Room" rules={[{required: true, message: "Class Room is required"}]}>
            <ClassRoomSearchInput institution={institution} detail={data?.class_room_detail} />
        </Form.Item>

        <Form.Item name="class_room_shift" label="Class Room Shift" rules={[{ required: true, message: "Class Room Shift is required" }]}>
            <ClassRoomShiftSearchInput class_room={class_room} detail={data?.class_room_shift_detail} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default TeacherClassShiftForm;
