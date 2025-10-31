"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker, TimePicker } from "antd";
import {ClassRoomShift } from "../class_room_shift.model";
import "@ant-design/v5-patch-for-react-19";
import useClassRoomShiftService from "../class_room_shift.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import PackageSearchInput from "@/modules/lookup/package/components/package.search";
import ShiftSearchInput from "@/modules/lookup/shift/components/shift.search";
import ClassRoomSearchInput from "../../class_room/components/class_room.search";
import TimePickerWrapper from "@/components/TimePicker/timePicker";
import { enumToLabelValueArray } from "@/utils/object";
import { Days } from "@/modules/accounts/student/student.enum";
import { Navigations } from "@/utils/common_models/commons.model";

interface ClassRoomShiftFormProps extends Partial<ClassRoomShift>, Navigations {}

const ClassRoomShiftForm: React.FC<ClassRoomShiftFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<ClassRoomShift>();
  const [data, setData] = useState<ClassRoomShift>();
  const service = useClassRoomShiftService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getClassRoomShift(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: ClassRoomShift) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updateClassRoomShift(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/organization/class_room_shifts/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addClassRoomShift(values)
        .then(() => router.push(props.list_navigation || `/admin/organization/class_room_shifts`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">Class Room Shift Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/organization/class_room_shifts/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/organization/class_room_shifts`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        {!props.class_room && (
      <Form.Item name="class_room" label="Class Room" rules={[{ required: true, message: "Class Room is required" }]}>
            <ClassRoomSearchInput detail={data?.class_room_detail} />
        </Form.Item>
        )}

        <Form.Item name="package" label="Package" rules={[{ required: true, message: "Package is required" }]}>
            <PackageSearchInput detail={data?.package_detail} />
        </Form.Item>
<div className="flex items-baseline gap-4 w-full">
        <Form.Item className="flex-1" name="shift_days" label="Day" rules={[{ required: true, message: "Day is required" }]}>
                <Select
                  optionFilterProp="label"
                  options={enumToLabelValueArray(Days)}
                  placeholder="Day"
                />
              </Form.Item>

        <Form.Item className="flex-1" name="shift_times" label="Shift Times" rules={[{ required: true, message: "Shift Time is required" }]}>
            <ShiftSearchInput detail={data?.shift_times_detail} placeholder="Shift" />
        </Form.Item>
        </div>
<div className="flex items-baseline gap-4 w-full">
              <Form.Item className="flex-1" name="start_time" label="Start Time" rules={[{ required: true, message: "Start Time is required" }]}>
        <TimePickerWrapper  placeholder="Start Time" />
      </Form.Item>

      <Form.Item className="flex-1" name="end_time" label="End Time" rules={[{ required: true, message: "End Time is required" }]}>
        <TimePickerWrapper placeholder="End Time" />
      </Form.Item>
</div>
      </div>
    </Form>
  );
};

export default ClassRoomShiftForm;
