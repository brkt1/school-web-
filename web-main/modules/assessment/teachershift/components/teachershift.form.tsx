"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {TeacherShift } from "../teachershift.model";
import "@ant-design/v5-patch-for-react-19";
import useTeacherShiftService from "../teachershift.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Days, Shift } from "@/modules/accounts/student/student.enum";
import TeacherSearchInput from "@/modules/accounts/teacher/components/teacher.search";
import { enumToLabelValueArray } from "@/utils/object";
import ClassRoomSearchInput from "@/modules/organization/class_room/components/class_room.search";

const TeacherShiftForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<TeacherShift>();
  const [data, setData] = useState<TeacherShift>();
  const service = useTeacherShiftService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getTeacherShift(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data);
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: TeacherShift) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service.updateTeacherShift(id, values)
        .then(() => router.push(`/admin/assessment/teachershifts/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addTeacherShift(values)
        .then(() => router.push(`/admin/assessment/teachershifts`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-end gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={`/admin/assessment/teachershifts/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={`/admin/assessment/teachershifts`} type="text">Cancel</Button>
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

      <Form.Item name="day" label="Day" rules={[{ required: true, message: "Day is required" }]}>
        <Select
          optionFilterProp="label"
          options={enumToLabelValueArray(Days)}
          placeholder="Day"
        />
      </Form.Item>

      <Form.Item name="shift" label="Shift" rules={[{ required: true, message: "Shift is required" }]}>
        <Select
          optionFilterProp="label"
          options={enumToLabelValueArray(Shift)}
          placeholder="Shift"
        />
      </Form.Item>

        <Form.Item name="class_room" label="Class Room" rules={[{ required: true, message: "Class Room is required" }]}>
            <ClassRoomSearchInput detail={data?.class_room_detail} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default TeacherShiftForm;
