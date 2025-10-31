"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {ClassRoom } from "../class_room.model";
import "@ant-design/v5-patch-for-react-19";
import useClassRoomService from "../class_room.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import InstitutionSearchInput from "../../institution/components/institution.search";
import { ClassType } from "@/modules/accounts/student/student.enum";
import { enumToLabelValueArray } from "@/utils/object";
import { Navigations } from "@/utils/common_models/commons.model";
import ClassTypeSearchInput from "@/modules/lookup/class_type/components/class_type.search";

interface ClassRoomFormProps extends Partial<ClassRoom>, Navigations {}

const ClassRoomForm: React.FC<ClassRoomFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<ClassRoom>();
  const [data, setData] = useState<ClassRoom>()
  const service = useClassRoomService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getClassRoom(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data);
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: ClassRoom) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updateClassRoom(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/organization/class_rooms/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addClassRoom(values)
        .then(() => router.push(props.list_navigation || `/admin/organization/class_rooms`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-end gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/organization/class_rooms/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/organization/class_rooms`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        
      

      

      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
        <Input/>
      </Form.Item>
      {!props.institution && (

        <Form.Item name="institution" label="Institution" rules={[{ required: true, message: "Institution is required" }]}>
            <InstitutionSearchInput detail={data?.institution_detail} />
        </Form.Item>
      )}

      <Form.Item name="class_type" label="Class Type" rules={[{ required: true, message: "Class Type is required" }]}>
        <ClassTypeSearchInput detail={data?.class_type_detail} />
      </Form.Item>
      </div>
    </Form>
  );
};

export default ClassRoomForm;
